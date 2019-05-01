const {EOL} = require('os');

const truncate = require('cli-truncate');
const slugify = require('slugify');
const chrono = require('chrono-node');

const MAX_LENGTH = 40;

module.exports = body => {
  const a = body.search(/\S/m);
  if (a === -1) {
    throw 'Input file is empty';
  }

  // Check the first line.
  const first = body.substr(0, body.search(EOL));
  let [date, ...title] = first.split('-');
  date = chrono.parseDate(date);

  if (date) {
    title = title.join('-').trim();
  } else {
    // Try period.
    let b = body.search(/\./m);
    // Or two newlines.
    if (b === -1) {
      b = body.search([EOL, EOL].join(''));
    }
    title = b === -1 ? body.substr(a) : body.substr(a, b - a);
    // Now.
    date = new Date();
  }

  title = truncate(title, MAX_LENGTH, {mark: ''}).replace('…', '');
  const slug = slugify(title, {
    replacement: '_',
    lower: true
  });

  date = date.toISOString().substring(0, 10);

  return [date, slug].join('-');
};
