/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/type-boolean-multiple.js

const optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'array', type: Boolean, multiple: true }
];

test('type-boolean-multiple: 1', t => {
  const argv = [ '--array', '--array', '--array' ];
  const result = cliArgs(optionDefinitions, argv);
  t.deepEquals(result, {
    array: [ true, true, true ]
  });
}).
end();
