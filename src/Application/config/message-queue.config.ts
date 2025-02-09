import { injectable } from '../../Infra'

@injectable()
export class MessageQueueConfig {
  readonly url: string
  readonly queueName: string
  readonly options: { durable: boolean }

  constructor() {
    this.url = process.env.RABBITMQ_URL || 'amqp://localhost'
    this.queueName = 'car_created'
    this.options = { durable: true }
  }
}
