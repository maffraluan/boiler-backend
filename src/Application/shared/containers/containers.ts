import { container } from '../../../Infra/'

import { CarModule } from '../../feature/car-provider/car.module'

import { axiosRequest, IAxiosRequest } from '../adapters/axios/axios-adapter'
import { BaseModule } from '../module'
import { ModuleManager } from '../module/module.manager'

// Register shared services
container.register<IAxiosRequest>('AxiosRequest', { useValue: axiosRequest })

type ModuleConstructor = new () => BaseModule

export class ContainerManager {
	private static instance: ContainerManager
	private modules: Map<string, BaseModule> = new Map()
	private moduleManager: ModuleManager

	private constructor() {
		this.moduleManager = ModuleManager.getInstance()
		this.registerModules()
	}

	public static getInstance(): ContainerManager {
		if (!ContainerManager.instance) {
			ContainerManager.instance = new ContainerManager()
		}
		return ContainerManager.instance
	}

	private registerModules(): void {
		console.log('📦 Registering modules in container...')

		// Lista de módulos da aplicação
		const modules: Array<[string, ModuleConstructor]> = [
			['car', CarModule], // Usando nome mais simples
		]

		// Registra cada módulo
		modules.forEach(([name, ModuleClass]) => {
			this.registerModule(name, new ModuleClass())
		})

		console.log('✅ All modules registered in container')
	}

	private registerModule(name: string, module: BaseModule): void {
		console.log(`📝 Registering module: ${name}`)

		// Registra no container
		module.register(container)

		// Adiciona ao map local
		this.modules.set(name, module)

		// Adiciona ao ModuleManager para routing
		this.moduleManager.addModule(name, module)

		console.log(`✅ Module ${name} registered successfully`)
	}

	public getModule<T extends BaseModule>(name: string): T | undefined {
		return this.modules.get(name) as T
	}

	public getContainer() {
		return container
	}

	public getModules(): Map<string, BaseModule> {
		return this.modules
	}
}

export { container }
ContainerManager.getInstance()
