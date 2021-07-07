import Axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import encode from "./encode-query-params"

export const AXIOS_INSTANCE = Axios.create({
	paramsSerializer: encode,
})

// https://orval.dev/guides/react-query#mutator
export const customInstance = <T>(
	config: AxiosRequestConfig,
	configOverrides?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
	console.log(config)
	const source = Axios.CancelToken.source()
	const promise = AXIOS_INSTANCE({
		...config,
		...configOverrides,
		cancelToken: source.token,
	})

	// @ts-ignore
	promise.cancel = () => {
		source.cancel("Query was cancelled by React Query")
	}

	return promise
}
