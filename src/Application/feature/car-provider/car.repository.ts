import { InjectEntityRepository } from '../../shared/decorators'
import { dependencyInjection } from '../../shared/module/base.module'
import { CarEntity } from './car.entity'

@InjectEntityRepository(CarEntity)
@dependencyInjection.injectable()
export class CarRepository extends CarEntity {
	constructor(
		@dependencyInjection.inject('CarEntity')
		private readonly carEntity: CarEntity[]
	) {
		super()
	}

	async findAll(): Promise<CarEntity[]> {
		console.log('Propriedades injetadas:', (this as any).getInjectedProperties())
		return this.carEntity
	}

	async findById(id: string): Promise<CarEntity | undefined> {
		return this.carEntity.find((car) => car.id === id)
	}

	async create(car: CarEntity): Promise<CarEntity> {
		this.carEntity.push(car)
		return car
	}

	async update(car: CarEntity): Promise<CarEntity> {
		const index = this.carEntity.findIndex((car) => car.id === car.id)
		this.carEntity[index] = car
		return car
	}

	async delete(id: string): Promise<boolean> {
		const index = this.carEntity.findIndex((car) => car.id === id)
		if (index === -1) return false
		this.carEntity.splice(index, 1)
		return true
	}
}
