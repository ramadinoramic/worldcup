#!/usr/bin/env node
// Usage:
//   node generate.js                      — generate all matches
//   node generate.js argentina-france     — generate one match by ID
//   node generate.js --list               — list available match IDs

const fs = require("fs");
const path = require("path");
const { MATCHES } = require("./matches-data.js");
const { generateMatchHTML } = require("./match-template.js");

const arg = process.argv[2];

if (arg === "--list") {
  console.log("Available match IDs:");
  MATCHES.forEach(m => console.log(`  ${m.id}  (${m.homeTeam.name} vs ${m.awayTeam.name})`));
  process.exit(0);
}

const targets = arg
  ? MATCHES.filter(m => m.id === arg)
  : MATCHES;

if (arg && targets.length === 0) {
  console.error(`Match "${arg}" not found. Run with --list to see available IDs.`);
  process.exit(1);
}

targets.forEach(m => {
  const filename = `match-${m.id}.html`;
  const outPath = path.join(__dirname, filename);
  fs.writeFileSync(outPath, generateMatchHTML(m), "utf8");
  console.log(`Generated: ${filename}`);
});

console.log(`\nDone — ${targets.length} file(s) written.`);
