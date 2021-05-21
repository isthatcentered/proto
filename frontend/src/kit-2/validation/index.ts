import * as NEA from "fp-ts/NonEmptyArray"
import * as E from "fp-ts/Either"
import { constant, flow, pipe, Predicate, Refinement } from "fp-ts/function"
import * as AR from "fp-ts/Array"
import * as AP from "fp-ts/Apply"
import * as REC from "fp-ts/Record"
import { Clazz } from "../helpers"




const TODO = ( reason?: string ): any => {
	throw new Error( `@TODO: ${reason || "implement"}` )
}

const assertType = <TExpected>( value: TExpected ) => value



// -------------------------------------------------------------------------------------
// Models
// -------------------------------------------------------------------------------------
type Failure<T = never> = { path: string, message: string, value: any, data: T }
export type Validated<T> = E.Either<NEA.NonEmptyArray<Failure>, T>
export type Validation<B, A = B> = ( value: A ) => Validated<B>
export type AnyValidation = Validation<any>

type Refined<T extends Validation<any>> = T extends Validation<infer R> ? R : never
type Base<T extends Validation<any, any>> = T extends Validation<any, infer R> ? R : never

// -------------------------------------------------------------------------------------
// Private
// -------------------------------------------------------------------------------------
const failure = <T = never>( failure: Partial<Failure<T>> ): Failure<T> => ({
	path:    "",
	message: "",
	value:   undefined,
	data:    undefined as any as T,
	...failure,
})

const mapFailure = <A, B>( f: ( failure: Failure<A> ) => Failure<B> ) => ( failure: Failure<A> ): Failure<B> =>
	f( failure )

const addParentPath = ( parentPath: string ) => <T>( failure: Failure<T> ) =>
	pipe(
		failure,
		mapFailure( failure => ({
			...failure,
			path: failure.path ?
			      [ parentPath, failure.path ].join( "." ) :
			      parentPath,
		}) ),
	)

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const defaultTo = <A>( a: A ): Validation<A, A> => () => E.right( a )

export const identity = <A>( a: A ) => E.right( a ) as Validated<A>

export const fail = ( message: string ): Validation<any> => () =>
	E.left(
		NEA.of(
			failure( {
				message,
			} ),
		),
	)


function fromRefinement<A, B extends A>( refinement: Refinement<A, B>, message: ( value: A ) => string ): Validation<B, A>
function fromRefinement<A>( predicate: Predicate<A>, message: ( value: A ) => string ): Validation<A>
function fromRefinement( refinement: ( value: any ) => boolean, message: ( value: any ) => string ): Validation<any>
{
	return E.fromPredicate( refinement, value => NEA.of( failure( { message: message( value ) } ) ) )
}


const typeOf = <T>( kind: "string" | "boolean" | "number" | "undefined" | "object" ) =>
	fromRefinement<T>(
		value => typeof value === kind,
		value => `Expected value of type "${kind}", got "${value}" of type ${typeof value}`,
	)

const instanceOf = <T>( clazz: Clazz<T> ) =>
	fromRefinement<T>(
		value => value instanceof clazz,
		value => `Expected value "${value}" to be an instance of "${clazz.name}" but was an instance of "${(value as any as object)?.constructor?.name}"`,
	)


// -------------------------------------------------------------------------------------
// Combinators
// -------------------------------------------------------------------------------------
export const when = <A, B>( fab: ( a: A ) => Validation<B, A> ) => <C>( fa: Validation<A, C> ): Validation<B, C> =>
	flow(
		fa,
		E.chain( a => fab( a )( a ) ),
	)


export const par = <A>( ...validations: Validation<A, A>[] ): Validation<A, A> => a =>
	pipe(
		validations,
		AR.map( v => v( a ) ),
		AR.sequence( E.getApplicativeValidation( NEA.getSemigroup<Failure>() ) ),
		E.map( constant( a ) ), // sequence returns an array of As, we just need one
	)


export function sequence<A, B, C, D, E, F, G>( ab: Validation<B, A>, bc: Validation<C, B>, cd: Validation<D, C>, de: Validation<E, D>, ef: Validation<F, E>, fg: Validation<G, F> ): Validation<G, A>
export function sequence<A, B, C, D, E, F>( ab: Validation<B, A>, bc: Validation<C, B>, cd: Validation<D, C>, de: Validation<E, D>, ef: Validation<F, E> ): Validation<F, A>
export function sequence<A, B, C, D, E>( ab: Validation<B, A>, bc: Validation<C, B>, cd: Validation<D, C>, de: Validation<E, D> ): Validation<E, A>
export function sequence<A, B, C, D, >( ab: Validation<B, A>, bc: Validation<C, B>, cd: Validation<D, C> ): Validation<D, A>
export function sequence<A, B, C>( ab: Validation<B, A>, bc: Validation<C, B> ): Validation<C, A>
export function sequence<A, B, C>( ab: Validation<B, A> ): Validation<B, A>
export function sequence( ...validations: Validation<any, any>[] ): Validation<any, any>
{
	return value =>
		validations.reduce(
			( acc, curr ) =>
				pipe(
					acc,
					E.chain( curr ),
				),
			identity( value ),
		)
}


export const either = <A, B>( left: Validation<B, A>, right: Validation<B, A> ): Validation<B, A> =>
	a =>
		pipe(
			left( a ),
			E.orElse( leftFailures =>
				pipe(
					right( a ),
					E.mapLeft( rightFailures => NEA.concat( leftFailures, rightFailures ) ),
				),
			),
		)

export const record = <B extends Record<keyof A, any>, A extends Record<string, any>>( map: {
	[K in keyof A]: Validation<B[K], A[K]>
} ): Validation<B, A> =>
	value =>
		(pipe(
			map as Record<string, AnyValidation>,
			REC.mapWithIndex(
				( key, v ) =>
					pipe(
						v( value[ key ] ),
						E.mapLeft( NEA.map( addParentPath( key ) ) ),
					),
			),
			AP.sequenceS( E.getApplicativeValidation( NEA.getSemigroup<Failure>() ) ),
		) as Validated<B>)

assertType<Validation<{ key: number }, { key: string }>>( record( { key: identity as Validation<number, string> } ) )
assertType<Validation<{ key: string }, { key: string }>>( record( { key: identity as Validation<string, string> } ) )


// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const required = <T>(): Validation<T> =>
	fromRefinement( value => value !== undefined && value !== null, () => "Required" )

export const string = sequence( required<string>(), typeOf( "string" ) )

export const number = sequence( required<number>(), typeOf( "number" ) )

export const boolean = sequence( required<boolean>(), typeOf( "boolean" ) )

export const date = sequence( required<Date>(), instanceOf( Date ) )

export const nonEmpty = fromRefinement(
	<T>( value: string | T[] ) =>
		Array.isArray( value ) ?
		value.length > 0 :
		value.trim() !== "",
	() => "Cannot be empty",
)

export const nonEmptyString = sequence( string, nonEmpty )

export const gte = ( n: number ) => fromRefinement(
	( value: number ) => value >= n,
	value => `Must be more than or equal to "${n}", got "${value}"`,
)

export const min = gte

export const lte = ( n: number ) => fromRefinement(
	( value: number ) => value <= n,
	value => `Must be less than or equal to "${n}", got "${value}"`,
)

export const max = lte

export const between = ( min: number, max: number ) =>
	sequence( gte( min ), lte( max ) )

 

// export const year
/**
 * and: chain
 * or: ma orelse(mb)
 * par/sequence -> traversable/ap
 *
 *
 */

// message override
// provide default
// parent context
// optional

// typeof
// instanceof
// gte (max, positve = gte(0)
// lte (min)
// fallback
// eq
// prop("", eq()) <- value can be an object and we only care about some properties
// not
// and
// or
// par <- apply par, flatten
// chain/compose <- apply seq, flatte / sequence ? (don't overwhelm user with dumb messages (cannot be empty + must be at least 8 chars long)
// property('a', { a: 10 }); // => Valid(10)
// map error
// map errorS
// DELIGHTFUL/SIMPLE/Duh
// _chainFirst (Composes computations in sequence, using the return value of one computation to determine the next computation and keeping only the result of the first)

//
// @todo 🙋‍♂️
// I THINK EITHER HAS APPLY STRUCT <- doesn't matter no ?
// when is simply an inline validation value => [...validations](value) = chain(user, when(predicate, Validation<T> ), )
// can I use freaking task either ????
// const age = either( // <- this = monoid kleisli or
// 	empty / defaultTo(() => 5) ,
// 	chain( // <- that shit a monad ?? taskeither is
// 		number, positive, defaultTo( 5 ), // compose returns first failure (guard) (chain?)
// 		par / sequence( // <- that shit an applicative/traversable ??
// 		max( 108, ( { max, actual } ) => `Dude, max is ${max}, how old are you ???` ),
// 		min( 10 ),
// 		defaultTo( 10 ),
// 		), // Par returns list of failures
// 	),
// )
//const validators = [trim, isNotEmpty, hasNumbers];
//
// Validation.of('123456').validateAll(validators); // => Valid('123456')
// Validation.of('123456 ').validateAll(validators); // => Valid('123456')
// Validation.of('wrong zipcode').validateAll(validators); // => Invalid(['Must have numbers'], 'wrong zipcode')
// Validation.of('   ').validateAll(validators); // => Invalid(['Can`t be empty', 'Must have numbers'], '')



//
// // -------------------------------------------------------------------------------------
// // Private
// // -------------------------------------------------------------------------------------
// const mapFailure = ( map: ( failure: Failure ) => Failure ) =>
// 	map
//
// const mapFailurePath = ( map: (( path: string ) => string) | string ) =>
// 	flow(
// 		mapFailure( failure => ({
// 				...failure,
// 				path: typeof map === "string" ?
// 				      map :
// 				      map( failure.path ),
// 			}),
// 		),
// 	)
//
// const addParentPath = ( path: string ) =>
// 	mapFailurePath(
// 		originalPath =>
// 			originalPath ?
// 			[ path, originalPath ].join( "." ) :
// 			path,
// 	)
//
// const OK = V.valid
//
// const KO = ( failure: Failure ) => V.invalid( NEA.of( failure ) )
//
