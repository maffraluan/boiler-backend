import { Request } from 'express'

export interface AppRequest<T = any, K = any> extends Request<any, any, K, T, Record<any, any>> {
	query: T
	params: T
	body: K
}
