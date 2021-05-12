import { Refinement } from "fp-ts/function"
import * as E from "fp-ts/Either"
import * as RF from "./refinements"




type LeafFailure = { type: "leaf", path: string, message: string }
type TreeFailure = { type: "tree", path: string, children: Failure[] }
type Failure =
	| TreeFailure
	| LeafFailure

const leafFailure = ( params: Omit<LeafFailure, "type"> ): LeafFailure => ({ type: "leaf", ...params })
const treeFailure = ( params: Omit<TreeFailure, "type"> ): TreeFailure => ({ type: "tree", ...params })
type ValidationMessage<T> = (( value: T ) => string) | string

export type Validation<A, B = A> = ( value: A ) => E.Either<Failure, B>


// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const fromRefinement = <A, B extends A>( refinement: Refinement<A, B> ) => ( message: (( value: A ) => string) | string ): Validation<A, B> =>
	E.fromPredicate(
		refinement,
		value =>
			leafFailure( {
				path:    "",
				message: typeof message === "string" ?
				         message :
				         message( value ),
			} ),
	)

export const fromPredicate = <A>( check: ( value: A ) => boolean ) =>
	fromRefinement( check as Refinement<A, A> )

// fromStruct
// fromCast/cast

// -------------------------------------------------------------------------------------
// Operators
// -------------------------------------------------------------------------------------
export const either = <A, B, C extends A>( _a: Validation<A, B>, _b: Validation<A, C> ): Validation<A, B | C> => {
	return null as any
}

export const and = <A, B, C>( _a: Validation<A, B>, _b: Validation<B, C> ): Validation<A, C> => {
	return null as any
}


export function compose<A, B, C>( a: Validation<A, B>, b: Validation<B, C> ): Validation<A, C>
export function compose<A, B, C, D>( a: Validation<A, B>, b: Validation<B, C>, c: Validation<C, D> ): Validation<A, D>
export function compose<A, B, C, D, E>( a: Validation<A, B>, b: Validation<B, C>, c: Validation<C, D>, d: Validation<D, E> ): Validation<A, E>
export function compose( ..._validations: Validation<any, any>[] ): Validation<any, any>
{
	return null as any
}


const assertType = <TExpected>( value: TExpected ) => value

assertType<Validation<unknown, undefined | number>>( either(
	null as any as Validation<unknown, undefined>,
	null as any as Validation<unknown, number>,
) )

assertType<Validation<unknown, Date>>( and(
	null as any as Validation<unknown, string>,
	null as any as Validation<string, Date>,
) )

assertType<Validation<unknown, number>>( compose(
	null as any as Validation<unknown, string>,
	null as any as Validation<string, Date>,
	null as any as Validation<Date, number>,
) )


// message (mapleft)
// not
// any
// all
// run(validation, concurrent)

// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const required = <A>() =>
	( value: A ) => fromRefinement( RF.notNil )( "Required" )( value )


export const empty = fromPredicate( value => value === undefined || value === null )( value => `Must be empty, got ${value}` ) as Validation<unknown, undefined>

// @todo: enums
enum blah
{
	indeed = "true",
	yup    = "valse"
}

// goals for morning ???
// maybe string[] is enough ? test with struct (need dynamic message ([...expected], actual)
// use Validation data type -> Validated
// list apis from libs (effect-ts)
// struct validation takes context (pass either a function context -> validation | validation)

type ValuesOf<T extends { [ key: string ]: any }> = T extends { [ key: string ]: infer V } ? V : never

export const enumm = <T extends { [ name: string ]: any }>( _enm: T ): ValuesOf<T> => {
	// value is one of object.values e
	return null as any
}
const d = enumm( blah ) === "true"

// valueof
// oneof

// numbers
export const number: Validation<number> = and(
	required(),
	fromRefinement( RF.number )( value => `"${value}" is not a valid number` ),
)

export const positive = fromPredicate( ( value: number ) => value >= 0 )( value => `Must be >= 0, got "${value}"` )

export const max = ( max: number ) =>
	fromPredicate( ( value: number ) => value <= max )( value => `Must be <= ${max}, got "${value}"` )

// Strings
export const string: Validation<string> = and(
	required(),
	fromRefinement( RF.string )( value => `"${value}" is not a valid string` ),
)

export const notBlank = fromPredicate( ( value: string ) => value.trim() !== "" )( `Cannot be blank"` )

// Dates
export const date: Validation<Date> = and(
	required(),
	fromRefinement( RF.date )( value => `"${value}" is not a valid date` ),
)

export const future = fromPredicate( ( date: Date ) => date > new Date() )( value => `Must come after today, got "${value}"` )

// passed = not future ?
// either today or future

const validation = {
	blah:   compose( number, positive, max( 40 ) ), // compose = single validator, will return 1 error, all triggers all validations and will retunr string[]
	indeed: compose( string, notBlank ),
	yup:    either( empty, and( date, future ) ),
}
