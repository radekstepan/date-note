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
tap.equal('2000-01-01-all_this_happened_more_or_less', transform(
`1st Jan 2000 - All this happened - more or less
One morning
`));

// Unrecognized date.
tap.equal('2000-01-01-all_this_happened_more_or_less', transform(
`All this - happened
more or less
`));

// Empty input.
tap.throws(() => transform(''));
