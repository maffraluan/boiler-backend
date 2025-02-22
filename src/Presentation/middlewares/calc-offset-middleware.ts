import { AppRequest } from '../../Application/shared/adapters/express/app-request'
import { AppResponse } from '../../Application/shared/adapters/express/app-response'
import { AppNextFunction } from '../../Application/shared/adapters/express/app-next-function'
import { calcOffSet } from '../../Application/shared/utils/pagination.helper'

export const calcOffsetMiddleware = (req: AppRequest, _: AppResponse, next: AppNextFunction) => {
	const params = req?.query

	const offset = calcOffSet(params)

	req.query.offset = offset.toString()

	next()
}
