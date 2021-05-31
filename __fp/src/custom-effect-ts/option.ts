// -------------------------------------------------------------------------------------
// Models
// -------------------------------------------------------------------------------------
import { makeMonoid } from "./monoid"




export type None = { _tag: "None" }
export type Some<A> = { _tag: "Some", some: A }
export type Option<A> = None | Some<A>

// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------
export const isNone = <A>( o: Option<A> ): o is None => o._tag === "None"
export const isSome = <A>( o: Option<A> ): o is Some<A> => o._tag === "Some"

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const none: None = { _tag: "None" }
export const some = <A>( value: A ): Some<A> => ({ _tag: "Some", some: value })

// -------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 */
export const getMonoidFirst = <A>() => makeMonoid<Option<A>>(
	none,
	( a, b ) =>
		isNone( a ) ?
		b :
		a,
)

/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 */
export const getMonoidLast = <A>() => makeMonoid<Option<A>>(
	none,
	// @note: We can get the dual of any monoid just by flipping the `concat`.
	( a, b ) => getMonoidFirst<A>().concat( b, a ),
)
