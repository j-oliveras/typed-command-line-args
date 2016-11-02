/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/bad-input.js

test('bad-input: handles missing option value', t => {
  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'colour', type: String },
    { name: 'files' }
  ];
  t.deepEquals(cliArgs(optionDefinitions, [ '--colour' ]), {
    colour: null
  });
  t.deepEquals(cliArgs(optionDefinitions, [ '--colour', '--files', 'yeah' ]), {
    colour: null,
    files: 'yeah'
  });
}).
end();

test('bad-input: handles arrays with relative paths', t => {
  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'colours', type: String, multiple: true }
  ];
  const argv = [ '--colours', '../what', '../ever' ];
  t.deepEquals(cliArgs(optionDefinitions, argv), {
    colours: [ '../what', '../ever' ]
  });
}).
end();
