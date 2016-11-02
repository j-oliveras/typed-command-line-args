/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/notations.js

test('getOpt short notation: two flags, one option', t => {
  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'flagA', alias: 'a' },
    { name: 'flagB', alias: 'b' },
    { name: 'three', alias: 'c' }
  ];

  const argv = [ '-abc', 'yeah' ];
  t.deepEquals(cliArgs(optionDefinitions, argv), {
    flagA: true,
    flagB: true,
    three: 'yeah'
  });
}).
end();

test('option=value notation: two plus a regular notation', t => {
  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'one' },
    { name: 'two' },
    { name: 'three' }
  ];

  const argv = [ '--one=1', '--two', '2', '--three=3' ];
  const result = cliArgs(optionDefinitions, argv);
  t.strictEqual(result.one, '1');
  t.strictEqual(result.two, '2');
  t.strictEqual(result.three, '3');
}).
end();
