import { ServiceScope } from './index';
import { makeId } from '../m-utils/misc';

type ServiceConstructor<TApp, TService> = new (app?: TApp) => TService;
type ServiceFactory<TApp, TService> = (app?: TApp) => TService;
type ServiceActivator<TApp, TService> = ServiceConstructor<TApp, TService> | ServiceFactory<TApp, TService>;

export default class ServiceDescriptor<TApp = any, TService = any> {
  public id: string = makeId();

  public constructor(
    public readonly scope: ServiceScope,
    private readonly activator: ServiceActivator<TApp, TService>,
  ) {}

  public isConstructor(f: ServiceActivator<TApp, TService>): f is ServiceConstructor<TApp, TService> {
    return !!f.prototype && !!f.prototype.constructor.name;
  }

  public activate(app?: TApp): TService {
    if (this.isConstructor(this.activator)) {
      return new this.activator(app);
    } else {
      return this.activator(app);
    }
  }
}