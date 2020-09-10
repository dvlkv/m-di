import ServiceProvider from './ServiceProvider';
import { ServiceCollection } from './ServiceCollection';

enum ServiceScope {
  SINGLETON = 'SINGLETON',
  SCOPED = 'SCOPED',
  TRANSIENT = 'TRANSIENT',
}

export { ServiceCollection, ServiceScope, ServiceProvider };