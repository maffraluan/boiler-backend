import { type Router } from 'express'
import { type InjectionToken } from '../../../Infra/dependency-injection/dependency-injection'

export interface IBaseRoute {
	router: Router
	resolverModule: <T>(token: InjectionToken<T>) => T
	registerRoutes(): void
}
