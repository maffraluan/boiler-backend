import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { httpSuccess } from '../../../Presentation/presenters'
import { ICarService } from '../../interfaces/ICarService'
import { ILogService } from '../../interfaces/ILogService'
import { IMessageQueueService } from '../../interfaces/IMessageQueueService'
import { CatchHandler } from '../../shared/errors/error-handlers'

@injectable()
export class CarController {
  constructor(
    @inject('CarService') private readonly carService: ICarService,
    @inject('MessageQueueService') private readonly messageQueue: IMessageQueueService,
    @inject('LogService') private readonly logService: ILogService
  ) {}

  private async logError(message: string): Promise<void> {
    console.error(`[CarController Error]: ${message}`)
  }

  public getCars = async (req: Request, res: Response): Promise<void> => {
    const cars = await this.carService.getAllCars()

    return CatchHandler.catch(async () => {
      return httpSuccess(cars, req, res)
    }, this.logError.bind(this))
  }

  public createCar = async (req: Request, res: Response): Promise<void> => {
    const car = await this.carService.createCar(req.body)

    if (car.isSuccess()) {
      return CatchHandler.catch(async () => {
        await this.messageQueue.publishCarCreated(car.value.id!)
        return httpSuccess(car.value.id, req, res)
      }, this.logError.bind(this))
    }
  }

  public getLogs = async (req: Request, res: Response): Promise<void> => {
    return CatchHandler.catch(async () => {
      const logs = await this.logService.getAllLogs()
      return httpSuccess(logs, req, res)
    }, this.logError.bind(this))
  }

  public healthCheck = async (req: Request, res: Response): Promise<void> => {
    return CatchHandler.catch(async () => {
      const healthCheck = await this.carService.healthCheckCar()
      return httpSuccess(healthCheck.value, req, res)
    }, this.logError.bind(this))
  }
}
