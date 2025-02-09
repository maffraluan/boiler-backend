import dotenv from 'dotenv'
import { Server } from 'http'
import 'reflect-metadata'
import AppExpress, { IApplication } from './Application/shared/adapters/express/express'
import Logger from './Application/shared/logger/logger'
import { setupMiddlewares } from './Presentation/middlewares/setup.middleware'
import { setupRoutes } from './Presentation/routes'
dotenv.config()

export default class SetupServer {
  private static _instance: SetupServer | null
  private _apiName: string
  private _server: Server
  private _port: string

  constructor(
    private readonly _logger = Logger.getInstance(),
    private readonly _app = AppExpress.getInstance()._app
  ) {}

  public init = ({
    apiName = 'Unnamed application',
    logEnabled = false,
    port = '5005',
  }: Partial<ServerProps>): SetupServer => {
    this.apiName = apiName
    this._port = port
    this._server
    this.setLogger(logEnabled)

    // Initialize container before setting up routes
    this.initializeContainer()

    // Set up middleware and routes
    this.setSetupMiddlewares()
    this.setRoutes()

    // Start the server
    this.start()

    return this
  }

  public static getInstance = (): SetupServer => {
    if (!SetupServer._instance) {
      SetupServer._instance = new SetupServer()
    }

    return SetupServer._instance
  }

  private start = (): void => {
    this._server = this._app.listen(this._port, () => {
      this.logger.info(`is running 🚀🚀🚀`, `Port :${this._port}`)
    })
  }

  public killInstance = (): void => {
    SetupServer._instance = null
  }

  public serverClose = () => {
    if (this.server) this.server.close()
  }

  private initializeContainer = (): void => {
    require('./Application/shared/containers/containers')
  }

  private setRoutes = (): void => {
    setupRoutes(this.app)
  }

  private setSetupMiddlewares = (): void => {
    setupMiddlewares(this.app)
  }

  private setLogger = (enable: boolean): void => {
    this._logger.setConfig({
      appName: this._apiName,
      enable,
    })
  }

  public set apiName(name: string) {
    this._apiName = name
  }

  public get apiName(): string {
    return this._apiName
  }

  public get app(): IApplication {
    return this._app
  }

  public get server() {
    return this._server
  }

  public get logger(): Logger {
    return this._logger
  }

  public get port(): string {
    return this._port
  }

  public set port(port: string) {
    this._port = port
  }
}

export type ServerProps = {
  apiName: string
  logEnabled: boolean
  port: string
}
