import { type DependencyContainer } from '../../../Infra/'

export interface Module {
  imports?: Module[]
  providers?: any[]
  exports?: any[]
  register(container: DependencyContainer): void
}
