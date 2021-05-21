import {
	HttpClient as GeneratedSwaggerHttpClient,
	HttpResponse,
	QueryParamsType,
} from "../__generated__/referentiel-modeles-vehicules"

export type SwaggerQuery<TArgs, TReject, TResolve> = (
	params: TArgs,
) => Promise<HttpResponse<TResolve, TReject>>

export type SwaggerQueryParamsType<
	T extends SwaggerQuery<any, any, any>
	> = T extends SwaggerQuery<infer P, any, any> ? P : never

export type SwaggerQueryResolveType<
	T extends SwaggerQuery<any, any, any>
	> = T extends SwaggerQuery<any, any, infer R> ? R : never

export type SwaggerQueryRejectType<
	T extends SwaggerQuery<any, any, any>
	> = T extends SwaggerQuery<any, infer R, any> ? R : never


class HttpClient<T> extends GeneratedSwaggerHttpClient<T> {
	protected toQueryString(rawQuery?: QueryParamsType): string {
		const noUndefinedValuesQuery = this._removeUndefinedValues(rawQuery || {})
		const query = new URLSearchParams()

		Object.keys(noUndefinedValuesQuery).forEach(key => {
			const value = noUndefinedValuesQuery[key]
			const splitValues = Array.isArray(value) ? value : [value]
			splitValues.forEach(item => query.append(key, item))
		})

		return query.toString()
	}

	private _removeUndefinedValues(thing: Record<any, any>): Record<any, any> {
		return Object.keys(thing).reduce((acc, key) => {
			const value = thing[key]
			return value ? { ...acc, [key]: value } : acc
		}, {})
	}
}
export default HttpClient

