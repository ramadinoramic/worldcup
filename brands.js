// ── BRAND CONFIGURATIONS ─────────────────────────────────────────────────────
// Edit each brand to configure affiliate links, colors, and bonus copy.
// registerUrl: your full affiliate link including the ref/tracking parameter.
// accentHex:   primary brand color (used throughout the generated page).
// logoHtml:    HTML for the brand logo — use <span> to color part of the name.
// Bonus/disclaimer/mobile-bar copy must be provided in all 3 languages.

const BRANDS = [
  {
    id: "youwin",
    name: "Youwin",
    logoHtml: "YOU<span>WIN</span>",
    accentHex: "#E41E3F",
    registerUrl: "https://youwin.com/register?ref=21331414",
    bonusHeadline: {
      en: "100% Bonus<br>up to \u20ac100",
      de: "100% Bonus<br>bis zu 100\u00a0\u20ac",
      tr: "\u20ac100\u2019a Kadar<br>%100 Bonus"
    },
    bonusSub: {
      en: "New customers only &middot; Min. deposit \u20ac10 &middot; T&amp;Cs apply",
      de: "Nur Neukunden &middot; Mind. 10\u00a0\u20ac Einzahlung &middot; AGB gelten",
      tr: "Yaln\u0131zca yeni \u00fcyeler &middot; Min. \u20ac10 yat\u0131r\u0131m &middot; \u015eartlar ge\u00e7erlidir"
    },
    claimBonus: {
      en: "Claim Bonus &rarr;",
      de: "Bonus sichern &rarr;",
      tr: "Bonusu Al &rarr;"
    },
    disclaimer: {
      en: "18+ only. Please gamble responsibly. Youwin is licensed and regulated. Betting involves risk \u2014 only bet what you can afford to lose. If gambling becomes a problem, visit <strong>begambleaware.org</strong>.",
      de: "Nur ab 18 Jahren. Bitte spielen Sie verantwortungsbewusst. Youwin ist lizenziert und reguliert. Wetten beinhalten Risiken.",
      tr: "Sadece 18+. L\u00fctfen sorumlu oynay\u0131n. Youwin lisansl\u0131 ve denetimli bir bahis sitesidir."
    },
    mobBarLabel:   { en: "Daily Prize Pool",        de: "T\u00e4glicher Preispool",        tr: "G\u00fcnl\u00fck \u00d6d\u00fcl Havuzu"     },
    mobBarVal:     { en: "Get free $10 in bets",    de: "10$ gratis wetten",              tr: "$10 \u00fccretsiz bahis kazan"       },
    mobBarBtnMain: { en: "Bet Now",                 de: "Jetzt wetten",                   tr: "\u015eimdi Bahis Yap"               },
    mobBarBtnSub:  { en: "Get $10 Free Bonus!",     de: "10$ Gratis-Bonus!",              tr: "$10 \u00dccretsi\u0307z Bonus Al!"  }
  },
  {
    id: "brand2",
    name: "Brand 2",
    logoHtml: "BRAND<span>2</span>",
    accentHex: "#2563EB",
    registerUrl: "https://example.com/register?ref=REPLACE_BRAND2",
    bonusHeadline: {
      en: "200% Bonus<br>up to \u20ac200",
      de: "200% Bonus<br>bis zu 200\u00a0\u20ac",
      tr: "\u20ac200\u2019a Kadar<br>%200 Bonus"
    },
    bonusSub: {
      en: "New customers only &middot; Min. deposit \u20ac10 &middot; T&amp;Cs apply",
      de: "Nur Neukunden &middot; Mind. 10\u00a0\u20ac Einzahlung &middot; AGB gelten",
      tr: "Yaln\u0131zca yeni \u00fcyeler &middot; Min. \u20ac10 yat\u0131r\u0131m &middot; \u015eartlar ge\u00e7erlidir"
    },
    claimBonus: {
      en: "Claim Bonus &rarr;",
      de: "Bonus sichern &rarr;",
      tr: "Bonusu Al &rarr;"
    },
    disclaimer: {
      en: "18+ only. Please gamble responsibly. Betting involves risk \u2014 only bet what you can afford to lose.",
      de: "Nur ab 18 Jahren. Bitte spielen Sie verantwortungsbewusst. Wetten beinhalten Risiken.",
      tr: "Sadece 18+. L\u00fctfen sorumlu oynay\u0131n. Kumar ba\u011f\u0131ml\u0131l\u0131k yapabilir."
    },
    mobBarLabel:   { en: "Welcome Bonus",           de: "Willkommensbonus",               tr: "Ho\u015fgeldin Bonusu"              },
    mobBarVal:     { en: "Get \u20ac20 Free Bet",   de: "20\u00a0\u20ac Gratiswette",     tr: "\u20ac20 \u00dccretsi\u0307z Bahis" },
    mobBarBtnMain: { en: "Bet Now",                 de: "Jetzt wetten",                   tr: "\u015eimdi Bahis Yap"               },
    mobBarBtnSub:  { en: "Claim \u20ac200 Bonus!",  de: "200\u00a0\u20ac Bonus holen!",   tr: "\u20ac200 Bonus Al!"               }
  },
  {
    id: "brand3",
    name: "Brand 3",
    logoHtml: "BRAND<span>3</span>",
    accentHex: "#16A34A",
    registerUrl: "https://example.com/register?ref=REPLACE_BRAND3",
    bonusHeadline: {
      en: "150% Bonus<br>up to \u20ac150",
      de: "150% Bonus<br>bis zu 150\u00a0\u20ac",
      tr: "\u20ac150\u2019a Kadar<br>%150 Bonus"
    },
    bonusSub: {
      en: "New customers only &middot; Min. deposit \u20ac10 &middot; T&amp;Cs apply",
      de: "Nur Neukunden &middot; Mind. 10\u00a0\u20ac Einzahlung &middot; AGB gelten",
      tr: "Yaln\u0131zca yeni \u00fcyeler &middot; Min. \u20ac10 yat\u0131r\u0131m &middot; \u015eartlar ge\u00e7erlidir"
    },
    claimBonus: {
      en: "Claim Bonus &rarr;",
      de: "Bonus sichern &rarr;",
      tr: "Bonusu Al &rarr;"
    },
    disclaimer: {
      en: "18+ only. Please gamble responsibly. Betting involves risk \u2014 only bet what you can afford to lose.",
      de: "Nur ab 18 Jahren. Bitte spielen Sie verantwortungsbewusst. Wetten beinhalten Risiken.",
      tr: "Sadece 18+. L\u00fctfen sorumlu oynay\u0131n. Kumar ba\u011f\u0131ml\u0131l\u0131k yapabilir."
    },
    mobBarLabel:   { en: "Special Offer",           de: "Sonderangebot",                  tr: "\u00d6zel Teklif"                  },
    mobBarVal:     { en: "\u20ac150 Welcome Bonus", de: "150\u00a0\u20ac Willkommensbonus",tr: "\u20ac150 Ho\u015fgeldin Bonusu"  },
    mobBarBtnMain: { en: "Bet Now",                 de: "Jetzt wetten",                   tr: "\u015eimdi Bahis Yap"               },
    mobBarBtnSub:  { en: "Claim \u20ac150 Bonus!",  de: "150\u00a0\u20ac Bonus holen!",   tr: "\u20ac150 Bonus Al!"               }
  },
  {
    id: "brand4",
    name: "Brand 4",
    logoHtml: "BRAND<span>4</span>",
    accentHex: "#D97706",
    registerUrl: "https://example.com/register?ref=REPLACE_BRAND4",
    bonusHeadline: {
      en: "Free Bets<br>up to \u20ac50",
      de: "Gratiswetten<br>bis zu 50\u00a0\u20ac",
      tr: "\u20ac50\u2019ye Kadar<br>\u00dccretsi\u0307z Bahis"
    },
    bonusSub: {
      en: "New customers only &middot; Min. deposit \u20ac10 &middot; T&amp;Cs apply",
      de: "Nur Neukunden &middot; Mind. 10\u00a0\u20ac Einzahlung &middot; AGB gelten",
      tr: "Yaln\u0131zca yeni \u00fcyeler &middot; Min. \u20ac10 yat\u0131r\u0131m &middot; \u015eartlar ge\u00e7erlidir"
    },
    claimBonus: {
      en: "Get Free Bets &rarr;",
      de: "Gratiswetten holen &rarr;",
      tr: "\u00dccretsi\u0307z Bahis Al &rarr;"
    },
    disclaimer: {
      en: "18+ only. Please gamble responsibly. Betting involves risk \u2014 only bet what you can afford to lose.",
      de: "Nur ab 18 Jahren. Bitte spielen Sie verantwortungsbewusst. Wetten beinhalten Risiken.",
      tr: "Sadece 18+. L\u00fctfen sorumlu oynay\u0131n. Kumar ba\u011f\u0131ml\u0131l\u0131k yapabilir."
    },
    mobBarLabel:   { en: "Free Bet Offer",          de: "Gratiswette Angebot",            tr: "\u00dccretsi\u0307z Bahis Teklifi" },
    mobBarVal:     { en: "\u20ac50 in Free Bets",   de: "50\u00a0\u20ac Gratiswetten",    tr: "\u20ac50 \u00dccretsi\u0307z Bahis"},
    mobBarBtnMain: { en: "Claim Now",               de: "Jetzt sichern",                  tr: "Hemen Al"                         },
    mobBarBtnSub:  { en: "Get \u20ac50 Free!",      de: "50\u00a0\u20ac gratis!",         tr: "\u20ac50 \u00dccretsi\u0307z Al!" }
  }
];

if (typeof module !== "undefined") module.exports = { BRANDS };
else window.BRANDS = BRANDS;
