import { Either } from '../shared/adapters/either/either.adapter'
import { Exception } from '../shared/errors/error-handlers'

export interface Car {
	postId: number
	id: number
	name: string
	email: string
	body: string
}

export interface ICarService {
	getAllComments(): Promise<Either<Exception, Car[]>>
	createCar(car: Car): Promise<Either<Exception, Car>>
	healthCheckCar(): Promise<Either<Exception, { message: string }>>
}
