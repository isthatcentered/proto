/**
 * ```ts
 * type Either<E, A> = Left<E> | Right<A>
 * ```
 *
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * @since 2.0.0
 */
import { Functor2 } from "./typeclasses"



// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
type Left<E> = { _tag: "Left", left: E }

type Right<A> = { _tag: "Right", right: A }

type Either<E, A> = Left<E> | Right<A>

// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------
export const isLeft = <E, A>( ma: Either<E, A> ): ma is Left<E> => ma._tag === "Left"

export const isRight = <E, A>( ma: Either<E, A> ): ma is Right<A> => ma._tag === "Right"

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 */
export const left = <E = never, A = never>(e: E): Either<E, A> => ({ _tag: 'Left', left: e })

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 */
export const right = <E = never, A = never>(a: A): Either<E, A> => ({ _tag: 'Right', right: a })

// -------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------
export const URI = "Either"

export type URI = typeof URI

declare module "./hkt"
{
	interface URItoKind2<E, A>
	{
		readonly [ URI ]: Either<E, A>
	}
}


export const Functor: Functor2<URI> = {
	URI: URI,
	map: ( fa, ab ) =>
		     isLeft( fa ) ?
		     fa :
		     right(ab( fa.right )),
}
