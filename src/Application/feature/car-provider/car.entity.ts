import { InjectEntity } from '../../shared/decorators'

@InjectEntity<ICarEntity>('id', 'model', 'brand', 'year', 'price')
export class CarEntity implements ICarEntity {
	id: string
	model: string
	brand: string
	year: number
	price: number

	async create(car: ICarEntity): Promise<ICarEntity> {
		return new CarEntity().create(car)
	}

	async update(car: ICarEntity): Promise<ICarEntity> {
		return new CarEntity().update(car)
	}

	async delete(id: string): Promise<boolean> {
		return true
	}

	async findAll(): Promise<ICarEntity[]> {
		return []
	}

	async findById(id: string): Promise<ICarEntity | undefined> {
		return undefined
	}
}

export interface ICarEntity {
	id: string
	model: string
	brand: string
	year: number
	price: number

	create(car: ICarEntity): Promise<ICarEntity>
	update(car: ICarEntity): Promise<ICarEntity>
	delete(id: string): Promise<boolean>
	findAll(): Promise<ICarEntity[]>
	findById(id: string): Promise<ICarEntity | undefined>
}
