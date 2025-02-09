import { DependencyContainer } from 'tsyringe'

export interface Module {
  imports?: Module[]
  providers?: any[]
  exports?: any[]
  register(container: DependencyContainer): void
}

export const Module = () => {
  Modules: []
}
