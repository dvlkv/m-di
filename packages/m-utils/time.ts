export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function delayBreakable(ms: number) {
  let resolver: (() => any) | null = null;

  const promise = new Promise((resolve) => {
    resolver = resolve;
    setTimeout(resolve, ms);
  });

  return {
    awaiter: promise,
    break: () => {
      if (resolver) {
        resolver();
      }
    },
  };
}

export function debounce<Args extends Array<any>>(callback: (...args: Args) => void, timeout: number) {
  let timer: NodeJS.Timeout | undefined;
  return (...args: Args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
      timer = undefined;
    }, timeout);
  }
}

export function unix(date: Date): number {
  return Math.round(date.getTime() / 1000);
}
