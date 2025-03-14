import axios, { AxiosRequestConfig } from 'axios'

export interface AxiosHttpAdapter {
	<T>(config: AxiosRequestConfig): Promise<T>
}

export const axiosHttpAdapter = async <T>(config: AxiosRequestConfig): Promise<T> => {
	return axios(config)
}
