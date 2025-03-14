import { Request, Response } from 'express'

import { injectable } from 'tsyringe'
import { CatchHandler } from '../../shared'
import { Get, JsonController, QueryParam, Req, Res } from '../../shared/decorators/'
import { CarService } from './car.service'

@JsonController('/cars')
@injectable()
export class CarController {
	constructor(private readonly carService: CarService) {
		console.info('🚗 CarController initialized with service:', carService)
	}

	@Get('/comments')
	async getAllComments(@Req() _req: Request, @Res() res: Response) {
		return CatchHandler.catch(
			async () => {
				const comments = await this.carService.getAllComments()
				return res.json(comments.value)
			},
			async (message: string) => {
				console.error('❌ Error getting comments:', message)
				return Promise.resolve()
			}
		)
	}

	@Get('/health-check')
	async healthCheck(@QueryParam('name') name: string, @Req() req: Request, @Res() _res: Response) {
		try {
			const services = await this.carService.healthCheckCar()
			return {
				message: `Health check OK ${services.value.message} ${name}`,
				timestamp: new Date().toISOString(),
				path: req.path,
				controller: 'CarController',
			}
		} catch (error) {
			console.error('❌ Health check error:', error)
			throw error
		}
	}
}
