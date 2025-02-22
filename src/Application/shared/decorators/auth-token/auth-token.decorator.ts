import { createParamDecorator } from '../'

export function AuthToken() {
	return createParamDecorator({
		value: (action) => {
			const token = action.request.headers['authorization']
			if (!token) {
				throw new Error('Authorization token missing')
			}
			return token
		},
	})
}
