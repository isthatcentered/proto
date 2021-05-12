import * as E from "fp-ts/Either"
import * as R from "fp-ts/Record"
import * as AR from "fp-ts/Array"
import * as AP from "fp-ts/Apply"
import * as TR from "fp-ts/Traversable"
import { flow, pipe, Refinement } from "fp-ts/function"
import * as F from "./validation-failure"




type AnyRecord = Record<any, any>

export type Failure = [ F.ValidationFailure ]

export type Validation<T> = E.Either<Failure, T>

export type Decoder<A, B> = ( value: A ) => Validation<B>

export type typeOf<T extends Decoder<any, any>> = T extends Decoder<any, infer R> ? R : never

export type Any = Decoder<any, any>

// -------------------------------------------------------------------------------------
// (Private) Utils
// -------------------------------------------------------------------------------------
const mapFailure = ( map: ( value: F.ValidationFailure ) => F.ValidationFailure ) => ( failure: Failure ): Failure =>
	[ map( failure[ 0 ] ) ]

const mapFailurePath = ( path: string ) =>
	flow(
		mapFailure( f => ({ ...f, path }) ),
	)

const leafFailure = ( params: Parameters<typeof F.leaf>[0] ): Failure => [ F.leaf( params ) ]

const treeFailure = ( params: Parameters<typeof F.tree>[0] ): Failure => [ F.tree( params ) ]

const failureApplicative = E.getApplicativeValidation( AR.getSemigroup<F.ValidationFailure>() )

// -------------------------------------------------------------------------------------
// Operations @todo: What does john call that ?
// -------------------------------------------------------------------------------------
type Reporter<TResult> = ( errors: Failure ) => TResult

export const structReporter: Reporter<ReturnType<typeof F.toStruct>> = errors => F.toStruct( errors[ 0 ] )

export const run = <TInput, TDecoded, TReport>( decoder: Decoder<TInput, TDecoded>, reporter: Reporter<TReport> ) =>
	flow(
		decoder,
		E.mapLeft( reporter ),
	)


// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const identity = E.right

export const always = <T>( value: T ): Decoder<any, T> => () => E.right( value )

export const fail = ( failure: F.ValidationFailure ): Decoder<any, never> => () =>
	E.left( [ failure ] )

export const fromTryCatch = <A, B>( tryFn: ( a: A ) => B, message?: ( value: A ) => string ): Decoder<A, B> =>
	( value: A ) =>
		pipe(
			E.tryCatch(
				() => tryFn( value ),
				e => leafFailure( {
					path:    "",
					message: message ?
					         message( value ) :
					         (<Error>e).message,
				} ),
			),
		)

export const fromRefinement = <A, B extends A>( refinement: Refinement<A, B>, message: ( value: A ) => string ): Decoder<A, B> =>
	E.fromPredicate(
		refinement,
		value => leafFailure( {
			path:    "",
			message: message( value ),
		} ),
	)

// -------------------------------------------------------------------------------------
// Combinators
// -------------------------------------------------------------------------------------
export const and = <A, B, C>( ab: Decoder<A, B>, bc: Decoder<B, C> ): Decoder<A, C> =>
	flow(
		ab,
		E.chain( bc ),
	)

export const or = <A, B, C>( a: Decoder<A, B>, b: Decoder<A, C> ): Decoder<A, B | C> =>
	( value: A ) => pipe(
		a( value ),
		E.orElseW( _aError => pipe(
			b( value ),
			E.mapLeft( _bError =>
				leafFailure( {
					path:    "",
					message: `Value ${value} could not be decoded as union`, // @todo: what should this error look like ?
				} ),
			),
		) ),
	)

export const struct = <A extends AnyRecord>( mapping: { [K in keyof A]: Decoder<unknown, A[K]> } ): Decoder<unknown, A> =>
	( value ) =>
		(pipe(
			mapping as Record<keyof A, Decoder<any, any>>,
			R.mapWithIndex( ( key, decoder ) =>
				pipe(
					(<any>value || {})[ key ],
					decoder,
					E.mapLeft( mapFailurePath( key ) ),
				) ),
			AP.sequenceS( failureApplicative ),
			E.mapLeft( errs =>
				treeFailure( {
					path:     "",
					children: errs,
				} ),
			),
		) as Validation<A>)

export const array = <A>( decoder: Decoder<unknown, A> ): Decoder<unknown, A[]> =>
	and(
		unknownToArray,
		arr =>
			pipe(
				arr,
				AR.mapWithIndex( ( ind, item ) =>
					pipe(
						decoder( item ),
						E.mapLeft( mapFailurePath( ind.toString() ) ),
					),
				),
				AR.sequence( failureApplicative ),
				E.mapLeft( errs => treeFailure( { path: "", children: errs } ) ),
			),
	)

export const optional = <A, B>( decoder: Decoder<A, B> ): Decoder<A, B | undefined> =>
	or( nilDecoder, decoder )

// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const nilDecoder: Decoder<unknown, undefined> = ( value ) =>
	(value === null || value === undefined) ?
	E.right( undefined ) :
	E.left(
		leafFailure( {
			path:    "",
			message: `Value "${value}" is not nil (null/undefined)`,
		} ),
	)


export const unknownToNumber: Decoder<unknown, number> = fromRefinement(
	( value ): value is number => (typeof value === "number" && !isNaN( value )),
	value => `Value "${value}" of type "${typeof value}" is not a number`,
)

export const unknownToArray: Decoder<unknown, unknown[]> = fromRefinement(
	( value ): value is unknown[] => Array.isArray( value ),
	value => `Value "${value}" of type "${typeof value}" is not an Array`,
)

export const unknownToBoolean: Decoder<unknown, boolean> = fromRefinement(
	( value ): value is boolean => typeof value === "boolean",
	value => `Value "${value}" of type "${typeof value}" is not a boolean`,
)

export const unknownToString: Decoder<unknown, string> = fromRefinement(
	( value ): value is string => typeof value === "string",
	value => `Value "${value}" of type "${typeof value}" is not a string`,
)

export const stringToNumber: Decoder<string, number> = flow(
	parseInt,
	unknownToNumber,
)

export type NonEmptyString = string & { readonly NON_EMPTY_STRING: unique symbol }
export const nonEmptyString: Decoder<string, NonEmptyString> = fromRefinement(
	( value ): value is NonEmptyString => value.trim() !== "",
	value => `Value "${value}" of type "${typeof value}" is not a boolean`,
)
