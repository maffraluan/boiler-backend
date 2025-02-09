import amqp from 'amqplib'
import { inject, injectable } from 'tsyringe'
import { MessageQueueConfig } from '../../config/message-queue.config'
import { IMessageQueueService } from '../../interfaces/IMessageQueueService'
import { Either, isError, isSuccess } from '../../shared/adapters/either/either.adapter'
import { Exception } from '../../shared/errors/error-handlers'

interface QueueMessage {
  car_id: string
  created_at: string
}

@injectable()
export class MessageQueueService implements IMessageQueueService {
  private connection: amqp.Connection | null = null
  private channel: amqp.Channel | null = null

  constructor(
    @inject(MessageQueueConfig)
    private readonly config: MessageQueueConfig
  ) {}

  async connect(): Promise<Either<Exception, amqp.Channel>> {
    this.connection = await amqp.connect(this.config.url).catch(() => null)

    if (!this.connection) {
      return isError(new Exception('Failed to connect to RabbitMQ', 500))
    }

    this.channel = await this.connection.createChannel().catch(() => null)

    if (!this.channel) {
      return isError(new Exception('Failed to create channel', 500))
    }

    const queue = await this.channel.assertQueue(this.config.queueName, this.config.options).catch(() => null)

    if (!queue) {
      return isError(new Exception('Failed to assert queue', 500))
    }

    return isSuccess(this.channel)
  }

  async publishCarCreated(carId: string): Promise<Either<Exception, void>> {
    const connect = await this.connect()

    if (connect.isError()) {
      return isError(new Exception(connect.value.message, connect.value.statusCode))
    }

    const message: QueueMessage = {
      car_id: carId,
      created_at: new Date().toISOString(),
    }

    const published = connect.value.sendToQueue(this.config.queueName, Buffer.from(JSON.stringify(message)))

    return published ? isSuccess(void 0) : isError(new Exception('Failed to publish message', 500))
  }

  async consume(
    queueName: string,
    callback: (message: QueueMessage) => Promise<void>
  ): Promise<Either<Exception, void>> {
    const connect = await this.connect()

    if (connect.isError()) {
      return isError(new Exception(connect.value.message, connect.value.statusCode))
    }

    const queue = await connect.value.assertQueue(queueName, this.config.options)

    if (!queue) {
      return isError(new Exception(`Queue ${queueName} not found`, 404))
    }

    const consumer = await connect.value.consume(queueName, async (msg: amqp.ConsumeMessage | null) => {
      if (!msg) return

      const content = JSON.parse(msg.content.toString()) as QueueMessage
      await callback(content).catch(() => {
        connect.value.nack(msg, false, true)
      })
      connect.value.ack(msg)
    })

    return consumer ? isSuccess(void 0) : isError(new Exception(`Failed to create consumer for ${queueName}`, 500))
  }
}
