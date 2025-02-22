import 'reflect-metadata'
import { createExpressServer, useContainer } from 'routing-controllers'
import { container } from 'tsyringe'
import { ContainerManager } from './Application/shared/containers/containers'

import { TsyringeAdapter } from './Application/shared'
import { getEnvValue } from './Application/shared/utils/get-env-variable'
import { setupMiddlewares } from './Presentation/middlewares/setup.middleware'
import { CarController } from './Presentation/routes'
import SetupServer from './server'

// Start the first instance of the container
ContainerManager.getInstance()

// Setup adapter for tsyringe routing-controllers
useContainer(new TsyringeAdapter(container))

const app = createExpressServer({
	controllers: [CarController],
	routePrefix: getEnvValue(process.env.API_VERSION),
	defaultErrorHandler: true,
	development: true,
	validation: false,
	cors: true,
	classTransformer: true,
	interceptors: [],
	middlewares: [setupMiddlewares],
})

SetupServer.getInstance().init({
	apiName: getEnvValue(process.env.APP_NAME),
	logEnabled: true,
	port: getEnvValue(process.env.PORT),
	app,
})
