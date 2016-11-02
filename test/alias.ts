/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/alias.js

const optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'verbose', alias: 'v' },
  { name: 'colour', alias: 'c' },
  { name: 'number', alias: 'n' },
  { name: 'dry-run', alias: 'd' }
];

test('alias: one boolean', t => {
  const argv = [ '-v' ];
  t.deepEqual(cliArgs(optionDefinitions, argv), {
    verbose: true
  });
}).
end();

test('alias: one --this-type boolean', t => {
  const argv = [ '-d' ];
  t.deepEqual(cliArgs(optionDefinitions, argv), {
    'dry-run': true
  });
}).
end();

test('alias: one boolean, one string', t => {
  const argv = [ '-v', '-c' ];
  t.deepEqual(cliArgs(optionDefinitions, argv), {
    verbose: true,
    colour: true
  });
}).
end();
