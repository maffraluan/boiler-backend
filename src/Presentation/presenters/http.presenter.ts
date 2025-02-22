import { AppResponse } from '../../Application/shared/adapters/express/app-response'
import { AppRequest } from '../../Application/shared/adapters/express/app-request'

export const httpSuccess = <T = any>(data: T, req: AppRequest<any, any>, res: AppResponse<any>) => {
	res.status(res.statusCode).json(new HttpResponse(res.statusCode, data, req.method).toJSON())
}

export class HttpResponse<T = any> {
	constructor(statusCode: number, data: T, method: string) {
		this.success = true
		this.data = data
		this.method = method
		this.statusCode = statusCode
		this.timestamp = new Date().toISOString()
	}
	success
	statusCode
	data
	timestamp
	method
	toJSON() {
		return {
			success: this.success,
			statusCode: this.statusCode,
			data: this.data,
			timestamp: this.timestamp,
			method: this.method,
		}
	}
}
