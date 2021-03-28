

# Zero-dependency TypeScript dependency injection
## Basic concepts
- Everything can be a service
- Global public services should be exposed to single typescript type
- Private services should be hidden and can be typed too

## Installation
Just install package from npm
```shell
yarn add @mrmld/m-di
```

## Usage
### Basic usage
```typescript
interface NumberFactory {
  getNumber(): number
}

class IntFactory implements NumberFactory {
  getNumber(): number {
    return Math.round(Math.random() * 100)
  }
}

 const serviceCollection = createServices()
  .service('Numbers').bind<NumberFactory>(IntFactory)

const rootProvider = new ServiceProvider(serviceCollection)
export const Services = rootProvider.getServices()
console.log(Services.Counter) // Should be a singleton instance of CounterService

const scopedProvider = rootProvider.createScope()
```

### Service lifetimes
Each service can be **scoped**, **trancient** or **singleton**  
  
**Trancient** services are instantiated every time you get it  
**Singleton** services are instantiated lazily at first get  
**Scoped** services are instantiated lazily once for scope, which is created by **rootProvider.createScope()**  

### Injection
Services proxy is injected in every constructor or factory, so you can get another services from it
```typescript
 const serviceCollection = createServices()
  .service('Numbers').bind<NumberFactory>(IntFactory)
  .service('randomNumber').bind(({ Numbers }) => Numbers.getNumber(), ServiceScope.SINGLETON)
  .service('randomNumberTransient').bind(({ Numbers }) => Numbers.getNumber(), ServiceScope.TRANSIENT)

const rootProvider = new ServiceProvider(serviceCollection)
export const Services = rootProvider.getServices()

console.log(Services.randomNumber) // should be constant
console.log(Services.randomNumber)
console.log(Services.randomNumber)

console.log(Services.randomNumberTransient) // should be different
console.log(Services.randomNumberTransient)
console.log(Services.randomNumberTransient)
```

## Advanced usage
### ServiceCollection.extend()
You can separate services declaration in another modules, then include it in main service collection using **.extend()**  
```typescript
const withNumberServices = (services: ServiceCollection) => {
  return services
    .service('Numbers').bind<NumberFactory>(IntFactory)
    .service('randomNumber').bind(({ Numbers }) => Numbers.getNumber(), ServiceScope.SINGLETON)
}
```
then your main collection will look like
```typescript
 const serviceCollection = createServices()
  .extend(withNumberServices)
```
### Private services (ServicesExtension type)
You can declare private services and they are typed too
```typescript
const addPrivateServices = (services: ServiceCollection) => {
  return services
    .service('randomNumberRepository').bind(RandomNumberRepository)
}

type NumberPrivateServices = ServicesExtension<typeof addPrivateServices>

const withNumberServices = (services: ServiceCollection) => {
  addPrivateServices(services)
  
  return services
    .service('Numbers').bind<NumberFactory>(IntFactory)
    .service('randomNumber').bind(({ Numbers }) => Numbers.getNumber(), ServiceScope.SINGLETON)
}
```
Then you can use ```NumberPrivateServices``` in service's constructor/function as type of first argument
