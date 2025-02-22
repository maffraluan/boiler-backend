import * as dependencyInjection from '../../../Infra'

export type Constructor<T = any> = new (...args: any[]) => T
export type FactoryFunction<T> = (container: dependencyInjection.DependencyContainer) => T
export type Registration<T> = Constructor<T> | { useFactory: FactoryFunction<T> }
export type Singletons = Array<[Constructor<any>, Registration<any>]>

export abstract class BaseModule {
	protected container: dependencyInjection.DependencyContainer

	constructor() {
		this.container = dependencyInjection.container
	}

	protected registerSingletons(container: dependencyInjection.DependencyContainer, singletons: Singletons): void {
		singletons.forEach(([token, registration]) => {
			try {
				const tokenName = this.getTokenName(token)
				console.log(`🔧 Registering singleton: ${tokenName}`)

				if (!container.isRegistered(token)) {
					if (this.isFactory(registration)) {
						container.register(token, {
							useFactory: (container) => registration.useFactory(container),
						})
					} else {
						container.registerSingleton(token, registration)
					}
					console.log(`✅ Successfully registered: ${tokenName}`)
				} else {
					console.log(`⚠️ Singleton already registered: ${tokenName}`)
				}
			} catch (error) {
				console.error(`❌ Failed to register singleton:`, error)
				throw error
			}
		})
	}

	private isFactory(registration: Registration<any>): registration is { useFactory: FactoryFunction<any> } {
		return typeof registration === 'object' && 'useFactory' in registration
	}

	private getTokenName(token: dependencyInjection.InjectionToken): string {
		if (typeof token === 'string') {
			return token
		}
		if (typeof token === 'function') {
			return token.name
		}
		if (typeof token === 'symbol') {
			return token.toString()
		}
		return String(token)
	}

	protected resolveModule<T>(token: dependencyInjection.InjectionToken<T>): T {
		try {
			return this.container.resolve<T>(token)
		} catch (error) {
			console.error(`❌ Failed to resolve module ${this.getTokenName(token)}:`, error)
			throw error
		}
	}

	protected resolveController<T>(token: dependencyInjection.InjectionToken<T>): T {
		try {
			return this.container.resolve<T>(token)
		} catch (error) {
			console.error(`❌ Failed to resolve controller ${this.getTokenName(token)}:`, error)
			throw error
		}
	}

	abstract register(container: dependencyInjection.DependencyContainer): void
	abstract getController(): any
}

export { dependencyInjection }
