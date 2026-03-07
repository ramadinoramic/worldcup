// Generates a full match HTML page from a match data object.
// Works in both Node (module.exports) and browser (window.generateMatchHTML).

function generateMatchHTML(m) {
  const aff = "https://youwin.com/register?ref=21331414";

  function formBadges(team) {
    return team.form.map(f =>
      `<div class="fb ${f.r.toLowerCase()}" title="${f.tip}">${f.r}</div>`
    ).join("\n              ");
  }

  function h2hRows(m) {
    return m.h2h.matches.map(hm => {
      const homeClass = hm.winner === "home" ? ' class="w"' : "";
      const awayClass = hm.winner === "away" ? ' class="w"' : "";
      return `        <div class="ml-item">
          <span class="ml-date">${hm.date}</span>
          <div class="ml-teams"><span${homeClass}>${hm.home}</span><span>–</span><span${awayClass}>${hm.away}</span></div>
          <span class="ml-score">${hm.score}</span>
          <span class="ml-comp">${hm.comp}</span>
        </div>`;
    }).join("\n");
  }

  function playerRows(players) {
    return players.map(p => `        <div class="player-row">
          <div class="player-avatar">${p.flag}</div>
          <div class="player-info">
            <div class="player-name">${p.name}</div>
            <div class="player-detail">${p.detail}</div>
          </div>
          <div class="player-stat">
            <div class="player-stat-val">${p.stat}</div>
            <div class="player-stat-label">${p.statLabel}</div>
          </div>
        </div>`).join("\n");
  }

  function mktBtns(items, labelKey = "label", valKey = "val") {
    return items.map(i =>
      `            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener">
              <span class="mkt-btn-label">${i[labelKey]}</span><span class="mkt-btn-val">${i[valKey]}</span>
            </a>`
    ).join("\n");
  }

  const ht = m.homeTeam, at = m.awayTeam;
  const allPlayers = [...ht.players, ...at.players];

  // Stat bar widths — normalise each stat pair to 0–100 scale
  function barW(a, b, flip = false) {
    const max = Math.max(a, b, 0.001);
    const pA = Math.round((a / max) * 95);
    const pB = Math.round((b / max) * 95);
    return flip ? [pB, pA] : [pA, pB];
  }

  const [fifaH, fifaA] = barW(1 / ht.fifa, 1 / at.fifa);
  const [eloH, eloA]   = barW(ht.elo, at.elo);
  // squad value: strip non-numeric
  const svH = parseFloat((ht.squadValue || "0").replace(/[^0-9.]/g, ""));
  const svA = parseFloat((at.squadValue || "0").replace(/[^0-9.]/g, ""));
  const [sqH, sqA] = barW(svH, svA);
  const [gpH, gpA] = barW(ht.goalsPerGame, at.goalsPerGame);
  // conceded: lower is better — invert
  const [cpH, cpA] = barW(1 / ht.concededPerGame, 1 / at.concededPerGame);
  const [posH, posA] = barW(ht.possession, at.possession);
  const [csH, csA]   = barW(ht.cleanSheets, at.cleanSheets);

  const leadH = ht.elo >= at.elo ? ' lead' : '';
  const leadA = at.elo >= ht.elo ? ' lead' : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ht.name} vs ${at.name} – FIFA World Cup 2026 | Youwin Betting</title>
  <meta name="description" content="Bet on ${ht.name} vs ${at.name} at FIFA World Cup 2026. Best odds, match preview, head-to-head stats and exclusive bonuses at Youwin.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg-page:#F4F5F7;--bg-card:#FFFFFF;--bg-muted:#F8F9FB;--bg-input:#EEF0F4;
      --accent:#E41E3F;--accent-dim:rgba(228,30,63,0.08);--accent-mid:rgba(228,30,63,0.18);
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
    .lang-pill{display:flex;background:var(--bg-input);border-radius:100px;padding:3px;gap:2px;}
    .lang-pill a{font-size:.68rem;font-weight:700;padding:.22rem .55rem;border-radius:100px;color:var(--t2);transition:all .15s;}
    .lang-pill a.active{background:var(--accent);color:#fff;}
    .lang-pill a:hover:not(.active){color:var(--t0);background:var(--border);}
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
    .side-cta{background:linear-gradient(150deg,#E41E3F 0%,#B21130 100%);border-radius:var(--r-xl);padding:1.5rem 1.25rem;text-align:center;box-shadow:var(--shadow-md);}
    .side-cta-eyebrow{font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:.4rem;}
    .side-cta-headline{font-size:1.35rem;font-weight:900;line-height:1.2;color:#fff;letter-spacing:-.03em;margin-bottom:.35rem;}
    .side-cta-sub{font-size:.7rem;color:rgba(255,255,255,0.65);margin-bottom:1.1rem;line-height:1.5;}
    .side-cta-btn{display:inline-flex;align-items:center;gap:.3rem;background:#fff;color:var(--accent);font-size:.78rem;font-weight:800;padding:.65rem 1.6rem;border-radius:100px;transition:all .15s;}
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
      <a href="index.html" class="topbar-brand">YOU<span>WIN</span></a>
    </div>
    <div class="topbar-right">
      <a href="${aff}" class="topbar-cta" target="_blank" rel="noopener">Place a Bet</a>
    </div>
  </div>
</div>
<div class="page">
  <div class="match-header">
    <div class="mh-top">
      <div class="mh-tourney">
        <div class="mh-tourney-badge">⚽</div>
        FIFA World Cup 2026 &bull; Group Stage &bull; ${m.group}
      </div>
      <div class="mh-status"><span class="mh-dot"></span> Upcoming</div>
    </div>
    <div class="mh-body">
      <div class="mh-team">
        <div class="mh-flag">${ht.flag}</div>
        <div class="mh-name">${ht.name}</div>
        <div class="mh-sub">FIFA #${ht.fifa} · ${ht.role}</div>
      </div>
      <div class="mh-center">
        <div class="mh-kick">${m.kickoff}</div>
        <div class="mh-date">${m.date}</div>
        <div class="mh-venue">${m.venue}</div>
      </div>
      <div class="mh-team">
        <div class="mh-flag">${at.flag}</div>
        <div class="mh-name">${at.name}</div>
        <div class="mh-sub">FIFA #${at.fifa} · ${at.role}</div>
      </div>
    </div>
    <div class="mh-foot">
      <div class="odds-strip">
        <a href="${aff}" class="odds-btn" target="_blank" rel="noopener">
          <span class="odds-btn-label">Home Win</span>
          <span class="odds-btn-val">${m.odds.home.toFixed(2)}</span>
          <span class="odds-btn-team">${ht.name}</span>
        </a>
        <a href="${aff}" class="odds-btn" target="_blank" rel="noopener">
          <span class="odds-btn-label">Draw</span>
          <span class="odds-btn-val">${m.odds.draw.toFixed(2)}</span>
          <span class="odds-btn-team">After 90 min</span>
        </a>
        <a href="${aff}" class="odds-btn" target="_blank" rel="noopener">
          <span class="odds-btn-label">Away Win</span>
          <span class="odds-btn-val">${m.odds.away.toFixed(2)}</span>
          <span class="odds-btn-team">${at.name}</span>
        </a>
      </div>
    </div>
  </div>
  <div class="main" style="display:flex;flex-direction:column;gap:1rem;">
    <div class="tabs">
      <div class="tab active">Preview</div>
      <div class="tab">Statistics</div>
      <div class="tab">Odds</div>
      <div class="tab">H2H</div>
      <div class="tab">Form</div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--blue-dim);">📋</span> Match Preview</div>
      </div>
      <div class="card-body">
        ${m.previewLines.map(l => `<p class="preview-text">${l}</p>`).join("\n        ")}
        <div class="preview-highlight">${m.previewHighlight}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--green-dim);">📊</span> Win Probability</div>
        <span class="card-chip">Based on Youwin odds</span>
      </div>
      <div class="card-body">
        <div class="prob-bar">
          <div class="ps home" style="width:${m.probHome}%;">${m.probHome}%</div>
          <div class="ps draw" style="width:${m.probDraw}%;">${m.probDraw}%</div>
          <div class="ps away" style="width:${m.probAway}%;">${m.probAway}%</div>
        </div>
        <div class="prob-labels">
          <span>${ht.flag} ${ht.name}</span><span>Draw</span><span>${at.name} ${at.flag}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--accent-dim);">⚔️</span> Team Comparison</div>
        <div style="display:flex;gap:1rem;font-size:.65rem;font-weight:700;">
          <span style="color:var(--blue);">● ${ht.code}</span>
          <span style="color:var(--accent);">● ${at.code}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="stat-row">
          <span class="sv${leadH}">${ht.fifa}</span>
          <div class="sh"><div class="sh-fill" style="width:${fifaH}%;"></div></div>
          <span class="sn">FIFA Ranking</span>
          <div class="sa"><div class="sa-fill" style="width:${fifaA}%;"></div></div>
          <span class="sv${leadA}">${at.fifa}</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.elo >= at.elo ? ' lead' : ''}">${ht.elo}</span>
          <div class="sh"><div class="sh-fill" style="width:${eloH}%;"></div></div>
          <span class="sn">ELO Rating</span>
          <div class="sa"><div class="sa-fill" style="width:${eloA}%;"></div></div>
          <span class="sv${at.elo > ht.elo ? ' lead' : ''}">${at.elo}</span>
        </div>
        <div class="stat-row">
          <span class="sv">${ht.squadValue}</span>
          <div class="sh"><div class="sh-fill" style="width:${sqH}%;"></div></div>
          <span class="sn">Squad Value</span>
          <div class="sa"><div class="sa-fill" style="width:${sqA}%;"></div></div>
          <span class="sv">${at.squadValue}</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.goalsPerGame >= at.goalsPerGame ? ' lead' : ''}">${ht.goalsPerGame}</span>
          <div class="sh"><div class="sh-fill" style="width:${gpH}%;"></div></div>
          <span class="sn">Goals / Match</span>
          <div class="sa"><div class="sa-fill" style="width:${gpA}%;"></div></div>
          <span class="sv${at.goalsPerGame > ht.goalsPerGame ? ' lead' : ''}">${at.goalsPerGame}</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.concededPerGame <= at.concededPerGame ? ' lead' : ''}">${ht.concededPerGame}</span>
          <div class="sh"><div class="sh-fill" style="width:${cpH}%;"></div></div>
          <span class="sn">Conceded / Match</span>
          <div class="sa"><div class="sa-fill" style="width:${cpA}%;"></div></div>
          <span class="sv${at.concededPerGame < ht.concededPerGame ? ' lead' : ''}">${at.concededPerGame}</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.possession >= at.possession ? ' lead' : ''}">${ht.possession}%</span>
          <div class="sh"><div class="sh-fill" style="width:${posH}%;"></div></div>
          <span class="sn">Possession</span>
          <div class="sa"><div class="sa-fill" style="width:${posA}%;"></div></div>
          <span class="sv${at.possession > ht.possession ? ' lead' : ''}">${at.possession}%</span>
        </div>
        <div class="stat-row">
          <span class="sv${ht.cleanSheets >= at.cleanSheets ? ' lead' : ''}">${ht.cleanSheets}</span>
          <div class="sh"><div class="sh-fill" style="width:${csH}%;"></div></div>
          <span class="sn">Clean Sheets</span>
          <div class="sa"><div class="sa-fill" style="width:${csA}%;"></div></div>
          <span class="sv${at.cleanSheets > ht.cleanSheets ? ' lead' : ''}">${at.cleanSheets}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--green-dim);">📈</span> Recent Form</div>
        <span class="card-chip">Last 5 matches</span>
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
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--yellow-dim);">🤝</span> Head to Head</div>
        <span class="card-chip">${m.h2h.total} matches total</span>
      </div>
      <div class="card-body">
        <div class="prob-bar" style="height:26px;margin-bottom:.85rem;">
          <div class="ps home" style="width:${Math.round(m.h2h.homeWins / m.h2h.total * 100)}%;">${m.h2h.homeWins} wins</div>
          <div class="ps draw" style="width:${Math.round(m.h2h.draws / m.h2h.total * 100)}%;">${m.h2h.draws}</div>
          <div class="ps away" style="width:${Math.round(m.h2h.awayWins / m.h2h.total * 100)}%;">${m.h2h.awayWins} wins</div>
        </div>
        <div class="prob-labels" style="margin-bottom:.9rem;">
          <span>${ht.flag} ${ht.name}</span><span>Draws</span><span>${at.name} ${at.flag}</span>
        </div>
${h2hRows(m)}
        ${m.h2h.note ? `<div style="margin-top:.6rem;font-size:.65rem;color:var(--t3);">${m.h2h.note}</div>` : ""}
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--accent-dim);">💰</span> Betting Markets</div>
        <span class="card-chip" style="color:var(--accent);background:var(--accent-dim);">Youwin</span>
      </div>
      <div class="card-body">
        <div class="market">
          <div class="mkt-label">Match Result (1X2)</div>
          <div class="mkt-row">
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">${ht.name}</span><span class="mkt-btn-val">${m.odds.home.toFixed(2)}</span></a>
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">Draw</span><span class="mkt-btn-val">${m.odds.draw.toFixed(2)}</span></a>
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">${at.name}</span><span class="mkt-btn-val">${m.odds.away.toFixed(2)}</span></a>
          </div>
        </div>
        <div class="market">
          <div class="mkt-label">Both Teams to Score</div>
          <div class="mkt-row">
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">Yes</span><span class="mkt-btn-val">${m.markets.bttsYes.toFixed(2)}</span></a>
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">No</span><span class="mkt-btn-val">${m.markets.bttsNo.toFixed(2)}</span></a>
          </div>
        </div>
        <div class="market">
          <div class="mkt-label">Total Goals</div>
          <div class="mkt-row">
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">Over 2.5</span><span class="mkt-btn-val">${m.markets.over25.toFixed(2)}</span></a>
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">Under 2.5</span><span class="mkt-btn-val">${m.markets.under25.toFixed(2)}</span></a>
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">Over 3.5</span><span class="mkt-btn-val">${m.markets.over35.toFixed(2)}</span></a>
          </div>
        </div>
        <div class="market">
          <div class="mkt-label">Anytime Goalscorer</div>
          <div class="mkt-row">
${mktBtns(m.markets.goalscorers)}
          </div>
        </div>
        <div class="market">
          <div class="mkt-label">Correct Score (Top Picks)</div>
          <div class="mkt-row">
${mktBtns(m.markets.correctScore)}
          </div>
        </div>
        <div class="market">
          <div class="mkt-label">Double Chance</div>
          <div class="mkt-row">
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">1X (${ht.code} or Draw)</span><span class="mkt-btn-val">${m.markets.dc1x.toFixed(2)}</span></a>
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">X2 (${at.code} or Draw)</span><span class="mkt-btn-val">${m.markets.dcX2.toFixed(2)}</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sidebar" style="display:flex;flex-direction:column;gap:1rem;">
    <div class="side-cta">
      <div class="side-cta-eyebrow">Welcome Offer</div>
      <div class="side-cta-headline">100% Bonus<br>up to €100</div>
      <div class="side-cta-sub">New customers only · Min. deposit €10 · T&amp;Cs apply</div>
      <a href="${aff}" class="side-cta-btn" target="_blank" rel="noopener">Claim Bonus →</a>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--blue-dim);">⭐</span> Key Players</div>
      </div>
      <div class="card-body">
${playerRows(allPlayers)}
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--green-dim);">🏟️</span> Venue Info</div>
      </div>
      <div class="card-body">
        <div style="font-size:.85rem;font-weight:800;color:var(--t0);margin-bottom:.15rem;">${m.venue.split(",")[0]}</div>
        <div style="font-size:.72rem;color:var(--t2);margin-bottom:.65rem;">${m.venue.split(",").slice(1).join(",").trim()}</div>
        <div class="venue-row"><span class="venue-key">Capacity</span><span class="venue-val">${m.venueCapacity}</span></div>
        <div class="venue-row"><span class="venue-key">Surface</span><span class="venue-val">${m.venueSurface}</span></div>
        <div class="venue-row"><span class="venue-key">Kick-off (local)</span><span class="venue-val">${m.kickoffLocal}</span></div>
        <div class="venue-row"><span class="venue-key">Kick-off (CET)</span><span class="venue-val">${m.kickoffCET}</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="card-icon" style="background:var(--accent-dim);">⚡</span> Quick Bet</div>
      </div>
      <div class="card-body">
        <div class="market">
          <div class="mkt-label">Half-Time Result</div>
          <div class="mkt-row">
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">${ht.code}</span><span class="mkt-btn-val">${m.markets.htHome.toFixed(2)}</span></a>
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">Draw</span><span class="mkt-btn-val">${m.markets.htDraw.toFixed(2)}</span></a>
            <a href="${aff}" class="mkt-btn" target="_blank" rel="noopener"><span class="mkt-btn-label">${at.code}</span><span class="mkt-btn-val">${m.markets.htAway.toFixed(2)}</span></a>
          </div>
        </div>
        <div class="market">
          <div class="mkt-label">First Goal Scorer</div>
          <div class="mkt-row">
${mktBtns(m.markets.fgsFirst)}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<footer>
  <div class="footer-brand">YOU<span>WIN</span></div>
  <p class="footer-disc">18+ only. Please gamble responsibly. Youwin is licensed and regulated. Betting involves risk — only bet what you can afford to lose. If gambling becomes a problem, visit <strong>begambleaware.org</strong>.</p>
  <div class="footer-links">
    <a href="#">Terms &amp; Conditions</a>
    <a href="#">Privacy Policy</a>
    <a href="#">Responsible Gaming</a>
    <a href="index.html">All Matches</a>
  </div>
</footer>
<div class="mob-bar">
  <div class="mob-bar-info">
    <div class="mob-bar-label">Daily Prize Pool</div>
    <div class="mob-bar-val">Get free $10 in bets</div>
  </div>
  <a href="${aff}" class="mob-bar-btn" target="_blank" rel="noopener">
    <span class="mob-bar-btn-main">Bet Now</span>
    <span class="mob-bar-btn-sub">Get $10 Free Bonus!</span>
  </a>
</div>
</body>
</html>`;
}

if (typeof module !== "undefined") module.exports = { generateMatchHTML };
else window.generateMatchHTML = generateMatchHTML;
