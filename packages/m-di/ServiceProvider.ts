import ServiceDescriptor from './ServiceDescriptor';
import { ServiceScope } from './index';
import { colorful } from '../m-utils/console';
import { ServiceCollection } from './ServiceCollection';

class ServiceProvider<TApp = any> {
  protected readonly rootProvider: ServiceProvider<TApp> = this;
  private readonly instances: { [id: string]: any } = {};
  private appInstance: TApp;

  public constructor(public readonly services: ServiceCollection<TApp>) {
  }

  public resolveService(prop: string): any {
    const descriptor: ServiceDescriptor<TApp, any> = this.services.getDescriptor(prop);

    const proxy = this.getServices(prop);
    const activate = () => descriptor.activate(proxy);

    if (descriptor.scope === ServiceScope.TRANSIENT) {
      return activate();
    } else if (descriptor.scope === ServiceScope.SINGLETON) {
      if (!this.rootProvider.instances[descriptor.id]) {
        this.rootProvider.instances[descriptor.id] = activate();
      }
      return this.rootProvider.instances[descriptor.id];
    } else if (descriptor.scope === ServiceScope.SCOPED) {
      if (this === this.rootProvider) {
        console.warn(`${colorful([1, 33])('[Warning]')} Scoped service "${prop}" resolved from root provider`);
      }

      if (!this.instances[descriptor.id]) {
        this.instances[descriptor.id] = activate();
      }
      return this.instances[descriptor.id];
    }
  }

  public getServices(caller?: string): TApp {
    if (this.appInstance) {
      return this.appInstance;
    }

    let obj: any = {};
    const resolveService = this.resolveService.bind(this);
    let props: any = {};
    for (let field of this.services.getNames()) {
      if (field === caller) {
        continue;
      }
      props[field] = {
        get: () => resolveService(field),
      };
    }
    Object.defineProperties(obj, props);

    this.appInstance = obj;

    return this.appInstance;
  }

  public createScope(): ServiceProvider<TApp> {
    return new ScopedServiceProvider(this.services, this);
  }
}

class ScopedServiceProvider<TApp> extends ServiceProvider<TApp> {
  protected readonly rootProvider: ServiceProvider<TApp>;

  constructor(services: ServiceCollection<TApp>, root: ServiceProvider<TApp>) {
    super(services);

    this.rootProvider = root;
  }
}

export default ServiceProvider;