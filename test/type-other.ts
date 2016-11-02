/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/type-other.js

test('type-other: different values', t => {
  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'file', type: file => {
      return file;
    }}
  ];

  t.deepEquals(
    cliArgs(optionDefinitions, [ '--file', 'one.js' ]),
    { file: 'one.js' }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--file' ]),
    { file: null }
  );
}).
end();

// Not applicable (not compilable) => 'type-other: broken custom type function'
