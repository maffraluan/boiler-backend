import { Either } from '../shared/adapters/either/either.adapter'
import { Exception } from '../shared/errors/error-handlers'

export interface IWebhookService {
	notifyCarCreated(carId: string): Promise<Either<Exception, void>>
}
