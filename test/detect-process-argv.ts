/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/detect-process-argv.js

test('detect process.argv: should automatically remove first two argv items', t => {
  process.argv = [ 'node', 'filename', '--one', 'eins' ];
  t.deepEquals(cliArgs([{ name: 'one' }], process.argv), {
    one: 'eins'
  });
}).
end();

test('process.argv is left untouched', t => {
  process.argv = [ 'node', 'filename', '--one', 'eins' ];
  t.deepEquals(cliArgs([{ name: 'one' }]), {
    one: 'eins'
  });
  t.deepEquals(process.argv, [ 'node', 'filename', '--one', 'eins' ]);
}).
end();
