/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/type-number-multiple.js

const optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'array', type: Number, multiple: true }
];

test('number multiple: 1', t => {
  const argv = [ '--array', '1', '2', '3' ];
  const result = cliArgs(optionDefinitions, argv);
  t.deepEquals(result, {
    array: [ 1, 2, 3 ]
  });
  t.isNotDeepEqual(result, {
    array: [ '1', '2', '3' ]
  });
}).
end();

test('number multiple: 2', t => {
  const argv = [ '--array', '1', '--array', '2', '--array', '3' ];
  const result = cliArgs(optionDefinitions, argv);
  t.deepEquals(result, {
    array: [ 1, 2, 3 ]
  });
  t.isNotDeepEqual(result, {
    array: [ '1', '2', '3' ]
  });
}).
end();
