import { Request, Response } from 'express'

import { injectable } from 'tsyringe'
import { Get, JsonController, QueryParam, Req, Res } from '../../shared/decorators/'
import { CarService } from './car.service'

@JsonController('/cars')
@injectable()
export class CarController {
	constructor(private readonly carService: CarService) {
		console.log('🚗 CarController initialized with service:', carService)
	}

	@Get('/health-check')
	async healthCheck(@QueryParam('name') name: string, @Req() req: Request, @Res() res: Response) {
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
