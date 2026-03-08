#!/usr/bin/env node
/**
 * sync.js — automatically refresh World Cup data into matches-data.js
 *
 * What it does:
 *   1. Fetches live odds from The Odds API  → updates odds for all existing matches
 *   2. Fetches WC fixtures from football-data.org → detects new matches not yet in file
 *   3. For new matches: generates EN/DE/TR preview text via Claude (if key set)
 *   4. Rebuilds admin.html
 *
 * Free API tiers needed:
 *   ODDS_API_KEY      — the-odds-api.com      (500 req/month free, ~1 req per run)
 *   FOOTBALL_DATA_KEY — football-data.org      (free tier, 10 req/min)
 *
 * Optional (for auto-generating multilingual previews on new matches):
 *   ANTHROPIC_API_KEY — api.anthropic.com
 *
 * Usage:
 *   ODDS_API_KEY=xxx FOOTBALL_DATA_KEY=yyy node sync.js
 *   ODDS_API_KEY=xxx FOOTBALL_DATA_KEY=yyy ANTHROPIC_API_KEY=zzz node sync.js
 *
 * Safe to run repeatedly — only touches odds fields on existing matches.
 * All other data (players, H2H, ELO, markets, etc.) is preserved as-is.
 */

"use strict";

const https = require("https");
const fs    = require("fs");
const path  = require("path");
const { execSync } = require("child_process");

const ODDS_API_KEY      = process.env.ODDS_API_KEY;
const FOOTBALL_DATA_KEY = process.env.FOOTBALL_DATA_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const MATCHES_FILE = path.join(__dirname, "matches-data.js");

// ── COUNTRY NAME NORMALISATIONS ───────────────────────────────────────────────
// Maps API names → canonical names used in your matches-data.js
const NAME_MAP = {
  "United States":        "USA",
  "United States of America": "USA",
  "Korea Republic":       "South Korea",
  "Republic of Korea":    "South Korea",
  "IR Iran":              "Iran",
  "Türkiye":              "Turkey",
  "Côte d'Ivoire":        "Ivory Coast",
  "DR Congo":             "Congo DR",
};

function normaliseName(name) {
  return NAME_MAP[name] || name;
}

// ── COUNTRY → FLAG EMOJI ──────────────────────────────────────────────────────
const FLAG = {
  "USA": "🇺🇸", "Mexico": "🇲🇽", "Canada": "🇨🇦",
  "Germany": "🇩🇪", "Spain": "🇪🇸", "France": "🇫🇷",
  "Argentina": "🇦🇷", "Brazil": "🇧🇷", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Portugal": "🇵🇹", "Netherlands": "🇳🇱", "Belgium": "🇧🇪",
  "Croatia": "🇭🇷", "Italy": "🇮🇹", "Uruguay": "🇺🇾",
  "Japan": "🇯🇵", "South Korea": "🇰🇷", "Morocco": "🇲🇦",
  "Senegal": "🇸🇳", "Colombia": "🇨🇴", "Ecuador": "🇪🇨",
  "Australia": "🇦🇺", "Iran": "🇮🇷", "Saudi Arabia": "🇸🇦",
  "Poland": "🇵🇱", "Serbia": "🇷🇸", "Switzerland": "🇨🇭",
  "Denmark": "🇩🇰", "Austria": "🇦🇹", "Ukraine": "🇺🇦",
  "Turkey": "🇹🇷", "Czech Republic": "🇨🇿", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿", "Romania": "🇷🇴", "Chile": "🇨🇱",
  "Peru": "🇵🇪", "Venezuela": "🇻🇪", "Paraguay": "🇵🇾",
  "Bolivia": "🇧🇴", "Qatar": "🇶🇦", "Tunisia": "🇹🇳",
  "Egypt": "🇪🇬", "Algeria": "🇩🇿", "Nigeria": "🇳🇬",
  "Ghana": "🇬🇭", "Ivory Coast": "🇨🇮", "Cameroon": "🇨🇲",
  "South Africa": "🇿🇦", "Costa Rica": "🇨🇷", "Panama": "🇵🇦",
  "Honduras": "🇭🇳", "Jamaica": "🇯🇲", "New Zealand": "🇳🇿",
  "Indonesia": "🇮🇩", "China": "🇨🇳",
};

function getFlag(name) { return FLAG[name] || "🏳"; }

// ── HELPERS ───────────────────────────────────────────────────────────────────
function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        if (res.statusCode >= 400) return reject(new Error("HTTP " + res.statusCode + ": " + data));
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error("JSON parse failed: " + data.slice(0, 200))); }
      });
    }).on("error", reject);
  });
}

// Convert ISO date string to readable format: "Thursday, 11 June 2026"
function formatDate(iso) {
  const d = new Date(iso);
  const days   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  return days[d.getUTCDay()] + ", " + d.getUTCDate() + " " + months[d.getUTCMonth()] + " " + d.getUTCFullYear();
}

function formatTime(iso) {
  const d = new Date(iso);
  return String(d.getUTCHours()).padStart(2,"0") + ":" + String(d.getUTCMinutes()).padStart(2,"0");
}

// Create a match ID from two team names: "usa-mexico"
function makeId(a, b) {
  return [a, b].map(n => n.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")).join("-");
}

// ── FETCH LIVE ODDS ───────────────────────────────────────────────────────────
async function fetchOdds() {
  if (!ODDS_API_KEY) {
    console.log("  ⚠  ODDS_API_KEY not set — skipping odds update");
    return [];
  }
  console.log("→ Fetching odds from the-odds-api.com…");
  const url = "https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds/"
            + "?apiKey=" + ODDS_API_KEY
            + "&regions=eu&markets=h2h&oddsFormat=decimal";
  const data = await get(url);
  console.log("  Got " + data.length + " odds entries");
  return data;
}

// ── FETCH WC FIXTURES ─────────────────────────────────────────────────────────
async function fetchFixtures() {
  if (!FOOTBALL_DATA_KEY) {
    console.log("  ⚠  FOOTBALL_DATA_KEY not set — skipping new fixture detection");
    return [];
  }
  console.log("→ Fetching WC fixtures from football-data.org…");
  const data = await get(
    "https://api.football-data.org/v4/competitions/WC/matches",
    { "X-Auth-Token": FOOTBALL_DATA_KEY }
  );
  const matches = data.matches || [];
  console.log("  Got " + matches.length + " fixtures");
  return matches;
}

// ── GENERATE PREVIEW VIA CLAUDE ───────────────────────────────────────────────
async function generatePreview(teamA, teamB) {
  if (!ANTHROPIC_API_KEY) return null;
  console.log("  → Generating preview for " + teamA + " vs " + teamB + " via Claude…");

  const prompt = [
    "Write a concise World Cup match preview for " + teamA + " vs " + teamB + ".",
    "Return ONLY a JSON object with this exact shape (no markdown wrapper):",
    '{',
    '  "previewLines": {',
    '    "en": ["sentence 1 (max 30 words)", "sentence 2 (max 30 words)"],',
    '    "de": ["Satz 1", "Satz 2"],',
    '    "tr": ["cümle 1", "cümle 2"]',
    '  },',
    '  "previewHighlight": {',
    '    "en": "<strong>Key:</strong> one-sentence insight.",',
    '    "de": "<strong>Schlüssel:</strong> ein Satz.",',
    '    "tr": "<strong>Kilit:</strong> bir cümle."',
    '  }',
    '}',
    "Use plain sentences. Only <strong> tags allowed in previewHighlight.",
  ].join("\n");

  const body = JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 600,
    messages: [{ role: "user", content: prompt }],
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(body),
      },
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const r = JSON.parse(data);
          const text = (r.content || []).map(b => b.text || "").join("").trim();
          // Strip possible ```json wrapper
          const clean = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
          resolve(JSON.parse(clean));
        } catch (e) {
          console.warn("    ⚠ Claude parse failed, using stub preview");
          resolve(null);
        }
      });
    });
    req.on("error", () => resolve(null));
    req.write(body);
    req.end();
  });
}

// Fallback stub preview when Claude is not available
function stubPreview(teamA, teamB) {
  return {
    previewLines: {
      en: [teamA + " face " + teamB + " in a World Cup group stage clash.", "Both sides will be looking to claim all three points."],
      de: [teamA + " trifft auf " + teamB + " in der WM-Gruppenphase.", "Beide Teams kämpfen um den vollen Punktgewinn."],
      tr: [teamA + ", " + teamB + " ile Dünya Kupası grup aşamasında karşılaşıyor.", "Her iki taraf da üç puan için mücadele edecek."],
    },
    previewHighlight: {
      en: "<strong>One to watch:</strong> " + teamA + " and " + teamB + " are closely matched — this could go either way.",
      de: "<strong>Achtung:</strong> " + teamA + " und " + teamB + " sind ebenbürtig — jedes Ergebnis ist möglich.",
      tr: "<strong>Dikkat:</strong> " + teamA + " ve " + teamB + " denk takımlar — sonuç her şey olabilir.",
    },
  };
}

// ── BUILD MINIMAL STUB MATCH ──────────────────────────────────────────────────
// Used for new fixtures not yet in matches-data.js.
// Template: fill in what we know from the API; leave advanced stats blank.
async function buildStubMatch(fix, oddsEntry) {
  const tA = normaliseName(fix.homeTeam.name);
  const tB = normaliseName(fix.awayTeam.name);

  const preview = (await generatePreview(tA, tB)) || stubPreview(tA, tB);

  const oddsHome = oddsEntry ? oddsEntry.home  : 2.50;
  const oddsDraw = oddsEntry ? oddsEntry.draw  : 3.20;
  const oddsAway = oddsEntry ? oddsEntry.away  : 3.00;
  const total = 1/oddsHome + 1/oddsDraw + 1/oddsAway;
  const probHome = Math.round((1/oddsHome) / total * 100);
  const probDraw = Math.round((1/oddsDraw) / total * 100);
  const probAway = 100 - probHome - probDraw;

  return {
    id: makeId(tA, tB),
    homeTeam: {
      name: tA, flag: getFlag(tA), code: tA.slice(0,3).toUpperCase(),
      fifa: 0, role: "",
      elo: 0, squadValue: "—",
      goalsPerGame: 0, concededPerGame: 0,
      possession: 50, cleanSheets: 0,
      form: [],
      formRecord: "—",
      players: [],
    },
    awayTeam: {
      name: tB, flag: getFlag(tB), code: tB.slice(0,3).toUpperCase(),
      fifa: 0, role: "",
      elo: 0, squadValue: "—",
      goalsPerGame: 0, concededPerGame: 0,
      possession: 50, cleanSheets: 0,
      form: [],
      formRecord: "—",
      players: [],
    },
    kickoff: formatTime(fix.utcDate),
    date: formatDate(fix.utcDate),
    venue: fix.venue || "TBC",
    venueCapacity: "—",
    venueSurface: "Grass",
    kickoffLocal: "—",
    kickoffCET: formatTime(fix.utcDate) + " CET",
    group: fix.stage || fix.group || "Group Stage",
    odds: { home: oddsHome, draw: oddsDraw, away: oddsAway },
    probHome, probDraw, probAway,
    previewLines:     preview.previewLines,
    previewHighlight: preview.previewHighlight,
    stats: [
      { label: { en: "Head to Head", de: "Direktvergleich", tr: "Karşılaşma" }, val: "—" },
      { label: { en: "Current Form",  de: "Aktuelle Form",   tr: "Güncel Form"  }, val: "—" },
    ],
    h2h: { homeWins: 0, draws: 0, awayWins: 0, total: 0, matches: [], note: "To be updated" },
    markets: {
      bttsYes: 0, bttsNo: 0, over25: 0, under25: 0, over35: 0,
      goalscorers: [], correctScore: [],
      dc1x: 0, dcX2: 0, htHome: 0, htDraw: 0, htAway: 0, fgsFirst: [],
    },
  };
}

// ── SERIALISE matches-data.js ──────────────────────────────────────────────────
// Writes the MATCHES array back as clean JavaScript.
function serialiseMatchesFile(matches) {
  const body = JSON.stringify(matches, null, 2);
  return [
    "// Shared match data — used by admin.html (browser) and generate.js (Node CLI)",
    "// Last synced: " + new Date().toISOString(),
    "const MATCHES = " + body + ";",
    "",
    "// Export",
    "if (typeof module !== \"undefined\") module.exports = { MATCHES };",
    "else window.MATCHES = MATCHES;",
    "",
  ].join("\n");
}

// ── ODDS LOOKUP HELPERS ───────────────────────────────────────────────────────
// Normalise team name to lowercase slug for fuzzy matching
function slug(name) {
  return normaliseName(name).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Build a lookup: "slug-a|slug-b" (alphabetical) → { home, draw, away }
function buildOddsLookup(oddsData) {
  const map = new Map();
  for (const entry of oddsData) {
    const market = (entry.bookmakers || [])
      .flatMap(b => b.markets || [])
      .find(m => m.key === "h2h");
    if (!market) continue;

    const outcomes = market.outcomes || [];
    const homeOut = outcomes.find(o => o.name === entry.home_team);
    const awayOut = outcomes.find(o => o.name === entry.away_team);
    const drawOut = outcomes.find(o => o.name === "Draw");

    if (!homeOut || !awayOut) continue;

    const slugHome = slug(entry.home_team);
    const slugAway = slug(entry.away_team);
    const key = [slugHome, slugAway].sort().join("|");

    map.set(key, {
      home: parseFloat(homeOut.price.toFixed(2)),
      draw: parseFloat((drawOut ? drawOut.price : 3.30).toFixed(2)),
      away: parseFloat(awayOut.price.toFixed(2)),
      // store original order so we can assign home/away correctly
      homeSlug: slugHome,
    });
  }
  return map;
}

function lookupOdds(oddsMap, nameA, nameB) {
  const sA = slug(nameA);
  const sB = slug(nameB);
  const key = [sA, sB].sort().join("|");
  const entry = oddsMap.get(key);
  if (!entry) return null;
  // Reorder: A is always homeTeam in match, B is awayTeam
  if (entry.homeSlug === sA) {
    return { home: entry.home, draw: entry.draw, away: entry.away };
  }
  return { home: entry.away, draw: entry.draw, away: entry.home };
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n=== sync.js — World Cup data refresh ===\n");

  // 1. Load existing matches
  // Clear require cache so we always get the latest file version
  delete require.cache[require.resolve(MATCHES_FILE)];
  const { MATCHES } = require(MATCHES_FILE);
  const matchById = new Map(MATCHES.map(m => [m.id, m]));
  console.log("Loaded " + MATCHES.length + " existing matches from matches-data.js");

  // 2. Fetch data (in parallel where possible)
  const [oddsData, fixtures] = await Promise.all([
    fetchOdds().catch(e => { console.error("  ✖ Odds fetch failed:", e.message); return []; }),
    fetchFixtures().catch(e => { console.error("  ✖ Fixture fetch failed:", e.message); return []; }),
  ]);

  // 3. Build odds lookup
  const oddsMap = buildOddsLookup(oddsData);
  console.log("  Built odds lookup with " + oddsMap.size + " entries");

  // 4. Update odds for existing matches
  let oddsUpdated = 0;
  for (const m of MATCHES) {
    const o = lookupOdds(oddsMap, m.homeTeam.name, m.awayTeam.name);
    if (o) {
      m.odds = o;
      // Recalculate win probabilities from new odds
      const total = 1/o.home + 1/o.draw + 1/o.away;
      m.probHome = Math.round((1/o.home) / total * 100);
      m.probDraw = Math.round((1/o.draw) / total * 100);
      m.probAway = 100 - m.probHome - m.probDraw;
      oddsUpdated++;
    }
  }
  console.log("→ Updated odds for " + oddsUpdated + " existing matches");

  // 5. Detect new fixtures not yet in file
  let added = 0;
  for (const fix of fixtures) {
    if (!fix.homeTeam?.name || !fix.awayTeam?.name) continue;
    const tA = normaliseName(fix.homeTeam.name);
    const tB = normaliseName(fix.awayTeam.name);
    const id = makeId(tA, tB);

    if (matchById.has(id)) continue; // already exists

    console.log("  ✚ New fixture detected: " + tA + " vs " + tB);
    const oddsEntry = lookupOdds(oddsMap, tA, tB);
    const stub = await buildStubMatch(fix, oddsEntry);
    MATCHES.push(stub);
    matchById.set(id, stub);
    added++;
  }

  if (added === 0 && fixtures.length > 0) {
    console.log("→ No new fixtures detected (all " + fixtures.length + " already in file)");
  }

  // 6. Write updated matches-data.js
  if (oddsUpdated > 0 || added > 0) {
    fs.writeFileSync(MATCHES_FILE, serialiseMatchesFile(MATCHES), "utf8");
    console.log("\n✔ Wrote matches-data.js (" + MATCHES.length + " matches, " + oddsUpdated + " odds updated, " + added + " added)");

    // 7. Rebuild admin.html
    console.log("→ Rebuilding admin.html…");
    delete require.cache[require.resolve(path.join(__dirname, "build-admin.js"))];
    require("./build-admin.js");
  } else {
    console.log("\n✔ Nothing to update — matches-data.js unchanged");
  }

  console.log("\nDone.\n");
}

main().catch(err => {
  console.error("\n✖ Fatal error:", err.message);
  process.exit(1);
});
