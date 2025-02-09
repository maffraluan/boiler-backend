import { inject, injectable } from '../../../Infra'
import { ILogService } from '../../interfaces/ILogService'
import { IMessageQueueService } from '../../interfaces/IMessageQueueService'
import { IWebhookService } from '../../interfaces/IWebhookService'

@injectable()
export class CarConsumerService {
  constructor(
    @inject('MessageQueueService') private readonly messageQueue: IMessageQueueService,
    @inject('WebhookService') private readonly webhookService: IWebhookService,
    @inject('LogService') private readonly logService: ILogService
  ) {}

  public async start(): Promise<void> {
    await this.messageQueue.consume('car_created', async (message) => {
      const { car_id } = message

      // Send webhook notification
      await this.webhookService.notifyCarCreated(car_id)

      // Create log entry
      await this.logService.createLog(car_id)
    })
  }
}
