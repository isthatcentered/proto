/**
 * ```ts
 * type Validated<E, A> = Invalid<E> | Valid<A>
 * ```
 *
 * Validated is much like Either<E, A>, it represents a computation that might fail with an error of type E
 * or succeed with a value of type A, but as opposed to the usual computations involving Either,
 * they are able to collect multiple failures.
 */
import { Applicative, Applicative2C } from "fp-ts/lib/Applicative"
import { Semigroup } from "fp-ts/lib/Semigroup"
import { flow, pipe, Predicate, Refinement } from "fp-ts/function"
import { identity } from "fp-ts/lib/function"
import { PipeableTraverse2 } from "fp-ts/lib/Traversable"
import { HKT } from "fp-ts/lib/HKT"

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
export interface Invalid<E>
{
	readonly _tag: "Invalid"
	readonly invalid: E
}

export interface Valid<A>
{
	readonly _tag: "Valid"
	readonly valid: A
}

// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------
export const isValid = <E, A>( ma: Validated<E, A> ): ma is Valid<A> => ma._tag === "Valid"
export const isInvalid = <E, A>( ma: Validated<E, A> ): ma is Invalid<E> => ma._tag === "Invalid"

export type Validated<E, A> = Invalid<E> | Valid<A>

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const valid = <T>( value: T ): Validated<never, T> => ({ _tag: "Valid", valid: value })

export const invalid = <E>( value: E ): Validated<E, never> => ({ _tag: "Invalid", invalid: value })

export const fromPredicate: {
	<E, A, B extends A>( refinement: Refinement<A, B>, onFalse: ( a: A ) => E ): ( a: A ) => Validated<E, B>
	<E, A>( predicate: Predicate<A>, onFalse: ( a: A ) => E ): ( a: A ) => Validated<E, A>
} = <E, A>( predicate: Predicate<A>, onFalse: ( a: A ) => E ) =>
	( a: A ) => (predicate( a ) ?
	             valid( a ) :
	             invalid( onFalse( a ) ))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
export const foldW = <E, A, EB, AB>( config: { onIvalid: ( value: E ) => EB, onValid: ( value: A ) => AB } ) => ( validated: Validated<E, A> ): EB | AB => {
	switch ( validated._tag ) {
		case "Invalid":
			return config.onIvalid( validated.invalid )
		case "Valid":
			return config.onValid( validated.valid )
	}
}

export const fold = <E, A, B>( config: { onIvalid: ( value: E ) => B, onValid: ( value: A ) => B } ) =>
	flow( foldW( config ) )


export const getInvalidUnsafe = <E, A>( validated: Validated<E, A> ): E =>
	pipe(
		validated,
		fold( {
			onIvalid: identity,
			onValid:  value => {
				throw new Error( `Trying to get Invalid of Valid(${value})` )
			},
		} ),
	)
// @todo: fold, foldW

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
// @todo: fromNullable, fromTryCatch

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Less strict version of `orElse`
 *
 * @category combinators
 */
export const orElseW = <E1, E2, B>( onLeft: ( e: E1 ) => Validated<E2, B> ) => <A>( ma: Validated<E1, A> ): Validated<E2, A | B> =>
	isInvalid( ma ) ?
	onLeft( ma.invalid ) :
	ma

/**
 * Useful for recovering from errors.
 *
 * @category combinators
 */
export const orElse: <E1, A, E2>( onLeft: ( e: E1 ) => Validated<E2, A> ) => ( ma: Validated<E1, A> ) => Validated<E2, A> = orElseW

// @todo: fromEither, fromOption, orElse

// -------------------------------------------------------------------------------------
// Type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 */
export const map: <A, B>( f: ( a: A ) => B ) => <E>( fa: Validated<E, A> ) => Validated<E, B> = ( f ) => ( fa ) =>
	isInvalid( fa ) ?
	fa :
	valid( f( fa.valid ) )

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 */
export const bimap: <E, G, A, B>( f: ( e: E ) => G, g: ( a: A ) => B ) => ( fa: Validated<E, A> ) => Validated<G, B> = ( f, g ) => (
	fa,
) => (isInvalid( fa ) ?
      invalid( f( fa.invalid ) ) :
      valid( g( fa.valid ) ))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 */
export const mapLeft: <E, G>( f: ( e: E ) => G ) => <A>( fa: Validated<E, A> ) => Validated<G, A> = ( f ) => ( fa ) =>
	isInvalid( fa ) ?
	invalid( f( fa.invalid ) ) :
	fa

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 */
export const apW: <E2, A>( fa: Validated<E2, A> ) => <E1, B>( fab: Validated<E1, ( a: A ) => B> ) => Validated<E1 | E2, B> = ( fa ) => (
	fab,
) => isInvalid( fab ) ?
     fab :
     (
	     isInvalid( fa ) ?
	     fa :
	     valid( fab.valid( fa.valid ) )
     )

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 */
export const ap: <E, A>( fa: Validated<E, A> ) => <B>( fab: Validated<E, ( a: A ) => B> ) => Validated<E, B> = apW

/**
 * @category Pointed
 */
export const of: <E = never, A = never>( a: A ) => Validated<E, A> = valid

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 */
export const chainW = <E2, A, B>( f: ( a: A ) => Validated<E2, B> ) => <E1>( ma: Validated<E1, A> ): Validated<E1 | E2, B> =>
	isInvalid( ma ) ?
	ma :
	f( ma.valid )

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 */
export const chain: <E, A, B>( f: ( a: A ) => Validated<E, B> ) => ( ma: Validated<E, A> ) => Validated<E, B> = chainW

/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(V.valid(['a']), V.traverse(O.Applicative)(RA.head)),
 *   O.some(V.valid('a'))
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.Applicative)(RA.head)),
 *   O.none
 * )
 *
 * @category Traversable
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> = <F>( F: Applicative<F> ) => <A, B>( f: ( a: A ) => HKT<F, B> ) => <E>(
	ta: Validated<E, A>,
): HKT<F, Validated<E, B>> =>
	(isInvalid( ta ) ?
	 F.of( invalid( ta.invalid ) ) :
	 F.map<B, Validated<E, B>>( f( ta.valid ), valid ))

// -------------------------------------------------------------------------------------
// Non-pipeables
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
export const URI = "Validated"

export type URI = typeof URI

declare module "fp-ts/lib/HKT"
{
	interface URItoKind2<E, A>
	{
		readonly Validated: Validated<E, A>
	}
}

// apply fab to fa or accumulate errors
export const getApplicative = <E>( SE: Semigroup<E> ): Applicative2C<URI, E> => ({
	URI,
	_E:  undefined as any,
	map: ( fa, f ) => pipe( fa, map( f ) ),
	ap:  ( fab, fa ) =>
		     isInvalid( fab ) ?
		     (
			     isInvalid( fa ) ?
			     invalid( SE.concat( fab.invalid, fa.invalid ) ) :
			     fab
		     ) :
		     (
			     isInvalid( fa ) ?
			     fa :
			     valid( fab.valid( fa.valid ) )
		     ),
	of:  valid,
})

