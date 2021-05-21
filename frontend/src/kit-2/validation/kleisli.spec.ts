test(`blah`, (  ) => {

})
export default undefined
// import * as O from "fp-ts/Option"
// import * as T from "fp-ts/Task"
// import { HKT, Kind, URIS } from "fp-ts/lib/HKT"
// import { Functor1 } from "fp-ts/lib/Functor"
// import { Applicative1 } from "fp-ts/lib/Applicative"
// import { Apply1 } from "fp-ts/lib/Apply"
//
//
//
//
// const todo = ( msg?: string ): any => (): never => {
// 	throw new Error( msg || "@todo: implement" )
// }
//
// const effectfulProgram = ( _str: string ) => O.some( 5 )
//
// const pureUnaryProgram = ( _numb: number ) => true
//
// // map is lift with the arguments rearranged
// const lift = <F extends URIS>( F_: Functor1<F> ) => <A, B>( f: ( a: A ) => B ): ( fa: Kind<F, A> ) => Kind<F, B> =>
// 	fa => F_.map( fa, f )
//
// type map<F extends URIS, A, B> = ( fa: Kind<F, A>, f: ( a: A ) => B ) => Kind<F, B>
//
// // The functor typeclass requires only map
// interface Functor_<F extends URIS>
// {
// 	map: <A, B>( fa: Kind<F, A>, f: ( a: A ) => B ) => Kind<F, B>
// }
//
//
// //  🙋‍Functors allow us to compose an effectful program f
// //  with a pure program g, as long as g is unary (single input)
// //
// // | f                    g                     composition
// // |-----------------------------------------------------------
// // | pure                 pure                  g ∘ f
// // | effectful            pure (unary)          lift(g) ∘ f
// // | effectful            pure (n-ary >1)       ???
//
// // But what if g (the pure program) is not unary ?
//
// // We can make the program unary again via currying
// const pureNonUnaryProgramCurried = ( _a: number ) => ( _b: string ): number =>
// 	todo()
//
// // Stuck: no operation on functor instance able to unpack value
// // F<(b: B) => C> to a function (fb: F<B>) => F<C>.
// const lifted: ( fa: O.Option<number> ) => O.Option<( b: string ) => number> =
// 	      lift( O.Functor )( pureNonUnaryProgramCurried )
//
//
// // APPLY
// // owns such a unpacking operation
// // Apply, composition of non unary functions via currying
// interface Apply_<F extends URIS> extends Functor_<F>
// {
// 	ap: <C, D>( fcd: HKT<F, ( c: C ) => D>, fc: HKT<F, C> ) => HKT<F, D>
// }
//
// // The ap function is basically unpack with the arguments rearranged
// type unpack = <F extends URIS, A, B>( fab: HKT<F, ( a: A ) => B> ) => ( fa: HKT<F, A> ) => HKT<F, B>
// type ap = <F extends URIS, A, B>( fab: HKT<F, ( a: A ) => B>, fa: HKT<F, A> ) => HKT<F, B>
//
//
// const optAp = <A, B>( fab: O.Option<( a: A ) => B> ) => ( fa: O.Option<A> ): O.Option<B> =>
// 	O.isNone( fab ) ?
// 	fab :
// 	(
// 		O.isNone( fa ) ?
// 		fa :
// 		O.some( fab.value( fa.value ) )
// 	)
//
// // APPLICATIVE
// // Gives a way to lift a valu A to F[A]
// interface Applicative_<F extends URIS> extends Apply_<F>
// {
// 	of: <A>( a: A ) => HKT<F, A>
// }
//
// const applicativeOption: Applicative1<"Option"> = {
// 	URI: "Option",
// 	map: ( fa, ab ) =>
// 		     O.isNone( fa ) ?
// 		     fa :
// 		     applicativeOption.of( ab( fa.value ) ),
// 	ap:  ( fab, fa ) =>
// 		     O.isNone( fab ) || O.isNone( fa ) ?
// 		     O.none :
// 		     applicativeOption.map( fa, fab.value ),
// 	of:  O.some,
// }
//
// const applicativeTask: Applicative1<"Task"> = {
// 	URI: "Task",
// 	map: ( fa, ab ) => () => fa().then( ab ),
// 	ap:  ( fab, fa ) =>
// 		     () => Promise.all( [ fab(), fa() ] )
// 			     .then( ( [ ab, a ] ) => ab( a ) ),
// 	of:  T.of,
// }
//
//
// // We have all the tools to imlpement a genric liftA2 given any applicative
// const liftA2 = <F extends URIS, A, B, C>( F_: Apply1<F> ) => ( abc: ( a: A ) => ( b: B ) => C ) =>
// 	( fa: Kind<F, A> ) => ( fb: Kind<F, B> ): Kind<F, C> => {
// 		const lifted: Kind<F, ( b: B ) => C> = F_.map( fa, abc ) // map is just lift with arguments rearranged
// 		return F_.ap( lifted, fb ) // we now accept the pure with lifted arguments ( fa: Kind<F, A> ) => ( fb: Kind<F, B> ) => Kind<F, C>
// 	}
//
//
// // TLDR: functional programming is all about composition
//
//
// // @todo: what does the scala books says about the "why" of functors ?
// // @todo: note somewhere in 80/20 program that those todos are a great way to void bikeshedding
