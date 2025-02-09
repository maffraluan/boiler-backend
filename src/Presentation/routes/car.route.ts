import { CarModule } from '../../Application/feature/car-provider/car.module'
import { BaseRoutes } from './base.route'

export class CarRoute extends BaseRoutes {
  constructor() {
    super()
    this.registerRoutes()
  }

  private readonly carModule = this.resolverModule<CarModule>('CarModule')

  override registerRoutes(): void {
    // Get routes from module configuration
    this.carModule.getRoutes().forEach((route) => {
      const controller = this.carModule.getController()
      const handler = controller[route.handler as keyof typeof controller].bind(controller)
      this.router[route.method](route.path, handler)
    })
  }
}
