import { DependencyContainer } from 'tsyringe'
import { MessageQueueConfig } from '../../config/message-queue.config'
import { IMessageQueueService } from '../../interfaces/IMessageQueueService'
import { Module } from '../../shared/module/module.interface'
import { MessageQueueService } from './message-queue.service'

export class MessageQueueModule implements Module {
  imports = []
  providers = [MessageQueueService, MessageQueueConfig]
  exports = ['MessageQueueService']

  register(container: DependencyContainer): void {
    // Register config first
    container.registerSingleton(MessageQueueConfig)

    // Register message queue service
    container.registerSingleton<IMessageQueueService>('MessageQueueService', MessageQueueService)
  }
}
