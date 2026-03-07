// Shared match data — used by admin.html (browser) and generate.js (Node CLI)
const MATCHES = [
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
      bttsYes: 1.75, bttsNo: 2.05,
      over25: 1.90, under25: 1.95, over35: 2.80,
      goalscorers: [
        { label: "Messi", val: 3.40 }, { label: "Mbappe", val: 2.30 }, { label: "Lautaro", val: 3.10 }
      ],
      correctScore: [
        { label: "1 – 1", val: 6.50 }, { label: "2 – 1", val: 8.00 }, { label: "1 – 2", val: 10.00 }
      ],
      dc1x: 1.30, dcX2: 1.65,
      htHome: 2.80, htDraw: 2.10, htAway: 3.80,
      fgsFirst: [
        { label: "Mbappe 1st", val: 5.50 }, { label: "Messi 1st", val: 7.00 }
      ]
    }
  },
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
      "Brazil's fluid attacking play will be tested against Gareth Southgate's disciplined England — a side that has shown considerable defensive solidity while improving their offensive output under the current setup."
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
      bttsYes: 1.80, bttsNo: 2.00,
      over25: 1.95, under25: 1.90, over35: 2.90,
      goalscorers: [
        { label: "Vinicius", val: 2.60 }, { label: "Kane", val: 2.80 }, { label: "Rodrygo", val: 3.50 }
      ],
      correctScore: [
        { label: "1 – 0", val: 7.00 }, { label: "2 – 1", val: 8.50 }, { label: "1 – 1", val: 6.00 }
      ],
      dc1x: 1.35, dcX2: 1.55,
      htHome: 2.90, htDraw: 2.20, htAway: 4.00,
      fgsFirst: [
        { label: "Vinicius 1st", val: 5.00 }, { label: "Kane 1st", val: 5.50 }
      ]
    }
  },
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
      bttsYes: 1.85, bttsNo: 1.95,
      over25: 1.85, under25: 2.00, over35: 3.00,
      goalscorers: [
        { label: "Havertz", val: 3.20 }, { label: "Yamal", val: 3.00 }, { label: "Wirtz", val: 3.40 }
      ],
      correctScore: [
        { label: "1 – 1", val: 6.00 }, { label: "1 – 2", val: 9.00 }, { label: "2 – 1", val: 9.00 }
      ],
      dc1x: 1.45, dcX2: 1.40,
      htHome: 3.20, htDraw: 2.00, htAway: 3.60,
      fgsFirst: [
        { label: "Yamal 1st", val: 6.00 }, { label: "Havertz 1st", val: 6.50 }
      ]
    }
  }
];

// Export for Node; attach to window for browser
if (typeof module !== "undefined") module.exports = { MATCHES };
else window.MATCHES = MATCHES;
