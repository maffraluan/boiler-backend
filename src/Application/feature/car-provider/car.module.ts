import { container, DependencyContainer, injectable } from 'tsyringe'
import { BaseModule } from '../../shared/module/base.module'
import { WebhookModule } from '../webhook-provider/webhook.module'
import { CarConsumerService } from './car-consumer.service'
import { CarController } from './car.controller'
import { CarService } from './car.service'

export interface CarRouteConfig {
  path: string
  method: 'get' | 'post' | 'put' | 'delete'
  handler: string
}

@injectable()
export class CarModule extends BaseModule {
  constructor() {
    super()
    this.imports = [new WebhookModule()]
    this.providers = [CarService]
    this.exports = ['CarService', 'CarController']
    this.externalDependencies = ['AxiosRequest']
  }

  BASE_URL = 'http://api-test.bhut.com.br:3000/api/v1'

  private readonly routes: CarRouteConfig[] = [
    { path: '/car', method: 'get', handler: 'getCars' },
    { path: '/car/health-check', method: 'get', handler: 'healthCheck' },
    { path: '/car', method: 'post', handler: 'createCar' },
    { path: '/logs', method: 'get', handler: 'getLogs' },
  ]

  register(container: DependencyContainer): void {
    // Validate external dependencies
    this.externalDependencies.forEach((dep) => {
      if (!container.isRegistered(dep)) {
        throw new Error(`External dependency ${dep} is not registered in the container`)
      }
    })

    // Register dependencies from imported modules first
    this.imports.forEach((ImportedModule) => {
      const module = ImportedModule
      module.register(container)
    })

    // Register this module's providers first
    container.register('CarService', {
      useFactory: (c) => {
        return new CarService(c.resolve('AxiosRequest'), this.BASE_URL)
      },
    })

    // Register controllers and consumers
    container.registerSingleton('CarModule', CarModule)
    container.registerSingleton('CarConsumerService', CarConsumerService)
    container.registerSingleton('CarController', CarController)
  }

  getRoutes(): CarRouteConfig[] {
    return this.routes
  }

  getController(): CarController {
    return container.resolve('CarController')
  }
}
