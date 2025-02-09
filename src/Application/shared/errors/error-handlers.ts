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

export class CatchHandler {
  static async catch<T>(operation: () => Promise<T>, logHandler: (message: string) => Promise<void>): Promise<T> {
    try {
      return await operation()
    } catch (err: unknown) {
      if (err instanceof Error) {
        await logHandler(err.message)
        throw err
      }
      const errorMessage = String(err)
      await logHandler(errorMessage)
      throw new Error(errorMessage)
    }
  }
}
