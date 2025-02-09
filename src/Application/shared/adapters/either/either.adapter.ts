export type Either<L, R> = IsError<L, R> | IsSuccess<L, R>

export class IsError<L, R> {
  public readonly value: L

  constructor(value: L) {
    this.value = value
  }

  public isError(): this is IsError<L, R> {
    return true
  }

  public isSuccess(): this is IsSuccess<L, R> {
    return false
  }
}

export class IsSuccess<L, R> {
  public readonly value: R

  constructor(value: R) {
    this.value = value
  }

  public isError(): this is IsError<L, R> {
    return false
  }

  public isSuccess(): this is IsSuccess<L, R> {
    return true
  }
}

export const isError = <L, R>(value: L): Either<L, R> => {
  return new IsError<L, R>(value)
}

export const isSuccess = <L, R>(value: R): Either<L, R> => {
  return new IsSuccess<L, R>(value)
}
