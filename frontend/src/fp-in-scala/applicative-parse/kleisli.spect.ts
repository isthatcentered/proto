// Represents a function `A => F[B]`
import { Kind2, URIS2 } from "fp-ts/lib/HKT"
import { Functor2, Functor2C, Functor3C } from "fp-ts/Functor"
import * as E from "fp-ts/Either"
import { pipe } from "fp-ts/function"



// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
type Kleisli<A, B extends Kind2<any, any, any>> = ( a: A ) => B



// -------------------------------------------------------------------------------------
// Type class members
// -------------------------------------------------------------------------------------
const map = <F extends URIS2>( F_: Functor2<F> ) => <B, C>( bc: ( b: B ) => C ) => <E, A>( fa: Kleisli<A, Kind2<F, E, B>> ): Kleisli<A, Kind2<F, E, C>> =>
	a => F_.map( fa( a ), bc )


// -------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------
export const URI = "Kleisli"

export type URI = typeof URI

declare module "fp-ts/lib/HKT"
{
	interface URItoKind2< E, A>
	{
		// @ts-ignore
		readonly [ URI ]: Kleisli<E, A>
	}
}

// export const getFunctor = <F extends URIS2>( F_: Functor2<F> ): Functor2C<URI, Kind2<F, any, any>> => ({
// 	URI,
// 	_E:  null as any,
// 	map: ( fa, bc ) =>
// 		     pipe(
// 			     fa,
// 			     map( F_ )( bc ),
// 		     ),
// })
//
// const blah = getFunctor( E.Functor ).map( (( _a: string ) => E.right( 5 )), ( _n ) => "" )
//
// // Functor instance
// export const identity: Functor2<URI> = {
// 	URI,
// 	map: (ma, f) => f(ma)
// }
test(``, (  ) => {

})
