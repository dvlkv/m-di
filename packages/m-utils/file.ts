import { readFile as readFileCallback, readdir as readDirCallback, readdirSync, stat as statCallback, Stats } from 'fs';
import path from 'path';
import { promisify } from './function';
import { curry } from 'rambda';

export const readFile = <TRes = string | Buffer>(p, options = null): Promise<TRes> => promisify<TRes>(curry(readFileCallback)(p, options) as any);
export const readdir = <TRes = string[]>(p, options = null): Promise<TRes> => promisify<TRes>(curry(readDirCallback)(p, options) as any);

export const findFilesRecursively = (dir, predicate: (a: string) => boolean) => {
  let results = [];
  let queue = readdirSync(dir).map(a => path.resolve(dir, a));
  while (queue.length > 0) {
    let item = queue.pop();
    if (item.split('.').length === 1) {
      queue.push(...readdirSync(item).map(a => path.resolve(item, a)));
    } else {
      if (predicate(item)) {
        results.push(item);
      }
    }
  }
  return results;
};