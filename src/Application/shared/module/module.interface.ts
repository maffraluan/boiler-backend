import { type DependencyContainer } from '../../../Infra/'

export interface ModuleRouteConfig {
	path: string
	method: 'get' | 'post' | 'put' | 'delete' | 'patch'
	handler: string
}

export type Providers = Array<new (...args: any[]) => unknown>

export interface Module {
	imports?: Module[]
	providers: Providers
	exports?: string[]
	register(container: DependencyContainer): void
}
