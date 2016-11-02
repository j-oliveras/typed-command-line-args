/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/type-none.js

const optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'one' },
  { name: 'two' }
];

test('name: no argv values', t => {
  const argv = [];
  const result = cliArgs(optionDefinitions, argv);
  t.deepEquals(result, {});
}).
end();

test('name: just names, no values', t => {
  const argv = [ '--one', '--two' ];
  const result = cliArgs(optionDefinitions, argv);
  t.deepEquals(result, {
    one: true,
    two: true
  });
}).
end();

test('name: just names, no values, unpassed value', t => {
  const argv = [ '--one', '--two' ];
  const result = cliArgs(optionDefinitions, argv);
  t.deepEquals(result, {
    one: true,
    two: true
  });
}).
end();

test('name: just names, one value, one unpassed value', t => {
  const argv = [ '--one', 'one', '--two' ];
  const result = cliArgs(optionDefinitions, argv);
  t.deepEquals(result, {
    one: 'one',
    two: true
  });
}).
end();

test('name: just names, two values', t => {
  const argv = [ '--one', 'one', '--two', 'two' ];
  const result = cliArgs(optionDefinitions, argv);
  t.deepEquals(result, {
    one: 'one',
    two: 'two'
  });
}).
end();
