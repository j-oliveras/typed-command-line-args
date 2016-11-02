/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/exceptions.js

// Not applicable (not compilable) => 'err-invalid-definition: throws when no definition.name specified'

test('err-invalid-definition: throws if dev set a numeric alias', t => {
  const optionDefinitions = [
    { name: 'colours', alias: '1' }
  ];
  const argv = [ '--colours', 'red' ];

  try {
    cliArgs(optionDefinitions, argv);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'INVALID_ALIAS');
  }
}).
end();

test('err-invalid-definition: throws if dev set an alias of "-"', t => {
  const optionDefinitions = [
    { name: 'colours', alias: '-' }
  ];
  const argv = [ '--colours', 'red' ];

  try {
    cliArgs(optionDefinitions, argv);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'INVALID_ALIAS');
  }
}).
end();

test('err-invalid-definition: multi-character alias', t => {
  const optionDefinitions = [
    { name: 'one', alias: 'aa' }
  ];
  const argv = [ '--one', 'red' ];

  try {
    cliArgs(optionDefinitions, argv);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'INVALID_ALIAS');
  }
}).
end();

// Not applicable (not compilable) => 'err-invalid-definition: invalid type values'

test('err-invalid-definition: value without option definition', t => {
  const optionDefinitions = [
    { name: 'one', type: Number }
  ];

  t.deepEquals(
    cliArgs(optionDefinitions, [ '--one', '1' ]),
    { one: 1 }
  );

  try {
    cliArgs(optionDefinitions, [ '--one', '--two' ]);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'UNKNOWN_OPTION');
  }

  try {
    cliArgs(optionDefinitions, [ '--one', '2', '--two', 'two' ]);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'UNKNOWN_OPTION');
  }

  try {
    cliArgs(optionDefinitions, [ '-a', '2' ]);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'UNKNOWN_OPTION');
  }

  try {
    cliArgs(optionDefinitions, [ '-sdf' ]);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'UNKNOWN_OPTION', 'getOpts');
  }
}).
end();

test('err-invalid-definition: duplicate name', t => {
  const optionDefinitions = [
    { name: 'colours' },
    { name: 'colours' }
  ];
  const argv = [ '--colours', 'red' ];

  try {
    cliArgs(optionDefinitions, argv);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'DUPLICATE_NAME');
  }
}).
end();

test('err-invalid-definition: duplicate alias', t => {
  const optionDefinitions = [
    { name: 'one', alias: 'a' },
    { name: 'two', alias: 'a' }
  ];
  const argv = [ '--one', 'red' ];

  try {
    cliArgs(optionDefinitions, argv);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'DUPLICATE_ALIAS');
  }
}).
end();

test('err-invalid-definition: multiple defaultOption', t => {
  const optionDefinitions = [
    { name: 'one', defaultOption: true },
    { name: 'two', defaultOption: true }
  ];
  const argv = [ '--one', 'red' ];

  try {
    cliArgs(optionDefinitions, argv);
    t.fail();
  } catch (err) {
    t.strictEqual(err.name, 'DUPLICATE_DEFAULT_OPTION');
  }
}).
end();
