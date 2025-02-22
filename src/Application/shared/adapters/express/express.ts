import express, { Application } from 'express'

export default class AppExpress {
	private static instance: AppExpress
	_app: IApplication

	private constructor() {
		this._app = express()
	}

	public static getInstance(): AppExpress {
		if (!AppExpress.instance) {
			AppExpress.instance = new AppExpress()
		}

		return AppExpress.instance
	}
}

export interface IApplication extends Application {}
