#!/usr/bin/env node
'use strict';
// Local dev server for the admin panel.
// Serves static files AND proxies The Odds API to avoid browser CORS errors.
//
// Usage:  node start.js
//         then open  http://localhost:3000

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT = 3000;
const DIR  = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.ico':  'image/x-icon',
};

const PASS_HEADERS = [
  'content-type', 'x-requests-remaining', 'x-requests-used', 'x-requests-last',
];

http.createServer(function(req, res) {
  var raw = req.url || '/';

  // ── API proxy: /proxy/* → https://api.the-odds-api.com/* ──────────────────
  if (raw.startsWith('/proxy/')) {
    var target = 'https://api.the-odds-api.com' + raw.slice('/proxy'.length);
    https.get(target, function(apiRes) {
      var out = { 'Access-Control-Allow-Origin': '*' };
      PASS_HEADERS.forEach(function(h) { if (apiRes.headers[h]) out[h] = apiRes.headers[h]; });
      res.writeHead(apiRes.statusCode, out);
      apiRes.pipe(res);
    }).on('error', function(e) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    });
    return;
  }

  // ── Static files ───────────────────────────────────────────────────────────
  var filePart = raw.split('?')[0];
  if (filePart === '/') filePart = '/admin.html';
  var full = path.join(DIR, filePart);

  // Safety: only serve files inside project dir
  if (!full.startsWith(DIR + path.sep) && full !== DIR) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(full, function(err, data) {
    if (err) { res.writeHead(404); res.end('Not found: ' + filePart); return; }
    var ext = path.extname(full).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });

}).listen(PORT, '127.0.0.1', function() {
  console.log('');
  console.log('  Admin panel → http://localhost:' + PORT);
  console.log('  Press Ctrl+C to stop.');
  console.log('');
});
