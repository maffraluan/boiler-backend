import { BaseModule } from './base.module'

export class ModuleManager {
	private static instance: ModuleManager
	private modules: Map<string, BaseModule> = new Map()

	private constructor() {}

	public static getInstance(): ModuleManager {
		if (!ModuleManager.instance) {
			ModuleManager.instance = new ModuleManager()
		}
		return ModuleManager.instance
	}

	public addModule(name: string, module: BaseModule): void {
		console.log(`📝 Adding module to manager: ${name}`)
		this.modules.set(name, module)
	}

	public getControllers(): any[] {
		console.log('🎮 Getting all controllers...')
		return Array.from(this.modules.values())
			.map((module) => {
				try {
					return module.getController()
				} catch (error) {
					console.error('❌ Failed to get controller:', error)
					return null
				}
			})
			.filter((controller) => controller !== null)
	}
}
