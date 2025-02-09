import { json, urlencoded } from 'express'
import cors from 'cors'
import { errorMiddleware } from './error-handler-middleware'
import { IApplication } from '../../Application/shared/adapters/express/express'

export const setupMiddlewares = (app: IApplication): void => {
  app.disable('x-powered-by')
  app.use(urlencoded({ extended: true }))
  app.use(cors())
  app.use(json())
  app.use(errorMiddleware)
}
