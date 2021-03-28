import { ServiceCollection, ServicesExtension } from "@mrmld/m-di";

interface CounterRepository {
  getCounter(): number
}

class CounterRepositoryImpl implements CounterRepository {
  getCounter(): number {
    return 228;
  }
}

// Declare private services and infer type from them
const addPrivateServices = (services: ServiceCollection) => {
  return services
    .service('counterRepo').bind<CounterRepository>(CounterRepositoryImpl)
}
export type PrivateCounterServices = ServicesExtension<typeof addPrivateServices>


// Declare public service
export class CounterModule {
  private counterRepo: CounterRepository

  constructor({ counterRepo }: PrivateCounterServices) {
    this.counterRepo = counterRepo
  }

  getCounter() {
    this.counterRepo.getCounter()
  }
}
// Create service extender and add private & public services
export const withCounterServices = (services: ServiceCollection) => {
  addPrivateServices(services)

  return services
    .service('Counter').bind<CounterModule>(CounterModule)
}


