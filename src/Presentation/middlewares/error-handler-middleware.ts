import { AppRequest } from '../../Application/shared/adapters/express/app-request'
import { AppResponse } from '../../Application/shared/adapters/express/app-response'
import { AppNextFunction } from '../../Application/shared/adapters/express/app-next-function'
import { ErrorHandler } from '../../Application/shared/errors/error-handlers'

export const errorMiddleware = (
  error: Partial<ErrorHandler>,
  _: AppRequest<any, any>,
  res: AppResponse<any>,
  next: AppNextFunction
): Promise<any> => {
  const statusCode = error?.statusCode ?? 500
  const message = error?.message ? error?.message : 'Internal Server Error'
  next()
  return Promise.resolve(res.status(statusCode).send({ success: false, message }))
}
