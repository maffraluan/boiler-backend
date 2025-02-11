import { BaseModule, dependencyInjection, RouteConfig, type Singletons } from '../../shared/module/base.module'
import { MessageQueueModule } from '../message-queue-provider/message-queue.module'
import { WebhookModule } from '../webhook-provider/webhook.module'
import { CarConsumerService } from './car-consumer.service'
import { CarController } from './car.controller'
import { CarEntity } from './car.entity'
import { CarRepository } from './car.repository'
import { CarService } from './car.service'

@dependencyInjection.injectable()
export class CarModule extends BaseModule {
	constructor() {
		super()
		this.imports = [new WebhookModule(), new MessageQueueModule()]
		this.providers = [CarService, CarRepository]
		this.exports = ['CarService', 'CarController']
		this.externalDependencies = ['AxiosRequest']
	}

	BASE_URL = 'http://api-test.bhut.com.br:3000/api/v1'

	private singletons: Singletons = [
		['CarModule', CarModule],
		['CarConsumerService', CarConsumerService],
		['CarController', CarController],
	]

	register(container: dependencyInjection.DependencyContainer): void {
		super.register(container)

		container.register('CarEntity', {
			useValue: new CarEntity(),
		})

		container.register('CarRepository', {
			useFactory: (c) => {
				return new CarRepository(c.resolve('CarEntity'))
			},
		})

		container.register('CarService', {
			useFactory: (c) => {
				return new CarService(c.resolve('AxiosRequest'), this.BASE_URL, c.resolve('CarRepository'))
			},
		})

		this.registerSingletons(container, this.singletons)
	}

	getRoutes(): RouteConfig[] {
		return this.getRoutesForController(CarController)
	}

	getController(): CarController {
		return this.resolveController<CarController>('CarController')
	}
}
