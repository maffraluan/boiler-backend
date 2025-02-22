import { Either } from '../shared/adapters/either/either.adapter'
import { Exception } from '../shared/errors/error-handlers'

export interface Car {
	id?: string
	modelo: string
	placa: string
	ano: number
	cor: string
}

export interface ICarService {
	getAllCars(): Promise<Either<Exception, Car[]>>
	createCar(car: Car): Promise<Either<Exception, Car>>
	healthCheckCar(): Promise<Either<Exception, { message: string }>>
}
