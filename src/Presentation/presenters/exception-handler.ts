import { ResponseProps, httpException } from '.'
import { AppRequest } from '../../Application/shared/adapters/express/app-request'
import { AppResponse } from '../../Application/shared/adapters/express/app-response'

export const handleException = (err: any, req: AppRequest<any, any>, res: AppResponse<any>) => {
	const props: ResponseProps = {
		res,
		name: err.name,
		cause: err.cause,
		statusCode: err.statusCode,
		message: err.message,
		method: req.method,
	}

	return httpException(props, req)
}
