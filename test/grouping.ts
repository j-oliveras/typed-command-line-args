/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/grouping.js

test('groups', t => {
  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'one', group: 'a' },
    { name: 'two', group: 'a' },
    { name: 'three', group: 'b' }
  ];

  t.deepEquals(cliArgs(optionDefinitions, [ '--one', '1', '--two', '2', '--three', '3' ]), {
    a: {
      one: '1',
      two: '2'
    },
    b: {
      three: '3'
    },
    _all: {
      one: '1',
      two: '2',
      three: '3'
    }
  });
}).
end();

test('groups: multiple and _none', t => {
  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'one', group: ['a', 'f'] },
    { name: 'two', group: ['a', 'g'] },
    { name: 'three' }
  ];

  t.deepEquals(cliArgs(optionDefinitions, [ '--one', '1', '--two', '2', '--three', '3' ]), {
    a: {
      one: '1',
      two: '2'
    },
    f: {
      one: '1'
    },
    g: {
      two: '2'
    },
    _none: {
      three: '3'
    },
    _all: {
      one: '1',
      two: '2',
      three: '3'
    }
  });
}).
end();
