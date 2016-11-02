# Typed Command Line args

[![Build Status](https://travis-ci.org/j-oliveras/typed-command-line-args.svg?branch=master)](https://travis-ci.org/j-oliveras/typed-command-line-args)

The type definition for [`command-line-args`](https://github.com/75lb/command-line-args.git) version 3.x.x (currently 3.0.2)

## LICENSE

MIT

## Usage
Based on [official synopsis](https://github.com/75lb/command-line-args#synopsis).

```typescript
import commandLineArgs = require('command-line-args');

const optionDefinitions: Array<commandLineArgs.ArgsOptions> = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'timeout', alias: 't', type: Number }
];

const parsedArgs = commandLineArgs(optionDefinitions);
```

## Write a type for the returned object
The type of returned object cannot be inferred from the arguments definitions parameter.

The returned object has diferent structure if you use [group command option](https://github.com/75lb/command-line-args#optiongroup--string--arraystring).

[Usage of these types below.](#using-a-type-for-the-returned-object) 

### Without grouping

Declaring types for the previous usage example:

```typescript
interface ParsedArgs {
  verbose?: boolean;
  src?: Array<string>; // Declared as multiple.
  timeout?: number;
}
```

### Using groups

Base on [official group example](https://github.com/75lb/command-line-args#optiongroup--string--arraystring).

```typescript
import commandLineArgs = require('command-line-args');

const optionDefinitions: Array<commandLineArgs.ArgsOptions> = [
  { name: 'verbose', group: 'standard' },
  { name: 'help', group: [ 'standard', 'main' ] },
  { name: 'compress', group: [ 'server', 'main' ] },
  { name: 'static', group: 'server' },
  { name: 'debug' }
];

const parsedArgs = commandLineArgs(optionDefinitions);
```

You can extends your type from `commandLineArgs.GroupedArgsResult` but is not required. `GroupedArgsResult` declares `_all` and `_none` properties. Writings the returned type:

* As a single type:

```typescript
interface ParsedArgs extends commandLineArgs.GroupedArgsResult {
  // Contains all parsed arguments.
  _all: {
    verbose?: boolean;
    help?: boolean;
    compress?: boolean;
    static?: boolean;
    debug?: boolean;
  };
  // Contains arguments without a group.
  _none?: {
    debug?: boolean;
  };
  standard?: {
    verbose?: boolean;
    help?: boolean;
  };
  main?: {
    help?: boolean;
    compress?: boolean;
  };
  server?: {
    compress?: boolean;
    static?: boolean;
  };
}
```

* Splited types by groups:

```typescript
interface StandardArgs {
  verbose?: boolean;
  help?: boolean;
}

interface MainArgs {
  help?: boolean;
  compress?: boolean;
};

interface ServerArgs {
  compress?: boolean;
  static?: boolean;
};

interface NoneArgs {
  debug?: boolean;
}

interface ParsedArgs {
  // Contains all parsed arguments.
  _all: StandardArgs & MainArgs & ServerArgs & NoneArgs;
  // Contains arguments without a group.
  _none?: NoneArgs;
  standard?: StandardArgs;
  main?: MainArgs;
  server?: ServerArgs;
}
```

## Using a type for the returned object
Using the type:

```typescript
// Castings the returned value:
const parsedArgs = commandLineArgs(optionDefinitions) as ParsedArgs;
const parsedArgs = <ParsedArgs>commandLineArgs(optionDefinitions);

// Using generic overload:
const parsedArgs = commandLineArgs<ParsedArgs>(optionDefinitions);
```
