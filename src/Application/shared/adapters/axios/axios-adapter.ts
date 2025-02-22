import axios, { AxiosRequestConfig } from 'axios'

export interface IAxiosRequest {
	<T>(config: AxiosRequestConfig): Promise<T>
}

export const axiosRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
	return axios(config)
}
