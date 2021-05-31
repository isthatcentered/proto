import { HKT, HKT2, Kind, Kind2, URIS1, URIS2 } from "./hkt"
import * as E from "./either"
import assertType from "../decoders/validation-failure/assertType"
// -------------------------------------------------------------------------------------
// Typeclasses
// -------------------------------------------------------------------------------------
export type Functor1<F extends URIS1> = {
	readonly URI: F
	map<A, B>( fa: Kind<F, A>, ab: ( a: A ) => B ): Kind<F, B>
}

export type Functor2<F extends URIS2> = {
	readonly URI: F
	map<E, A, B>( fa: Kind2<F, E, A>, ab: ( a: A ) => B ): Kind2<F, E, B>
}

// -------------------------------------------------------------------------------------
// Tests

// -------------------------------------------------------------------------------------
export function addOne<F extends URIS2>( F: Functor2<F> ): <E>( ma: Kind2<F, E, number> ) => Kind2<F, E, number>
export function addOne<F extends URIS1>( F: Functor1<F> ): ( ma: Kind<F, number> ) => Kind<F, number>
export function addOne( F: Functor1<any> )
{
	return ( ma: HKT<any, number> ): HKT<any, number> =>
		F.map( ma, ( n: number ) => n + 1 )
}


// As long as you have an either functor,
// When you pass me an either number i can do my work
assertType<Kind2<"Either", never, number>>( addOne( E.Functor )( E.right( 3 ) ) )

// @todo: fpts apply tuto
