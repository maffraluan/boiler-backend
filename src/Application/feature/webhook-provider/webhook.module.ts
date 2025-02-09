import { DependencyContainer } from '../../../Infra/'
import { IWebhookService } from '../../interfaces/IWebhookService'
import { Module } from '../../shared/module/module.interface'
import { WebhookService } from './webhook.service'

export class WebhookModule implements Module {
  imports = []
  providers = [WebhookService]
  exports = ['WebhookService']
  externalDependencies = ['AxiosRequest']

  register(container: DependencyContainer): void {
    // Register webhook service
    container.registerSingleton<IWebhookService>('WebhookService', WebhookService)
  }
}
