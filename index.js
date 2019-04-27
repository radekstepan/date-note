#!/usr/bin/env node
const {promisify} = require('util');

const ora = require('ora');
const error = require('serialize-error');
const glob = promisify(require('glob'));

(async function run() {
  const status = ora();

  try {
    status.start('Start');

    const cwd = process.cwd();
    const [pattern] = process.argv.slice(2);
    const files = await glob(pattern, {cwd});

    for (const file of files) {
      status.text = file;
      await new Promise(r => setTimeout(r, 1e3));
    }

    status.succeed('Done');
    process.exit(0);
  } catch (err) {
    status.fail(error(err));
    process.exit(1);
  }
})();
