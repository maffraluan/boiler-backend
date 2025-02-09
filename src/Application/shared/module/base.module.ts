import { type DependencyContainer } from '../../../Infra/'
import { Module } from './module.interface'

export abstract class BaseModule implements Module {
  imports: Module[] = []
  providers: any[] = []
  exports: string[] = []
  protected externalDependencies: string[] = []

  register(container: DependencyContainer): void {
    // Register dependencies from imported modules first
    this.imports.forEach((ImportedModule) => {
      ImportedModule.register(container)
    })

    // Register module's own providers
    this.providers.forEach((Provider) => {
      container.register(Provider.name, Provider)
    })
  }

  resolveProviders(container: DependencyContainer): void {
    this.providers.forEach((Provider) => {
      container.resolve(Provider)
    })
  }

  getExports(): string[] {
    return this.exports
  }
}
