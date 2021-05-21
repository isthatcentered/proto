import * as REMOTE from "./remote"




export type Parameter<T extends ( ...args: any[] ) => any> = Parameters<T>[0]

export type UseQueryParams<T> =
	| { active: true, params: T }
	| { active: false }

export const useFakeTask = <TParams, TResolve>( _query: ( params: TParams ) => Promise<TResolve>, params: UseQueryParams<TParams>, returns: TResolve ) => {
	// @todo: query
	const state = REMOTE.success( returns )
	return [
		params.active ?
		state :
		REMOTE.initial,
	] as const
}
