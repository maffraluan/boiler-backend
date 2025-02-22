import { Authorized } from '../'

export function ApiAuth(): MethodDecorator {
	return function (object: Object, methodName: string | symbol, descriptor: PropertyDescriptor) {
		Authorized()(object, methodName, descriptor)
	}
}
