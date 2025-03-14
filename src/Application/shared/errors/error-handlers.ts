import { httpStatusCodes } from '../status-code/http-status-code'

export class Exception extends Error {
	private _statusCode: number
	private _message: string

	constructor(message: string, statusCode = 500) {
		super(message)
		this._statusCode = statusCode
		this._message = message
	}

	get message() {
		return this._message
	}

	get statusCode() {
		return this._statusCode
	}
}

export class ErrorHandler extends Error {
	public readonly statusCode: number

	constructor(message: string, statusCode: number) {
		super(message)
		this.statusCode = statusCode
	}
}
export class BadRequestError extends ErrorHandler {
	constructor(message: string) {
		super(message, httpStatusCodes.BAD_REQUEST)
	}
}

export class CustomError extends ErrorHandler {
	constructor(message: string) {
		super(message, httpStatusCodes.BAD_REQUEST)
	}
}

export class PasswordExpiredError extends ErrorHandler {
	constructor(message: string) {
		super(message, httpStatusCodes.UNAUTHORIZED)
	}
}

export class NotFoundError extends ErrorHandler {
	constructor(message: string) {
		super(message, httpStatusCodes.NOT_FOUND)
	}
}

export class UnauthorizedError extends ErrorHandler {
	constructor(message: string) {
		super(message, httpStatusCodes.UNAUTHORIZED)
	}
}

export class ConflictError extends ErrorHandler {
	constructor(message: string) {
		super(message, httpStatusCodes.CONFLICT)
	}
}

export class InternalError extends ErrorHandler {
	constructor(message: string) {
		super(message, httpStatusCodes.INTERNAL_SERVER)
	}
}

export class UnprocessableError extends ErrorHandler {
	constructor(message: string) {
		super(message, httpStatusCodes.UNPROCESSABLE_ENTITY)
	}
}
