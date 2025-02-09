import { Response } from 'express'

export interface AppResponse<T = any> extends Response<T, Record<string, any>> {}
