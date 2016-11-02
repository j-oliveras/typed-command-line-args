/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/type-string.js

const optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'one', type: String }
];

test('type-string: different values', t => {
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', 'yeah' ]),
    { one: 'yeah' }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one' ]),
    { one: null }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', '3' ]),
    { one: '3' }
  );
}).
end();
