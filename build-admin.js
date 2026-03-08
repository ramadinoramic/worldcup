#!/usr/bin/env node
// Builds a self-contained admin.html by inlining brands.js, matches-data.js, match-template.js
const fs = require("fs");
const path = require("path");

function inline(file, stripPatterns) {
  let src = fs.readFileSync(path.join(__dirname, file), "utf8");
  for (const p of stripPatterns) src = src.replace(p, "");
  return src.trim();
}

const brands   = inline("brands.js",        [/if \(typeof module.*\n.*else window\.BRANDS.*\n?/s]);
const data     = inline("matches-data.js",  [/\/\/ Export[\s\S]*$/]);
const template = inline("match-template.js",[/if \(typeof module.*\n.*else.*\n?/s]);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Match Generator \u2014 Admin</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0F1117; --bg-card: #1A1D26; --bg-hover: #22263A; --bg-input: #2A2F45;
      --accent: #E41E3F; --accent-dim: rgba(228,30,63,0.12);
      --green: #22C55E; --green-dim: rgba(34,197,94,0.12);
      --blue: #3B82F6; --blue-dim: rgba(59,130,246,0.12);
      --yellow: #F59E0B; --yellow-dim: rgba(245,158,11,0.12);
      --border: rgba(255,255,255,0.08);
      --t0: #F9FAFB; --t1: #D1D5DB; --t2: #9CA3AF; --t3: #6B7280;
      --r: 10px;
    }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--t1); min-height: 100vh; -webkit-font-smoothing: antialiased; }

    /* ── TOP BAR ── */
    .topbar { height: 60px; border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 1.5rem; background: rgba(15,17,23,0.95); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 100; gap: 1rem; }
    .topbar-brand { font-size: .95rem; font-weight: 900; color: var(--t0); letter-spacing: -.03em; white-space: nowrap; }
    .topbar-brand span { color: var(--accent); }
    .topbar-badge { font-size: .58rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; background: var(--accent-dim); color: var(--accent); padding: .2rem .6rem; border-radius: 100px; border: 1px solid rgba(228,30,63,0.2); white-space: nowrap; }
    .topbar-spacer { flex: 1; }

    /* controls in topbar */
    .ctrl-group { display: flex; flex-direction: column; gap: 2px; }
    .ctrl-label { font-size: .55rem; font-weight: 700; text-transform: uppercase; letter-spacing: .09em; color: var(--t3); }
    .brand-select { background: var(--bg-input); border: 1px solid var(--border); border-radius: 7px; color: var(--t0); font-size: .78rem; font-weight: 600; padding: .35rem .65rem; font-family: inherit; cursor: pointer; outline: none; transition: border-color .15s; }
    .brand-select:hover, .brand-select:focus { border-color: rgba(255,255,255,0.2); }
    .brand-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 4px; }
    .lang-tabs { display: flex; background: var(--bg-input); border-radius: 7px; padding: 3px; gap: 2px; }
    .lang-tab { font-size: .68rem; font-weight: 700; padding: .28rem .65rem; border-radius: 5px; border: none; background: none; color: var(--t2); cursor: pointer; font-family: inherit; transition: all .15s; }
    .lang-tab.active { background: var(--accent); color: #fff; }
    .lang-tab:hover:not(.active) { color: var(--t0); background: rgba(255,255,255,0.06); }
    .topbar-divider { width: 1px; height: 32px; background: var(--border); flex-shrink: 0; }

    /* ── LAYOUT ── */
    .wrap { max-width: 980px; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }

    /* ── FILTER BAR ── */
    .filter-bar { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
    .filter-label { font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--t3); flex-shrink: 0; }
    .gf-pills { display: flex; gap: .3rem; flex-wrap: wrap; flex: 1; }
    .gf-pill { font-size: .65rem; font-weight: 700; padding: .28rem .7rem; border-radius: 100px; border: 1px solid var(--border); background: none; color: var(--t2); cursor: pointer; font-family: inherit; transition: all .15s; white-space: nowrap; }
    .gf-pill.active { background: var(--blue); border-color: var(--blue); color: #fff; }
    .gf-pill:hover:not(.active) { border-color: rgba(255,255,255,0.18); color: var(--t0); }

    /* ── BULK BAR ── */
    .bulk-bar { display: flex; align-items: center; gap: .75rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r); padding: .75rem 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .bulk-bar-info { flex: 1; min-width: 80px; }
    .bulk-count { font-size: .82rem; font-weight: 700; color: var(--t0); }
    .bulk-sub { font-size: .65rem; color: var(--t3); margin-top: 1px; }
    .btn { display: inline-flex; align-items: center; gap: .35rem; font-size: .75rem; font-weight: 700; border: none; cursor: pointer; padding: .5rem 1.1rem; border-radius: 7px; transition: all .15s; white-space: nowrap; font-family: inherit; }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
    .btn-primary:disabled { opacity: .4; cursor: not-allowed; }
    .btn-ghost { background: var(--bg-hover); color: var(--t0); border: 1px solid var(--border); }
    .btn-ghost:hover { background: #2A2F45; }
    .btn-sm { padding: .38rem .9rem; font-size: .7rem; }

    /* ── CALENDAR ── */
    .date-section { margin-bottom: 1.5rem; }
    .date-header { display: flex; align-items: center; gap: .75rem; margin-bottom: .6rem; }
    .date-header-line { flex: 1; height: 1px; background: var(--border); }
    .date-header-text { font-size: .68rem; font-weight: 700; color: var(--t2); text-transform: uppercase; letter-spacing: .08em; white-space: nowrap; }
    .match-list { display: flex; flex-direction: column; gap: .4rem; }

    /* ── MATCH ROW ── */
    .match-row { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r); display: flex; align-items: center; padding: .7rem 1rem; gap: .75rem; transition: border-color .15s, background .15s; }
    .match-row:hover { border-color: rgba(255,255,255,0.14); background: var(--bg-hover); }
    .match-row.hidden { display: none; }
    .match-row.generated { border-color: rgba(34,197,94,0.25); }
    .match-check { width: 16px; height: 16px; flex-shrink: 0; accent-color: var(--accent); cursor: pointer; }
    .match-teams { flex: 1; min-width: 0; display: flex; align-items: center; gap: .4rem; flex-wrap: wrap; }
    .match-flag { font-size: 1.25rem; line-height: 1; flex-shrink: 0; }
    .match-name { font-size: .82rem; font-weight: 700; color: var(--t0); white-space: nowrap; }
    .match-vs { font-size: .62rem; color: var(--t3); font-weight: 600; padding: 0 .15rem; flex-shrink: 0; }
    .match-badges { display: flex; align-items: center; gap: .35rem; flex-shrink: 0; }
    .match-group { font-size: .6rem; font-weight: 700; color: var(--blue); background: var(--blue-dim); padding: .14rem .48rem; border-radius: 100px; white-space: nowrap; }
    .match-time { font-size: .62rem; font-weight: 600; color: var(--t2); white-space: nowrap; }
    .match-venue { font-size: .6rem; color: var(--t3); white-space: nowrap; max-width: 160px; overflow: hidden; text-overflow: ellipsis; }
    .status-pill { font-size: .58rem; font-weight: 700; padding: .16rem .52rem; border-radius: 100px; flex-shrink: 0; white-space: nowrap; }
    .status-pill.ready { background: var(--green-dim); color: var(--green); }
    .status-pill.pending { background: rgba(255,255,255,0.05); color: var(--t3); }
    .match-actions { display: flex; gap: .35rem; flex-shrink: 0; }

    /* ── PROGRESS ── */
    .progress-wrap { margin-top: 1rem; display: none; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r); padding: .75rem 1rem; }
    .progress-wrap.visible { display: block; }
    .progress-bar-outer { height: 4px; background: rgba(255,255,255,0.07); border-radius: 100px; overflow: hidden; margin-bottom: .4rem; }
    .progress-bar-inner { height: 100%; background: var(--accent); border-radius: 100px; transition: width .3s ease; width: 0%; }
    .progress-label { font-size: .64rem; color: var(--t2); }

    /* ── LOG ── */
    .log-section { margin-top: 1.25rem; }
    .log-title { font-size: .62rem; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: .08em; margin-bottom: .4rem; }
    .log { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r); padding: .7rem 1rem; min-height: 64px; max-height: 180px; overflow-y: auto; font-family: 'SFMono-Regular', 'Consolas', monospace; font-size: .7rem; line-height: 1.75; color: var(--t2); }
    .log::-webkit-scrollbar { width: 4px; }
    .log::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    .log-line { display: block; }
    .log-line.ok { color: var(--green); }
    .log-line.info { color: var(--blue); }
    .log-line.warn { color: var(--yellow); }

    /* ── LIVE LOAD BAR ── */
    .live-bar { display: flex; align-items: flex-end; gap: .75rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r); padding: .75rem 1rem; margin-top: 1rem; flex-wrap: wrap; }
    .api-input { background: var(--bg-input); border: 1px solid var(--border); border-radius: 7px; color: var(--t0); font-size: .75rem; padding: .38rem .75rem; font-family: inherit; outline: none; width: 260px; transition: border-color .15s; }
    .api-input:focus { border-color: rgba(255,255,255,0.25); }
    .live-status { font-size: .7rem; color: var(--t2); align-self: center; flex: 1; min-width: 120px; }
    .live-status.ok { color: var(--green); }
    .live-status.err { color: var(--accent); }

    /* ── RESPONSIVE ── */
    @media (max-width: 700px) {
      .topbar { flex-wrap: wrap; height: auto; padding: .6rem 1rem; gap: .5rem; }
      .match-venue { display: none; }
      .wrap { padding: 1rem .75rem 2rem; }
    }
    @media (max-width: 500px) {
      .match-time { display: none; }
      .topbar-divider { display: none; }
    }
  </style>
</head>
<body>

<div class="topbar">
  <div class="topbar-brand">MATCH <span>GEN</span></div>
  <div class="topbar-badge">Admin</div>
  <div class="topbar-spacer"></div>

  <div class="ctrl-group">
    <div class="ctrl-label">Brand</div>
    <select class="brand-select" id="brandSel" onchange="onBrandChange()"></select>
  </div>

  <div class="topbar-divider"></div>

  <div class="ctrl-group">
    <div class="ctrl-label">Language</div>
    <div class="lang-tabs" id="langTabs">
      <button class="lang-tab active" onclick="setLang('en')">EN</button>
      <button class="lang-tab" onclick="setLang('de')">DE</button>
      <button class="lang-tab" onclick="setLang('tr')">TR</button>
    </div>
  </div>
</div>

<div class="wrap">

  <div class="filter-bar">
    <span class="filter-label">Group</span>
    <div class="gf-pills" id="groupPills"></div>
  </div>

  <div class="bulk-bar">
    <div class="bulk-bar-info">
      <div class="bulk-count" id="selCount">0 selected</div>
      <div class="bulk-sub" id="selSub">Check matches below to select</div>
    </div>
    <button class="btn btn-ghost btn-sm" onclick="toggleAll()">Select All</button>
    <button class="btn btn-ghost btn-sm" onclick="generateAll()">Generate All</button>
    <button class="btn btn-primary" id="genBtn" onclick="generateSelected()" disabled>Generate Selected</button>
  </div>

  <div id="calendar"></div>

  <div class="progress-wrap" id="progressWrap">
    <div class="progress-bar-outer"><div class="progress-bar-inner" id="progressBar"></div></div>
    <div class="progress-label" id="progressLabel"></div>
  </div>

  <div class="log-section">
    <div class="log-title">Output Log</div>
    <div class="log" id="log"><span class="log-line">Ready. Select brand, language and matches, then click Generate.</span></div>
  </div>

  <div class="live-bar">
    <div class="ctrl-group">
      <div class="ctrl-label">The Odds API Key &mdash; <a href="https://the-odds-api.com" target="_blank" rel="noopener" style="color:var(--blue);font-size:.55rem;">get free key</a></div>
      <input type="text" class="api-input" id="apiKey" placeholder="dd35ae5d..." oninput="saveApiKey()" style="width:260px;">
    </div>
    <button class="btn btn-primary" onclick="loadAllSoccer()">&#9889; Load All Soccer Matches</button>
    <span class="live-status" id="liveStatus"></span>
  </div>
</div>

<script>
// ── BRANDS ───────────────────────────────────────────────────────────────────
${brands}

// ── MATCH DATA ───────────────────────────────────────────────────────────────
${data}

// ── TEMPLATE (I18N + generateMatchHTML) ──────────────────────────────────────
${template}

// ── ADMIN STATE ──────────────────────────────────────────────────────────────
let selectedBrand = BRANDS[0];
let selectedLang  = 'en';
let selectedGroup = 'all';
let allSelected   = false;
const generated   = new Set();

// ── DATE HELPERS ─────────────────────────────────────────────────────────────
const MONTHS = {January:1,February:2,March:3,April:4,May:5,June:6,July:7,August:8,September:9,October:10,November:11,December:12};

function parseDateKey(str) {
  const m = str.match(/(\\d+)\\s+(\\w+)\\s+(\\d+)/);
  if (!m) return 0;
  return parseInt(m[3]) * 10000 + (MONTHS[m[2]] || 0) * 100 + parseInt(m[1]);
}

function shortDate(str) {
  // "Thursday, 11 June 2026" → "Thu 11 Jun"
  const m = str.match(/(\\w+),\\s*(\\d+)\\s+(\\w+)\\s+(\\d+)/);
  if (!m) return str;
  return m[1].slice(0,3) + ' ' + m[2] + ' ' + m[3].slice(0,3) + ' ' + m[4];
}

// ── BUILD BRAND DROPDOWN ──────────────────────────────────────────────────────
function buildBrandSelect() {
  const sel = document.getElementById('brandSel');
  BRANDS.forEach((b, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = b.name;
    sel.appendChild(opt);
  });
}

function onBrandChange() {
  const i = parseInt(document.getElementById('brandSel').value);
  selectedBrand = BRANDS[i] || BRANDS[0];
  log('Brand: ' + selectedBrand.name, 'info');
}

// ── LANGUAGE SWITCH ───────────────────────────────────────────────────────────
function setLang(lang) {
  selectedLang = lang;
  document.querySelectorAll('.lang-tab').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
  });
  log('Language: ' + lang.toUpperCase(), 'info');
}

// ── GROUP FILTER ──────────────────────────────────────────────────────────────
function buildGroupPills() {
  const groups = ['all', ...new Set(MATCHES.map(m => m.group).sort())];
  const container = document.getElementById('groupPills');
  groups.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'gf-pill' + (g === 'all' ? ' active' : '');
    btn.dataset.group = g;
    btn.textContent = g === 'all' ? 'All' : g;
    btn.onclick = () => filterGroup(g);
    container.appendChild(btn);
  });
}

function filterGroup(group) {
  selectedGroup = group;
  document.querySelectorAll('.gf-pill').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === (group === 'all' ? 'All' : group));
  });
  document.querySelectorAll('.match-row').forEach(row => {
    const rg = row.dataset.group;
    row.classList.toggle('hidden', group !== 'all' && rg !== group);
  });
  // uncheck hidden rows
  document.querySelectorAll('.match-row.hidden .match-check').forEach(c => { c.checked = false; });
  onCheck();
}

// ── CALENDAR BUILD ────────────────────────────────────────────────────────────
function buildCalendar() {
  const sorted = [...MATCHES].sort((a, b) => parseDateKey(a.date) - parseDateKey(b.date));
  const byDate = {};
  const dateOrder = [];
  sorted.forEach(m => {
    if (!byDate[m.date]) { byDate[m.date] = []; dateOrder.push(m.date); }
    byDate[m.date].push(m);
  });

  const cal = document.getElementById('calendar');
  dateOrder.forEach(date => {
    const section = document.createElement('div');
    section.className = 'date-section';

    section.innerHTML =
      '<div class="date-header">' +
        '<div class="date-header-line"></div>' +
        '<div class="date-header-text">' + date + '</div>' +
        '<div class="date-header-line"></div>' +
      '</div>' +
      '<div class="match-list" id="list-' + date.replace(/[^a-z0-9]/gi,'_') + '"></div>';

    cal.appendChild(section);

    const list = section.querySelector('.match-list');
    byDate[date].forEach(m => {
      list.appendChild(buildMatchRow(m));
    });
  });
}

function buildMatchRow(m) {
  const row = document.createElement('div');
  row.className = 'match-row';
  row.id = 'row-' + m.id;
  row.dataset.group = m.group;

  row.innerHTML =
    '<input type="checkbox" class="match-check" id="chk-' + m.id + '" onchange="onCheck()">' +
    '<div class="match-teams">' +
      '<span class="match-flag">' + m.homeTeam.flag + '</span>' +
      '<span class="match-name">' + m.homeTeam.name + '</span>' +
      '<span class="match-vs">vs</span>' +
      '<span class="match-name">' + m.awayTeam.name + '</span>' +
      '<span class="match-flag">' + m.awayTeam.flag + '</span>' +
    '</div>' +
    '<div class="match-badges">' +
      '<span class="match-group">' + m.group + '</span>' +
      '<span class="match-time">' + m.kickoff + '</span>' +
      '<span class="match-venue">' + m.venue.split(',')[0] + '</span>' +
    '</div>' +
    '<span class="status-pill pending" id="pill-' + m.id + '">Not generated</span>' +
    '<div class="match-actions">' +
      '<button class="btn btn-ghost btn-sm" onclick="previewMatch(\\'' + m.id + '\\')">Preview</button>' +
      '<button class="btn btn-primary btn-sm" onclick="downloadMatch(\\'' + m.id + '\\')">Download</button>' +
    '</div>';

  return row;
}

// ── CHECK / SELECT ────────────────────────────────────────────────────────────
function onCheck() {
  const checked = [...document.querySelectorAll('.match-check:checked')];
  const n = checked.length;
  document.getElementById('selCount').textContent = n === 0 ? '0 selected' : n === 1 ? '1 match selected' : n + ' matches selected';
  const brandName = selectedBrand.name + ' / ' + selectedLang.toUpperCase();
  document.getElementById('selSub').textContent = n > 0 ? 'Will generate for: ' + brandName : 'Check matches below to select';
  document.getElementById('genBtn').disabled = n === 0;
}

function toggleAll() {
  allSelected = !allSelected;
  document.querySelectorAll('.match-row:not(.hidden) .match-check').forEach(c => { c.checked = allSelected; });
  onCheck();
}

// ── GENERATE ──────────────────────────────────────────────────────────────────
function getHTML(id) {
  const m = MATCHES.find(x => x.id === id) || LIVE_MATCHES.find(x => x.id === id);
  if (!m) throw new Error('Match not found: ' + id);
  return generateMatchHTML(m, selectedBrand, selectedLang);
}

function downloadMatch(id) {
  try {
    const blob = new Blob([getHTML(id)], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'match-' + id + '-' + selectedBrand.id + '-' + selectedLang + '.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    markGenerated(id);
    log('Downloaded: match-' + id + '-' + selectedBrand.id + '-' + selectedLang + '.html', 'ok');
  } catch(e) { log('Error: ' + e.message, 'warn'); }
}

function previewMatch(id) {
  try {
    const blob = new Blob([getHTML(id)], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
    log('Previewing: ' + id + ' [' + selectedBrand.name + ' / ' + selectedLang.toUpperCase() + ']', 'info');
  } catch(e) { log('Error: ' + e.message, 'warn'); }
}

function markGenerated(id) {
  generated.add(id);
  const pill = document.getElementById('pill-' + id);
  if (pill) { pill.className = 'status-pill ready'; pill.textContent = 'Generated'; }
  const row = document.getElementById('row-' + id);
  if (row) row.classList.add('generated');
}

async function generateSelected() {
  const ids = [...document.querySelectorAll('.match-check:checked')].map(c => c.id.replace('chk-', ''));
  await runBatch(ids);
}

async function generateAll() {
  const ids = [...MATCHES, ...LIVE_MATCHES].map(m => m.id);
  await runBatch(ids);
}

async function runBatch(ids) {
  if (!ids.length) return;
  const wrap = document.getElementById('progressWrap');
  const bar  = document.getElementById('progressBar');
  const lbl  = document.getElementById('progressLabel');
  wrap.classList.add('visible');
  log('Batch start: ' + ids.length + ' match(es) \u2014 ' + selectedBrand.name + ' / ' + selectedLang.toUpperCase(), 'info');
  for (let i = 0; i < ids.length; i++) {
    bar.style.width = Math.round((i / ids.length) * 100) + '%';
    lbl.textContent = 'Generating ' + (i + 1) + ' / ' + ids.length + ': ' + ids[i];
    await new Promise(r => setTimeout(r, 60));
    downloadMatch(ids[i]);
  }
  bar.style.width = '100%';
  lbl.textContent = 'Done \u2014 ' + ids.length + ' file(s) downloaded.';
  log('Batch complete: ' + ids.length + ' file(s).', 'ok');
  setTimeout(() => { wrap.classList.remove('visible'); bar.style.width = '0%'; }, 4000);
}

// ── LOG ───────────────────────────────────────────────────────────────────────
function log(msg, type) {
  const el = document.getElementById('log');
  const line = document.createElement('span');
  line.className = 'log-line' + (type ? ' ' + type : '');
  line.textContent = msg;
  el.appendChild(document.createTextNode('\\n'));
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

// ── LIVE MATCH LOADING ────────────────────────────────────────────────────────
const LIVE_MATCHES = [];

const FLAG_MAP = {
  'Argentina':'🇦🇷','Australia':'🇦🇺','Austria':'🇦🇹','Belgium':'🇧🇪','Bolivia':'🇧🇴',
  'Brazil':'🇧🇷','Cameroon':'🇨🇲','Canada':'🇨🇦','Chile':'🇨🇱','China':'🇨🇳',
  'Colombia':'🇨🇴','Costa Rica':'🇨🇷','Croatia':'🇭🇷','Czech Republic':'🇨🇿',
  'Denmark':'🇩🇰','Ecuador':'🇪🇨','Egypt':'🇪🇬','England':'🏴\\uDB40\\uDC67\\uDB40\\uDC62\\uDB40\\uDC65\\uDB40\\uDC6E\\uDB40\\uDC67\\uDB40\\uDC7F',
  'France':'🇫🇷','Germany':'🇩🇪','Ghana':'🇬🇭','Honduras':'🇭🇳','Hungary':'🇭🇺',
  'Indonesia':'🇮🇩','Iran':'🇮🇷','Italy':'🇮🇹','Jamaica':'🇯🇲','Japan':'🇯🇵',
  'Korea Republic':'🇰🇷','South Korea':'🇰🇷','Mali':'🇲🇱','Mexico':'🇲🇽',
  'Morocco':'🇲🇦','Netherlands':'🇳🇱','New Zealand':'🇳🇿','Nigeria':'🇳🇬',
  'Panama':'🇵🇦','Paraguay':'🇵🇾','Peru':'🇵🇪','Poland':'🇵🇱','Portugal':'🇵🇹',
  'Qatar':'🇶🇦','Romania':'🇷🇴','Saudi Arabia':'🇸🇦','Scotland':'🏴\\uDB40\\uDC67\\uDB40\\uDC62\\uDB40\\uDC73\\uDB40\\uDC63\\uDB40\\uDC74\\uDB40\\uDC7F',
  'Senegal':'🇸🇳','Serbia':'🇷🇸','South Africa':'🇿🇦','Spain':'🇪🇸',
  'Switzerland':'🇨🇭','Tunisia':'🇹🇳','Turkey':'🇹🇷','Türkiye':'🇹🇷',
  'Ukraine':'🇺🇦','United States':'🇺🇸','USA':'🇺🇸','Uruguay':'🇺🇾',
  'Venezuela':'🇻🇪','Wales':'🏴\\uDB40\\uDC67\\uDB40\\uDC62\\uDB40\\uDC77\\uDB40\\uDC6C\\uDB40\\uDC73\\uDB40\\uDC7F',
};

function getTeamFlag(name) { return FLAG_MAP[name] || '\\uD83C\\uDFF3\\uFE0F'; }

const CLUB_CRESTS = {
  // Premier League
  'Arsenal':'https://crests.football-data.org/57.png',
  'Aston Villa':'https://crests.football-data.org/58.png',
  'AFC Bournemouth':'https://crests.football-data.org/1044.png',
  'Bournemouth':'https://crests.football-data.org/1044.png',
  'Brentford':'https://crests.football-data.org/402.png',
  'Brighton':'https://crests.football-data.org/397.png',
  'Brighton and Hove Albion':'https://crests.football-data.org/397.png',
  'Chelsea':'https://crests.football-data.org/61.png',
  'Crystal Palace':'https://crests.football-data.org/354.png',
  'Everton':'https://crests.football-data.org/62.png',
  'Fulham':'https://crests.football-data.org/63.png',
  'Ipswich':'https://crests.football-data.org/349.png',
  'Ipswich Town':'https://crests.football-data.org/349.png',
  'Leicester':'https://crests.football-data.org/338.png',
  'Leicester City':'https://crests.football-data.org/338.png',
  'Liverpool':'https://crests.football-data.org/64.png',
  'Manchester City':'https://crests.football-data.org/65.png',
  'Man City':'https://crests.football-data.org/65.png',
  'Manchester United':'https://crests.football-data.org/66.png',
  'Man United':'https://crests.football-data.org/66.png',
  'Newcastle United':'https://crests.football-data.org/67.png',
  'Newcastle':'https://crests.football-data.org/67.png',
  'Nottingham Forest':'https://crests.football-data.org/351.png',
  'Southampton':'https://crests.football-data.org/340.png',
  'Tottenham Hotspur':'https://crests.football-data.org/73.png',
  'Tottenham':'https://crests.football-data.org/73.png',
  'West Ham United':'https://crests.football-data.org/563.png',
  'West Ham':'https://crests.football-data.org/563.png',
  'Wolverhampton Wanderers':'https://crests.football-data.org/76.png',
  'Wolves':'https://crests.football-data.org/76.png',
  // Bundesliga
  'Bayern Munich':'https://crests.football-data.org/5.png',
  'FC Bayern München':'https://crests.football-data.org/5.png',
  'Borussia Dortmund':'https://crests.football-data.org/4.png',
  'RB Leipzig':'https://crests.football-data.org/721.png',
  'Bayer Leverkusen':'https://crests.football-data.org/3.png',
  'Eintracht Frankfurt':'https://crests.football-data.org/19.png',
  'Frankfurt':'https://crests.football-data.org/19.png',
  '1. FC Union Berlin':'https://crests.football-data.org/28.png',
  'Union Berlin':'https://crests.football-data.org/28.png',
  'SC Freiburg':'https://crests.football-data.org/17.png',
  'Freiburg':'https://crests.football-data.org/17.png',
  'VfB Stuttgart':'https://crests.football-data.org/10.png',
  'Stuttgart':'https://crests.football-data.org/10.png',
  'VfL Wolfsburg':'https://crests.football-data.org/11.png',
  'Wolfsburg':'https://crests.football-data.org/11.png',
  'Borussia Mönchengladbach':'https://crests.football-data.org/18.png',
  'Werder Bremen':'https://crests.football-data.org/12.png',
  'Augsburg':'https://crests.football-data.org/16.png',
  'FC Augsburg':'https://crests.football-data.org/16.png',
  // Serie A
  'AC Milan':'https://crests.football-data.org/98.png',
  'Milan':'https://crests.football-data.org/98.png',
  'Inter Milan':'https://crests.football-data.org/108.png',
  'Inter':'https://crests.football-data.org/108.png',
  'Juventus':'https://crests.football-data.org/109.png',
  'Napoli':'https://crests.football-data.org/113.png',
  'Roma':'https://crests.football-data.org/100.png',
  'AS Roma':'https://crests.football-data.org/100.png',
  'Lazio':'https://crests.football-data.org/110.png',
  'SS Lazio':'https://crests.football-data.org/110.png',
  'Atalanta':'https://crests.football-data.org/102.png',
  'Fiorentina':'https://crests.football-data.org/99.png',
  'Torino':'https://crests.football-data.org/586.png',
  // La Liga
  'Real Madrid':'https://crests.football-data.org/86.png',
  'Barcelona':'https://crests.football-data.org/81.png',
  'FC Barcelona':'https://crests.football-data.org/81.png',
  'Atletico Madrid':'https://crests.football-data.org/78.png',
  'Atlético de Madrid':'https://crests.football-data.org/78.png',
  'Sevilla':'https://crests.football-data.org/95.png',
  'Real Sociedad':'https://crests.football-data.org/92.png',
  'Villarreal':'https://crests.football-data.org/94.png',
  'Athletic Club':'https://crests.football-data.org/77.png',
  'Athletic Bilbao':'https://crests.football-data.org/77.png',
  'Valencia':'https://crests.football-data.org/93.png',
  // Ligue 1
  'Paris Saint-Germain':'https://crests.football-data.org/524.png',
  'PSG':'https://crests.football-data.org/524.png',
  'Olympique de Marseille':'https://crests.football-data.org/516.png',
  'Marseille':'https://crests.football-data.org/516.png',
  'Olympique Lyonnais':'https://crests.football-data.org/523.png',
  'Lyon':'https://crests.football-data.org/523.png',
  'Monaco':'https://crests.football-data.org/548.png',
  'AS Monaco':'https://crests.football-data.org/548.png',
  'Lille':'https://crests.football-data.org/521.png',
  'LOSC Lille':'https://crests.football-data.org/521.png',
  // Eredivisie
  'Ajax':'https://crests.football-data.org/674.png',
  'AFC Ajax':'https://crests.football-data.org/674.png',
  'PSV Eindhoven':'https://crests.football-data.org/678.png',
  'PSV':'https://crests.football-data.org/678.png',
  'Feyenoord':'https://crests.football-data.org/675.png',
  'AZ Alkmaar':'https://crests.football-data.org/676.png',
  'AZ':'https://crests.football-data.org/676.png',
  'FC Utrecht':'https://crests.football-data.org/682.png',
  'Utrecht':'https://crests.football-data.org/682.png',
  'FC Twente':'https://crests.football-data.org/680.png',
  'Twente':'https://crests.football-data.org/680.png',
  'Sparta Rotterdam':'https://crests.football-data.org/683.png',
  'FC Groningen':'https://crests.football-data.org/677.png',
  'Groningen':'https://crests.football-data.org/677.png',
  'SC Heerenveen':'https://crests.football-data.org/679.png',
  'Heerenveen':'https://crests.football-data.org/679.png',
  'NEC Nijmegen':'https://crests.football-data.org/681.png',
  'NEC':'https://crests.football-data.org/681.png',
  'FC Zwolle':'https://crests.football-data.org/684.png',
  'PEC Zwolle':'https://crests.football-data.org/684.png',
  'Zwolle':'https://crests.football-data.org/684.png',
  'Vitesse':'https://crests.football-data.org/685.png',
  'Go Ahead Eagles':'https://crests.football-data.org/8015.png',
  'Almere City':'https://crests.football-data.org/8088.png',
  'RKC Waalwijk':'https://crests.football-data.org/686.png',
  'Waalwijk':'https://crests.football-data.org/686.png',
  'Fortuna Sittard':'https://crests.football-data.org/1908.png',
};

function getTeamCrest(name) { return CLUB_CRESTS[name] || null; }

function teamCode(name) { return name.replace(/^(United |South |North |Costa |Saudi )/, '').slice(0,3).toUpperCase(); }

function fmtDate(iso) {
  var d = new Date(iso);
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return days[d.getUTCDay()] + ', ' + d.getUTCDate() + ' ' + months[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
}

function fmtTime(iso) {
  var d = new Date(iso);
  return String(d.getUTCHours()).padStart(2,'0') + ':' + String(d.getUTCMinutes()).padStart(2,'0');
}

function makeMatchId(a, b) {
  return [a, b].map(function(n) { return n.toLowerCase().replace(/\\s+/g,'-').replace(/[^a-z0-9-]/g,''); }).join('-');
}

function buildMinimalMatch(entry, league) {
  var tA = entry.home_team, tB = entry.away_team;
  var lge = league || { key: 'soccer', name: 'Soccer', round: 'Match' };
  var market = null;
  for (var bi = 0; bi < (entry.bookmakers || []).length; bi++) {
    var mk = (entry.bookmakers[bi].markets || []).find(function(x){ return x.key === 'h2h'; });
    if (mk) { market = mk; break; }
  }
  var homeOdds = 2.50, drawOdds = 3.20, awayOdds = 3.00;
  if (market) {
    (market.outcomes || []).forEach(function(o) {
      if (o.name === tA) homeOdds = o.price;
      else if (o.name === tB) awayOdds = o.price;
      else if (o.name === 'Draw') drawOdds = o.price;
    });
  }
  var total = 1/homeOdds + 1/drawOdds + 1/awayOdds;
  var pH = Math.round((1/homeOdds)/total*100);
  var pD = Math.round((1/drawOdds)/total*100);
  var pA = 100 - pH - pD;
  var fav = pH > pA ? tA : tB;
  var lgName = lge.name;
  var round = lge.round;

  function emptyTeam(name) {
    return { name: name, flag: getTeamFlag(name), crest: getTeamCrest(name), code: teamCode(name),
             fifa: 0, role: '', elo: 0, squadValue: '\\u2014',
             goalsPerGame: 0, concededPerGame: 0, possession: 50, cleanSheets: 0,
             form: [], formRecord: '\\u2014', players: [] };
  }

  return {
    id: lge.key.replace('soccer_','').replace(/_/g,'-') + '--' + makeMatchId(tA, tB),
    tournament: lgName,
    homeTeam: emptyTeam(tA),
    awayTeam: emptyTeam(tB),
    kickoff: fmtTime(entry.commence_time),
    date: fmtDate(entry.commence_time),
    venue: 'TBC', venueCapacity: '', venueSurface: '', kickoffLocal: '', kickoffCET: '',
    group: round,
    odds: { home: homeOdds, draw: drawOdds, away: awayOdds },
    probHome: pH, probDraw: pD, probAway: pA,
    previewLines: {
      en: [tA + ' host ' + tB + ' in a ' + lgName + ' fixture.',
           'Both sides will be looking to claim all three points in what promises to be a competitive encounter.'],
      de: [tA + ' empf\\u00e4ngt ' + tB + ' in der ' + lgName + '.',
           'Beide Teams wollen die drei Punkte \\u2014 es verspricht ein hart umk\\u00e4mpftes Spiel zu werden.'],
      tr: [tA + ', ' + lgName + ' ma\\u00e7\\u0131nda ' + tB + ' ile evinde kar\\u015f\\u0131la\\u015f\\u0131yor.',
           'Her iki tak\\u0131m da \\u00fc\\u00e7 puan pe\\u015finde olacak \\u2014 zorlu bir m\\u00fccadele bekleniyor.'],
    },
    previewHighlight: {
      en: '<strong>Odds:</strong> ' + tA + ' ' + homeOdds.toFixed(2) + ' &middot; Draw ' + drawOdds.toFixed(2) + ' &middot; ' + tB + ' ' + awayOdds.toFixed(2) + ' \\u2014 <strong>' + fav + '</strong> slight favourites.',
      de: '<strong>Quoten:</strong> ' + tA + ' ' + homeOdds.toFixed(2) + ' &middot; Unentsch. ' + drawOdds.toFixed(2) + ' &middot; ' + tB + ' ' + awayOdds.toFixed(2) + ' \\u2014 <strong>' + fav + '</strong> leichter Favorit.',
      tr: '<strong>Oranlar:</strong> ' + tA + ' ' + homeOdds.toFixed(2) + ' &middot; Berab. ' + drawOdds.toFixed(2) + ' &middot; ' + tB + ' ' + awayOdds.toFixed(2) + ' \\u2014 <strong>' + fav + '</strong> hafif favori.',
    },
    h2h: null, markets: null, stats: [],
  };
}

function saveApiKey() {
  var k = document.getElementById('apiKey').value.trim();
  if (k) localStorage.setItem('oddsApiKey', k);
}

// Single call: /sports/upcoming/odds/ returns ALL sports at once.
// We filter client-side for soccer. This matches the URL the user verified works.
async function loadAllSoccer() {
  var key = document.getElementById('apiKey').value.trim() || localStorage.getItem('oddsApiKey') || '';
  if (!key) {
    document.getElementById('liveStatus').textContent = '\\u26A0 Paste your Odds API key first';
    document.getElementById('liveStatus').className = 'live-status err';
    return;
  }
  localStorage.setItem('oddsApiKey', key);
  document.getElementById('liveStatus').textContent = 'Loading\\u2026';
  document.getElementById('liveStatus').className = 'live-status';

  // Exact same URL pattern the user confirmed works:
  // /v4/sports/upcoming/odds/?regions=eu&markets=h2h&apiKey=KEY
  var base = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? '/proxy/v4'
    : 'https://api.the-odds-api.com/v4';
  var url = base + '/sports/upcoming/odds/?regions=eu&markets=h2h&apiKey=' + key;

  try {
    var resp = await fetch(url);
    if (!resp.ok) {
      var errText = await resp.text();
      throw new Error('HTTP ' + resp.status + ': ' + errText.slice(0, 200));
    }
    var data = await resp.json();

    // Keep only soccer events
    var soccer = data.filter(function(e) {
      return e.sport_key && e.sport_key.indexOf('soccer') !== -1;
    });

    var added = 0;
    soccer.forEach(function(entry) {
      var title = entry.sport_title || entry.sport_key;
      var league = { key: entry.sport_key, name: title, round: title };
      var match = buildMinimalMatch(entry, league);
      if (MATCHES.find(function(x){ return x.id === match.id; })) return;
      if (LIVE_MATCHES.find(function(x){ return x.id === match.id; })) return;
      LIVE_MATCHES.push(match);
      addMatchToCalendar(match);
      added++;
    });

    var remaining = resp.headers.get('x-requests-remaining');
    var msg = '\\u2714 Loaded ' + added + ' soccer matches across ' +
      new Set(soccer.map(function(e){ return e.sport_key; })).size + ' leagues.';
    if (remaining) msg += ' Requests left: ' + remaining;
    document.getElementById('liveStatus').textContent = msg;
    document.getElementById('liveStatus').className = 'live-status ok';
    log(msg, 'ok');
  } catch(e) {
    document.getElementById('liveStatus').textContent = '\\u2716 ' + e.message;
    document.getElementById('liveStatus').className = 'live-status err';
    log('Load failed: ' + e.message, 'warn');
  }
}

// Adds a single match to the calendar DOM (finds or creates the date section)
function addMatchToCalendar(m) {
  var cal = document.getElementById('calendar');
  var dateKey = 'list-' + m.date.replace(/[^a-z0-9]/gi,'_');
  var list = document.getElementById(dateKey);
  if (!list) {
    var section = document.createElement('div');
    section.className = 'date-section';
    section.innerHTML =
      '<div class="date-header">' +
        '<div class="date-header-line"></div>' +
        '<div class="date-header-text">' + m.date + '</div>' +
        '<div class="date-header-line"></div>' +
      '</div>' +
      '<div class="match-list" id="' + dateKey + '"></div>';
    // Insert in date order
    var newKey = parseDateKey(m.date);
    var inserted = false;
    var sections = cal.querySelectorAll('.date-section');
    for (var i = 0; i < sections.length; i++) {
      var hdr = sections[i].querySelector('.date-header-text');
      if (hdr && parseDateKey(hdr.textContent) > newKey) {
        cal.insertBefore(section, sections[i]);
        inserted = true;
        break;
      }
    }
    if (!inserted) cal.appendChild(section);
    list = section.querySelector('.match-list');
  }
  list.appendChild(buildMatchRow(m));
  // Update group pills if group not present
  var existing = document.querySelector('.gf-pill[data-group="' + m.group + '"]');
  if (!existing && m.group !== 'all') {
    var container = document.getElementById('groupPills');
    var btn = document.createElement('button');
    btn.className = 'gf-pill';
    btn.dataset.group = m.group;
    btn.textContent = m.group;
    btn.onclick = function() { filterGroup(m.group); };
    container.appendChild(btn);
  }
}

// ── INIT ──────────────────────────────────────────────────────────────────────
buildBrandSelect();
buildGroupPills();
buildCalendar();
// Restore saved API key
(function() {
  var savedKey = localStorage.getItem('oddsApiKey');
  if (savedKey) document.getElementById('apiKey').value = savedKey;
  document.getElementById('liveStatus').textContent = 'Paste key & click Load \\u2014 fetches ALL soccer matches in one go';
})();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "admin.html"), html, "utf8");
console.log("Built admin.html (" + html.length + " bytes)");
