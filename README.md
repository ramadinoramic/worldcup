# Youwin Premium Betting Landing Pages

## Design

Clean, minimal, professional betting landing pages inspired by Sorare's design language. Built for FIFA World Cup 2026 with focus on conversion and user experience.

---

## Project Structure

```
worldcup/
├── README.md
├── index.html                    # Homepage with match listings
├── match-argentina-france.html   # Argentina vs France
├── match-brazil-germany.html     # Brazil vs Germany
└── match-spain-portugal.html     # Spain vs Portugal
```

---

## Design System

**Color Palette**
```css
--bg-primary:     #0A0A0F   /* Main background */
--bg-secondary:   #13131A   /* Card backgrounds */
--bg-tertiary:    #1A1A24   /* Nested elements */
--accent-red:     #E41E3F   /* Youwin brand */
--text-primary:   #FFFFFF
--text-secondary: #A0A0B0
--text-tertiary:  #6B6B78
```

**Typography**: Inter (Google Fonts)

**Breakpoints**
- Desktop: > 1024px
- Tablet: 769–1024px
- Mobile: < 768px

---

## Key Features

- Dark mode first design
- Glassmorphism nav (backdrop blur)
- Animated live badge on hero
- Shimmer hover effect on CTA buttons
- Mobile sticky bottom CTA bar
- Interactive odds cards with hover states
- Color-coded form badges (W/D/L)
- Head-to-head stats grid
- Responsive match grid on homepage
- Welcome bonus banner
- No JavaScript required — pure HTML/CSS

---

## Affiliate Link

All CTAs use:
```
https://youwin.com/register?ref=21331414
```

To change it, find and replace across all files.

---

## Creating More Match Pages

1. Copy any `match-*.html` file
2. Rename: `match-[team1]-[team2].html`
3. Update:
   - `<title>` tag
   - Team flags, names, FIFA ranks
   - Match date, time, stadium
   - Odds values
   - Form badges and results
   - H2H stats
   - Last meeting info

---

## Adding Language Versions

1. Copy match file, rename with `-de.html` or `-tr.html` suffix
2. Translate all visible text
3. Update `href` in language switcher buttons

---

## Deployment

No build process needed — static HTML files.

**Netlify**: Drag & drop the folder
**GitHub Pages**: Push repo, enable Pages
**Any hosting**: Upload via FTP

---

## Legal

Each page includes:
- 18+ notice
- Responsible gambling disclaimer
- Licensed operator statement

---

18+ | Gamble Responsibly | begambleaware.org
