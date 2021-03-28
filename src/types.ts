import { ServiceCollection } from './ServiceCollection';

export enum ServiceScope {
  SINGLETON = 'SINGLETON',
  SCOPED = 'SCOPED',
  TRANSIENT = 'TRANSIENT',
}

export type ServicesExtension<T extends (...args: any) => ServiceCollection<any>>
  = ReturnType<T> extends ServiceCollection<infer TServices> ? TServices : never
