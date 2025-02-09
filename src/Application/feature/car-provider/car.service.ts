import { injectable } from '../../../Infra'
import { Car, ICarService } from '../../interfaces/ICarService'
import { IAxiosRequest } from '../../shared/adapters/axios/axios-adapter'
import { Either, isError, isSuccess } from '../../shared/adapters/either/either.adapter'
import { Exception } from '../../shared/errors/error-handlers'

@injectable()
export class CarService implements ICarService {
  constructor(
    private readonly axiosRequest: IAxiosRequest,
    private readonly baseUrl: string
  ) {}

  async getAllCars(): Promise<Either<Exception, Car[]>> {
    const response = await this.axiosRequest<Either<Exception, Car[]>>({
      method: 'GET',
      url: `${this.baseUrl}/carro`,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.isError()) {
      return isError(new Exception(response.value.message, response.value.statusCode))
    }
    return isSuccess(response.value)
  }

  async createCar(car: Car): Promise<Either<Exception, Car>> {
    const response = await this.axiosRequest<Either<Exception, Car>>({
      method: 'POST',
      url: `${this.baseUrl}/carro`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: car,
    })

    if (response.isError()) {
      return isError(new Exception(response.value.message, response.value.statusCode))
    }
    return isSuccess(response.value)
  }

  async healthCheckCar(): Promise<Either<Exception, { message: string }>> {
    // const response = await this.axiosRequest<Either<Exception, { message: string }>>({
    //   method: 'GET',
    //   url: `${this.baseUrl}/health-check`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })

    console.log('this.baseUrl >>>>>', this.baseUrl)

    return isSuccess({ message: 'OK' })
  }
}
