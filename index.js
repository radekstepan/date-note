#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const ora = require('ora');
const error = require('serialize-error');

const transform = require('./transform');

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

    const output = transform(body) + path.extname(input);

    await promisify(fs.rename)(...[input, output].map(arg => resolve(arg)));

    status.succeed(output);
    process.exit(0);
  } catch (err) {
    status.fail(error(err).message);
    process.exit(1);
  }
})();
