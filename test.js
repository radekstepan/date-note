const tap = require('tap');
const mockdate = require('mockdate');

const transform = require('./transform');

mockdate.set('1/1/2000');

// Multiline with a period.
tap.equal(transform(
`All this happened,
more or less.

One morning.
`), '2000-01-01-all_this_happened_more_or_less');

// Multiple newlines.
tap.equal(transform(
`All this happened,
more or less

One morning
`), '2000-01-01-all_this_happened_more_or_less');

// Whole text.
tap.equal(transform(
`All this happened,
more or less
One morning
`), '2000-01-01-all_this_happened_more_or_less_one_mor');

// First line, without a period.
tap.equal(transform(
`All this happened, more or less

One morning.
`), '2000-01-01-all_this_happened_more_or_less');

// First line, with a dash.
tap.equal(transform(
`2nd Jan 2000 - All this happened - more or less
One morning
`), '2000-01-02-all_this_happened_more_or_less');

// Alternative date format.
tap.equal(transform(
`2000-01-02 - All this happened - more or less
One morning
`), '2000-01-02-all_this_happened_more_or_less');

// Short date format with year autocomplete.
tap.equal(transform(
`2nd Jan - All this happened - more or less
One morning
`), '2000-01-02-all_this_happened_more_or_less');

// Too much guesswork.
tap.equal(transform(
`3rd - All this happened - more or less
One morning
`), '2000-01-01-3rd_all_this_happened_more_or_less');

// Unrecognized date.
tap.equal(transform(
`All this - happened
more or less
`), '2000-01-01-all_this_happened_more_or_less');

// Empty input.
tap.throws(() => transform(''));
