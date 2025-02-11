export interface EntityRepositoryWithProps<T> {
	getInjectedProperties(): (keyof T)[]
}

export function InjectEntityRepository<T>(entityClass: { new (...args: any[]): T }) {
	return function <U extends { new (...args: any[]): {} }>(target: U) {
		const entityProps = Reflect.getMetadata('injectedProperties', entityClass) || []

		const subclass = class extends target {
			private _entityProps = entityProps

			constructor(...args: any[]) {
				super(...args)
			}

			getInjectedProperties(): (keyof T)[] {
				return this._entityProps
			}
		}

		return subclass as unknown as U & { new (...args: any[]): EntityRepositoryWithProps<T> }
	}
}
