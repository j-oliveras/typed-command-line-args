/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/type-other-multiple.js

let optionDefinitions: Array<cliArgs.ArgsOptions> = [
  { name: 'file', multiple: true, type: file => {
    return file;
  }}
];

test('type-other-multiple: different values', t => {
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--file', 'one.js' ]),
    { file: [ 'one.js' ] }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--file', 'one.js', 'two.js' ]),
    { file: [ 'one.js', 'two.js' ] }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--file' ]),
    { file: [] }
  );
}).
end();
