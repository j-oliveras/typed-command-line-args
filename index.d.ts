// Type definitions for command-line-args v3.0.2
// Project: https://github.com/75lb/command-line-args
// Definitions by: Jordi Oliveras Rovira <https://github.com/j-oliveras>

declare namespace commandLineArgs {
  export interface ArgsOptions {
    /**
     * Option name.
     * Unicode option names and aliases are valid.
     */
    name: string;

    /**
     * The type value is a setter function (you receive the output from this),
     * enabling you to be specific about the type and value received.
     */
    type?: (val: string) =>  any;

    /**
     * getopt-style short option names. Can be any single
     * character (unicode included) except a digit or hypen.
     */
    alias?: string;

    /**
     * Set this flag if the option takes a list of values. You will receive an
     * array of values, each passed through the type function (if specified).
     */
    multiple?: boolean;

    /**
     * Any unclaimed command-line args will be set on this option. This flag is
     * typically set on the most commonly-used option to make for more concise usage.
     */
    defaultOption?: boolean;

    /**
     * An initial value for the option.
     */
    defaultValue?: any;

    /**
     * A form to organize options.
     */
    group?: string | Array<string>;
  }

  /**
   * Base declaration if uses grouped options.
   *
   * @see https://github.com/j-oliveras/typed-command-line-args#readme
   */
  export interface GroupedArgsResult {
    _all: any;
    _none?: any;
    [id: string]: any;
  }
}

/**
 * Returns an object containing all options set on the command
 * line. By default it parses the global process.argv array.
 *
 * @param definitions List of option definitions.
 * @param argv Arguments to parse. By default it parses the global process.argv array.
 * @return an object with the parsed options. Its type depends on definitions.
 *
 * @see https://github.com/j-oliveras/typed-command-line-args#readme
 * for a sample to write a type for the returned object.
 *
 * @throws UNKNOWN_OPTION if the user sets an option without a definition.
 *
 * @throws NAME_MISSING if an option definition is missing the required name property.
 *
 * @throws INVALID_TYPE if an option definition has a type value that's not a function.
 *
 * @throws INVALID_ALIAS if an alias is numeric, a hyphen or a length other than 1.
 *
 * @throws DUPLICATE_NAME if an option definition name was used more than once.
 *
 * @throws DUPLICATE_ALIAS if an option definition alias was used more than once.
 *
 * @throws DUPLICATE_DEFAULT_OPTION if more than one option definition has defaultOption: true.
 */
declare function commandLineArgs(definitions: Array<commandLineArgs.ArgsOptions>, argv?: Array<string>): any;
declare function commandLineArgs<T>(definitions: Array<commandLineArgs.ArgsOptions>, argv?: Array<string>): T;

export = commandLineArgs;
