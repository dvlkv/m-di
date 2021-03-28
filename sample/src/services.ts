import { createServices, ServiceProvider, ServiceScope } from '@mrmld/m-di';
import { CounterModule, withCounterServices } from "./CounterModule";

// Create service collection and bind Counter service to its module
const serviceCollection = createServices()
  .service('randomNumberTrancient').bind(() => Math.round(Math.random() * 100), ServiceScope.TRANSIENT)
  .service('randomNumberScoped').bind(() => Math.round(Math.random() * 100), ServiceScope.SCOPED)
  .service('randomNumberSingleton').bind(() => Math.round(Math.random() * 100), ServiceScope.SINGLETON)
  .extend(withCounterServices);

const rootProvider = new ServiceProvider(serviceCollection);
export const Services = rootProvider.getServices();

// now you can access your service using
console.log(Services.Counter)
// or
console.log(Services.get<CounterModule>('Counter'))

// as i mentioned previously, Services can be anything
console.log('Transient service')
console.log(Services.randomNumberTrancient)
console.log(Services.randomNumberTrancient)

console.log('Singleton service')
console.log(Services.randomNumberSingleton)
console.log(Services.randomNumberSingleton)

console.log('Scoped service 1 provider')
let scopedProvider1 = rootProvider.createScope()
console.log(scopedProvider1.getServices().randomNumberScoped)
console.log(scopedProvider1.getServices().randomNumberScoped)

console.log('Scoped service 1 provider')
let scopedProvider2 = rootProvider.createScope()
console.log(scopedProvider2.getServices().randomNumberScoped)
console.log(scopedProvider2.getServices().randomNumberScoped)
