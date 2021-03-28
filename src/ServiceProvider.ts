import { ServiceScope } from './index';
import { ServiceCollection } from './ServiceCollection';
import { logger } from './Logger';

class ServiceProvider<TApp = any> {
  protected readonly rootProvider: ServiceProvider<TApp> = this;
  private readonly instances: { [id: string]: any } = {};
  private appInstance: TApp & { get: <T>(name: string) => T } | undefined;

  public constructor(public readonly services: ServiceCollection<TApp>) {
  }

  public get<T>(name: string): T {
    const descriptor = this.services.getDescriptor(name);
    if (!descriptor) {
      throw new Error(`Service "${name}" is not defined`);
    }

    const proxy = this.getServices(name);
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
        logger.warn(`Scoped service "${name}" resolved from root provider`);
      }

      if (!this.instances[descriptor.id]) {
        this.instances[descriptor.id] = activate();
      }
      return this.instances[descriptor.id];
    } else {
      throw new Error(`Undefined scope for "${name}" service`)
    }
  }

  public getServices(caller?: string): TApp & { get: <T>(name: string) => T } {
    if (this.appInstance) {
      return this.appInstance;
    }

    let obj: any = {};
    const resolveService = this.get.bind(this);
    let props: any = {};
    for (let field of this.services.getNames()) {
      if (field === caller) {
        continue;
      }
      props[field] = {
        get: () => resolveService(field),
      };
    }

    // Define services as properties with getters
    Object.defineProperties(obj, props);

    // Define public "get" method
    obj.get = (name: string) => resolveService(name);

    this.appInstance = obj;

    return this.appInstance!;
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
