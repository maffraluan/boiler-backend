import { NextFunction } from 'express'

export interface AppNextFunction<T = any> extends NextFunction {
  customData?: T
}
