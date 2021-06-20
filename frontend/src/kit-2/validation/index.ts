import * as EI from "fp-ts/Either"
import * as EQ from "fp-ts/Eq"
import * as D2 from "io-ts/Decoder"
import * as D from "io-ts/Decoder"
import { Predicate, Refinement } from "fp-ts/function"
import { pipe } from "fp-ts/lib/function"
import * as DATES from "../dates"
import report from "./report"



// -------------------------------------------------------------------------------------
// Models
// -------------------------------------------------------------------------------------
export type Failure = { path: (string | number)[], message: string, value?: any }

export type Validated<A> = EI.Either<Failure[], A>

export type Validation<B, A = B> = D2.Decoder<A, B>

export type ValidatedType<T extends Validation<any, any>> = D2.TypeOf<T>


// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------- ----------------------------------------------------
export { literal } from "io-ts/Decoder"

const satisfy: {
	<A, B extends A>( refinement: Refinement<A, B>, message: string ): Validation<B, A>
	<A>( predicate: Predicate<A>, message: string ): Validation<A, A>
} = <A>( predicate: Predicate<A>, message: string ): Validation<A, A> => ({
	decode: ( value: any ) =>
		        predicate( value ) ?
		        D2.success( value ) :
		        D2.failure( value, message ),
})

export const eq = <A>( expected: A, Eq: EQ.Eq<A> ): Validation<A, unknown> => pipe(
	D2.fromRefinement( ( actual ): actual is A => Eq.equals( expected, actual as A ), `Must be ${expected}` ),
	required,
)

const gteNumber = ( n: number ) => satisfy(
	( value: number ) => value >= n,
	`Must be more than or equal to "${n}"`,
)

export const gteDate = ( min: Date ): Validation<Date> =>
	satisfy(
		date => DATES.isSame( min )( date ) || DATES.isAfter( min )( date ),
		`Cannot be before ${min}`,
	)


export function gte( min: Date ): Validation<Date>
export function gte( min: number ): Validation<number>
export function gte( min: any ): Validation<any>
{
	return typeof min === "number" ?
	       gteNumber( min ) :
	       gteDate( min )
}


export const min = gte

export const lteNumber = ( n: number ) => satisfy(
	( value: number ) => value <= n,
	`Must be less than or equal to "${n}"`,
)

export const lteDate = ( max: Date ): Validation<Date> =>
	satisfy(
		date => DATES.isSame( max )( date ) || DATES.isBefore( max )( date ),
		`Cannot be after ${max}`,
	)


export function lte( max: Date ): Validation<Date>
export function lte( max: number ): Validation<number>
export function lte( max: any ): Validation<any>
{
	return typeof max === "number" ?
	       lteNumber( max ) :
	       lteDate( max )
}


export const max = lte

export const between = ( min: number, max: number ) =>
	andThen( gte( min ), lte( max ) )

type ValuesOf<T extends { [ key: string ]: any }> = T extends { [ key: string ]: infer V } ? V : never

export const enumm = <T extends { [ name: string ]: any }>( _enm: T ): Validation<ValuesOf<T>, string> => {
	return D2.literal( ...Object.values( _enm ) as [ string ] ) as any
}
// -------------------------------------------------------------------------------------
// Conbinators
// -------------------------------------------------------------------------------------
export { struct, array, sum } from "io-ts/Decoder"

export const either = D2.union

export const andThen = <A, B, C>( ab: Validation<B, A>, bc: Validation<C, B> ): Validation<C, A> =>
	pipe(
		ab,
		D2.compose( bc ),
	)

export const optional = <A, B>( decoder: Validation<B, A> ): Validation<B | undefined, A> => ({
	decode: ( value: any ) =>
		        (value === null) || (value === undefined) ?
		        D2.success( value ) :
		        decoder.decode( value ),
})

export const required = <A, B>( validation: Validation<B, A> ): Validation<NonNullable<B>, A> => ({
	decode: ( value: A ) =>
		        (value === null) || (value === undefined) ?
		        D2.failure( value, "Required" ) :
		        validation.decode( value ) as EI.Either<D2.DecodeError, NonNullable<B>>,
})

type Slot<A, B extends A = A> = [ Refinement<A, B> | Predicate<A>, Validation<B, unknown> ]

export const cond = <A extends any>( slots: Slot<A>[  ] ): Validation<A, unknown> => ({
	decode: value => {
		const decoder = slots.find( s => s[ 0 ]( value as any ) )
		return decoder ?
		       decoder[ 1 ].decode( value ) :
		       D.success( value as A )
	},
})


// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const date = pipe( satisfy( ( thing ): thing is Date => thing instanceof Date, "Must be a date" ), required )

export const boolean = pipe( D2.boolean, required )

export const number = pipe( D2.number, required )

export const string = pipe( D2.string, required )

export const nil = satisfy( ( thing ): thing is undefined => thing === undefined || thing === null, "Must be empty" )

export const nonEmptyString = andThen( D2.string, satisfy( ( str ) => str.length > 0, "Cannot be blank" ) )

// -------------------------------------------------------------------------------------
// Interpreters
// -------------------------------------------------------------------------------------
export const run = <B, A>( validation: Validation<B, A>, value: A ): EI.Either<Failure[], B> =>
	pipe(
		validation.decode( value ),
		EI.mapLeft( report ),
	)

// -------------------------------------------------------------------------------------
// Interop
// -------------------------------------------------------------------------------------
export const asRefinement = <B extends A, A>( validation: Validation<B, A> ): Refinement<A, B> =>
	( value: A ): value is B => EI.isRight( validation.decode( value ) )


//
// // -------------------------------------------------------------------------------------
// // Constructors
// // -------------------------------------------------------------------------------------
// export const identity =
// 	             D.identity
//
// export const fail: ( message: string ) => Validation<any> =
// 	             D.fail
//
// const satisfy: <A>( predicate: Predicate<A>, message: ( a: A ) => string ) => Validation<A> =
// 	      D.satisfy
//
// export const contramap: <A, B, C extends B>( map: ( a: A ) => B, validation: Validation<C> ) => Validation<A> =
// 	             D.contramap
//
// export const eq = <A>( expected: A, Eq: EQ.Eq<A> ): Validation<A> =>
// 	satisfy(
// 		actual => Eq.equals( expected, actual ),
// 		value => `Expected "${expected}" but got ${value}`,
// 	)
//
//



//
//
// // -------------------------------------------------------------------------------------
// // Combinators
// // -------------------------------------------------------------------------------------
// export const given = <A>( predicate: Predicate<A>, validation: Validation<A> ): Validation<A> =>
// 	value =>
// 		predicate( value ) ?
// 		validation( value ) :
// 		identity( value )
//
// export const par = <A>( ...validations: Validation<A>[] ): Validation<A> =>
// 	a =>
// 		pipe(
// 			AR.sequence( D.Applicative )( validations )( a ),
// 			E.map( constant( a ) ), // sequence returns an array of As, we just need one
// 		)
//
// export const sequence: <A>( ...validations: Validation<A>[] ) => Validation<A> = D.andThen
//
// export const either: <A, B>( left: Validation<A>, right: Validation<B> ) => Validation<A | B> = D.either
//
// export const record: <T extends Record<string, any>>( map: {
// 	[K in keyof T]: Validation<T[K]>
// } ) => Validation<T> = flow( D.record, D.required )
//
// assertType<Validation<{ hello: string }>>( record( { hello: null as any as Validation<string> } ) )
//
// export const array: <A>( validation: Validation<A> ) => Validation<A[]> = flow( D.array, D.required )
//
//
// // -------------------------------------------------------------------------------------
// // Primitives
// // -------------------------------------------------------------------------------------
// export const required = D.required
//
// export const nil: Validation<undefined> = D.nil
//
// export const string: Validation<string> = pipe( D.string, required )
//
// export const number: Validation<number> = pipe( D.number, required )
//
// export const boolean: Validation<boolean> = pipe( D.boolean, required )
//
// export const date: Validation<Date> = pipe( D.date, required )
//
// export const nonEmpty: Validation<string> = D.nonEmpty
//
// export const nonEmptyString: Validation<string> = sequence( string, nonEmpty )


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
