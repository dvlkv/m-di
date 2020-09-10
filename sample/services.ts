import { ServiceProvider } from '../packages/m-di';
import { ServiceCollection } from '../packages/m-di';

const serviceCollection = new ServiceCollection();

const rootProvider = new ServiceProvider(serviceCollection);
export const Services = rootProvider.getServices();
export default rootProvider;