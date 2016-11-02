/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/name-unicode.js

const optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'один' },
  { name: '两' },
  { name: 'три', alias: 'т' }
];

test('name-unicode: unicode names and aliases are permitted', t => {
  const argv = [ '--один', '1', '--两', '2', '-т', '3' ];
  const result = cliArgs(optionDefinitions, argv);
  t.strictEqual(result.один, '1');
  t.strictEqual(result.两, '2');
  t.strictEqual(result.три, '3');
}).
end();
