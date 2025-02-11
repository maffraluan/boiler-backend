import { getMetadataArgsStorage } from 'routing-controllers'
import * as dependencyInjection from '../../../Infra/'
import { Module, ModuleRouteConfig, type Providers } from './module.interface'

export type RouteConfig = ModuleRouteConfig
export type Singletons = Array<[string, dependencyInjection.InjectionToken]>

export abstract class BaseModule implements Module {
	imports: Module[] = []
	providers: Providers = []
	exports: string[] = []
	protected externalDependencies: string[] = []

	register(container: dependencyInjection.DependencyContainer): void {
		this.externalDependencies.forEach((dep) => {
			if (!container.isRegistered(dep)) {
				throw new Error(`External dependency ${dep} is not registered in the container`)
			}
		})

		// Register dependencies from imported modules first
		this.imports.forEach((ImportedModule) => {
			ImportedModule.register(container)
		})

		// Register module's own providers
		this.providers.forEach((Provider) => {
			container.register(Provider.name, Provider)
		})
	}

	resolveProviders(container: dependencyInjection.DependencyContainer): void {
		this.providers.forEach((Provider) => {
			container.resolve(Provider)
		})
	}

	protected registerSingletons(container: dependencyInjection.DependencyContainer, singletons: Singletons): void {
		singletons.forEach(([token, provider]) => {
			container.registerSingleton(token, provider)
		})
	}

	resolveController<T>(token: string): T {
		return dependencyInjection.container.resolve(token)
	}

	protected getRoutesForController<T>(ControllerClass: { new (...args: any[]): T }): RouteConfig[] {
		const storage = getMetadataArgsStorage()

		const ctrlMeta = storage.controllers.find((ctrl) => ctrl.target === ControllerClass)
		if (!ctrlMeta) {
			return []
		}

		const basePath = ctrlMeta.route || ''
		const actions = storage.actions.filter((action) => action.target === ControllerClass)

		const routeConfigs = actions.map((action) => {
			const methodLower = action.type.toLowerCase()
			const fullPath = basePath + (action.route || '')
			return {
				path: fullPath,
				method: methodLower as 'get' | 'post' | 'put' | 'delete' | 'patch',
				handler: action.method,
			}
		})

		return routeConfigs
	}

	getExports(): string[] {
		return this.exports
	}
}

export { dependencyInjection }
