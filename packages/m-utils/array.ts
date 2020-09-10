export function* chunks<T>(array: T[], count: number): IterableIterator<T[]> {
  for (let i = 0; i < array.length; i += count) {
    yield array.slice(i, i + count);
  }
}

export function range(start: number, end: number = 0) {
  if (end === 0) {
    end = start;
    start = 0;
  }
  return [...Array(end).keys()].slice(start, end);
}