#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const transform = require('./transform');

process.stdin.setEncoding('utf8');
process.stdin.resume();
process.stdin.on('readable', () => {
  let chunk, body = '';
  while ((chunk = process.stdin.read()) !== null) {
    body += chunk;
  }

  const filename = transform(body) + '.txt';
  fs.writeFileSync(path.resolve(process.cwd(), filename), body);
  console.log(filename);
  process.exit(0);
});

