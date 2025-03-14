import { AxiosHttpAdapter } from '../../shared'
import { BaseModule, dependencyInjection, type Singletons } from '../../shared/module/base.module'
import { CarController } from './car.controller'
import { CarRepository } from './car.repository'
import { CarService } from './car.service'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

@dependencyInjection.injectable()
export class CarModule extends BaseModule {
	private readonly singletons: Singletons = [
		[CarRepository, CarRepository],
		[
			CarService,
			{
				useFactory: (container: dependencyInjection.DependencyContainer) => {
					const httpAdapter = container.resolve<AxiosHttpAdapter>('AxiosRequest')
					const repository = container.resolve(CarRepository)

					return new CarService(httpAdapter, BASE_URL, repository)
				},
			},
		],
		[
			CarController,
			{
				useFactory: (container: dependencyInjection.DependencyContainer) => {
					const service = container.resolve(CarService)
					return new CarController(service)
				},
			},
		],
	] as const

	public register(container: dependencyInjection.DependencyContainer): void {
		this.registerSingletons(container, this.singletons)
	}

	public getController(): CarController {
		return this.resolveController<CarController>(CarController)
	}
}
