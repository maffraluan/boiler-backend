import { container } from '../../../Infra/'
import { CarModule } from '../../feature/car-provider/car.module'
import { LogService } from '../../feature/logs-provider/log.service'
import { MessageQueueModule } from '../../feature/message-queue-provider/message-queue.module'
import { WebhookModule } from '../../feature/webhook-provider/webhook.module'
import { ILogService } from '../../interfaces/ILogService'
import { axiosRequest, IAxiosRequest } from '../adapters/axios/axios-adapter'

// Register shared services
container.register<IAxiosRequest>('AxiosRequest', { useValue: axiosRequest })
container.registerSingleton<ILogService>('LogService', LogService)

// Initialize modules
const carModule = new CarModule()
const messageQueueModule = new MessageQueueModule()
const webhookModule = new WebhookModule()

// Register each module's dependencies
const modules = [carModule, messageQueueModule, webhookModule]
modules.forEach((module) => module.register(container))
