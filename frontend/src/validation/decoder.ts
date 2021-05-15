import * as V from "./validated"
import * as NEA from "fp-ts/NonEmptyArray"
import { flow, pipe, Predicate, Refinement } from "fp-ts/function"
import * as R from "fp-ts/Record"
import * as AR from "fp-ts/Array"
import * as AP from "fp-ts/Apply"
import * as REFINEMENTS from "./refinements"


// @todo: decoder is (or has ?) a traversable ? & foldable ?

const TODO = ( reason?: string ): any => {
	throw new Error( `@TODO: ${reason || "implement"}` )
}

const assertType = <TExpected>( value: TExpected ) => value

type Failure = { path: string, message: string, value: any }
type Failures = NEA.NonEmptyArray<Failure>
export type Decoder<B, A = unknown> = ( value: A ) => V.Validated<Failures, B>
export type Decoded<T extends Decoder<any>> = T extends Decoder<infer R> ? R : never
export type Encoded<T extends Decoder<any, any>> = T extends Decoder<any, infer R> ? R : never

// -------------------------------------------------------------------------------------
// Private
// -------------------------------------------------------------------------------------
const mapFailure = ( map: ( failure: Failure ) => Failure ) =>
	map

const mapFailurePath = ( map: (( path: string ) => string) | string ) =>
	flow(
		mapFailure( failure => ({
				...failure,
				path: typeof map === "string" ?
				      map :
				      map( failure.path ),
			}),
		),
	)

const addParentPath = ( path: string ) =>
	mapFailurePath(
		originalPath =>
			originalPath ?
			[ path, originalPath ].join( "." ) :
			path,
	)

const OK = V.valid

const KO = ( failure: Failure ) => V.invalid( NEA.of( failure ) )


// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const always = <T>( value: T ): Decoder<T> => () => V.valid( value )

export const fail = ( message: string ): Decoder<any> => () => V.invalid( [ { path: "", message, value: undefined } ] )

export const refinement = <A, B extends A>( refinement: Refinement<A, B>, message: ( value: A ) => string ): Decoder<B, A> =>
	V.fromPredicate(
		refinement,
		value => NEA.of( { path: "", value, message: message( value ) } ),
	)

export const predicate = <A>( refinement: Predicate<A>, message: ( value: A ) => string ): Decoder<A, A> =>
	V.fromPredicate(
		refinement,
		value => NEA.of( { path: "", value, message: message( value ) } ),
	)

// -------------------------------------------------------------------------------------
// Higher Orer Decoders
// -------------------------------------------------------------------------------------
export const and = <A, B, C>( left: Decoder<B, A>, right: Decoder<C, B> ): Decoder<C, A> =>
	flow(
		left,
		V.chain( right ),
	)

export const or = <A, B, C>( left: Decoder<B, A>, right: Decoder<C, A> ): Decoder<C | B, A> =>
	value =>
		pipe(
			left( value ),
			V.orElseW( () => right( value ) ),
		)

export const record = <A extends Record<keyof B, any>, B extends Record<string, any>>( mappings: { [K in keyof B]: Decoder<B[K], A[K]> } ): Decoder<B, A | unknown> =>
	and(
		refinement(
			REFINEMENTS.record<A>(),
			value => `Expected a record, got "${value}" of type "${typeof value}"`,
		),
		( value: A ) => pipe(
			mappings as Record<keyof B, Decoder<any, any>>,
			R.mapWithIndex( ( key, decoder ) => decoder( value [ key ] ) ),
			R.mapWithIndex( ( key, validated ) =>
				pipe(
					validated,
					V.mapLeft(
						NEA.map( addParentPath( key ) ),
					),
				),
			),
			AP.sequenceS( V.getApplicative( NEA.getSemigroup<Failure>() ) ),
			result => result as V.Validated<Failures, B>,
		),
	)

assertType<Decoder<{ prop: number }, { prop: string } | unknown>>( record( { prop: null as any as Decoder<number, string> } ) )


export const array = <A, B>( decoder: Decoder<B, A> ): Decoder<B[], A[] | unknown> =>
	and(
		refinement(
			REFINEMENTS.array,
			value => `Expected an array, got "${value}" of type "${typeof value}"`,
		),
		flow(
			AR.mapWithIndex( ( key, item ) =>
				pipe(
					item as A,
					decoder,
					V.mapLeft(
						NEA.map(
							addParentPath( key.toString() ),
						),
					),
				),
			),
			AR.sequence( V.getApplicative( NEA.getSemigroup<Failure>() ) ),
		),
	)

assertType<Decoder<{ prop: number }[], { prop: string }[] | unknown>>( array( null as any as Decoder<{ prop: number }, { prop: string }> ) )



// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const identity = <T>( value: T ) => V.valid( value )

export const number: Decoder<number> = refinement(
	REFINEMENTS.number,
	value => `Expected a number, got "${value}" of type "${typeof value}"`,
)

export const string: Decoder<string> = refinement(
	REFINEMENTS.string,
	value => `Expected a string, got "${value}" of type "${typeof value}"`,
)

export const nonEmpty = <T extends string|unknown[]>(value: T) =>
	and(
		string,
		refinement( REFINEMENTS.notBlank, value => `Expected a non empty string, got "${value}"` )
	)(value)

assertType<V.Validated<Failures , string>>(nonEmpty(""))

export const regex = ( regex: RegExp ) => and(
	string,
	predicate( value => regex.test( value ), value => `Expected a non empty string, got "${value}"` ),
)

export const boolean = refinement(
	REFINEMENTS.boolean,
	value => `Expected a Boolean, got ${value} of type ${typeof value}`,
)

export const date = refinement(
	REFINEMENTS.date,
	value => `Expected a Date, got ${value} of type ${typeof value}`,
)
