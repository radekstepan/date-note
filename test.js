const tap = require('tap');
const mockdate = require('mockdate');

const transform = require('./transform');

mockdate.set('1/1/2000');

// Multiline with a period.
tap.equal('2000-01-01-all_this_happened_more_or_less', transform(
`
All this happened,
more or less.

One morning.
`));

// Multiple newlines.
tap.equal('2000-01-01-all_this_happened_more_or_less', transform(
`
All this happened,
more or less

One morning
`));

// Whole text.
tap.equal('2000-01-01-all_this_happened_more_or_less_one_mor', transform(
`
All this happened,
more or less
One morning
`));

// First line, with a dash.
tap.equal('2000-01-02-all_this_happened_more_or_less', transform(
`2nd Jan 2000 - All this happened - more or less
One morning
`));

// Alternative date format.
tap.equal('2000-01-02-all_this_happened_more_or_less', transform(
`2000-01-02 - All this happened - more or less
One morning
`));

// Short date format with year autocomplete.
tap.equal('2000-01-02-all_this_happened_more_or_less', transform(
`2nd Jan - All this happened - more or less
One morning
`));

// Too much guesswork.
tap.equal('2000-01-01-3rd_all_this_happened_more_or_less', transform(
`3rd - All this happened - more or less
One morning
`));

// Unrecognized date.
tap.equal('2000-01-01-all_this_happened_more_or_less', transform(
`All this - happened
more or less
`));

// Empty input.
tap.throws(() => transform(''));
