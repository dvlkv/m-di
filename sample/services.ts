import { ServiceProvider } from '../src';
import { ServiceCollection } from '../src';

const serviceCollection = new ServiceCollection();

const rootProvider = new ServiceProvider(serviceCollection);
export const Services = rootProvider.getServices();
export default rootProvider;
