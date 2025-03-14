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
