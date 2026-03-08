// Generates a full standalone match HTML page.
// generateMatchHTML(m, brand, lang)
//   m     — match data object from matches-data.js
//   brand — brand config object from brands.js (defaults to BRANDS[0] if available)
//   lang  — "en" | "de" | "tr"  (defaults to "en")

const I18N = {
  en: {
    htmlLang: "en",
    placeBet: "Place a Bet",
    upcoming: "Upcoming",
    groupStage: "Group Stage",
    homeWin: "Home Win",
    draw: "Draw",
    awayWin: "Away Win",
    after90: "After 90 min",
    tabPreview: "Preview",
    tabStats: "Statistics",
    tabOdds: "Odds",
    tabH2H: "H2H",
    tabForm: "Form",
    matchPreview: "Match Preview",
    winProbability: "Win Probability",
    basedOn: function(b) { return "Based on " + b + " odds"; },
    teamComparison: "Team Comparison",
    recentForm: "Recent Form",
    last5: "Last 5 matches",
    headToHead: "Head to Head",
    matchesTotal: function(n) { return n + " matches total"; },
    wins: "wins",
    draws: "Draws",
    bettingMarkets: "Betting Markets",
    keyPlayers: "Key Players",
    venueInfo: "Venue Info",
    quickBet: "Quick Bet",
    fifaRanking: "FIFA Ranking",
    eloRating: "ELO Rating",
    squadValue: "Squad Value",
    goalsPerMatch: "Goals / Match",
    concededPerMatch: "Conceded / Match",
    possession: "Possession",
    cleanSheets: "Clean Sheets",
    matchResult: "Match Result (1X2)",
    bothTeamsScore: "Both Teams to Score",
    totalGoals: "Total Goals",
    over25: "Over 2.5",
    under25: "Under 2.5",
    over35: "Over 3.5",
    goalscorer: "Anytime Goalscorer",
    correctScore: "Correct Score (Top Picks)",
    doubleChance: "Double Chance",
    halfTime: "Half-Time Result",
    firstGoal: "First Goal Scorer",
    yes: "Yes",
    no: "No",
    orDraw: "or Draw",
    welcomeOffer: "Welcome Offer",
    capacity: "Capacity",
    surface: "Surface",
    kickoffLocal: "Kick-off (local)",
    kickoffCET: "Kick-off (CET)",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    responsible: "Responsible Gaming",
    allMatches: "All Matches"
  },
  de: {
    htmlLang: "de",
    placeBet: "Jetzt wetten",
    upcoming: "Bevorstehend",
    groupStage: "Gruppenphase",
    homeWin: "Heimsieg",
    draw: "Unentschieden",
    awayWin: "Ausw\u00e4rtssieg",
    after90: "Nach 90 Min.",
    tabPreview: "Vorschau",
    tabStats: "Statistiken",
    tabOdds: "Quoten",
    tabH2H: "H2H",
    tabForm: "Form",
    matchPreview: "Spielvorschau",
    winProbability: "Siegwahrscheinlichkeit",
    basedOn: function(b) { return "Basierend auf " + b + " Quoten"; },
    teamComparison: "Teamvergleich",
    recentForm: "Aktuelle Form",
    last5: "Letzte 5 Spiele",
    headToHead: "Direktvergleich",
    matchesTotal: function(n) { return n + " Spiele gesamt"; },
    wins: "Siege",
    draws: "Unentschieden",
    bettingMarkets: "Wettm\u00e4rkte",
    keyPlayers: "Schl\u00fcsselspieler",
    venueInfo: "Stadioninfo",
    quickBet: "Schnellwette",
    fifaRanking: "FIFA-Ranking",
    eloRating: "ELO-Wertung",
    squadValue: "Marktwert",
    goalsPerMatch: "Tore / Spiel",
    concededPerMatch: "Gegentore / Spiel",
    possession: "Ballbesitz",
    cleanSheets: "Zu-Null-Spiele",
    matchResult: "Spielergebnis (1X2)",
    bothTeamsScore: "Beide Teams treffen",
    totalGoals: "Tore gesamt",
    over25: "\u00dcber 2,5",
    under25: "Unter 2,5",
    over35: "\u00dcber 3,5",
    goalscorer: "Torsch\u00fctze (jederzeit)",
    correctScore: "Genaues Ergebnis (Top Picks)",
    doubleChance: "Doppelte Chance",
    halfTime: "Halbzeitergebnis",
    firstGoal: "Erster Torsch\u00fctze",
    yes: "Ja",
    no: "Nein",
    orDraw: "oder Unentsch.",
    welcomeOffer: "Willkommensangebot",
    capacity: "Kapazit\u00e4t",
    surface: "Belag",
    kickoffLocal: "Ansto\u00df (Ortszeit)",
    kickoffCET: "Ansto\u00df (MEZ)",
    terms: "AGB",
    privacy: "Datenschutz",
    responsible: "Verantwortungsvolles Spielen",
    allMatches: "Alle Spiele"
  },
  tr: {
    htmlLang: "tr",
    placeBet: "Bahis Yap",
    upcoming: "Yakla\u015fan",
    groupStage: "Grup A\u015famas\u0131",
    homeWin: "Ev Sahibi Kazan\u0131r",
    draw: "Beraberlik",
    awayWin: "Deplasman Kazan\u0131r",
    after90: "90 dak. sonunda",
    tabPreview: "\u00d6nizleme",
    tabStats: "\u0130statistikler",
    tabOdds: "Oranlar",
    tabH2H: "H2H",
    tabForm: "Form",
    matchPreview: "Ma\u00e7 \u00d6nizlemesi",
    winProbability: "Kazanma \u0130htimali",
    basedOn: function(b) { return b + " oranlar\u0131na g\u00f6re"; },
    teamComparison: "Tak\u0131m Kar\u015f\u0131la\u015ft\u0131rmas\u0131",
    recentForm: "Son Form",
    last5: "Son 5 ma\u00e7",
    headToHead: "Kar\u015f\u0131l\u0131kl\u0131 Ma\u00e7lar",
    matchesTotal: function(n) { return n + " toplam ma\u00e7"; },
    wins: "Galibiyet",
    draws: "Beraberlik",
    bettingMarkets: "Bahis Piyasalar\u0131",
    keyPlayers: "Kilit Oyuncular",
    venueInfo: "Stadyum Bilgisi",
    quickBet: "H\u0131zl\u0131 Bahis",
    fifaRanking: "FIFA S\u0131ralamas\u0131",
    eloRating: "ELO Puan\u0131",
    squadValue: "Kadro De\u011feri",
    goalsPerMatch: "Gol / Ma\u00e7",
    concededPerMatch: "Yenilen Gol / Ma\u00e7",
    possession: "Top Hakimiyeti",
    cleanSheets: "Gol Yemeden Ma\u00e7lar",
    matchResult: "Ma\u00e7 Sonucu (1X2)",
    bothTeamsScore: "Kar\u015f\u0131l\u0131kl\u0131 Gol",
    totalGoals: "Toplam Gol",
    over25: "\u00dcst 2.5",
    under25: "Alt 2.5",
    over35: "\u00dcst 3.5",
    goalscorer: "Gol Atan (herhangi bir zamanda)",
    correctScore: "Do\u011fru Skor (\u00d6ne \u00c7\u0131kanlar)",
    doubleChance: "\u00c7ifte \u015eans",
    halfTime: "\u0130lk Yar\u0131 Sonucu",
    firstGoal: "\u0130lk Gol Atan",
    yes: "Evet",
    no: "Hay\u0131r",
    orDraw: "veya Beraberlik",
    welcomeOffer: "Ho\u015fgeldin Teklifi",
    capacity: "Kapasite",
    surface: "Zemin",
    kickoffLocal: "Ba\u015flang\u0131\u00e7 (yerel saat)",
    kickoffCET: "Ba\u015flang\u0131\u00e7 (CET)",
    terms: "\u015eartlar ve Ko\u015fullar",
    privacy: "Gizlilik Politikas\u0131",
    responsible: "Sorumlu Oyun",
    allMatches: "T\u00fcm Ma\u00e7lar"
  }
};

function generateMatchHTML(m, brand, lang) {
  if (!brand && typeof BRANDS !== "undefined") brand = BRANDS[0];
  if (!brand) brand = {
    id: "youwin", name: "Youwin", logoHtml: "YOU<span>WIN</span>",
    accentHex: "#E41E3F", registerUrl: "https://youwin.com/register?ref=21331414",
    bonusHeadline: { en: "100% Bonus<br>up to \u20ac100", de: "100% Bonus<br>bis zu 100\u00a0\u20ac", tr: "\u20ac100\u2019a Kadar<br>%100 Bonus" },
    bonusSub: { en: "New customers only &middot; Min. deposit \u20ac10 &middot; T&amp;Cs apply", de: "Nur Neukunden &middot; Mind. 10\u00a0\u20ac &middot; AGB gelten", tr: "Yaln\u0131zca yeni \u00fcyeler &middot; \u015eartlar ge\u00e7erlidir" },
    claimBonus: { en: "Claim Bonus &rarr;", de: "Bonus sichern &rarr;", tr: "Bonusu Al &rarr;" },
    disclaimer: { en: "18+ only. Please gamble responsibly. Betting involves risk.", de: "Nur ab 18 Jahren. Verantwortungsbewusst spielen.", tr: "Sadece 18+. L\u00fctfen sorumlu oynay\u0131n." },
    mobBarLabel: { en: "Daily Prize Pool", de: "T\u00e4glicher Preispool", tr: "G\u00fcnl\u00fck \u00d6d\u00fcl Havuzu" },
    mobBarVal:   { en: "Get free $10 in bets", de: "10$ gratis wetten", tr: "$10 \u00fccretsiz bahis" },
    mobBarBtnMain: { en: "Bet Now", de: "Jetzt wetten", tr: "\u015eimdi Bahis Yap" },
    mobBarBtnSub:  { en: "Get $10 Free!", de: "10$ Gratis!", tr: "$10 \u00dccretsi\u0307z!" }
  };
  if (!lang) lang = "en";
  const t = I18N[lang] || I18N.en;
  const aff = brand.registerUrl;
  const accentHex = brand.accentHex || "#E41E3F";
  const brandName = brand.name;
  const logoHtml = brand.logoHtml;
  const L = lang;

  function g(obj) { return (obj && obj[L]) || (obj && obj.en) || ""; }

  function formBadges(team) {
    if (!team.form || !team.form.length) return '<span style="color:var(--t3);font-size:.72rem;">\u2014</span>';
    return team.form.map(function(f) {
      return '<div class="fb ' + f.r.toLowerCase() + '" title="' + (f.tip || "") + '">' + f.r + '</div>';
    }).join("\n              ");
  }

  function h2hRows(match) {
    return match.h2h.matches.map(function(hm) {
      var hc = hm.winner === "home" ? ' class="w"' : "";
      var ac = hm.winner === "away" ? ' class="w"' : "";
      return '        <div class="ml-item">\n' +
        '          <span class="ml-date">' + hm.date + '</span>\n' +
        '          <div class="ml-teams"><span' + hc + '>' + hm.home + '</span><span>\u2013</span><span' + ac + '>' + hm.away + '</span></div>\n' +
        '          <span class="ml-score">' + hm.score + '</span>\n' +
        '          <span class="ml-comp">' + hm.comp + '</span>\n' +
        '        </div>';
    }).join("\n");
  }

  function playerRows(players) {
    return players.map(function(p) {
      return '        <div class="player-row">\n' +
        '          <div class="player-avatar">' + p.flag + '</div>\n' +
        '          <div class="player-info">\n' +
        '            <div class="player-name">' + p.name + '</div>\n' +
        '            <div class="player-detail">' + p.detail + '</div>\n' +
        '          </div>\n' +
        '          <div class="player-stat">\n' +
        '            <div class="player-stat-val">' + p.stat + '</div>\n' +
        '            <div class="player-stat-label">' + p.statLabel + '</div>\n' +
        '          </div>\n' +
        '        </div>';
    }).join("\n");
  }

  function mktBtns(items) {
    return items.map(function(i) {
      return '            <div class="mkt-btn">\n' +
        '              <span class="mkt-btn-label">' + i.label + '</span><span class="mkt-btn-val">' + i.val + '</span>\n' +
        '            </div>';
    }).join("\n");
  }

  // Resolve a value that may be a plain string/array OR a {en,de,tr} object
  function getLang(val) {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      return val[lang] || val.en;
    }
    return val;
  }

  var ht = m.homeTeam, at = m.awayTeam;
  var allPlayers = [].concat(ht.players || [], at.players || []);

  // Safe bar-width: returns [leftPct, rightPct], handles 0/NaN/Infinity
  function barW(a, b) {
    var a2 = (a && isFinite(a)) ? a : 0;
    var b2 = (b && isFinite(b)) ? b : 0;
    var max = Math.max(a2, b2, 0.001);
    return [Math.round((a2 / max) * 95), Math.round((b2 / max) * 95)];
  }

  var fifaBars = barW(ht.fifa ? 1 / ht.fifa : 0, at.fifa ? 1 / at.fifa : 0);
  var fifaH = fifaBars[0], fifaA = fifaBars[1];
  var eloBars = barW(ht.elo || 0, at.elo || 0);
  var eloH = eloBars[0], eloA = eloBars[1];
  var svH = parseFloat(((ht.squadValue || "0").replace(/[^0-9.]/g, "")) || 0);
  var svA = parseFloat(((at.squadValue || "0").replace(/[^0-9.]/g, "")) || 0);
  var sqBars = barW(svH, svA);
  var sqH = sqBars[0], sqA = sqBars[1];
  var gpBars = barW(ht.goalsPerGame || 0, at.goalsPerGame || 0);
  var gpH = gpBars[0], gpA = gpBars[1];
  var cpBars = barW(ht.concededPerGame ? 1 / ht.concededPerGame : 0, at.concededPerGame ? 1 / at.concededPerGame : 0);
  var cpH = cpBars[0], cpA = cpBars[1];
  var posBars = barW(ht.possession || 50, at.possession || 50);
  var posH = posBars[0], posA = posBars[1];
  var csBars = barW(ht.cleanSheets || 0, at.cleanSheets || 0);
  var csH = csBars[0], csA = csBars[1];

  var leadH = (ht.elo || 0) >= (at.elo || 0) ? " lead" : "";
  var leadA = (at.elo || 0) >= (ht.elo || 0) ? " lead" : "";

  // ── Optional section builders (return "" when data is absent) ──────────────
  function h2hCard() {
    if (!m.h2h || !m.h2h.total) return "";
    var hw = Math.round(m.h2h.homeWins / m.h2h.total * 100);
    var dr = Math.round(m.h2h.draws    / m.h2h.total * 100);
    var aw = Math.round(m.h2h.awayWins / m.h2h.total * 100);
    return '<div class="card">' +
      '<div class="card-head">' +
        '<div class="card-title"><span class="card-icon" style="background:var(--yellow-dim);">\uD83E\uDD1D</span> ' + t.headToHead + '</div>' +
        '<span class="card-chip">' + t.matchesTotal(m.h2h.total) + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="prob-bar" style="height:26px;margin-bottom:.85rem;">' +
          '<div class="ps home" style="width:' + hw + '%;">' + m.h2h.homeWins + ' ' + t.wins + '</div>' +
          '<div class="ps draw" style="width:' + dr + '%;">' + m.h2h.draws + '</div>' +
          '<div class="ps away" style="width:' + aw + '%;">' + m.h2h.awayWins + ' ' + t.wins + '</div>' +
        '</div>' +
        '<div class="prob-labels" style="margin-bottom:.9rem;">' +
          '<span>' + ht.flag + ' ' + ht.name + '</span><span>' + t.draws + '</span><span>' + at.name + ' ' + at.flag + '</span>' +
        '</div>' +
        h2hRows(m) +
        (m.h2h.note ? '<div style="margin-top:.6rem;font-size:.65rem;color:var(--t3);">' + m.h2h.note + '</div>' : "") +
      '</div></div>';
  }

  function mktsCard() {
    if (!m.markets) return "";
    var mk = m.markets;
    return '<div class="card">' +
      '<div class="card-head">' +
        '<div class="card-title"><span class="card-icon" style="background:var(--accent-dim);">\uD83D\uDCB0</span> ' + t.bettingMarkets + '</div>' +
        '<span class="card-chip" style="color:var(--accent);background:var(--accent-dim);">' + brandName + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="market"><div class="mkt-label">' + t.matchResult + '</div><div class="mkt-row">' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + ht.name + '</span><span class="mkt-btn-val">' + m.odds.home.toFixed(2) + '</span></div>' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + t.draw + '</span><span class="mkt-btn-val">' + m.odds.draw.toFixed(2) + '</span></div>' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + at.name + '</span><span class="mkt-btn-val">' + m.odds.away.toFixed(2) + '</span></div>' +
        '</div></div>' +
        (mk.bttsYes ? '<div class="market"><div class="mkt-label">' + t.bothTeamsScore + '</div><div class="mkt-row">' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + t.yes + '</span><span class="mkt-btn-val">' + mk.bttsYes.toFixed(2) + '</span></div>' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + t.no + '</span><span class="mkt-btn-val">' + mk.bttsNo.toFixed(2) + '</span></div>' +
        '</div></div>' : "") +
        (mk.over25 ? '<div class="market"><div class="mkt-label">' + t.totalGoals + '</div><div class="mkt-row">' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + t.over25 + '</span><span class="mkt-btn-val">' + mk.over25.toFixed(2) + '</span></div>' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + t.under25 + '</span><span class="mkt-btn-val">' + mk.under25.toFixed(2) + '</span></div>' +
          (mk.over35 ? '<div class="mkt-btn"><span class="mkt-btn-label">' + t.over35 + '</span><span class="mkt-btn-val">' + mk.over35.toFixed(2) + '</span></div>' : "") +
        '</div></div>' : "") +
        (mk.goalscorers && mk.goalscorers.length ? '<div class="market"><div class="mkt-label">' + t.goalscorer + '</div><div class="mkt-row">' + mktBtns(mk.goalscorers) + '</div></div>' : "") +
        (mk.correctScore && mk.correctScore.length ? '<div class="market"><div class="mkt-label">' + t.correctScore + '</div><div class="mkt-row">' + mktBtns(mk.correctScore) + '</div></div>' : "") +
        (mk.dc1x ? '<div class="market"><div class="mkt-label">' + t.doubleChance + '</div><div class="mkt-row">' +
          '<div class="mkt-btn"><span class="mkt-btn-label">1X (' + ht.code + ' ' + t.orDraw + ')</span><span class="mkt-btn-val">' + mk.dc1x.toFixed(2) + '</span></div>' +
          '<div class="mkt-btn"><span class="mkt-btn-label">X2 (' + at.code + ' ' + t.orDraw + ')</span><span class="mkt-btn-val">' + mk.dcX2.toFixed(2) + '</span></div>' +
        '</div></div>' : "") +
      '</div></div>';
  }

  function quickBetCard() {
    if (!m.markets) return "";
    var mk = m.markets;
    if (!mk.htHome) return "";
    return '<div class="card">' +
      '<div class="card-head"><div class="card-title"><span class="card-icon" style="background:var(--accent-dim);">\u26A1</span> ' + t.quickBet + '</div></div>' +
      '<div class="card-body">' +
        '<div class="market"><div class="mkt-label">' + t.halfTime + '</div><div class="mkt-row">' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + ht.code + '</span><span class="mkt-btn-val">' + mk.htHome.toFixed(2) + '</span></div>' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + t.draw + '</span><span class="mkt-btn-val">' + mk.htDraw.toFixed(2) + '</span></div>' +
          '<div class="mkt-btn"><span class="mkt-btn-label">' + at.code + '</span><span class="mkt-btn-val">' + mk.htAway.toFixed(2) + '</span></div>' +
        '</div></div>' +
        (mk.fgsFirst && mk.fgsFirst.length ? '<div class="market"><div class="mkt-label">' + t.firstGoal + '</div><div class="mkt-row">' + mktBtns(mk.fgsFirst) + '</div></div>' : "") +
      '</div></div>';
  }

  function playersCard() {
    if (!allPlayers.length) return "";
    return '<div class="card">' +
      '<div class="card-head"><div class="card-title"><span class="card-icon" style="background:var(--blue-dim);">\u2B50</span> ' + t.keyPlayers + '</div></div>' +
      '<div class="card-body">' + playerRows(allPlayers) + '</div>' +
    '</div>';
  }

  return `<!DOCTYPE html>
<html lang="${t.htmlLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ht.name} vs ${at.name} \u2013 ${m.tournament || 'FIFA World Cup 2026'} | ${brandName}</title>
  <meta name="description" content="Bet on ${ht.name} vs ${at.name} (${m.tournament || 'FIFA World Cup 2026'}). Best odds, match preview, head-to-head stats and exclusive bonuses at ${brandName}.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg-page:#F4F5F7;--bg-card:#FFFFFF;--bg-muted:#F8F9FB;--bg-input:#EEF0F4;
      --accent:${accentHex};
      --accent-dim:color-mix(in srgb,${accentHex} 9%,transparent);
      --accent-mid:color-mix(in srgb,${accentHex} 18%,transparent);
      --blue:#2563EB;--blue-dim:rgba(37,99,235,0.08);
      --green:#16A34A;--green-dim:rgba(22,163,74,0.09);
      --yellow:#D97706;--yellow-dim:rgba(217,119,6,0.09);
      --red:#DC2626;--red-dim:rgba(220,38,38,0.09);
      --t0:#111827;--t1:#374151;--t2:#6B7280;--t3:#9CA3AF;
      --border:#E5E7EB;--border-subtle:#F3F4F6;
      --r-sm:8px;--r-md:12px;--r-lg:16px;--r-xl:20px;
      --shadow-xs:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);
      --shadow-sm:0 2px 8px rgba(0,0,0,0.07),0 1px 3px rgba(0,0,0,0.04);
      --shadow-md:0 4px 16px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04);
    }
    html{scroll-behavior:smooth;}
    body{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg-page);color:var(--t1);line-height:1.5;-webkit-font-smoothing:antialiased;}
    a{color:inherit;text-decoration:none;}
    .topbar{position:sticky;top:0;z-index:100;height:54px;background:rgba(255,255,255,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);box-shadow:var(--shadow-xs);display:flex;align-items:center;padding:0 1rem;}
    .topbar-inner{max-width:1100px;width:100%;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:.75rem;}
    .topbar-left{display:flex;align-items:center;gap:.75rem;}
    .topbar-back{width:34px;height:34px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;color:var(--t2);transition:background .15s,color .15s;}
    .topbar-back:hover{background:var(--bg-input);color:var(--t0);}
    .topbar-back svg{width:18px;height:18px;}
    .topbar-brand{font-size:1.05rem;font-weight:900;letter-spacing:-.03em;color:var(--t0);}
    .topbar-brand span{color:var(--accent);}
    .topbar-right{display:flex;align-items:center;gap:.5rem;}
    .topbar-cta{background:var(--accent);color:#fff;font-size:.72rem;font-weight:700;padding:.38rem 1rem;border-radius:100px;transition:filter .15s,transform .15s;}
    .topbar-cta:hover{filter:brightness(1.08);transform:translateY(-1px);}
    .page{max-width:1100px;margin:0 auto;padding:1.25rem 1rem;display:grid;grid-template-columns:1fr 336px;gap:1.25rem;align-items:start;}
    .match-header{grid-column:1/-1;background:var(--bg-card);border-radius:var(--r-xl);box-shadow:var(--shadow-sm);border:1px solid var(--border);overflow:hidden;}
    .mh-top{display:flex;align-items:center;justify-content:space-between;padding:.65rem 1.25rem;border-bottom:1px solid var(--border-subtle);background:var(--bg-muted);}
    .mh-tourney{display:flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:600;color:var(--t2);}
    .mh-tourney-badge{background:var(--accent-dim);border-radius:6px;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:.75rem;}
    .mh-status{display:inline-flex;align-items:center;gap:.35rem;font-size:.65rem;font-weight:700;color:var(--green);background:var(--green-dim);padding:.2rem .65rem;border-radius:100px;}
    .mh-dot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:blink 1.8s infinite;}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
    .mh-body{display:flex;align-items:center;justify-content:center;padding:2rem 1.5rem 1.25rem;gap:0;}
    .mh-team{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:.5rem;text-align:center;}
    .mh-flag{font-size:4rem;line-height:1;filter:drop-shadow(0 4px 12px rgba(0,0,0,.15));flex-shrink:0;}
    .mh-flag img.team-crest{width:72px;height:72px;object-fit:contain;display:block;}
    .mh-name{font-size:1.1rem;font-weight:800;color:var(--t0);letter-spacing:-.02em;}
    .mh-sub{font-size:.7rem;font-weight:600;color:var(--t2);background:var(--bg-input);padding:.15rem .55rem;border-radius:100px;line-height:1.4;}
    .mh-center{padding:0 1.75rem;flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:.35rem;}
    .mh-kick{font-size:1.6rem;font-weight:900;color:var(--t0);letter-spacing:-.04em;line-height:1;}
    .mh-date{font-size:.72rem;font-weight:600;color:var(--t2);}
    .mh-venue{font-size:.65rem;color:var(--t3);margin-top:.1rem;}
    .mh-foot{padding:0 1.25rem 1.1rem;display:flex;justify-content:center;}
    .odds-strip{display:flex;gap:.4rem;background:var(--bg-muted);border:1px solid var(--border);border-radius:var(--r-lg);padding:.4rem;width:100%;max-width:400px;}
    .odds-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:.12rem;padding:.55rem .5rem;border-radius:var(--r-md);cursor:pointer;transition:all .15s;}
    .odds-btn:hover{background:var(--accent-dim);}
    .odds-btn-label{font-size:.58rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--t3);}
    .odds-btn-val{font-size:1rem;font-weight:800;color:var(--t0);letter-spacing:-.02em;}
    .odds-btn-team{font-size:.6rem;font-weight:500;color:var(--t2);}
    .tabs{display:flex;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-xs);padding:.3rem;overflow-x:auto;-webkit-overflow-scrolling:touch;}
    .tabs::-webkit-scrollbar{display:none;}
    .tab{flex:1;text-align:center;font-size:.72rem;font-weight:600;color:var(--t2);padding:.52rem .75rem;border-radius:var(--r-md);cursor:pointer;white-space:nowrap;transition:all .15s;user-select:none;}
    .tab:hover{color:var(--t0);background:var(--bg-muted);}
    .tab.active{background:var(--accent);color:#fff;font-weight:700;}
    .card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-xs);overflow:hidden;}
    .card-head{display:flex;align-items:center;justify-content:space-between;padding:.8rem 1.1rem;border-bottom:1px solid var(--border-subtle);}
    .card-title{display:flex;align-items:center;gap:.45rem;font-size:.78rem;font-weight:700;color:var(--t0);}
    .card-icon{width:22px;height:22px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:.72rem;flex-shrink:0;}
    .card-chip{font-size:.6rem;font-weight:700;color:var(--t3);background:var(--bg-input);padding:.15rem .5rem;border-radius:100px;}
    .card-body{padding:1rem 1.1rem;}
    .stat-row{display:flex;align-items:center;gap:.5rem;padding:.6rem 0;}
    .stat-row+.stat-row{border-top:1px solid var(--border-subtle);}
    .sv{width:44px;flex-shrink:0;font-size:.8rem;font-weight:700;color:var(--t1);text-align:center;}
    .sv.lead{color:var(--blue);}
    .sn{flex:0 0 104px;text-align:center;font-size:.68rem;font-weight:500;color:var(--t2);}
    .sh{flex:1;height:5px;border-radius:100px;background:var(--bg-input);overflow:hidden;direction:rtl;}
    .sh-fill{height:100%;border-radius:100px;background:var(--blue);direction:ltr;}
    .sa{flex:1;height:5px;border-radius:100px;background:var(--bg-input);overflow:hidden;}
    .sa-fill{height:100%;border-radius:100px;background:var(--accent);}
    .prob-bar{display:flex;border-radius:100px;overflow:hidden;height:32px;font-size:.68rem;font-weight:700;}
    .ps{display:flex;align-items:center;justify-content:center;color:#fff;transition:width .7s ease;}
    .ps.home{background:var(--blue);}
    .ps.draw{background:#9CA3AF;}
    .ps.away{background:var(--accent);}
    .prob-labels{display:flex;justify-content:space-between;margin-top:.45rem;font-size:.65rem;font-weight:600;color:var(--t2);}
    .form-section{display:flex;flex-direction:column;gap:.85rem;}
    .form-row{display:flex;align-items:center;gap:.75rem;}
    .form-meta{display:flex;align-items:center;gap:.4rem;min-width:96px;flex-shrink:0;}
    .form-flag{font-size:1rem;}
    .form-label{font-size:.72rem;font-weight:700;color:var(--t1);}
    .form-badges{display:flex;gap:.3rem;flex:1;}
    .fb{width:28px;height:28px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:.64rem;font-weight:800;transition:transform .15s;cursor:default;}
    .fb:hover{transform:scale(1.12);}
    .fb.w{background:var(--green-dim);color:var(--green);}
    .fb.d{background:var(--yellow-dim);color:var(--yellow);}
    .fb.l{background:var(--red-dim);color:var(--red);}
    .form-record{font-size:.68rem;font-weight:600;color:var(--t2);white-space:nowrap;}
    .ml-item{display:flex;align-items:center;gap:.5rem;padding:.65rem 0;}
    .ml-item+.ml-item{border-top:1px solid var(--border-subtle);}
    .ml-date{font-size:.64rem;font-weight:500;color:var(--t3);width:68px;flex-shrink:0;}
    .ml-teams{flex:1;font-size:.76rem;color:var(--t2);display:flex;align-items:center;gap:.3rem;}
    .ml-teams .w{font-weight:700;color:var(--t0);}
    .ml-score{background:var(--bg-input);border-radius:6px;padding:.2rem .55rem;font-size:.74rem;font-weight:800;color:var(--t0);letter-spacing:.04em;flex-shrink:0;}
    .ml-comp{font-size:.6rem;font-weight:500;color:var(--t3);width:60px;text-align:right;flex-shrink:0;}
    .market{margin-bottom:.85rem;}
    .market:last-child{margin-bottom:0;}
    .mkt-label{font-size:.63rem;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:.4rem;}
    .mkt-row{display:flex;gap:.35rem;}
    .mkt-btn{flex:1;display:flex;align-items:center;justify-content:space-between;background:var(--bg-muted);border:1px solid var(--border);border-radius:var(--r-sm);padding:.6rem .75rem;cursor:pointer;transition:all .15s;}
    .mkt-btn:hover{border-color:var(--accent);background:var(--accent-dim);}
    .mkt-btn-label{font-size:.7rem;color:var(--t1);font-weight:500;}
    .mkt-btn-val{font-size:.82rem;font-weight:800;color:var(--t0);}
    .player-row{display:flex;align-items:center;gap:.65rem;padding:.6rem 0;}
    .player-row+.player-row{border-top:1px solid var(--border-subtle);}
    .player-avatar{width:38px;height:38px;border-radius:50%;background:var(--bg-input);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0;}
    .player-info{flex:1;min-width:0;}
    .player-name{font-size:.78rem;font-weight:700;color:var(--t0);}
    .player-detail{font-size:.64rem;color:var(--t2);font-weight:500;margin-top:.1rem;}
    .player-stat{text-align:right;flex-shrink:0;}
    .player-stat-val{font-size:.88rem;font-weight:800;color:var(--t0);}
    .player-stat-label{font-size:.6rem;color:var(--t3);font-weight:500;}
    .preview-text{font-size:.82rem;color:var(--t1);line-height:1.75;}
    .preview-text+.preview-text{margin-top:.65rem;}
    .preview-highlight{background:var(--accent-dim);border-left:3px solid var(--accent);border-radius:0 var(--r-sm) var(--r-sm) 0;padding:.75rem 1rem;margin-top:.85rem;font-size:.78rem;color:var(--t1);font-weight:500;line-height:1.65;}
    .side-cta{border-radius:var(--r-xl);padding:1.5rem 1.25rem;text-align:center;box-shadow:var(--shadow-md);background:linear-gradient(150deg,${accentHex} 0%,color-mix(in srgb,${accentHex} 70%,#000) 100%);}
    .side-cta-eyebrow{font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:.4rem;}
    .side-cta-headline{font-size:1.35rem;font-weight:900;line-height:1.2;color:#fff;letter-spacing:-.03em;margin-bottom:.35rem;}
    .side-cta-sub{font-size:.7rem;color:rgba(255,255,255,0.65);margin-bottom:1.1rem;line-height:1.5;}
    .side-cta-btn{display:inline-flex;align-items:center;gap:.3rem;background:#fff;color:${accentHex};font-size:.78rem;font-weight:800;padding:.65rem 1.6rem;border-radius:100px;transition:all .15s;}
    .side-cta-btn:hover{transform:scale(1.03);box-shadow:0 4px 20px rgba(0,0,0,.2);}
    .venue-row{display:flex;align-items:center;padding:.5rem 0;justify-content:space-between;}
    .venue-row+.venue-row{border-top:1px solid var(--border-subtle);}
    .venue-key{font-size:.7rem;color:var(--t2);font-weight:500;}
    .venue-val{font-size:.76rem;font-weight:700;color:var(--t0);}
    footer{max-width:1100px;margin:0 auto;padding:1.5rem 1rem;border-top:1px solid var(--border);text-align:center;}
    .footer-brand{font-size:.9rem;font-weight:900;color:var(--t2);margin-bottom:.5rem;}
    .footer-brand span{color:var(--accent);}
    .footer-disc{font-size:.64rem;color:var(--t3);max-width:540px;margin:0 auto;line-height:1.7;}
    .footer-links{display:flex;justify-content:center;gap:1.25rem;margin-top:.75rem;flex-wrap:wrap;}
    .footer-links a{font-size:.67rem;color:var(--t3);transition:color .15s;}
    .footer-links a:hover{color:var(--t1);}
    .mob-bar{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:200;background:var(--bg-card);border-top:1px solid var(--border);box-shadow:0 -4px 20px rgba(0,0,0,.10);padding:.75rem 1rem;align-items:center;gap:.75rem;}
    .mob-bar-info{flex:1;}
    .mob-bar-label{font-size:.63rem;color:var(--t3);font-weight:500;}
    .mob-bar-val{font-size:.88rem;font-weight:800;color:var(--t0);}
    .mob-bar-btn{background:var(--accent);color:#fff;padding:.5rem 1.1rem;border-radius:var(--r-sm);white-space:nowrap;transition:filter .15s;display:flex;flex-direction:column;align-items:center;gap:.05rem;text-align:center;}
    .mob-bar-btn:hover{filter:brightness(1.08);}
    .mob-bar-btn-main{font-size:.82rem;font-weight:800;line-height:1.2;}
    .mob-bar-btn-sub{font-size:.62rem;font-weight:600;opacity:.88;}
    body{padding-bottom:76px;}
    @media(min-width:861px){body{padding-bottom:0;}.mob-bar{display:none;}}
    @media(max-width:860px){.page{grid-template-columns:1fr;}.match-header{grid-column:1;}.sidebar{order:10;}}
    @media(max-width:600px){.page{padding:.6rem .5rem;gap:.75rem;}.mh-body{padding:1.25rem .5rem 1rem;}.mh-flag{font-size:2.75rem;}.mh-name{font-size:.9rem;}.mh-sub{font-size:.62rem;padding:.12rem .4rem;}.mh-center{padding:0 .75rem;}.mh-kick{font-size:1.25rem;}.mh-date{font-size:.65rem;}.mh-venue{display:none;}.sn{flex:0 0 76px;font-size:.62rem;}.sv{width:34px;font-size:.7rem;}.topbar-cta{display:none;}.ml-comp{display:none;}.ml-date{width:52px;}.form-meta{min-width:76px;}.card-body{padding:.85rem;}.card-head{padding:.7rem .85rem;}}
    @media(max-width:380px){.mh-flag{font-size:2.25rem;}.mh-name{font-size:.82rem;}.mh-sub{font-size:.58rem;}.mh-kick{font-size:1.1rem;}.mh-center{padding:0 .4rem;}.tabs .tab{font-size:.65rem;padding:.45rem .5rem;}}
  </style>
</head>
<body>
<div class="topbar">
  <div class="topbar-inner">
    <div class="topbar-left">
      <a href="index.html" class="topbar-back" aria-label="Back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </a>
      <a href="index.html" class="topbar-brand">${logoHtml}</a>
    </div>
    <div class="topbar-right">
      <a href="${aff}" class="topbar-cta" target="_blank" rel="noopener">${t.placeBet}</a>
    </div>
  </div>
</div>
<div class="page">
  <div class="match-header">
    <div class="mh-top">
      <div class="mh-tourney">
        <div class="mh-tourney-badge">\u26bd</div>
        ${m.tournament || 'FIFA World Cup 2026'} &bull; ${m.group}
      </div>
      <div class="mh-status"><span class="mh-dot"></span> ${t.upcoming}</div>
    </div>
    <div class="mh-body">
      <div class="mh-team">
        <div class="mh-flag">${ht.crest ? '<img src="' + ht.crest + '" class="team-crest" onerror="this.style.display=\'none\'">' : ht.flag}</div>
        <div class="mh-name">${ht.name}</div>
        <div class="mh-sub">${ht.fifa ? 'FIFA #' + ht.fifa + (ht.role ? ' &middot; ' + ht.role : '') : (ht.role || m.tournament || '')}</div>
      </div>
      <div class="mh-center">
        <div class="mh-kick">${m.kickoff || "TBC"}</div>
        <div class="mh-date">${m.date || ""}</div>
        <div class="mh-venue">${m.venue || ""}</div>
      </div>
      <div class="mh-team">
        <div class="mh-flag">${at.crest ? '<img src="' + at.crest + '" class="team-crest" onerror="this.style.display=\'none\'">' : at.flag}</div>
        <div class="mh-name">${at.name}</div>
        <div class="mh-sub">${at.fifa ? 'FIFA #' + at.fifa + (at.role ? ' &middot; ' + at.role : '') : (at.role || m.tournament || '')}</div>
      </div>
    </div>
    <div class="mh-foot">
      <div class="odds-strip">
        <div class="odds-btn">
          <span class="odds-btn-label">${t.homeWin}</span>
          <span class="odds-btn-val">${(+m.odds.home).toFixed(2)}</span>
          <span class="odds-btn-team">${ht.name}</span>
        </div>
        <div class="odds-btn">
          <span class="odds-btn-label">${t.draw}</span>
          <span class="odds-btn-val">${(+m.odds.draw).toFixed(2)}</span>
          <span class="odds-btn-team">${t.after90}</span>
        </div>
        <div class="odds-btn">
          <span class="odds-btn-label">${t.awayWin}</span>
          <span class="odds-btn-val">${(+m.odds.away).toFixed(2)}</span>
          <span class="odds-btn-team">${at.name}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="main" style="display:flex;flex-direction:column;gap:1rem;">
    <div class="tabs">
      <div class="tab active">${t.tabPreview}</div>
      <div class="tab">${t.tabStats}</div>
      <div class="tab">${t.tabOdds}</div>
      <div class="tab">${t.tabH2H}</div>
      <div class="tab">${t.tabForm}</div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--blue-dim);">\uD83D\uDCCB</span> ${t.matchPreview}</div>
      </div>
      <div class="card-body">
        ${getLang(m.previewLines).map(function(l) { return '<p class="preview-text">' + l + '</p>'; }).join("\n        ")}
        <div class="preview-highlight">${getLang(m.previewHighlight)}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--green-dim);">\uD83D\uDCCA</span> ${t.winProbability}</div>
        <span class="card-chip">${t.basedOn(brandName)}</span>
      </div>
      <div class="card-body">
        <div class="prob-bar">
          <div class="ps home" style="width:${m.probHome}%;">${m.probHome}%</div>
          <div class="ps draw" style="width:${m.probDraw}%;">${m.probDraw}%</div>
          <div class="ps away" style="width:${m.probAway}%;">${m.probAway}%</div>
        </div>
        <div class="prob-labels">
          <span>${ht.flag} ${ht.name}</span><span>${t.draw}</span><span>${at.name} ${at.flag}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--accent-dim);">\u2694\uFE0F</span> ${t.teamComparison}</div>
        <div style="display:flex;gap:1rem;font-size:.65rem;font-weight:700;">
          <span style="color:var(--blue);">&bull; ${ht.code}</span>
          <span style="color:var(--accent);">&bull; ${at.code}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="stat-row">
          <span class="sv${leadH}">${ht.fifa}</span>
          <div class="sh"><div class="sh-fill" style="width:${fifaH}%;"></div></div>
          <span class="sn">${t.fifaRanking}</span>
          <div class="sa"><div class="sa-fill" style="width:${fifaA}%;"></div></div>
          <span class="sv${leadA}">${at.fifa}</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.elo >= at.elo ? " lead" : ""}">${ht.elo}</span>
          <div class="sh"><div class="sh-fill" style="width:${eloH}%;"></div></div>
          <span class="sn">${t.eloRating}</span>
          <div class="sa"><div class="sa-fill" style="width:${eloA}%;"></div></div>
          <span class="sv${at.elo > ht.elo ? " lead" : ""}">${at.elo}</span>
        </div>
        <div class="stat-row">
          <span class="sv">${ht.squadValue}</span>
          <div class="sh"><div class="sh-fill" style="width:${sqH}%;"></div></div>
          <span class="sn">${t.squadValue}</span>
          <div class="sa"><div class="sa-fill" style="width:${sqA}%;"></div></div>
          <span class="sv">${at.squadValue}</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.goalsPerGame >= at.goalsPerGame ? " lead" : ""}">${ht.goalsPerGame}</span>
          <div class="sh"><div class="sh-fill" style="width:${gpH}%;"></div></div>
          <span class="sn">${t.goalsPerMatch}</span>
          <div class="sa"><div class="sa-fill" style="width:${gpA}%;"></div></div>
          <span class="sv${at.goalsPerGame > ht.goalsPerGame ? " lead" : ""}">${at.goalsPerGame}</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.concededPerGame <= at.concededPerGame ? " lead" : ""}">${ht.concededPerGame}</span>
          <div class="sh"><div class="sh-fill" style="width:${cpH}%;"></div></div>
          <span class="sn">${t.concededPerMatch}</span>
          <div class="sa"><div class="sa-fill" style="width:${cpA}%;"></div></div>
          <span class="sv${at.concededPerGame < ht.concededPerGame ? " lead" : ""}">${at.concededPerGame}</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.possession >= at.possession ? " lead" : ""}">${ht.possession}%</span>
          <div class="sh"><div class="sh-fill" style="width:${posH}%;"></div></div>
          <span class="sn">${t.possession}</span>
          <div class="sa"><div class="sa-fill" style="width:${posA}%;"></div></div>
          <span class="sv${at.possession > ht.possession ? " lead" : ""}">${at.possession}%</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.cleanSheets >= at.cleanSheets ? " lead" : ""}">${ht.cleanSheets}</span>
          <div class="sh"><div class="sh-fill" style="width:${csH}%;"></div></div>
          <span class="sn">${t.cleanSheets}</span>
          <div class="sa"><div class="sa-fill" style="width:${csA}%;"></div></div>
          <span class="sv${at.cleanSheets > ht.cleanSheets ? " lead" : ""}">${at.cleanSheets}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--green-dim);">\uD83D\uDCC8</span> ${t.recentForm}</div>
        <span class="card-chip">${t.last5}</span>
      </div>
      <div class="card-body">
        <div class="form-section">
          <div class="form-row">
            <div class="form-meta">
              <span class="form-flag">${ht.flag}</span>
              <span class="form-label">${ht.name}</span>
            </div>
            <div class="form-badges">
              ${formBadges(ht)}
            </div>
            <span class="form-record">${ht.formRecord}</span>
          </div>
          <div class="form-row">
            <div class="form-meta">
              <span class="form-flag">${at.flag}</span>
              <span class="form-label">${at.name}</span>
            </div>
            <div class="form-badges">
              ${formBadges(at)}
            </div>
            <span class="form-record">${at.formRecord}</span>
          </div>
        </div>
      </div>
    </div>
    ${h2hCard()}
    ${mktsCard()}
  </div>
  <div class="sidebar" style="display:flex;flex-direction:column;gap:1rem;">
    <div class="side-cta">
      <div class="side-cta-eyebrow">${t.welcomeOffer}</div>
      <div class="side-cta-headline">${g(brand.bonusHeadline)}</div>
      <div class="side-cta-sub">${g(brand.bonusSub)}</div>
      <a href="${aff}" class="side-cta-btn" target="_blank" rel="noopener">${g(brand.claimBonus)}</a>
    </div>
    ${playersCard()}
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--green-dim);">\uD83C\uDFDF\uFE0F</span> ${t.venueInfo}</div>
      </div>
      <div class="card-body">
        <div style="font-size:.85rem;font-weight:800;color:var(--t0);margin-bottom:.15rem;">${(m.venue || "TBC").split(",")[0]}</div>
        <div style="font-size:.72rem;color:var(--t2);margin-bottom:.65rem;">${(m.venue || "").split(",").slice(1).join(",").trim()}</div>
        ${m.venueCapacity ? '<div class="venue-row"><span class="venue-key">' + t.capacity + '</span><span class="venue-val">' + m.venueCapacity + '</span></div>' : ""}
        ${m.venueSurface ? '<div class="venue-row"><span class="venue-key">' + t.surface + '</span><span class="venue-val">' + m.venueSurface + '</span></div>' : ""}
        ${m.kickoffLocal ? '<div class="venue-row"><span class="venue-key">' + t.kickoffLocal + '</span><span class="venue-val">' + m.kickoffLocal + '</span></div>' : ""}
        ${m.kickoffCET ? '<div class="venue-row"><span class="venue-key">' + t.kickoffCET + '</span><span class="venue-val">' + m.kickoffCET + '</span></div>' : ""}
      </div>
    </div>
    ${quickBetCard()}
  </div>
</div>
<footer>
  <div class="footer-brand">${logoHtml}</div>
  <p class="footer-disc">${g(brand.disclaimer)}</p>
  <div class="footer-links">
    <a href="#">${t.terms}</a>
    <a href="#">${t.privacy}</a>
    <a href="#">${t.responsible}</a>
    <a href="index.html">${t.allMatches}</a>
  </div>
</footer>
<div class="mob-bar">
  <div class="mob-bar-info">
    <div class="mob-bar-label">${g(brand.mobBarLabel)}</div>
    <div class="mob-bar-val">${g(brand.mobBarVal)}</div>
  </div>
  <a href="${aff}" class="mob-bar-btn" target="_blank" rel="noopener">
    <span class="mob-bar-btn-main">${g(brand.mobBarBtnMain)}</span>
    <span class="mob-bar-btn-sub">${g(brand.mobBarBtnSub)}</span>
  </a>
</div>
</body>
</html>`;
}

if (typeof module !== "undefined") module.exports = { generateMatchHTML, I18N };
else { window.generateMatchHTML = generateMatchHTML; window.I18N = I18N; }
