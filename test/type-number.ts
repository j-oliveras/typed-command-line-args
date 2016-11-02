/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/type-number.js

const optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'one', type: Number }
];

test('type-number: different values', t => {
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', '1' ]),
    { one: 1 }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one' ]),
    { one: null }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', '-1' ]),
    { one: -1 }
  );
  const result = cliArgs(optionDefinitions, [ '--one', 'asdf' ]);
  t.ok(isNaN(result.one));
}).
end();
