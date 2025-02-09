import { type Router } from 'express'
import AppRouter from '../../Application/shared/adapters/express/app-router'
import { container, type InjectionToken } from '../../Infra/'
import { IBaseRoute } from './interfaces/base-route.interface'

export abstract class BaseRoutes implements IBaseRoute {
  public router: Router

  constructor() {
    this.router = AppRouter
  }

  resolverModule<T>(module: InjectionToken<T>): T {
    return container.resolve<T>(module)
  }

  registerRoutes(): void {}
}
