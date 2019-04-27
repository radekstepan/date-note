#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const ora = require('ora');
const error = require('serialize-error');
const truncate = require('cli-truncate');
const slugify = require('slugify');

const MAX_LENGTH = 40;

(async function run() {
  const status = ora();

  const cwd = process.cwd();
  const resolve = (...args) => path.resolve(...[cwd, ...args]);

  try {
    status.start('Start');

    const [input] = process.argv.slice(2);
    if (!input) {
      throw 'You need to pass the `input` filename as an argument';
    }

    const body = await promisify(fs.readFile)(resolve(input), 'utf8');

    const a = body.search(/\S/m);
    if (a === -1) {
      throw 'Input file is empty';
    }
    const b = body.search(/\./m);
    let title = b === -1 ? body.substr(a) : body.substr(a, b - a);
    title = truncate(title, MAX_LENGTH, {mark: ''}).replace('…', '');

    const slug = slugify(title, {
      replacement: '_',
      lower: true
    });

    const date = new Date().toISOString().substring(0, 10);

    const output = `${date}-${slug}${path.extname(input)}`;

    await promisify(fs.rename)(...[input, output].map(arg => resolve(arg)));

    status.succeed(output);
    process.exit(0);
  } catch (err) {
    status.fail(error(err).message);
    process.exit(1);
  }
})();
