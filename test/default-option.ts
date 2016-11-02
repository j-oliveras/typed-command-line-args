/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

import cliArgs = require('command-line-args');

// Original https://github.com/75lb/command-line-args/blob/master/test/default-option.js

test('defaultOption: string', t => {
  const optionDefinitions = [
    { name: 'files', defaultOption: true }
  ];
  const argv = [ 'file1', 'file2' ];
  t.deepEquals(cliArgs(optionDefinitions, argv), {
    files: 'file2'
  });
}).
end();

test('defaultOption: multiple string', t => {
  const optionDefinitions = [
    { name: 'files', defaultOption: true, multiple: true }
  ];
  const argv = [ 'file1', 'file2' ];
  t.deepEquals(cliArgs(optionDefinitions, argv), {
    files: [ 'file1', 'file2' ]
  });
}).
end();

test('defaultOption: after a boolean', t => {
  const definitions = [
    { name: 'one', type: Boolean },
    { name: 'two', defaultOption: true }
  ];
  t.deepEquals(
    cliArgs(definitions, [ '--one', 'sfsgf' ]),
    { one: true, two: 'sfsgf' }
  );
}).
end();

test('defaultOption: multiple defaultOption values between other arg/value pairs', t => {
  const optionDefinitions = [
    { name: 'one' },
    { name: 'two' },
    { name: 'files', defaultOption: true, multiple: true }
  ];
  const argv = [ '--one', '1', 'file1', 'file2', '--two', '2' ];
  t.deepEquals(cliArgs(optionDefinitions, argv), {
    one: '1',
    two: '2',
    files: [ 'file1', 'file2' ]
  });
}).
end();

test('defaultOption: multiple defaultOption values between other arg/value pairs 2', t => {
  const optionDefinitions = [
    { name: 'one', type: Boolean },
    { name: 'two' },
    { name: 'files', defaultOption: true, multiple: true }
  ];
  const argv = [ 'file0', '--one', 'file1', '--files', 'file2', '--two', '2', 'file3' ];
  t.deepEquals(cliArgs(optionDefinitions, argv), {
    one: true,
    two: '2',
    files: [ 'file0', 'file1', 'file2', 'file3' ]
  });
}).
end();

test('defaultOption: floating args present but no defaultOption', t => {
  const definitions = [
    { name: 'one', type: Boolean }
  ];
  t.deepEquals(
    cliArgs(definitions, [ 'aaa', '--one', 'aaa', 'aaa' ]),
    { one: true }
  );
}).
end();
