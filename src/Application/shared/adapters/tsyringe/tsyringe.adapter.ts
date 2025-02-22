import { IocAdapter } from 'routing-controllers'
import { dependencyInjection } from '../../module'

/**
 * Adaptador para fazer o tsyringe funcionar com o routing-controllers
 */
export class TsyringeAdapter implements IocAdapter {
	constructor(private readonly container: dependencyInjection.DependencyContainer) {}

	get<T>(someClass: { new (...args: any[]): T }): T {
		return this.container.resolve<T>(someClass)
	}
}
