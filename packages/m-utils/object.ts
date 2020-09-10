import { toCamel } from './string';

export function keysToCamel(o: { [key: string]: any }) {
  const n = {};

  Object.keys(o)
    .forEach((k) => {
      n[toCamel(k)] = o[k];
    });

  return n;
}