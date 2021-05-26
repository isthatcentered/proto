import * as NEA from "fp-ts/NonEmptyArray"
import { constant, flow, Predicate, Refinement } from "fp-ts/function"
import { pipe } from "fp-ts/lib/function"
import * as EI from "fp-ts/Either"
import * as E from "fp-ts/Either"
import { Monad2 } from "fp-ts/Monad"
import { Functor2 } from "fp-ts/Functor"
import { Applicative2 } from "fp-ts/Applicative"
import * as AR from "fp-ts/Array"
import * as REC from "fp-ts/Record"
import * as AP from "fp-ts/Apply"
import { Clazz } from "../helpers"




const assertType = <TExpected>( value: TExpected ) => value

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
export type Failure = { path: string, message: string, value: any }

export type Validated<A> = EI.Either<NEA.NonEmptyArray<Failure>, A>

type In<T extends Decoder<any, any>> = T extends Decoder<infer A, any> ? A : never

type Out<T extends Decoder<any, any>> = T extends Decoder<any, infer B> ? B : never

export type Decoder<A, B> = ( a: A ) => Validated<B>

type AnyDecoder = Decoder<any, any>


// -------------------------------------------------------------------------------------
// Type class members
// -------------------------------------------------------------------------------------
export const map = <B, C>( bc: ( b: B ) => C ) => <A>( fa: Decoder<A, B> ): Decoder<A, C> =>
	flow( fa, EI.map( bc ) )

export const mapFailure = ( eb: ( e: Failure ) => Failure ) => <A, B>( fa: Decoder<A, B> ): Decoder<A, B> =>
	flow(
		fa,
		EI.mapLeft( NEA.map( eb ) ),
	)

export const ap = <A, B>( fa: Decoder<A, B> ) => <C>( fab: Decoder<A, ( a: B ) => C> ): Decoder<A, C> =>
	a => EI.getApplicativeValidation( NEA.getSemigroup<Failure>() ).ap( fab( a ), fa( a ) )

export const chain = <A, B, C>( f: ( a: B ) => Decoder<A, C> ) => ( ma: Decoder<A, B> ): Decoder<A, C> =>
	a =>
		pipe(
			ma( a ),
			EI.chain( b => f( b )( a ) ),
		)


// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const identity = <A>( a: A ) => EI.right( a )

export const fail = ( message: string ): Decoder<any, never> =>
	() =>
		E.left(
			NEA.of( failure( {
				message,
				value: undefined,
			} ) ),
		)

export const satisfy: {
	<A, B extends A>( refinement: Refinement<A, B>, onFalse: ( a: A ) => string ): Decoder<A, B>
	<A>( predicate: Predicate<A>, onFalse: ( a: A ) => string ): Decoder<A, A>
} = <A>( predicate: Predicate<A>, onFalse: ( a: A ) => string ): Decoder<A, A> =>
	EI.fromPredicate( predicate, value => NEA.of( failure( { message: onFalse( value ), value } ) ) )

const instanceOf = <A>( clazz: Clazz<A> ) =>
	satisfy<A>(
		value => value instanceof clazz,
		value => `Expected value "${value}" to be a "${clazz.name}" but got an instance of "${(value as any as object)?.constructor?.name}"`,
	)


// -------------------------------------------------------------------------------------
// Combinators
// -------------------------------------------------------------------------------------
const _andThen = <A, B, C>( left: Decoder<A, B>, right: Decoder<B, C> ): Decoder<A, C> =>
	flow( left, EI.chain( right ) )


export function andThen<A, B, C, D, E, F, G>( ab: Decoder<B, A>, bc: Decoder<C, B>, cd: Decoder<D, C>, de: Decoder<E, D>, ef: Decoder<F, E>, fg: Decoder<G, F> ): Decoder<G, A>
export function andThen<A, B, C, D, E, F>( ab: Decoder<B, A>, bc: Decoder<C, B>, cd: Decoder<D, C>, de: Decoder<E, D>, ef: Decoder<F, E> ): Decoder<F, A>
export function andThen<A, B, C, D, E>( ab: Decoder<B, A>, bc: Decoder<C, B>, cd: Decoder<D, C>, de: Decoder<E, D> ): Decoder<E, A>
export function andThen<A, B, C, D, >( ab: Decoder<B, A>, bc: Decoder<C, B>, cd: Decoder<D, C> ): Decoder<D, A>
export function andThen<A, B, C>( ab: Decoder<B, A>, bc: Decoder<C, B> ): Decoder<C, A>
export function andThen<A, B, C>( ab: Decoder<B, A> ): Decoder<B, A>
export function andThen( ...ks: Decoder<any, any>[] ): Decoder<any, any>
{
	return ks.reduce( _andThen, identity )
}


// @todo: Alternative typeclass
export const either = <A, B, C, D>( left: Decoder<A, B>, right: Decoder<C, D> ): Decoder<A | C, B | D> =>
	a =>
		pipe(
			left( a as A ),
			E.orElseW( leftFailures =>
				pipe(
					right( a as C ),
					E.mapLeft( rightFailures => NEA.concat( leftFailures, rightFailures ) ),
				),
			),
		)

export const contramap = <A, B, C extends B>( map: ( a: A ) => B, validation: Decoder<C, any> ): Decoder<A, A> =>
	a =>
		pipe(
			validation( map( a ) as C ), // C is a hack to force the validation type to be the result of the `map`, not the opposite
			E.map( constant( a ) ),
		)

export const array = <A, B>( decoder: Decoder<A, B> ): Decoder<A[], B[]> =>
	flow(
		AR.traverseWithIndex( E.getApplicativeValidation( NEA.getSemigroup<Failure>() ) )(
			( index, value ) => pipe( decoder, addParentPath( index.toString() ) )( value ),
		),
	)

assertType<Decoder<number[], string[]>>( array( identity as Decoder<number, string> ) )


export const record = <T extends Record<string, Decoder<any, any>>>( map: T ): Decoder<{ [K in keyof T]: In<T[K]> }, { [K in keyof T]: Out<T[K]> }> =>
	value =>
		(pipe(
			map as Record<string, AnyDecoder>,
			REC.mapWithIndex(
				( key, decoder ) => pipe( decoder, addParentPath( key ) )( value[ key ] ),
			),
			AP.sequenceS( EI.getApplicativeValidation( NEA.getSemigroup<Failure>() ) ),
		) as Validated<Out<Decoder<{ [K in keyof T]: In<T[K]> }, { [K in keyof T]: Out<T[K]> }>>>)

assertType<Decoder<{ key: number }, { key: string }>>( record( { key: identity as Decoder<number, string> } ) )

export const required = <A, B>( decoder: Decoder<A, B> ): Decoder<A, NonNullable<B>> =>
	andThen(
		satisfy( value => value !== undefined && value !== null, () => "Required" ),
		decoder as Decoder<A, NonNullable<B>>,
	)

export const optional = <A, B>( decoder: Decoder<A, B> ): Decoder<A, B | undefined> =>
	either(
		satisfy( ( value: unknown ): value is undefined => value === undefined || value === null, () => "Must be empty" ),
		decoder,
	)

// -------------------------------------------------------------------------------------
// Non-pipeables
// -------------------------------------------------------------------------------------
const _map: Monad2<URI>["map"] = ( fa, f ) => pipe( fa, map( f ) )
const _ap: Monad2<URI>["ap"] = ( fab, fa ) => pipe( fab, ap( fa ) )
const _chain: Monad2<URI>["chain"] = ( ma, f ) => pipe( ma, chain( f ) )


// -------------------------------------------------------------------------------------
// Type class instances
// -------------------------------------------------------------------------------------
export const URI = "Decoder"

export type URI = typeof URI

declare module "fp-ts/lib/HKT"
{
	interface URItoKind2<E, A>
	{
		readonly [ URI ]: Decoder<E, A>
	}
}

export const Functor: Functor2<URI> = {
	URI,
	map: _map,
}

export const Applicative: Applicative2<URI> = {
	URI,
	map: _map,
	ap:  _ap,
	of:  a => () => EI.right( a ),
}


export const Monad: Monad2<URI> = {
	URI,
	map:   _map,
	ap:    _ap,
	chain: _chain,
	of:    a => () => EI.right( a ),
}


// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
const _typeofMessage = ( expectedType: string ) => ( value: unknown ) => `Expected a ${expectedType} but got "${value}"`
export const string: Decoder<unknown, string> = satisfy(
	( value ): value is string => typeof value === "string",
	_typeofMessage( "string" ),
)

export const number: Decoder<unknown, number> = satisfy(
	( value ): value is number => typeof value === "number" && !isNaN( value ),
	_typeofMessage( "number" ),
)

export const boolean: Decoder<unknown, boolean> = satisfy(
	( value ): value is boolean => typeof value === "boolean",
	_typeofMessage( "boolean" ),
)

// @todo: sequence(required, not(message))
export const nil: Decoder<unknown, undefined> = satisfy(
	( value ): value is undefined => value === undefined || value === null,
	_typeofMessage( "null || undefined" ),
)

export const date = instanceOf( Date )

export const nonEmpty: Decoder<string, string> = satisfy(
	( value: string ) => value.trim() !== "",
	() => "Cannot be empty",
)

// -------------------------------------------------------------------------------------
// Private
// -------------------------------------------------------------------------------------
const addParentPath = ( parentPath: string ) => <A, B>( kleisli: Decoder<A, B> ): Decoder<A, B> =>
	pipe(
		kleisli,
		mapFailure( failure => ({
			...failure,
			path: failure.path ?
			      [ parentPath, failure.path ].join( "." ) :
			      parentPath,
		}) ),
	)

const failure = ( overrides: { path?: string, message: string, value: any } ): Failure => ({
	path: "",
	...overrides,
})
