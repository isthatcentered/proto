import { isNaN } from "formik"
import { pipe, Predicate, Refinement } from "fp-ts/function"
import * as AR from "fp-ts/Array"
import * as B from "fp-ts/boolean"




export function compose<A, B extends A>( ab: Refinement<A, B> ): Refinement<A, B>
export function compose<A, B extends A, C extends B>( ab: Refinement<A, B>, bc: Refinement<B, C> ): Refinement<A, C>
export function compose<A, B extends A, C extends B, D extends C>( ab: Refinement<A, B>, bc: Refinement<B, C>, cd: Refinement<C, D> ): Refinement<A, D>
export function compose( ...refinements: Refinement<any, any>[] ): Refinement<any, any>
{
	 return ( value: any ): value is any => pipe(
			refinements,
			AR.reduce( <boolean>true, ( acc, refinement ) => B.SemigroupAll.concat( acc, refinement( value ) ) ),
	 )
}

export const allPass = <A>( ...predicates: Predicate<A>[] ): Predicate<A> =>
	 a => !predicates.some( predicate => !predicate( a ) )

export const anyPass = <A>( ...predicates: Predicate<A>[] ): Predicate<A> =>
	 a => predicates.some( predicate => predicate( a ) )


export const and = <A, B extends A, C extends B>( left: Refinement<A, B>, right: Refinement<B, C> ): Refinement<A, C> =>
	 compose( left, right )

export const notNil = <T>( value: T ): value is NonNullable<T> =>
	 value !== undefined && value !== null

export const number = ( value: unknown ): value is number => (typeof value === "number") && !isNaN( value ) && (value !== Infinity)

export const string = ( value: unknown ): value is string =>
	 typeof value === "string"

export const notBlank = ( value: string ): value is string => value.trim() !== ""

export const boolean = ( value: unknown ): value is boolean =>
	 typeof value === "boolean"

export const date = ( value: unknown ): value is Date =>
	 value instanceof Date

export const record = <A>() => ( value: unknown ): value is A => typeof value === "object" && !Array.isArray( value )

export const array = ( value: unknown ): value is unknown[] => Array.isArray( value )
