import * as E from "fp-ts/Either"
import { constant, pipe, Predicate } from "fp-ts/function"
import * as AR from "fp-ts/Array"
import * as DATES from "../dates"
import * as EQ from "fp-ts/Eq"
import * as D from "./decoder"




const TODO = ( reason?: string ): any => {
	throw new Error( `@TODO: ${reason || "implement"}` )
}

const assertType = <TExpected>( value: TExpected ) => value


// -------------------------------------------------------------------------------------
// Models
// -------------------------------------------------------------------------------------
export type Validated<A> = D.Validated<A>

export type Validation<A> = D.Decoder<A, A>


// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const defaultTo = <A>( a: A ): Validation<A> => sequence( nil as Validation<any>, () => E.right( a ) )

export const identity =
	             D.identity

export const fail: ( message: string ) => Validation<any> =
	             D.fail

const satisfy: <A>( predicate: Predicate<A>, message: ( a: A ) => string ) => Validation<A> =
	      D.satisfy

export const contramap: <A, B, C extends B>( map: ( a: A ) => B, validation: Validation<C> ) => Validation<A> =
	             D.contramap

export const eq = <A>( expected: A, Eq: EQ.Eq<A> ): Validation<A> =>
	satisfy(
		actual => Eq.equals( expected, actual ),
		value => `Expected "${expected}" but got ${value}`,
	)

const gteNumber = ( n: number ) => satisfy(
	( value: number ) => value >= n,
	value => `Must be more than or equal to "${n}", got "${value}"`,
)

export const gteDate = ( min: Date ): Validation<Date> =>
	satisfy(
		date => DATES.isSame( min )( date ) || DATES.isAfter( min )( date ),
		() => `Cannot be before ${min}`,
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
	value => `Must be less than or equal to "${n}", got "${value}"`,
)

export const lteDate = ( max: Date ): Validation<Date> =>
	satisfy(
		date => DATES.isSame( max )( date ) || DATES.isBefore( max )( date ),
		() => `Cannot be after ${max}`,
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
	sequence( gte( min ), lte( max ) )



// -------------------------------------------------------------------------------------
// Combinators
// -------------------------------------------------------------------------------------
export const given = <A>( predicate: Predicate<A>, validation: Validation<A> ): Validation<A> =>
	value =>
		predicate( value ) ?
		validation( value ) :
		identity( value )

export const par = <A>( ...validations: Validation<A>[] ): Validation<A> =>
	a =>
		pipe(
			AR.sequence( D.Applicative )( validations )( a ),
			E.map( constant( a ) ), // sequence returns an array of As, we just need one
		)

export const sequence: <A>( ...validations: Validation<A>[] ) => Validation<A> = D.andThen

export const either: <A, B>( left: Validation<A>, right: Validation<B> ) => Validation<A | B> = D.either

export const record: <T extends Record<string, any>>( map: {
	[K in keyof T]: Validation<T[K]>
} ) => Validation<T> = D.record

assertType<Validation<{ hello: string }>>( record( { hello: null as any as Validation<string> } ) )

export const array: <A>( validation: Validation<A> ) => Validation<A[]> = D.array


// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const required = D.required

export const nil: Validation<undefined> = D.nil

export const string: Validation<string> = D.string

export const number: Validation<number> = D.number

export const boolean: Validation<boolean> = D.boolean

export const date: Validation<Date> = D.date

export const nonEmpty: Validation<string> = D.nonEmpty

export const nonEmptyString: Validation<string> = sequence( string, nonEmpty )


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
