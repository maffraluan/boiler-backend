import { Router } from 'express'
import { IApplication } from '../../Application/shared/adapters/express/express'
import { getEnvValue } from '../../Application/shared/utils/get-env-variable'
import { CarRoute } from './car.route'

export const setupRoutes = (app: IApplication): void => {
  const router = Router()
  router.use(new CarRoute().router)
  app.use(getEnvValue(process.env.API_VERSION), router)
}
