import { CarModule } from '../../Application/feature/car-provider/car.module'
import { BaseRoutes } from './base.route'

export class CarRoute extends BaseRoutes {
	constructor() {
		super()
		this.registerRoutes()
	}

	private readonly carModule = this.resolverModule<CarModule>('CarModule')

	override registerRoutes(): void {
		const routes = this.carModule.getRoutes()
		const controller = this.carModule.getController()

		routes.forEach((route) => {
			const handlerFn = (controller as any)[route.handler].bind(controller)
			this.router[route.method](route.path, handlerFn)
		})
	}
}
