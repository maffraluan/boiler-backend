import { Controller } from 'routing-controllers'
import { container, type InjectionToken } from '../../Infra/'

@Controller()
export abstract class BaseController {
	resolverModule<T>(module: InjectionToken<T>): T {
		return container.resolve<T>(module)
	}
}
