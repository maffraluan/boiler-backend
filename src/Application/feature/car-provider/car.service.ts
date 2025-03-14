import * as dependencyInjection from '../../../Infra'
import { Car, ICarService } from '../../interfaces/ICarService'
import { AxiosHttpAdapter, Either, Exception, isError, isSuccess } from '../../shared'
import { ICarEntity } from './car.entity'

@dependencyInjection.injectable()
export class CarService implements ICarService {
	constructor(
		private readonly httpAdapter: AxiosHttpAdapter,
		private readonly baseUrl: string,
		private readonly carRepository: ICarEntity
	) {}

	async getAllComments(): Promise<Either<Exception, Car[]>> {
		const { data } = await this.httpAdapter<{ data: Car[] }>({
			method: 'GET',
			url: `${this.baseUrl}/comments`,
		})

		return isSuccess(data)
	}

	async createCar(car: Car): Promise<Either<Exception, Car>> {
		const response = await this.httpAdapter<Either<Exception, Car>>({
			method: 'POST',
			url: `${this.baseUrl}/`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: car,
		})

		if (response.isError()) {
			return isError(new Exception(response.value.message, response.value.statusCode))
		}
		return isSuccess(response.value)
	}

	async healthCheckCar(): Promise<Either<Exception, { message: string }>> {
		const repository = await this.carRepository.findAll()
		console.info('Repository', repository)

		return isSuccess({ message: 'OK' })
	}
}
