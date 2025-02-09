import { Collection, InsertOneResult, MongoClient } from 'mongodb'
import { injectable } from 'tsyringe'
import { ILogService, Log } from '../../interfaces/ILogService'
import { Either, isError, isSuccess } from '../../shared/adapters/either/either.adapter'
import { Exception } from '../../shared/errors/error-handlers'

@injectable()
export class LogService implements ILogService {
  constructor() {}

  private collection: Collection<Log> | null = null
  async connect(): Promise<Either<Exception, Collection<Log>>> {
    const client = await MongoClient.connect('mongodb://localhost:27017')
    const db = client.db('car_logs')
    this.collection = db.collection<Log>('logs')

    if (!this.collection) {
      return isError(new Exception('Database not connected', 500))
    }

    return isSuccess(this.collection)
  }
  async createLog(carId: string): Promise<Either<Exception, InsertOneResult<Log>>> {
    const connect = await this.connect()

    if (connect.isError()) {
      return isError(new Exception(connect.value.message, connect.value.statusCode))
    }

    const log = await connect.value.insertOne({
      car_id: carId,
      data_hora_criacao: new Date(),
      data_hora_processamento: new Date(),
    })

    return isSuccess(log)
  }
  async getAllLogs(): Promise<Either<Exception, Log[]>> {
    const connect = await this.connect()

    if (connect.isError()) {
      return isError(new Exception(connect.value.message, connect.value.statusCode))
    }

    const logs = await connect.value.find().toArray()

    return isSuccess(logs)
  }
}
