import ServiceDescriptor from './ServiceDescriptor';
import { ServiceScope } from './index';

type SingleOptionDict<Name extends string, Type> = { readonly [name in Name]: Type };

type AddService<Data, Key extends string, Value> = ServiceCollection<Data & SingleOptionDict<Key, Value>>;

class ServiceBuilder<Data, Key extends string> {
  constructor(private collection: ServiceCollection<Data>, private key: Key) {}

  public bind<TService>(
    type: (new (app?: any) => TService) |
                ((app?: Data) => TService),
    scope: ServiceScope = ServiceScope.SINGLETON,
  ) {
    return this.collection._service(this.key, type, scope);
  }
}

export class ServiceCollection<Data = {}> {
  private readonly services: Map<string, ServiceDescriptor>;

  constructor(
    services?: Map<string, ServiceDescriptor>,
  ) {
    if (services) {
      this.services = services;
    } else {
      this.services = new Map<string, ServiceDescriptor>();
    }
  }

  public static service<TService, TName extends string>(
    name: TName,
  ) {
    return new ServiceBuilder(new ServiceCollection<{}>(), name);
  }

  public service<TName extends string>(name: TName): ServiceBuilder<Data, TName> {
    return new ServiceBuilder(this, name);
  }

  public extend<TExtended>(f: (services: ServiceCollection<Data>) => ServiceCollection<Data & TExtended>): ServiceCollection<Data & TExtended> {
    return f(this);
  }

  public _service<TService, TName extends string>(
    name: TName,
    type: (new (app?: Data) => TService) |
      ((app?: Data) => TService),
    scope: ServiceScope = ServiceScope.SINGLETON,
  ): AddService<Data, TName, TService> {
    this.services.set(name, new ServiceDescriptor<any, any>(scope, type));
    return new ServiceCollection<Data & SingleOptionDict<TName, TService>>(this.services);
  }

  public getDescriptor(key: string) {
    return this.services.get(key);
  }

  public getNames() {
    return this.services.keys();
  }

  public contains(key: string) {
    return this.services.has(key);
  }
}

export function createServices(): ServiceCollection {
  return new ServiceCollection()
}
