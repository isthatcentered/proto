import { Functor1 } from "./typeclasses"



// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
type None = { _tag: "None" }

type Some<A> = { _tag: "Some", some: A }

type Option<A> = None | Some<A>

// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------
export const isNone = <A>( ma: Option<A> ): ma is None => ma._tag === "None"

export const isRight = < A>( ma: Option<A> ): ma is Some<A> => ma._tag === "Some"

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `Either` holding a `None` value. This usually represents a failure, due to the some-bias of this
 * structure.
 */
export const none = ({ _tag: "None" }) as Option<never>

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the some bias
 * of this structure.
 */
export const some = <A = never>( a: A ): Option<A> => ({ _tag: "Some", some: a })

// -------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------
export const URI = "Option"

export type URI = typeof URI

declare module "./hkt"
{
	interface URItoKind1<A>
	{
		readonly [ URI ]: Option<A>
	}
}


export const Functor: Functor1<URI> = {
	URI: URI,
	map: ( fa, ab ) =>
		     isNone( fa ) ?
		     fa :
		     some( ab( fa.some ) ),
}
