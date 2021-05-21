import { Kind, URIS } from "fp-ts/lib/HKT";
import { Monad, Monad1, Monad2 } from "fp-ts/lib/Monad";
import { Functor1 } from "fp-ts/lib/Functor"
import { Kind2, URIS2 } from "../../cutsom-fp-ts/hkt"




const todo = null as any

type Kleisli<F extends URIS, A, B> = ( a: A ) => Kind<F, B>
type Kleisli2<F extends URIS2, E, A, B> = ( a: A ) => Kind2<F, E, B>


export const chain = <F extends URIS>( M: Monad1<F> ) => <A, B, C>( fa: Kleisli<F, A, B>, fbc: ( b: B ) => Kleisli<F, A, C> ): Kleisli<F, A, C> =>
	arg => M.chain( fa( arg ), b => fbc( b )( arg ) )


export function compose<F extends URIS2>( M_: Monad2<F> ): <E, A, B, C>( fbc: Kleisli2<F, E, B, C>, fab: Kleisli2<F, E, A, B> ) => Kleisli2<F, E, A, C>
export function compose<F extends URIS>( M_: Monad<F> ): <A, B, C>( fbc: Kleisli<F, B, C>, fab: Kleisli<F, A, B> ) => Kleisli<F, A, C>
export function compose( M_: Monad<any> )
{
	return <A, B, C>( fbc: Kleisli<any, B, C>, fab: Kleisli<any, A, B> ): Kleisli<any, A, C> =>
		a => M_.chain( fab( a ), fbc )
}


export function andThen<F extends URIS2>( M_: Monad2<F> ): <E, A, B, C>( fab: Kleisli2<F, E, A, B>, fbc: Kleisli2<F, E, B, C> ) => Kleisli2<F, E, A, C>
export function andThen<F extends URIS>( M_: Monad<F> ): <A, B, C>( fab: Kleisli<F, A, B>, fbc: Kleisli<F, B, C> ) => Kleisli<F, A, C>
export function andThen( M_: Monad<any> ): <A, B, C>( fab: Kleisli<any, A, B>, fbc: Kleisli<any, B, C> ) => Kleisli<any, A, C>
{
	return ( fab, fbc ) => compose( M_ )( fbc, fab )
}


export const map = <F extends URIS>( F_: Functor1<F> ) => <A, B, C>( fa: Kleisli<F, A, B>, bc: ( b: B ) => C ): Kleisli<F, A, C> =>
	a => F_.map( fa( a ), bc )

export const tap = <F extends URIS>( F_: Functor1<F> ) => <A, B, C>( fa: Kleisli<F, A, B>, f: ( b: B ) => C ): Kleisli<F, A, B> =>
	map( F_ )( fa, b => {
		f( b )
		return b
	} )



