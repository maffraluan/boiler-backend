import 'reflect-metadata'
import { getEnvValue } from './Application/shared/utils/get-env-variable'
import SetupServer from './server'

export default class App {
  public static async start(): Promise<SetupServer> {
    // Connect to services
    // await messageQueue.connect()
    // await logService.connect()

    // Start consumer
    // await carConsumer.start()

    return SetupServer.getInstance().init({
      apiName: getEnvValue(process.env.PM2_NAME_APP),
      logEnabled: true,
      port: getEnvValue(process.env.PORT),
    })
  }
}

App.start()
