import { Collection, InsertOneResult, ObjectId } from 'mongodb'
import { Either } from '../shared/adapters/either/either.adapter'
import { Exception } from '../shared/errors/error-handlers'

export interface Log {
  _id?: ObjectId
  car_id: string
  data_hora_criacao: Date
  data_hora_processamento: Date
}

export interface ILogService {
  connect(): Promise<Either<Exception, Collection<Log>>>
  createLog(carId: string): Promise<Either<Exception, InsertOneResult<Log>>>
  getAllLogs(): Promise<Either<Exception, Log[]>>
}
