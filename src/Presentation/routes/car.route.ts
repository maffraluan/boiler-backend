import { container } from 'tsyringe'
import { CarModule } from '../../Application/feature/car-provider/car.module'
import { BaseRoutes } from './base.route'

export class CarRoute extends BaseRoutes {
  private readonly carModule: CarModule

  constructor() {
    super()
    this.carModule = container.resolve('CarModule')
    this.registerRoutes()
  }

  override registerRoutes(): void {
    // Get routes from module configuration
    this.carModule.getRoutes().forEach((route) => {
      const controller = this.carModule.getController()
      const handler = controller[route.handler as keyof typeof controller].bind(controller)
      this.router[route.method](route.path, handler)
    })
  }
}
