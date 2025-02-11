export function InjectEntity<T>(...props: (keyof T)[]) {
	return function (target: any) {
		Reflect.defineMetadata('injectedProperties', props, target)
		return target
	}
}
