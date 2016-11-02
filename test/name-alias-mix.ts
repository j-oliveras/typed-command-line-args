/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/name-alias-mix.js

const optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'one', alias: 'o' },
  { name: 'two', alias: 't' },
  { name: 'three', alias: 'h' },
  { name: 'four', alias: 'f' }
];

test('name-alias-mix: one of each', t => {
  const argv = [ '--one', '-t', '--three' ];
  const result = cliArgs(optionDefinitions, argv);
  t.strictEqual(result.one, true);
  t.strictEqual(result.two, true);
  t.strictEqual(result.three, true);
  t.strictEqual(result.four, undefined);
}).
end();
