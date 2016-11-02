/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/default-value.js

test('default value', t => {
  t.deepEquals(cliArgs([ { name: 'one' }, { name: 'two', defaultValue: 'two' } ], [ '--one', '1' ]), {
    one: '1',
    two: 'two'
  });
  t.deepEquals(cliArgs([{ name: 'two', defaultValue: 'two' }], []), {
    two: 'two'
  });
  t.deepEquals(cliArgs([{ name: 'two', defaultValue: 'two' }], [ '--two', 'zwei' ]), {
    two: 'zwei'
  });
  t.deepEquals(
    cliArgs([{ name: 'two', multiple: true, defaultValue: ['two', 'zwei'] }], [ '--two', 'duo' ]),
    { two: [ 'duo' ] }
  );
}).
end();

test('default value 2', t => {
  const defs = [{ name: 'two', multiple: true, defaultValue: ['two', 'zwei'] }];
  const result = cliArgs(defs, []);
  t.deepEquals(result, { two: [ 'two', 'zwei' ] });
}).
end();

test('default value: array as defaultOption', t => {
  const defs = [
    { name: 'two', multiple: true, defaultValue: ['two', 'zwei'], defaultOption: true }
  ];
  const argv = [ 'duo' ];
  t.deepEquals(cliArgs(defs, argv), { two: [ 'duo' ] });
}).
end();

test('default value: falsy default values', t => {
  const defs = [
    { name: 'one', defaultValue: 0 },
    { name: 'two', defaultValue: false }
  ];

  const argv = [];
  t.deepEquals(cliArgs(defs, argv), {
    one: 0,
    two: false
  });
}).
end();
