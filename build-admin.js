#!/usr/bin/env node
// Builds a self-contained admin.html by inlining matches-data.js and match-template.js
const fs = require("fs");
const path = require("path");

const data     = fs.readFileSync(path.join(__dirname, "matches-data.js"), "utf8")
                   .replace(/\/\/ Export.*\n.*module\.exports.*\n.*window\.MATCHES.*\n?/, "");
const template = fs.readFileSync(path.join(__dirname, "match-template.js"), "utf8")
                   .replace(/\/\/ Generates.*\n/, "")
                   .replace(/\nif \(typeof module.*\}.*\n?$/, "")
                   .replace(/else window\.generateMatchHTML.*\n?$/, "");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Match Generator — Youwin Admin</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0F1117; --bg-card: #1A1D26; --bg-hover: #22263A;
      --accent: #E41E3F; --accent-dim: rgba(228,30,63,0.12);
      --green: #22C55E; --green-dim: rgba(34,197,94,0.12);
      --blue: #3B82F6; --blue-dim: rgba(59,130,246,0.12);
      --yellow: #F59E0B;
      --border: rgba(255,255,255,0.08);
      --t0: #F9FAFB; --t1: #D1D5DB; --t2: #9CA3AF; --t3: #6B7280;
    }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--t1); min-height: 100vh; -webkit-font-smoothing: antialiased; }
    .topbar { height: 56px; border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 2rem; background: rgba(15,17,23,0.9); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 50; }
    .topbar-inner { max-width: 960px; width: 100%; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
    .brand { font-size: 1rem; font-weight: 900; color: var(--t0); letter-spacing: -.03em; }
    .brand span { color: var(--accent); }
    .badge { font-size: .6rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; background: var(--accent-dim); color: var(--accent); padding: .22rem .65rem; border-radius: 100px; border: 1px solid rgba(228,30,63,0.25); }
    .wrap { max-width: 960px; margin: 0 auto; padding: 2rem 1.5rem; }
    .page-header { margin-bottom: 2rem; }
    .page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--t0); letter-spacing: -.03em; margin-bottom: .3rem; }
    .page-header p { font-size: .82rem; color: var(--t2); }
    .gen-all-bar { display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; gap: 1rem; flex-wrap: wrap; }
    .gen-all-info { flex: 1; min-width: 120px; }
    .gen-all-label { font-size: .7rem; font-weight: 600; color: var(--t2); text-transform: uppercase; letter-spacing: .07em; margin-bottom: .2rem; }
    .gen-all-value { font-size: .88rem; font-weight: 700; color: var(--t0); }
    .btn { display: inline-flex; align-items: center; gap: .4rem; font-size: .78rem; font-weight: 700; border: none; cursor: pointer; padding: .55rem 1.2rem; border-radius: 8px; transition: all .15s; white-space: nowrap; font-family: inherit; }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .btn-primary:disabled { opacity: .45; cursor: not-allowed; transform: none; filter: none; }
    .btn-secondary { background: var(--bg-hover); color: var(--t0); border: 1px solid var(--border); }
    .btn-secondary:hover { background: #2A2F45; }
    .btn-sm { padding: .4rem .9rem; font-size: .72rem; }
    .match-grid { display: flex; flex-direction: column; gap: .6rem; }
    .match-row { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; display: flex; align-items: center; padding: .9rem 1.1rem; gap: 1rem; transition: border-color .15s, background .15s; flex-wrap: wrap; }
    .match-row:hover { border-color: rgba(255,255,255,0.15); background: var(--bg-hover); }
    .match-row.generated { border-color: rgba(34,197,94,0.3); }
    .match-check { width: 18px; height: 18px; flex-shrink: 0; accent-color: var(--accent); cursor: pointer; }
    .match-teams { flex: 1; min-width: 160px; display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; }
    .match-flag { font-size: 1.4rem; flex-shrink: 0; }
    .match-name { font-size: .88rem; font-weight: 700; color: var(--t0); }
    .match-vs { font-size: .7rem; color: var(--t3); font-weight: 600; padding: 0 .2rem; }
    .match-meta { display: flex; flex-direction: column; align-items: flex-end; gap: .2rem; flex-shrink: 0; }
    .match-group { font-size: .62rem; font-weight: 700; color: var(--blue); background: var(--blue-dim); padding: .15rem .5rem; border-radius: 100px; }
    .match-date { font-size: .65rem; color: var(--t2); white-space: nowrap; }
    .status-pill { font-size: .6rem; font-weight: 700; padding: .18rem .55rem; border-radius: 100px; flex-shrink: 0; white-space: nowrap; }
    .status-pill.ready { background: var(--green-dim); color: var(--green); }
    .status-pill.pending { background: rgba(255,255,255,0.06); color: var(--t3); }
    .match-actions { display: flex; gap: .4rem; flex-shrink: 0; }
    .log-section { margin-top: 1.5rem; }
    .log-title { font-size: .7rem; font-weight: 700; color: var(--t2); text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
    .log { background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: .75rem 1rem; min-height: 80px; max-height: 220px; overflow-y: auto; font-family: 'SFMono-Regular', 'Consolas', monospace; font-size: .72rem; line-height: 1.7; color: var(--t2); }
    .log::-webkit-scrollbar { width: 4px; }
    .log::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    .log-line { display: block; }
    .log-line.ok { color: var(--green); }
    .log-line.info { color: var(--blue); }
    .log-line.warn { color: var(--yellow); }
    .progress-wrap { margin-top: .75rem; display: none; }
    .progress-wrap.visible { display: block; }
    .progress-bar-outer { height: 4px; background: rgba(255,255,255,0.08); border-radius: 100px; overflow: hidden; }
    .progress-bar-inner { height: 100%; background: var(--accent); border-radius: 100px; transition: width .3s ease; width: 0%; }
    .progress-label { font-size: .64rem; color: var(--t2); margin-top: .35rem; }
    @media (max-width: 600px) { .wrap { padding: 1rem .75rem; } .gen-all-bar { flex-direction: column; align-items: flex-start; } }
  </style>
</head>
<body>
<div class="topbar">
  <div class="topbar-inner">
    <div class="brand">YOU<span>WIN</span></div>
    <div class="badge">Admin · Match Generator</div>
  </div>
</div>
<div class="wrap">
  <div class="page-header">
    <h1>Match Page Generator</h1>
    <p>Generate and download individual match pages, or all at once. Single file — works offline, no server needed.</p>
  </div>
  <div class="gen-all-bar">
    <div class="gen-all-info">
      <div class="gen-all-label">Bulk Action</div>
      <div class="gen-all-value" id="selCount">0 matches selected</div>
    </div>
    <button class="btn btn-secondary btn-sm" onclick="toggleAll()">Select All</button>
    <button class="btn btn-primary" id="genBtn" onclick="generateSelected()" disabled>Generate Selected</button>
    <button class="btn btn-secondary btn-sm" onclick="generateAll()">Generate All</button>
  </div>
  <div class="match-grid" id="matchGrid"></div>
  <div class="progress-wrap" id="progressWrap">
    <div class="progress-bar-outer"><div class="progress-bar-inner" id="progressBar"></div></div>
    <div class="progress-label" id="progressLabel"></div>
  </div>
  <div class="log-section">
    <div class="log-title">Output Log</div>
    <div class="log" id="log"><span class="log-line">Ready. Select matches and click Generate.</span></div>
  </div>
</div>
<script>
// ── MATCH DATA ──────────────────────────────
${data}
// ── TEMPLATE ────────────────────────────────
${template}
// ── ADMIN LOGIC ─────────────────────────────
const generated = new Set();

function log(msg, type) {
  const el = document.getElementById("log");
  const line = document.createElement("span");
  line.className = "log-line" + (type ? " " + type : "");
  line.textContent = msg;
  el.appendChild(document.createTextNode("\\n"));
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

function buildGrid() {
  const grid = document.getElementById("matchGrid");
  MATCHES.forEach(m => {
    const row = document.createElement("div");
    row.className = "match-row";
    row.id = "row-" + m.id;
    row.innerHTML =
      '<input type="checkbox" class="match-check" id="chk-' + m.id + '" onchange="onCheck()">' +
      '<div class="match-teams">' +
        '<span class="match-flag">' + m.homeTeam.flag + '</span>' +
        '<span class="match-name">' + m.homeTeam.name + '</span>' +
        '<span class="match-vs">vs</span>' +
        '<span class="match-name">' + m.awayTeam.name + '</span>' +
        '<span class="match-flag">' + m.awayTeam.flag + '</span>' +
      '</div>' +
      '<div class="match-meta">' +
        '<span class="match-group">' + m.group + '</span>' +
        '<span class="match-date">' + m.date + '</span>' +
      '</div>' +
      '<span class="status-pill pending" id="pill-' + m.id + '">Not generated</span>' +
      '<div class="match-actions">' +
        '<button class="btn btn-secondary btn-sm" onclick="previewMatch(\\'' + m.id + '\\')">Preview</button>' +
        '<button class="btn btn-primary btn-sm" onclick="downloadMatch(\\'' + m.id + '\\')">Download</button>' +
      '</div>';
    grid.appendChild(row);
  });
}

function onCheck() {
  const n = document.querySelectorAll(".match-check:checked").length;
  document.getElementById("selCount").textContent =
    n === 0 ? "0 matches selected" : n === 1 ? "1 match selected" : n + " matches selected";
  document.getElementById("genBtn").disabled = n === 0;
}

let _allSelected = false;
function toggleAll() {
  _allSelected = !_allSelected;
  document.querySelectorAll(".match-check").forEach(c => c.checked = _allSelected);
  onCheck();
}

function getHTML(id) {
  const m = MATCHES.find(x => x.id === id);
  if (!m) throw new Error("Match not found: " + id);
  return generateMatchHTML(m);
}

function downloadMatch(id) {
  try {
    const blob = new Blob([getHTML(id)], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "match-" + id + ".html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    markGenerated(id);
    log("Downloaded: match-" + id + ".html", "ok");
  } catch(e) { log("Error: " + e.message, "warn"); }
}

function previewMatch(id) {
  try {
    const blob = new Blob([getHTML(id)], { type: "text/html" });
    window.open(URL.createObjectURL(blob), "_blank");
    log("Previewing: " + id, "info");
  } catch(e) { log("Error: " + e.message, "warn"); }
}

function markGenerated(id) {
  generated.add(id);
  const pill = document.getElementById("pill-" + id);
  if (pill) { pill.className = "status-pill ready"; pill.textContent = "Generated"; }
  const row = document.getElementById("row-" + id);
  if (row) row.classList.add("generated");
}

async function generateSelected() {
  const ids = [...document.querySelectorAll(".match-check:checked")].map(c => c.id.replace("chk-", ""));
  await runBatch(ids);
}

async function generateAll() {
  await runBatch(MATCHES.map(m => m.id));
}

async function runBatch(ids) {
  if (!ids.length) return;
  const wrap = document.getElementById("progressWrap");
  const bar  = document.getElementById("progressBar");
  const lbl  = document.getElementById("progressLabel");
  wrap.classList.add("visible");
  log("Starting batch: " + ids.length + " match(es)...", "info");
  for (let i = 0; i < ids.length; i++) {
    bar.style.width = Math.round((i / ids.length) * 100) + "%";
    lbl.textContent = "Generating " + (i + 1) + " / " + ids.length + ": " + ids[i];
    await new Promise(r => setTimeout(r, 50));
    downloadMatch(ids[i]);
  }
  bar.style.width = "100%";
  lbl.textContent = "Done — " + ids.length + " file(s) downloaded.";
  log("Batch complete: " + ids.length + " file(s).", "ok");
  setTimeout(() => { wrap.classList.remove("visible"); bar.style.width = "0%"; }, 3500);
}

buildGrid();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "admin.html"), html, "utf8");
console.log("Built admin.html (" + html.length + " bytes)");
