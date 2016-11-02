/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/type-boolean.js

test('type-boolean: different values', t => {
  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'one', type: Boolean }
  ];

  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one' ]),
    { one: true }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', 'true' ]),
    { one: true }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', 'false' ]),
    { one: true }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', 'sfsgf' ]),
    { one: true }
  );
}).
end();

const origBoolean = Boolean;

/* test in contexts which override the standard global Boolean constructor */
test('type-boolean: global Boolean overridden', t => {
  function Boolean () {
    return origBoolean.apply(origBoolean, arguments);
  }

  const optionDefinitions: Array<cliArgs.ArgsOptions> = [
    { name: 'one', type: Boolean }
  ];

  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', 'true' ]),
    { one: true }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', 'false' ]),
    { one: true }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', 'sfsgf' ]),
    { one: true }
  );
  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one' ]),
    { one: true }
  );
}).
end();
