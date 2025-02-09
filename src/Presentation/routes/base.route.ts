import { type Router } from 'express'
import AppRouter from '../../Application/shared/adapters/express/app-router'
import { IBaseRoute } from './interfaces/base-route.interface'

export abstract class BaseRoutes implements IBaseRoute {
  public router: Router

  constructor() {
    this.router = AppRouter
  }

  registerRoutes(): void {}
}
