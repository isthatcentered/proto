//@ts-ignore
import { pipe } from "fp-ts/function"
import { Option } from "./option"
import { Monoid } from "./monoid"



//@ts-ignore
export type XPure<S, R, E, A> = {}

//@ts-ignore
export type Effect<R, E, A> = {}


type Left<E> = { _tag: "Left", left: E }
type Right<A> = { _tag: "Right", right: A }
//@ts-ignore
export type Either<E, A> = Left<E> | Right<A>
export const left = <E>( value: E ): Either<E, never> => ({ _tag: "Left", left: value })
export const right = <A>( value: A ): Either<never, A> => ({ _tag: "Right", right: value })


export interface F_<A>
{
	_tag: "F_"
	A: A
}

export interface G_<A>
{
	_tag: "G_"
	A: A
}

export interface H_<A>
{
	_tag: "H_"
	A: A
}


export interface URItoKind<S, R, E, A>
{
	F_: F_<A>
	G_: G_<A>
	H_: H_<A>
	XPure: XPure<S, R, E, A>
	Effect: Effect<R, E, A>
	Either: Either<E, A>
	Option: Option<A>
}

export type Param = "S" | "R" | "E"

export interface Fixed<P extends Param, K>
{
	Fix: {
		[p in P]: K
	}
}

export type OrFixed<P extends Param, C, V> = C extends Fixed<P, infer K> ? K : V

export type URIS = keyof URItoKind<any, any, any, any>

export type Kind<F extends URIS, C, S, R, E, A> =
//                   If a value is provided for C -> S = C. Otherwise, S = S
//                   v
	URItoKind<OrFixed<"S", C, S>, OrFixed<"R", C, R>, OrFixed<"E", C, E>, A>[F]


// -------------------------------------------------------------------------------------
// Typeclasses
// -------------------------------------------------------------------------------------
export interface Functor<F extends URIS, C = {}>
{
	URI: F
	map: <A, B>( map: ( value: A ) => B ) => <S, R, E>( ma: Kind<F, C, S, R, E, A> ) => Kind<F, C, S, R, E, B>
}

export interface BiFunctor<F extends URIS, C = {}>
{
	URI: F,
	bimap: <E, EB, A, AB>(
		f: ( e: OrFixed<"E", C, E> ) => OrFixed<"E", C, EB>,
		g: ( a: A ) => AB,
	) =>
		<S, R>( ma: Kind<F, C, S, R, E, A> ) => Kind<F, C, S, R, EB, AB>
}

export interface Foldable<F extends URIS, C = {}>
{
	URI: F,
	foldLeft: <A, B>( z: B, f: ( acc: B, curr: A ) => B ) => <S, R, E>( as: Kind<F, C, S, R, E, A> ) => B
	foldRight: <A, B>( z: B, f: ( curr: A, acc: B ) => B ) => <S, R, E>( as: Kind<F, C, S, R, E, A> ) => B
	foldMap: <S, R, E, A>( as: Kind<F, C, S, R, E, A> ) => <B>( f: ( element: A ) => B ) => ( M: Monoid<B> ) => B
	concat: <S, R, E, A>( as: Kind<F, C, S, R, E, A> ) => ( M: Monoid<A> ) => A
}

// -------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------
export const functorOption: Functor<"Option"> = {
	URI: "Option",
	map: ( map ) => ( ma ) =>
		ma._tag === "None" ?
		ma :
		({ _tag: "Some", some: map( ma.some ) }),
}

export const biFunctorEither: BiFunctor<"Either"> = {
	URI:   "Either",
	bimap: ( f, g ) => ( ma ) =>
		ma._tag === "Left" ?
		{ _tag: "Left", left: f( ma.left ) } :
		{ _tag: "Right", right: (g( ma.right )) },
}

export const biFunctorStringValidation: BiFunctor<"Either", Fixed<"E", string>> = biFunctorEither

// -------------------------------------------------------------------------------------
// Tests

// -------------------------------------------------------------------------------------
function addOne<F extends URIS, C = {}>( F: Functor<F, C> ): <S, R, E>( fa: Kind<F, C, S, R, E, number> ) => Kind<F, C, S, R, E, number>
function addOne( F: Functor<"F_"> )
{
	return ( fa: F_<number> ): F_<number> =>
		pipe(
			fa,
			F.map( n => n + 1 ),
		)
}

