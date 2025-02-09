import { Channel } from 'amqplib'
import { Either } from '../shared/adapters/either/either.adapter'
import { Exception } from '../shared/errors/error-handlers'

export interface IMessageQueueService {
  connect(): Promise<Either<Exception, Channel>>
  publishCarCreated(carId: string): Promise<Either<Exception, void>>
  consume(queueName: string, callback: (message: any) => Promise<void>): Promise<Either<Exception, void>>
}
