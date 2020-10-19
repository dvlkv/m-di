import ServiceProvider from './ServiceProvider';
import { ServiceCollection } from './ServiceCollection';

enum ServiceScope {
  SINGLETON = 'SINGLETON',
  SCOPED = 'SCOPED',
  TRANSIENT = 'TRANSIENT',
}

type ServicesExtension<T extends (...args: any) => ServiceCollection<any>>
  = ReturnType<T> extends ServiceCollection<infer TServices> ? TServices : never

export { ServiceCollection, ServiceScope, ServiceProvider, ServicesExtension };