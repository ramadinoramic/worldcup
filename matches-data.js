// Shared match data — used by admin.html (browser) and generate.js (Node CLI)
const MATCHES = [
  // ── GROUP A ──────────────────────────────────────────────────────────────
  {
    id: "usa-mexico",
    homeTeam: {
      name: "USA", flag: "🇺🇸", code: "USA",
      fifa: 13, role: "Host Nation",
      elo: 1878, squadValue: "€580M",
      goalsPerGame: 1.8, concededPerGame: 0.9,
      possession: 54, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs Jamaica 2–0" }, { r: "W", tip: "vs Panama 3–1" },
        { r: "D", tip: "vs Costa Rica 1–1" }, { r: "W", tip: "vs Honduras 2–0" },
        { r: "L", tip: "vs Mexico 0–1" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇺🇸", name: "Christian Pulisic", detail: "Forward · AC Milan", stat: "31", statLabel: "Intl. Goals" },
        { flag: "🇺🇸", name: "Gio Reyna", detail: "Midfielder · Borussia Dortmund", stat: "8", statLabel: "Intl. Goals" },
        { flag: "🇺🇸", name: "Matt Turner", detail: "Goalkeeper · Nottm Forest", stat: "35%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "Mexico", flag: "🇲🇽", code: "MEX",
      fifa: 14, role: "CONCACAF Giants",
      elo: 1862, squadValue: "€420M",
      goalsPerGame: 1.7, concededPerGame: 1.0,
      possession: 52, cleanSheets: 4,
      form: [
        { r: "W", tip: "vs USA 1–0" }, { r: "D", tip: "vs Costa Rica 0–0" },
        { r: "W", tip: "vs Honduras 2–1" }, { r: "L", tip: "vs Argentina 0–2" },
        { r: "W", tip: "vs Jamaica 3–0" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇲🇽", name: "Hirving Lozano", detail: "Forward · PSV Eindhoven", stat: "30", statLabel: "Intl. Goals" },
        { flag: "🇲🇽", name: "Edson Alvarez", detail: "Midfielder · West Ham", stat: "7", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "20:00",
    date: "Thursday, 11 June 2026",
    venue: "Rose Bowl, Los Angeles",
    venueCapacity: "92,542",
    venueSurface: "Grass",
    kickoffLocal: "11:00 PT",
    kickoffCET: "20:00 CET",
    group: "Group A",
    odds: { home: 2.50, draw: 3.10, away: 2.70 },
    probHome: 37, probDraw: 29, probAway: 34,
    previewLines: [
      "The ultimate CONCACAF rivalry opens on American soil. The USA and Mexico have met 73 times and both nations arrive as co-hosts in a fixture that carries enormous political and sporting weight.",
      "Pulisic leads a young, dynamic USA side playing in front of their home crowd, while Mexico bring experience and tactical discipline in a match that could define Group A."
    ],
    previewHighlight: "<strong>Rivalry Renewed:</strong> USA vs Mexico is one of football's most intense regional rivalries — expect a ferocious atmosphere at the Rose Bowl.",
    h2h: {
      homeWins: 21, draws: 14, awayWins: 38, total: 73,
      matches: [
        { date: "Jun 2023", home: "USA", away: "Mexico", score: "3 – 0", comp: "Nations Lge", winner: "home" },
        { date: "Nov 2021", home: "USA", away: "Mexico", score: "2 – 0", comp: "WCQ", winner: "home" },
        { date: "Aug 2021", home: "Mexico", away: "USA", score: "0 – 0", comp: "Nations Lge", winner: "draw" },
        { date: "Jul 2021", home: "USA", away: "Mexico", score: "0 – 3", comp: "Gold Cup F", winner: "away" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.85, bttsNo: 1.95, over25: 2.00, under25: 1.85, over35: 3.20,
      goalscorers: [{ label: "Pulisic", val: 2.80 }, { label: "Lozano", val: 3.20 }, { label: "Reyna", val: 4.00 }],
      correctScore: [{ label: "1 – 0", val: 6.50 }, { label: "1 – 1", val: 6.00 }, { label: "0 – 1", val: 7.00 }],
      dc1x: 1.38, dcX2: 1.48,
      htHome: 3.20, htDraw: 2.10, htAway: 3.40,
      fgsFirst: [{ label: "Pulisic 1st", val: 5.50 }, { label: "Lozano 1st", val: 6.00 }]
    }
  },
  // ── GROUP B ──────────────────────────────────────────────────────────────
  {
    id: "germany-spain",
    homeTeam: {
      name: "Germany", flag: "🇩🇪", code: "GER",
      fifa: 4, role: "4x World Champions",
      elo: 2008, squadValue: "€920M",
      goalsPerGame: 2.1, concededPerGame: 0.8,
      possession: 59, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs Austria 2–0" }, { r: "D", tip: "vs England 2–2" },
        { r: "W", tip: "vs Netherlands 3–1" }, { r: "W", tip: "vs Portugal 1–0" },
        { r: "L", tip: "vs France 0–2" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇩🇪", name: "Florian Wirtz", detail: "Midfielder · Bayer Leverkusen", stat: "18", statLabel: "Intl. Goals" },
        { flag: "🇩🇪", name: "Kai Havertz", detail: "Forward · Arsenal", stat: "24", statLabel: "Intl. Goals" },
        { flag: "🇩🇪", name: "Manuel Neuer", detail: "Goalkeeper · Bayern Munich", stat: "40%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "Spain", flag: "🇪🇸", code: "ESP",
      fifa: 6, role: "3x World Champions",
      elo: 2012, squadValue: "€1.0B",
      goalsPerGame: 2.3, concededPerGame: 0.5,
      possession: 65, cleanSheets: 7,
      form: [
        { r: "W", tip: "vs Sweden 2–0" }, { r: "W", tip: "vs France 2–0" },
        { r: "W", tip: "vs Italy 1–0" }, { r: "D", tip: "vs Portugal 1–1" },
        { r: "W", tip: "vs Ukraine 3–0" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇪🇸", name: "Lamine Yamal", detail: "Forward · FC Barcelona", stat: "11", statLabel: "Intl. Goals" },
        { flag: "🇪🇸", name: "Pedri", detail: "Midfielder · FC Barcelona", stat: "9", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "21:00",
    date: "Sunday, 21 June 2026",
    venue: "AT&T Stadium, Dallas",
    venueCapacity: "80,000",
    venueSurface: "Artificial Turf",
    kickoffLocal: "14:00 CT",
    kickoffCET: "21:00 CET",
    group: "Group B",
    odds: { home: 2.70, draw: 3.10, away: 2.50 },
    probHome: 33, probDraw: 29, probAway: 38,
    previewLines: [
      "A rematch of the Euro 2024 semi-final — a match that defined a generation of Spanish football and shattered German hopes on home soil. Now Germany seek revenge at the World Cup, armed with a rebuilt squad led by Florian Wirtz.",
      "Spain arrive as one of Europe's form sides and the bookmakers' second favourite for the trophy. Yamal, at just 18, has already established himself as a world-class performer capable of winning matches on his own."
    ],
    previewHighlight: "<strong>Tactical Battle:</strong> Spain's possession game vs Germany's high press — whichever side controls the midfield battles will likely control the tie.",
    h2h: {
      homeWins: 4, draws: 5, awayWins: 5, total: 14,
      matches: [
        { date: "Jul 2024", home: "Germany", away: "Spain", score: "1 – 2", comp: "Euro SF", winner: "away" },
        { date: "Nov 2020", home: "Germany", away: "Spain", score: "0 – 6", comp: "Nations Lge", winner: "away" },
        { date: "Sep 2020", home: "Spain", away: "Germany", score: "1 – 1", comp: "Nations Lge", winner: "draw" },
        { date: "Nov 2019", home: "Germany", away: "Spain", score: "1 – 1", comp: "Friendly", winner: "draw" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.85, bttsNo: 1.95, over25: 1.85, under25: 2.00, over35: 3.00,
      goalscorers: [{ label: "Havertz", val: 3.20 }, { label: "Yamal", val: 3.00 }, { label: "Wirtz", val: 3.40 }],
      correctScore: [{ label: "1 – 1", val: 6.00 }, { label: "1 – 2", val: 9.00 }, { label: "2 – 1", val: 9.00 }],
      dc1x: 1.45, dcX2: 1.40,
      htHome: 3.20, htDraw: 2.00, htAway: 3.60,
      fgsFirst: [{ label: "Yamal 1st", val: 6.00 }, { label: "Havertz 1st", val: 6.50 }]
    }
  },
  // ── GROUP C ──────────────────────────────────────────────────────────────
  {
    id: "argentina-france",
    homeTeam: {
      name: "Argentina", flag: "🇦🇷", code: "ARG",
      fifa: 1, role: "Defending Champions",
      elo: 2102, squadValue: "€880M",
      goalsPerGame: 2.4, concededPerGame: 0.4,
      possession: 62, cleanSheets: 8,
      form: [
        { r: "W", tip: "vs Ecuador 3–0" }, { r: "W", tip: "vs Uruguay 2–0" },
        { r: "W", tip: "vs Bolivia 3–1" }, { r: "W", tip: "vs Chile 1–0" },
        { r: "D", tip: "vs Paraguay 0–0" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇦🇷", name: "Lionel Messi", detail: "Forward · Inter Miami", stat: "112", statLabel: "Intl. Goals" },
        { flag: "🇦🇷", name: "Lautaro Martinez", detail: "Forward · Inter Milan", stat: "29", statLabel: "Intl. Goals" },
        { flag: "🇦🇷", name: "Emiliano Martinez", detail: "Goalkeeper · Aston Villa", stat: "42%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "France", flag: "🇫🇷", code: "FRA",
      fifa: 2, role: "2018 World Champions",
      elo: 2046, squadValue: "€1.2B",
      goalsPerGame: 2.1, concededPerGame: 0.7,
      possession: 58, cleanSheets: 6,
      form: [
        { r: "W", tip: "vs Belgium 2–1" }, { r: "W", tip: "vs Germany 2–0" },
        { r: "D", tip: "vs Portugal 1–1" }, { r: "W", tip: "vs Netherlands 3–1" },
        { r: "L", tip: "vs Spain 0–2" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇫🇷", name: "Kylian Mbappe", detail: "Forward · Real Madrid", stat: "47", statLabel: "Intl. Goals" },
        { flag: "🇫🇷", name: "Antoine Griezmann", detail: "Midfielder · Atletico Madrid", stat: "44", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "21:00",
    date: "Saturday, 14 June 2026",
    venue: "MetLife Stadium, New Jersey",
    venueCapacity: "82,500",
    venueSurface: "Artificial Turf",
    kickoffLocal: "15:00 ET",
    kickoffCET: "21:00 CET",
    group: "Group C",
    odds: { home: 2.10, draw: 3.40, away: 3.20 },
    probHome: 42, probDraw: 26, probAway: 32,
    previewLines: [
      "A rematch of the epic 2022 World Cup Final — the greatest final in tournament history — where Argentina edged France in a penalty shootout after a stunning 3–3 draw. Messi and Mbappe renew their personal duel on the grandest stage.",
      "Argentina enter as favourites backed by a 36-match unbeaten run and back-to-back continental triumphs. France carry the most feared attack in world football, with Mbappe, Dembele, and Barcola capable of unlocking any defence on their day."
    ],
    previewHighlight: "<strong>Key Duel:</strong> Messi (198 caps, 112 goals) vs Mbappe (88 caps, 47 goals) — the two defining players of their generation clash once more at the World Cup.",
    h2h: {
      homeWins: 6, draws: 3, awayWins: 3, total: 12,
      matches: [
        { date: "Dec 2022", home: "Argentina", away: "France", score: "3 – 3*", comp: "WC Final", winner: "home" },
        { date: "Jun 2018", home: "Argentina", away: "France", score: "3 – 4", comp: "WC R16", winner: "away" },
        { date: "Mar 2009", home: "France", away: "Argentina", score: "0 – 2", comp: "Friendly", winner: "away" },
        { date: "Feb 2007", home: "France", away: "Argentina", score: "1 – 0", comp: "Friendly", winner: "home" }
      ],
      note: "* Argentina won 4–2 on penalties"
    },
    markets: {
      bttsYes: 1.75, bttsNo: 2.05, over25: 1.90, under25: 1.95, over35: 2.80,
      goalscorers: [{ label: "Messi", val: 3.40 }, { label: "Mbappe", val: 2.30 }, { label: "Lautaro", val: 3.10 }],
      correctScore: [{ label: "1 – 1", val: 6.50 }, { label: "2 – 1", val: 8.00 }, { label: "1 – 2", val: 10.00 }],
      dc1x: 1.30, dcX2: 1.65,
      htHome: 2.80, htDraw: 2.10, htAway: 3.80,
      fgsFirst: [{ label: "Mbappe 1st", val: 5.50 }, { label: "Messi 1st", val: 7.00 }]
    }
  },
  // ── GROUP D ──────────────────────────────────────────────────────────────
  {
    id: "brazil-england",
    homeTeam: {
      name: "Brazil", flag: "🇧🇷", code: "BRA",
      fifa: 3, role: "5x World Champions",
      elo: 2031, squadValue: "€950M",
      goalsPerGame: 2.2, concededPerGame: 0.5,
      possession: 60, cleanSheets: 7,
      form: [
        { r: "W", tip: "vs Colombia 2–0" }, { r: "W", tip: "vs Peru 3–0" },
        { r: "W", tip: "vs Venezuela 4–1" }, { r: "D", tip: "vs Argentina 1–1" },
        { r: "W", tip: "vs Chile 2–0" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇧🇷", name: "Vinicius Jr.", detail: "Forward · Real Madrid", stat: "28", statLabel: "Intl. Goals" },
        { flag: "🇧🇷", name: "Rodrygo", detail: "Forward · Real Madrid", stat: "19", statLabel: "Intl. Goals" },
        { flag: "🇧🇷", name: "Alisson", detail: "Goalkeeper · Liverpool", stat: "38%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG",
      fifa: 5, role: "1966 World Champions",
      elo: 1990, squadValue: "€1.1B",
      goalsPerGame: 2.0, concededPerGame: 0.6,
      possession: 57, cleanSheets: 6,
      form: [
        { r: "W", tip: "vs Serbia 1–0" }, { r: "W", tip: "vs Denmark 2–1" },
        { r: "D", tip: "vs Italy 1–1" }, { r: "W", tip: "vs Switzerland 2–0" },
        { r: "D", tip: "vs Germany 2–2" }
      ],
      formRecord: "W3 D2 L0",
      players: [
        { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "Harry Kane", detail: "Forward · Bayern Munich", stat: "66", statLabel: "Intl. Goals" },
        { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "Jude Bellingham", detail: "Midfielder · Real Madrid", stat: "14", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "18:00",
    date: "Wednesday, 17 June 2026",
    venue: "SoFi Stadium, Los Angeles",
    venueCapacity: "70,240",
    venueSurface: "Grass",
    kickoffLocal: "09:00 PT",
    kickoffCET: "18:00 CET",
    group: "Group D",
    odds: { home: 2.40, draw: 3.20, away: 2.80 },
    probHome: 38, probDraw: 28, probAway: 34,
    previewLines: [
      "Two football giants meet at SoFi Stadium in what promises to be one of the standout Group D clashes. Brazil seek their sixth World Cup title under a new generation led by Vinicius Jr., while England carry the hopes of a nation desperate to end their 60-year wait.",
      "Brazil's fluid attacking play will be tested against England — a side that has shown considerable defensive solidity while improving their offensive output under the current setup."
    ],
    previewHighlight: "<strong>Clash to Watch:</strong> Vinicius Jr. vs Kyle Walker — the world's most dangerous winger against one of the Premier League's most experienced right-backs.",
    h2h: {
      homeWins: 3, draws: 4, awayWins: 4, total: 11,
      matches: [
        { date: "Nov 2017", home: "Brazil", away: "England", score: "0 – 0", comp: "Friendly", winner: "draw" },
        { date: "Jun 2013", home: "Brazil", away: "England", score: "2 – 2", comp: "Friendly", winner: "draw" },
        { date: "Jun 2009", home: "Brazil", away: "England", score: "1 – 0", comp: "Friendly", winner: "home" },
        { date: "Jun 2007", home: "Brazil", away: "England", score: "1 – 1", comp: "Friendly", winner: "draw" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.80, bttsNo: 2.00, over25: 1.95, under25: 1.90, over35: 2.90,
      goalscorers: [{ label: "Vinicius", val: 2.60 }, { label: "Kane", val: 2.80 }, { label: "Rodrygo", val: 3.50 }],
      correctScore: [{ label: "1 – 0", val: 7.00 }, { label: "2 – 1", val: 8.50 }, { label: "1 – 1", val: 6.00 }],
      dc1x: 1.35, dcX2: 1.55,
      htHome: 2.90, htDraw: 2.20, htAway: 4.00,
      fgsFirst: [{ label: "Vinicius 1st", val: 5.00 }, { label: "Kane 1st", val: 5.50 }]
    }
  },
  // ── GROUP E ──────────────────────────────────────────────────────────────
  {
    id: "portugal-netherlands",
    homeTeam: {
      name: "Portugal", flag: "🇵🇹", code: "POR",
      fifa: 7, role: "Euro 2016 Champions",
      elo: 1992, squadValue: "€880M",
      goalsPerGame: 2.3, concededPerGame: 0.7,
      possession: 57, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs Liechtenstein 5–0" }, { r: "W", tip: "vs Bosnia 4–0" },
        { r: "D", tip: "vs Spain 1–1" }, { r: "W", tip: "vs Slovakia 3–1" },
        { r: "W", tip: "vs Luxembourg 2–0" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇵🇹", name: "Cristiano Ronaldo", detail: "Forward · Al Nassr", stat: "130", statLabel: "Intl. Goals" },
        { flag: "🇵🇹", name: "Bruno Fernandes", detail: "Midfielder · Man United", stat: "14", statLabel: "Intl. Goals" },
        { flag: "🇵🇹", name: "Diogo Costa", detail: "Goalkeeper · Porto", stat: "36%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "Netherlands", flag: "🇳🇱", code: "NED",
      fifa: 8, role: "3x World Cup Finalists",
      elo: 1978, squadValue: "€760M",
      goalsPerGame: 1.9, concededPerGame: 0.8,
      possession: 56, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs Belgium 3–2" }, { r: "W", tip: "vs Germany 2–1" },
        { r: "L", tip: "vs France 1–3" }, { r: "W", tip: "vs Scotland 4–0" },
        { r: "D", tip: "vs Poland 1–1" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇳🇱", name: "Cody Gakpo", detail: "Forward · Liverpool", stat: "16", statLabel: "Intl. Goals" },
        { flag: "🇳🇱", name: "Virgil van Dijk", detail: "Defender · Liverpool", stat: "6", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "18:00",
    date: "Monday, 15 June 2026",
    venue: "Levi's Stadium, San Francisco",
    venueCapacity: "68,500",
    venueSurface: "Grass",
    kickoffLocal: "09:00 PT",
    kickoffCET: "18:00 CET",
    group: "Group E",
    odds: { home: 2.20, draw: 3.30, away: 3.10 },
    probHome: 40, probDraw: 28, probAway: 32,
    previewLines: [
      "Ronaldo's final World Cup? The 41-year-old captain remains Portugal's talisman as they face a Netherlands side rebuilt under Ronald Koeman and packed with Premier League talent.",
      "Van Dijk leads one of Europe's tightest defences while Gakpo offers a genuine threat up front. This is a clash between two of Europe's most experienced tournament nations."
    ],
    previewHighlight: "<strong>Record Watch:</strong> Ronaldo could become the oldest player to score at a World Cup — at 41 he remains Portugal's most dangerous weapon.",
    h2h: {
      homeWins: 5, draws: 3, awayWins: 6, total: 14,
      matches: [
        { date: "Nov 2022", home: "Portugal", away: "Netherlands", score: "2 – 0", comp: "WC", winner: "home" },
        { date: "Jun 2019", home: "Portugal", away: "Netherlands", score: "1 – 0", comp: "Nations Lge F", winner: "home" },
        { date: "Nov 2018", home: "Netherlands", away: "Portugal", score: "0 – 1", comp: "Nations Lge", winner: "away" },
        { date: "Mar 2018", home: "Portugal", away: "Netherlands", score: "3 – 0", comp: "Friendly", winner: "home" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.80, bttsNo: 2.00, over25: 1.95, under25: 1.90, over35: 2.95,
      goalscorers: [{ label: "Ronaldo", val: 2.90 }, { label: "Gakpo", val: 3.10 }, { label: "B. Fernandes", val: 4.00 }],
      correctScore: [{ label: "2 – 1", val: 8.00 }, { label: "1 – 0", val: 7.50 }, { label: "1 – 1", val: 6.50 }],
      dc1x: 1.35, dcX2: 1.55,
      htHome: 3.00, htDraw: 2.10, htAway: 3.80,
      fgsFirst: [{ label: "Ronaldo 1st", val: 5.50 }, { label: "Gakpo 1st", val: 6.00 }]
    }
  },
  // ── GROUP F ──────────────────────────────────────────────────────────────
  {
    id: "belgium-croatia",
    homeTeam: {
      name: "Belgium", flag: "🇧🇪", code: "BEL",
      fifa: 10, role: "Golden Generation",
      elo: 1947, squadValue: "€620M",
      goalsPerGame: 1.9, concededPerGame: 0.9,
      possession: 55, cleanSheets: 4,
      form: [
        { r: "W", tip: "vs Azerbaijan 4–1" }, { r: "L", tip: "vs France 1–2" },
        { r: "W", tip: "vs Wales 3–0" }, { r: "D", tip: "vs Sweden 1–1" },
        { r: "W", tip: "vs Estonia 5–0" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇧🇪", name: "Kevin De Bruyne", detail: "Midfielder · Man City", stat: "26", statLabel: "Intl. Goals" },
        { flag: "🇧🇪", name: "Romelu Lukaku", detail: "Forward · Napoli", stat: "85", statLabel: "Intl. Goals" },
        { flag: "🇧🇪", name: "Thibaut Courtois", detail: "Goalkeeper · Real Madrid", stat: "44%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "Croatia", flag: "🇭🇷", code: "CRO",
      fifa: 9, role: "2018 World Cup Runners-Up",
      elo: 1931, squadValue: "€310M",
      goalsPerGame: 1.7, concededPerGame: 0.8,
      possession: 53, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs Armenia 3–0" }, { r: "D", tip: "vs Wales 1–1" },
        { r: "W", tip: "vs Latvia 2–0" }, { r: "W", tip: "vs Turkey 1–0" },
        { r: "D", tip: "vs Albania 2–2" }
      ],
      formRecord: "W3 D2 L0",
      players: [
        { flag: "🇭🇷", name: "Luka Modric", detail: "Midfielder · Real Madrid", stat: "24", statLabel: "Intl. Goals" },
        { flag: "🇭🇷", name: "Ivan Perisic", detail: "Winger · Hajduk Split", stat: "33", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "21:00",
    date: "Thursday, 18 June 2026",
    venue: "Hard Rock Stadium, Miami",
    venueCapacity: "65,326",
    venueSurface: "Grass",
    kickoffLocal: "15:00 ET",
    kickoffCET: "21:00 CET",
    group: "Group F",
    odds: { home: 2.00, draw: 3.40, away: 3.50 },
    probHome: 44, probDraw: 27, probAway: 29,
    previewLines: [
      "Belgium's so-called golden generation gets one last crack at World Cup glory. Led by De Bruyne and Lukaku, they face a battle-hardened Croatia side that has exceeded expectations at every major tournament.",
      "Modric, still producing magical football at 40, leads Croatia once more. This is a clash of veteran leaders against a Belgium squad that know this may be their final chance."
    ],
    previewHighlight: "<strong>Veterans' Duel:</strong> De Bruyne vs Modric — two of the greatest midfielders of their generation face off, possibly for the last time at a World Cup.",
    h2h: {
      homeWins: 5, draws: 2, awayWins: 3, total: 10,
      matches: [
        { date: "Sep 2020", home: "Belgium", away: "Croatia", score: "0 – 0", comp: "Nations Lge", winner: "draw" },
        { date: "Nov 2018", home: "Croatia", away: "Belgium", score: "1 – 2", comp: "Nations Lge", winner: "away" },
        { date: "Jun 2015", home: "Belgium", away: "Croatia", score: "1 – 1", comp: "Friendly", winner: "draw" },
        { date: "Jun 2012", home: "Croatia", away: "Belgium", score: "2 – 1", comp: "Friendly", winner: "home" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.85, bttsNo: 1.95, over25: 2.10, under25: 1.75, over35: 3.10,
      goalscorers: [{ label: "Lukaku", val: 2.50 }, { label: "De Bruyne", val: 4.00 }, { label: "Modric", val: 5.00 }],
      correctScore: [{ label: "2 – 0", val: 7.00 }, { label: "1 – 0", val: 6.50 }, { label: "1 – 1", val: 6.50 }],
      dc1x: 1.30, dcX2: 1.65,
      htHome: 2.80, htDraw: 2.20, htAway: 4.50,
      fgsFirst: [{ label: "Lukaku 1st", val: 4.50 }, { label: "Modric 1st", val: 8.00 }]
    }
  },
  // ── GROUP G ──────────────────────────────────────────────────────────────
  {
    id: "italy-uruguay",
    homeTeam: {
      name: "Italy", flag: "🇮🇹", code: "ITA",
      fifa: 11, role: "Euro 2020 Champions",
      elo: 1950, squadValue: "€650M",
      goalsPerGame: 1.8, concededPerGame: 0.7,
      possession: 58, cleanSheets: 6,
      form: [
        { r: "W", tip: "vs Malta 4–0" }, { r: "D", tip: "vs England 1–1" },
        { r: "W", tip: "vs Albania 2–0" }, { r: "W", tip: "vs Ukraine 2–1" },
        { r: "L", tip: "vs Spain 0–1" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇮🇹", name: "Federico Chiesa", detail: "Forward · Liverpool", stat: "18", statLabel: "Intl. Goals" },
        { flag: "🇮🇹", name: "Lorenzo Pellegrini", detail: "Midfielder · Roma", stat: "12", statLabel: "Intl. Goals" },
        { flag: "🇮🇹", name: "Gianluigi Donnarumma", detail: "Goalkeeper · PSG", stat: "48%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "Uruguay", flag: "🇺🇾", code: "URU",
      fifa: 12, role: "2x World Champions",
      elo: 1934, squadValue: "€380M",
      goalsPerGame: 1.8, concededPerGame: 0.7,
      possession: 51, cleanSheets: 6,
      form: [
        { r: "W", tip: "vs Bolivia 3–0" }, { r: "D", tip: "vs Argentina 1–1" },
        { r: "W", tip: "vs Venezuela 2–0" }, { r: "W", tip: "vs Ecuador 1–0" },
        { r: "L", tip: "vs Brazil 0–1" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇺🇾", name: "Darwin Nunez", detail: "Forward · Liverpool", stat: "22", statLabel: "Intl. Goals" },
        { flag: "🇺🇾", name: "Federico Valverde", detail: "Midfielder · Real Madrid", stat: "11", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "21:00",
    date: "Friday, 19 June 2026",
    venue: "Gillette Stadium, Boston",
    venueCapacity: "65,878",
    venueSurface: "Grass",
    kickoffLocal: "15:00 ET",
    kickoffCET: "21:00 CET",
    group: "Group G",
    odds: { home: 2.30, draw: 3.20, away: 3.10 },
    probHome: 39, probDraw: 28, probAway: 33,
    previewLines: [
      "Two of football's most storied nations — four-time World Champions Italy and two-time champions Uruguay — collide in Group G in what promises to be a tactical, physical battle.",
      "Italy's Azzurri, rebuilt following their shock 2022 qualifying failure, face a Uruguay side boasting Darwin Nunez at the peak of his powers alongside the tireless Federico Valverde."
    ],
    previewHighlight: "<strong>Battle of Champions:</strong> Italy's defensive discipline against Uruguay's relentless pressing — this match could come down to who blinks first.",
    h2h: {
      homeWins: 8, draws: 5, awayWins: 5, total: 18,
      matches: [
        { date: "Nov 2022", home: "Uruguay", away: "Italy", score: "0 – 0", comp: "Friendly", winner: "draw" },
        { date: "Jun 2014", home: "Uruguay", away: "Italy", score: "1 – 0", comp: "WC GS", winner: "home" },
        { date: "Aug 2013", home: "Italy", away: "Uruguay", score: "2 – 2", comp: "Friendly", winner: "draw" },
        { date: "Mar 2012", home: "Italy", away: "Uruguay", score: "3 – 1", comp: "Friendly", winner: "home" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.80, bttsNo: 2.00, over25: 2.20, under25: 1.70, over35: 3.40,
      goalscorers: [{ label: "Nunez", val: 2.70 }, { label: "Chiesa", val: 3.20 }, { label: "Valverde", val: 5.00 }],
      correctScore: [{ label: "1 – 1", val: 6.00 }, { label: "1 – 0", val: 7.00 }, { label: "0 – 1", val: 8.00 }],
      dc1x: 1.38, dcX2: 1.50,
      htHome: 3.20, htDraw: 2.10, htAway: 4.20,
      fgsFirst: [{ label: "Nunez 1st", val: 5.00 }, { label: "Chiesa 1st", val: 6.00 }]
    }
  },
  // ── GROUP H ──────────────────────────────────────────────────────────────
  {
    id: "japan-south-korea",
    homeTeam: {
      name: "Japan", flag: "🇯🇵", code: "JPN",
      fifa: 17, role: "Asian Champions",
      elo: 1879, squadValue: "€320M",
      goalsPerGame: 2.0, concededPerGame: 0.8,
      possession: 54, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs North Korea 5–0" }, { r: "W", tip: "vs China 2–0" },
        { r: "W", tip: "vs Bahrain 3–0" }, { r: "D", tip: "vs Australia 1–1" },
        { r: "W", tip: "vs Saudi Arabia 2–1" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇯🇵", name: "Takumi Minamino", detail: "Forward · Monaco", stat: "24", statLabel: "Intl. Goals" },
        { flag: "🇯🇵", name: "Wataru Endo", detail: "Midfielder · Liverpool", stat: "5", statLabel: "Intl. Goals" },
        { flag: "🇯🇵", name: "Shuichi Gonda", detail: "Goalkeeper · Shimizu S-Pulse", stat: "38%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "South Korea", flag: "🇰🇷", code: "KOR",
      fifa: 20, role: "2002 World Cup Semi-Finalists",
      elo: 1840, squadValue: "€250M",
      goalsPerGame: 1.8, concededPerGame: 0.9,
      possession: 51, cleanSheets: 4,
      form: [
        { r: "W", tip: "vs China 3–0" }, { r: "W", tip: "vs Thailand 4–0" },
        { r: "D", tip: "vs Australia 0–0" }, { r: "W", tip: "vs Iraq 2–1" },
        { r: "L", tip: "vs Japan 0–2" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇰🇷", name: "Son Heung-min", detail: "Forward · Tottenham", stat: "35", statLabel: "Intl. Goals" },
        { flag: "🇰🇷", name: "Lee Kang-in", detail: "Midfielder · PSG", stat: "12", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "15:00",
    date: "Tuesday, 16 June 2026",
    venue: "Arrowhead Stadium, Kansas City",
    venueCapacity: "76,416",
    venueSurface: "Grass",
    kickoffLocal: "08:00 CT",
    kickoffCET: "15:00 CET",
    group: "Group H",
    odds: { home: 2.60, draw: 3.10, away: 2.60 },
    probHome: 35, probDraw: 30, probAway: 35,
    previewLines: [
      "The fiercest rivalry in Asian football erupts on the World Cup stage. Japan and South Korea have met 83 times and the intensity of this fixture needs no context — it is always the most anticipated match on the Asian football calendar.",
      "Son Heung-min leads South Korea hoping to recreate 2002 magic on foreign soil, while Japan — arguably the best Asian side in history — have their sights set on reaching the quarter-finals for the first time."
    ],
    previewHighlight: "<strong>Asian Derby:</strong> Japan vs South Korea is the El Clasico of Asian football — 83 meetings, fierce national pride, and everything on the line.",
    h2h: {
      homeWins: 42, draws: 23, awayWins: 18, total: 83,
      matches: [
        { date: "Mar 2024", home: "Japan", away: "South Korea", score: "0 – 0", comp: "Friendly", winner: "draw" },
        { date: "Jun 2023", home: "South Korea", away: "Japan", score: "0 – 2", comp: "Friendly", winner: "away" },
        { date: "Jul 2022", home: "Japan", away: "South Korea", score: "3 – 0", comp: "E. Nations", winner: "home" },
        { date: "Mar 2021", home: "South Korea", away: "Japan", score: "0 – 3", comp: "Friendly", winner: "away" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.90, bttsNo: 1.90, over25: 2.10, under25: 1.75, over35: 3.30,
      goalscorers: [{ label: "Son", val: 2.60 }, { label: "Minamino", val: 3.00 }, { label: "Lee Kang-in", val: 3.80 }],
      correctScore: [{ label: "1 – 1", val: 5.50 }, { label: "1 – 0", val: 7.00 }, { label: "0 – 1", val: 7.00 }],
      dc1x: 1.42, dcX2: 1.42,
      htHome: 3.40, htDraw: 2.00, htAway: 3.40,
      fgsFirst: [{ label: "Son 1st", val: 5.00 }, { label: "Minamino 1st", val: 5.50 }]
    }
  },
  // ── GROUP I ──────────────────────────────────────────────────────────────
  {
    id: "morocco-senegal",
    homeTeam: {
      name: "Morocco", flag: "🇲🇦", code: "MAR",
      fifa: 14, role: "2022 World Cup Semi-Finalists",
      elo: 1876, squadValue: "€340M",
      goalsPerGame: 1.7, concededPerGame: 0.5,
      possession: 53, cleanSheets: 7,
      form: [
        { r: "W", tip: "vs Tanzania 2–0" }, { r: "W", tip: "vs Gabon 3–0" },
        { r: "W", tip: "vs Zambia 4–0" }, { r: "D", tip: "vs Egypt 1–1" },
        { r: "W", tip: "vs Comoros 3–0" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇲🇦", name: "Achraf Hakimi", detail: "Defender · PSG", stat: "15", statLabel: "Intl. Goals" },
        { flag: "🇲🇦", name: "Hakim Ziyech", detail: "Forward · Galatasaray", stat: "22", statLabel: "Intl. Goals" },
        { flag: "🇲🇦", name: "Yassine Bounou", detail: "Goalkeeper · Al-Hilal", stat: "52%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "Senegal", flag: "🇸🇳", code: "SEN",
      fifa: 18, role: "Africa Cup of Nations Champions",
      elo: 1843, squadValue: "€290M",
      goalsPerGame: 1.8, concededPerGame: 0.7,
      possession: 50, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs Mauritania 2–0" }, { r: "W", tip: "vs Burkina Faso 1–0" },
        { r: "D", tip: "vs Nigeria 1–1" }, { r: "W", tip: "vs Guinea 2–1" },
        { r: "W", tip: "vs Cameroon 3–1" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇸🇳", name: "Sadio Mane", detail: "Forward · Al-Nassr", stat: "36", statLabel: "Intl. Goals" },
        { flag: "🇸🇳", name: "Idrissa Gueye", detail: "Midfielder · Everton", stat: "5", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "18:00",
    date: "Wednesday, 24 June 2026",
    venue: "Lincoln Financial Field, Philadelphia",
    venueCapacity: "69,328",
    venueSurface: "Grass",
    kickoffLocal: "12:00 ET",
    kickoffCET: "18:00 CET",
    group: "Group I",
    odds: { home: 2.30, draw: 3.10, away: 3.00 },
    probHome: 38, probDraw: 29, probAway: 33,
    previewLines: [
      "The best of African football on the world stage. Morocco, who stunned the world in Qatar by reaching the semi-finals, face an equally formidable Senegal side led by Sadio Mane.",
      "This match between two of the continent's giants is being called the 'African final before the final' — both teams have genuine ambitions of going deep in this tournament."
    ],
    previewHighlight: "<strong>African Derby:</strong> Hakimi vs Mane — two of the world's most exciting wide players on opposite sides of an all-African Group I showdown.",
    h2h: {
      homeWins: 7, draws: 3, awayWins: 4, total: 14,
      matches: [
        { date: "Jan 2022", home: "Morocco", away: "Senegal", score: "1 – 1", comp: "AFCON QF", winner: "draw" },
        { date: "Oct 2019", home: "Morocco", away: "Senegal", score: "1 – 1", comp: "Friendly", winner: "draw" },
        { date: "Mar 2017", home: "Senegal", away: "Morocco", score: "2 – 0", comp: "Friendly", winner: "home" },
        { date: "Nov 2015", home: "Morocco", away: "Senegal", score: "2 – 0", comp: "Friendly", winner: "home" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.85, bttsNo: 1.95, over25: 2.20, under25: 1.70, over35: 3.40,
      goalscorers: [{ label: "Mane", val: 2.80 }, { label: "Ziyech", val: 3.20 }, { label: "Hakimi", val: 5.00 }],
      correctScore: [{ label: "1 – 0", val: 7.00 }, { label: "1 – 1", val: 6.00 }, { label: "2 – 1", val: 9.00 }],
      dc1x: 1.38, dcX2: 1.52,
      htHome: 3.10, htDraw: 2.10, htAway: 4.00,
      fgsFirst: [{ label: "Mane 1st", val: 5.50 }, { label: "Ziyech 1st", val: 6.50 }]
    }
  },
  // ── GROUP J ──────────────────────────────────────────────────────────────
  {
    id: "colombia-ecuador",
    homeTeam: {
      name: "Colombia", flag: "🇨🇴", code: "COL",
      fifa: 19, role: "Copa America Runners-Up",
      elo: 1862, squadValue: "€370M",
      goalsPerGame: 2.1, concededPerGame: 0.8,
      possession: 54, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs Venezuela 3–1" }, { r: "W", tip: "vs Chile 2–0" },
        { r: "W", tip: "vs Peru 3–0" }, { r: "D", tip: "vs Argentina 1–1" },
        { r: "W", tip: "vs Paraguay 2–0" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇨🇴", name: "Luis Diaz", detail: "Forward · Liverpool", stat: "14", statLabel: "Intl. Goals" },
        { flag: "🇨🇴", name: "James Rodriguez", detail: "Midfielder · Rayo Vallecano", stat: "28", statLabel: "Intl. Goals" },
        { flag: "🇨🇴", name: "David Ospina", detail: "Goalkeeper · Al-Qadsiah", stat: "39%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "Ecuador", flag: "🇪🇨", code: "ECU",
      fifa: 28, role: "2022 World Cup Group Stage",
      elo: 1791, squadValue: "€220M",
      goalsPerGame: 1.7, concededPerGame: 0.9,
      possession: 49, cleanSheets: 4,
      form: [
        { r: "W", tip: "vs Bolivia 2–0" }, { r: "D", tip: "vs Chile 1–1" },
        { r: "W", tip: "vs Peru 2–1" }, { r: "L", tip: "vs Colombia 0–3" },
        { r: "W", tip: "vs Venezuela 2–0" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇪🇨", name: "Enner Valencia", detail: "Forward · Independiente", stat: "40", statLabel: "Intl. Goals" },
        { flag: "🇪🇨", name: "Moises Caicedo", detail: "Midfielder · Chelsea", stat: "4", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "15:00",
    date: "Saturday, 20 June 2026",
    venue: "State Farm Stadium, Phoenix",
    venueCapacity: "63,400",
    venueSurface: "Grass",
    kickoffLocal: "07:00 MST",
    kickoffCET: "15:00 CET",
    group: "Group J",
    odds: { home: 1.90, draw: 3.30, away: 4.00 },
    probHome: 47, probDraw: 28, probAway: 25,
    previewLines: [
      "Two South American neighbours clash in Group J. Colombia, Copa America runners-up, are heavy favourites but Ecuador — led by the tireless Moises Caicedo — are no pushover.",
      "Luis Diaz brings Liverpool form to the national stage while the legendary Enner Valencia leads Ecuador in what could be his final World Cup."
    ],
    previewHighlight: "<strong>South American Clash:</strong> Caicedo vs James Rodriguez — a battle of generations as Chelsea's midfielder tries to shut down Colombia's creative genius.",
    h2h: {
      homeWins: 12, draws: 5, awayWins: 8, total: 25,
      matches: [
        { date: "Sep 2023", home: "Colombia", away: "Ecuador", score: "0 – 0", comp: "WCQ", winner: "draw" },
        { date: "Jun 2021", home: "Colombia", away: "Ecuador", score: "1 – 0", comp: "Copa A GS", winner: "home" },
        { date: "Oct 2020", home: "Ecuador", away: "Colombia", score: "0 – 6", comp: "WCQ", winner: "away" },
        { date: "Jan 2020", home: "Colombia", away: "Ecuador", score: "1 – 0", comp: "Friendly", winner: "home" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.85, bttsNo: 1.95, over25: 2.00, under25: 1.85, over35: 3.10,
      goalscorers: [{ label: "L. Diaz", val: 2.80 }, { label: "Valencia", val: 3.40 }, { label: "James", val: 4.00 }],
      correctScore: [{ label: "2 – 0", val: 7.00 }, { label: "1 – 0", val: 6.50 }, { label: "2 – 1", val: 9.00 }],
      dc1x: 1.22, dcX2: 1.75,
      htHome: 2.80, htDraw: 2.20, htAway: 5.00,
      fgsFirst: [{ label: "L. Diaz 1st", val: 5.00 }, { label: "Valencia 1st", val: 6.00 }]
    }
  },
  // ── GROUP K ──────────────────────────────────────────────────────────────
  {
    id: "australia-iran",
    homeTeam: {
      name: "Australia", flag: "🇦🇺", code: "AUS",
      fifa: 23, role: "2022 World Cup R16",
      elo: 1812, squadValue: "€180M",
      goalsPerGame: 1.6, concededPerGame: 1.0,
      possession: 48, cleanSheets: 4,
      form: [
        { r: "W", tip: "vs Palestine 3–0" }, { r: "D", tip: "vs South Korea 0–0" },
        { r: "W", tip: "vs Indonesia 2–0" }, { r: "W", tip: "vs China 4–0" },
        { r: "D", tip: "vs Japan 1–1" }
      ],
      formRecord: "W3 D2 L0",
      players: [
        { flag: "🇦🇺", name: "Mathew Ryan", detail: "Goalkeeper · Real Sociedad", stat: "42%", statLabel: "Clean Sheet %" },
        { flag: "🇦🇺", name: "Mitchell Duke", detail: "Forward · Fagiano Okayama", stat: "14", statLabel: "Intl. Goals" },
        { flag: "🇦🇺", name: "Ajdin Hrustic", detail: "Midfielder · Al-Qadsiah", stat: "8", statLabel: "Intl. Goals" }
      ]
    },
    awayTeam: {
      name: "Iran", flag: "🇮🇷", code: "IRN",
      fifa: 22, role: "Asian WCQ 1st Place",
      elo: 1821, squadValue: "€150M",
      goalsPerGame: 1.7, concededPerGame: 0.8,
      possession: 50, cleanSheets: 5,
      form: [
        { r: "W", tip: "vs Qatar 2–0" }, { r: "W", tip: "vs Uzbekistan 1–0" },
        { r: "D", tip: "vs UAE 1–1" }, { r: "W", tip: "vs Kyrgyzstan 3–0" },
        { r: "W", tip: "vs Hong Kong 5–0" }
      ],
      formRecord: "W4 D1 L0",
      players: [
        { flag: "🇮🇷", name: "Mehdi Taremi", detail: "Forward · Inter Milan", stat: "52", statLabel: "Intl. Goals" },
        { flag: "🇮🇷", name: "Sardar Azmoun", detail: "Forward · Roma", stat: "47", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "18:00",
    date: "Thursday, 25 June 2026",
    venue: "Allegiant Stadium, Las Vegas",
    venueCapacity: "65,000",
    venueSurface: "Grass",
    kickoffLocal: "09:00 PT",
    kickoffCET: "18:00 CET",
    group: "Group K",
    odds: { home: 2.80, draw: 3.00, away: 2.60 },
    probHome: 32, probDraw: 31, probAway: 37,
    previewLines: [
      "Australia's Socceroos face their toughest Asian rival in Group K. Iran, boosted by Mehdi Taremi's Serie A brilliance, are narrow favourites but the Australians boast a resilient never-say-die spirit.",
      "This Oceania-Asia clash has enormous group implications — the winner will be well-placed to advance, while defeat could be terminal for either nation."
    ],
    previewHighlight: "<strong>Asian Showdown:</strong> Taremi vs Duke — Iran's prolific Inter Milan striker against Australia's tireless target man.",
    h2h: {
      homeWins: 3, draws: 2, awayWins: 5, total: 10,
      matches: [
        { date: "Nov 2022", home: "Iran", away: "Australia", score: "0 – 0", comp: "WC GS", winner: "draw" },
        { date: "Jan 2015", home: "Iran", away: "Australia", score: "1 – 2", comp: "Asian Cup", winner: "away" },
        { date: "Mar 2013", home: "Australia", away: "Iran", score: "0 – 0", comp: "WCQ", winner: "draw" },
        { date: "Nov 2013", home: "Iran", away: "Australia", score: "1 – 1", comp: "WCQ", winner: "draw" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.90, bttsNo: 1.90, over25: 2.20, under25: 1.70, over35: 3.50,
      goalscorers: [{ label: "Taremi", val: 2.50 }, { label: "Azmoun", val: 3.00 }, { label: "Duke", val: 4.50 }],
      correctScore: [{ label: "0 – 1", val: 7.00 }, { label: "1 – 1", val: 5.50 }, { label: "1 – 0", val: 8.00 }],
      dc1x: 1.52, dcX2: 1.38,
      htHome: 4.00, htDraw: 2.10, htAway: 3.20,
      fgsFirst: [{ label: "Taremi 1st", val: 4.50 }, { label: "Duke 1st", val: 8.00 }]
    }
  },
  // ── GROUP L ──────────────────────────────────────────────────────────────
  {
    id: "canada-saudi-arabia",
    homeTeam: {
      name: "Canada", flag: "🇨🇦", code: "CAN",
      fifa: 41, role: "Host Nation / CONCACAF",
      elo: 1760, squadValue: "€210M",
      goalsPerGame: 1.7, concededPerGame: 1.1,
      possession: 50, cleanSheets: 3,
      form: [
        { r: "W", tip: "vs Cuba 3–0" }, { r: "W", tip: "vs Barbados 4–0" },
        { r: "L", tip: "vs USA 0–2" }, { r: "D", tip: "vs Mexico 1–1" },
        { r: "W", tip: "vs Trinidad 2–0" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇨🇦", name: "Alphonso Davies", detail: "Defender · Bayern Munich", stat: "14", statLabel: "Intl. Goals" },
        { flag: "🇨🇦", name: "Jonathan David", detail: "Forward · Lille", stat: "29", statLabel: "Intl. Goals" },
        { flag: "🇨🇦", name: "Milan Borjan", detail: "Goalkeeper · Red Star Belgrade", stat: "30%", statLabel: "Clean Sheet %" }
      ]
    },
    awayTeam: {
      name: "Saudi Arabia", flag: "🇸🇦", code: "KSA",
      fifa: 56, role: "2022 World Cup Group Stage",
      elo: 1702, squadValue: "€95M",
      goalsPerGame: 1.5, concededPerGame: 1.1,
      possession: 47, cleanSheets: 3,
      form: [
        { r: "W", tip: "vs Kuwait 2–0" }, { r: "D", tip: "vs Bahrain 0–0" },
        { r: "W", tip: "vs Malaysia 4–0" }, { r: "L", tip: "vs Australia 0–1" },
        { r: "W", tip: "vs Jordan 1–0" }
      ],
      formRecord: "W3 D1 L1",
      players: [
        { flag: "🇸🇦", name: "Salem Al-Dawsari", detail: "Forward · Al-Hilal", stat: "25", statLabel: "Intl. Goals" },
        { flag: "🇸🇦", name: "Firas Al-Buraikan", detail: "Forward · Al-Fateh", stat: "18", statLabel: "Intl. Goals" }
      ]
    },
    kickoff: "18:00",
    date: "Friday, 26 June 2026",
    venue: "BC Place, Vancouver",
    venueCapacity: "54,500",
    venueSurface: "Artificial Turf",
    kickoffLocal: "09:00 PT",
    kickoffCET: "18:00 CET",
    group: "Group L",
    odds: { home: 1.80, draw: 3.50, away: 4.50 },
    probHome: 50, probDraw: 26, probAway: 24,
    previewLines: [
      "Canada play at home — in Vancouver — in what could be a historic moment for the country. Powered by Alphonso Davies and Jonathan David, this is a squad genuinely capable of progressing from the group stage.",
      "Saudi Arabia, who famously beat Argentina in 2022, will not be easy opponents but Canada's home advantage and superior quality make them clear favourites."
    ],
    previewHighlight: "<strong>Home Advantage:</strong> Jonathan David — 29 international goals at just 25 — leads Canada's best-ever team at their home World Cup.",
    h2h: {
      homeWins: 3, draws: 0, awayWins: 1, total: 4,
      matches: [
        { date: "Jun 2022", home: "Canada", away: "Saudi Arabia", score: "1 – 0", comp: "Friendly", winner: "home" },
        { date: "Jun 2022", home: "Canada", away: "Saudi Arabia", score: "0 – 0", comp: "Friendly", winner: "draw" },
        { date: "Nov 2021", home: "Saudi Arabia", away: "Canada", score: "0 – 1", comp: "Friendly", winner: "away" },
        { date: "Sep 2016", home: "Canada", away: "Saudi Arabia", score: "2 – 1", comp: "Friendly", winner: "home" }
      ],
      note: ""
    },
    markets: {
      bttsYes: 1.90, bttsNo: 1.90, over25: 2.20, under25: 1.70, over35: 3.40,
      goalscorers: [{ label: "J. David", val: 2.40 }, { label: "Davies", val: 4.50 }, { label: "Al-Dawsari", val: 4.00 }],
      correctScore: [{ label: "2 – 0", val: 6.50 }, { label: "1 – 0", val: 6.00 }, { label: "2 – 1", val: 9.00 }],
      dc1x: 1.20, dcX2: 1.90,
      htHome: 2.50, htDraw: 2.30, htAway: 6.00,
      fgsFirst: [{ label: "J. David 1st", val: 4.00 }, { label: "Al-Dawsari 1st", val: 7.00 }]
    }
  }
];

// Export for Node; attach to window for browser
if (typeof module !== "undefined") module.exports = { MATCHES };
else window.MATCHES = MATCHES;
