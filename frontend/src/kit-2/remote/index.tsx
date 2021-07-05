import { pipe } from "fp-ts/function"
import { UseQueryResult } from "react-query"
import { AxiosResponse } from "axios"




type Initial = { type: "initial" };
type Pending = { type: "pending" };
type Success<T> = { type: "resolved"; value: T };
type Failure<E> = { type: "rejected"; details: E };
export type Remote<E, T> =
	 | Initial
	 | Pending
	 | Success<T>
	 | Failure<E>

// ------------------------------------------------------------
// Constructors
// ------------------------------------------------------------
export const initial: Remote<never, never> = { type: "initial" }

export const pending: Remote<never, never> = { type: "pending" }

export const success = <TSuccess extends any>(
	 value: TSuccess,
): Remote<never, TSuccess> => ({ type: "resolved", value })

export const failure = <TError extends any>(
	 details: TError,
): Remote<TError, never> => ({ type: "rejected", details })


// ------------------------------------------------------------
// Guards
// ------------------------------------------------------------
export const isInitial = ( remote: Remote<any, any> ): remote is Initial =>
	 remote.type === "initial"

export const isPending = ( remote: Remote<any, any> ): remote is Pending =>
	 remote.type === "pending"

export const isSuccess = <E, T>( remote: Remote<E, T> ): remote is Success<T> =>
	 remote.type === "resolved"

export const isFailure = <E, T>( remote: Remote<E, T> ): remote is Failure<E> =>
	 remote.type === "rejected"


// -------------------------------------------------------------------------------------
// Typeclass members
// -------------------------------------------------------------------------------------
export const map = <A, B>( ab: ( a: A ) => B ) => <E extends any>( fa: Remote<E, A> ): Remote<E, B> =>
	 isSuccess( fa ) ?
	 success( ab( fa.value ) ) :
	 fa

export const mapFailure = <E, EB>( eeb: ( e: E ) => EB ) => <A extends any>( fa: Remote<E, A> ): Remote<EB, A> =>
	 isFailure( fa ) ?
	 failure( eeb( fa.details ) ) :
	 fa


// -------------------------------------------------------------------------------------
// Interop
// -------------------------------------------------------------------------------------
export const fromQueryState = <E, A>( state: UseQueryResult<AxiosResponse<A>, E> ): Remote<E, A> => {
	 switch ( state.status ) {
			case "idle":
				 return initial
			case "loading":
				 return pending
			case "error":
				 return failure( state.error )
			case "success":
				 return success( state.data.data )
	 }
}

// ------------------------------------------------------------
// Destructors
// ------------------------------------------------------------
export const fold = <E, T, R>( map: {
	 onInitial: () => R
	 onPending: () => R
	 onError: ( err: E ) => R
	 onSuccess: ( value: T ) => R
} ) => ( remote: Remote<E, T> ): R => {
	 switch ( remote.type ) {
			case "initial":
				 return map.onInitial()
			case "pending":
				 return map.onPending()
			case "rejected":
				 return map.onError( remote.details )
			case "resolved":
				 return map.onSuccess( remote.value )
	 }
}

export const View = <E, T>( props: {
	 remote: Remote<E, T>
	 map: {
			onInitial: () => any
			onPending: () => any
			onError: ( err: E ) => any
			onSuccess: ( value: T ) => any
	 }
} ) => pipe( props.remote, fold( props.map ) )
