const {EOL} = require('os');

const truncate = require('cli-truncate');
const slugify = require('slugify');
const chrono = require('chrono-node');
const pad = require('zero-fill');

const MAX_LENGTH = 40;
const DATE_TITLE_SEP = ' - ';
const REPLACEMENT = '_';
const NEWLINE = [EOL, EOL].join('');

module.exports = body => {
  const a = body.search(/\S/m);
  if (a === -1) {
    throw 'Input file is empty';
  }

  // Check the first line.
  const first = body.substr(0, body.search(EOL));
  let [date, ...title] = first.split(DATE_TITLE_SEP);
  date = chrono.parseDate(date);

  if (date) {
    title = title.join(DATE_TITLE_SEP).trim();
  } else {
    // Try period.
    let b = body.search(/\./m);
    // Or two newlines.
    if (b === -1) {
      b = body.search(NEWLINE);
    }
    title = b === -1 ? body.substr(a) : body.substr(a, b - a);
    // Make sure there are no newlines in between.
    let c = title.search(NEWLINE);
    if (c !== -1) {
      title = title.substr(0, c);
    }

    // Now.
    date = new Date();
  }

  title = truncate(title, MAX_LENGTH, {mark: ''}).replace('…', '');
  const slug = slugify(title, {
    replacement: REPLACEMENT,
    lower: true
  });

  return [
    date.getFullYear(),
    pad(2, date.getMonth() + 1),
    pad(2, date.getDate()),
    slug
  ].join('-');
};
