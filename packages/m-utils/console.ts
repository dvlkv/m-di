import { curry } from 'rambda';

export function getConsoleArgument(
  name: string,
  shortName: string,
  required: boolean = true,
  defaultValue: string = '',
): string {
  let argIndex = process.argv.indexOf(name);
  if (argIndex === -1) {
    argIndex = process.argv.indexOf(shortName);
  }
  if (argIndex === -1) {
    if (required) {
      throw new Error(`Required argument ${name} is not passed`);
    } else {
      return defaultValue;
    }
  }
  if (!process.argv[argIndex + 1]) {
    throw new Error(`Required argument ${name} is not passed`);
  }

  return process.argv[argIndex + 1];
}

const nc = '\x1b[0m';
export const getColor = (c: number[] | number): string => `\x1b[${[].concat(c).join(';')}m`;
export const colorful = curry((colorCode: number[] | number, text: string): string => getColor(colorCode) + text + nc);