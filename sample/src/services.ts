import { createServices, ServiceProvider } from '../src';
import { ServiceCollection } from '../src';
import { CounterModule } from "./CounterModule";

const serviceCollection = createServices()
  .service('Counter', CounterModule);

const rootProvider = new ServiceProvider(serviceCollection);
export const Services = rootProvider.getServices();
export default rootProvider;
