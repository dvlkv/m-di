export function promisify<T>(f: (cb: (err?: Error, res?: T) => void) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    f((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function forever(cb: () => Promise<void>) {
  (async () => {
    while (true) {
      await cb();
    }
  })();
}