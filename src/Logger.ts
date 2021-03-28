export type Logger = {
  log(...args: any[]): void,
  warn(...args: any[]): void
}

export let logger: Logger = {
  log: (...args: any[]) => console.log(...args),
  warn: (...args: any[]) => console.log(...args)
}

export const configureDILogging = (log: Logger) => {
  logger = log
}


