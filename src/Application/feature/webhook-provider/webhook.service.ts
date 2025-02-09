import { inject, injectable } from 'tsyringe'

import { IWebhookService } from '../../interfaces/IWebhookService'
import { IAxiosRequest } from '../../shared/adapters/axios/axios-adapter'
import { Either, isError, isSuccess } from '../../shared/adapters/either/either.adapter'
import { Exception } from '../../shared/errors/error-handlers'

@injectable()
export class WebhookService implements IWebhookService {
  constructor(@inject('AxiosRequest') private readonly axiosRequest: IAxiosRequest) {}
  private readonly webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:3001/webhook'

  async notifyCarCreated(carId: string): Promise<Either<Exception, void>> {
    const response = await this.axiosRequest<Either<Exception, void>>({
      method: 'POST',
      url: this.webhookUrl,
      data: {
        event: 'car_created',
        car_id: carId,
        timestamp: new Date().toISOString(),
      },
    })

    if (response.isError()) {
      return isError(new Exception(response.value.message, response.value.statusCode))
    }

    return isSuccess(void 0)
  }
}
