export default class Logger {
	private static instance: Logger
	private enable: boolean
	private _config: ConfigType

	private constructor() {
		this._config = {
			appName: 'Not Configured',
			enable: false,
		}

		this.setConfig(this.config)
	}

	public static getInstance(): Logger {
		if (!Logger.instance) {
			Logger.instance = new Logger()
		}

		return Logger.instance
	}

	public setConfig(config: ConfigType) {
		this._config = config
	}

	public log(message: string, ...params: any) {
		this.enable ? console.info(this._config.appName, message, params) : ''
	}

	public info(message: string, ...params: any) {
		console.info(this._config.appName, message, params)
	}

	public get config(): ConfigType {
		return this._config
	}
}

export type ConfigType = {
	appName: string
	enable: boolean
}
