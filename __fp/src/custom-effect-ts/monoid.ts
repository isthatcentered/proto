/*
 * @note: A Monoid is a category with one object
 *
 * Laws:
 * - Associativity: (
 *    - (a + b + c) = ((a + b) + c) = (a + (b + c))
 *    - concat(a, concat(b, c)) = concat(concat(a, b), c) = ...
 *   )
 *
 * - Identity: (
 *    - (identity + a = a) && (a + identity = a)
 *   )
 */



import { flow } from "fp-ts/function"




export interface Monoid<A>
{
	concat: ( a?: A, b?: A ) => A,
	identity: A
}

export const makeMonoid = <T>( identity: T, concat: ( a: T, b: T ) => T ): Monoid<T> => ({
	concat: ( a, b ) => concat( a ?? identity, b ?? identity ),
	identity,
})
// See option monoids
export const stringMonoid = makeMonoid( "", ( a, b ) => a + b )
// @note: A function having the same type for arg and return is called an endofunction
export const getEndoMonoid = <A>(): Monoid<( value: A ) => A> => makeMonoid( ( a ) => a, ( f, g ) => flow( f, g ) )

export const getListMonoid = <T>(): Monoid<T[]> => makeMonoid<T[]>( [], ( a, b ) => a.concat( b ) )

export const numberAdditionMonoid: Monoid<number> = makeMonoid( 0, ( a, b ) => a + b )

const booleanOr: Monoid<boolean> = makeMonoid<boolean>( false, ( a, b ) => a || b )

const booleanAnd: Monoid<boolean> = makeMonoid<boolean>( true, ( a, b ) => a && b )

export const listMonoid = getListMonoid

// @note: that shit cool
export const productMonoid = <A, B>( MA: Monoid<A>, MB: Monoid<B> ): Monoid<[ A, B ]> =>
	makeMonoid(
		[ MA.identity, MB.identity ],
		( a, b ) =>
			[ MA.concat( a[ 0 ], b[ 0 ] ), MB.concat( a[ 1 ], b[ 1 ] ) ],
	)

// @note: that shit extra cool, you can merge records of arrays, records of records, records of options, ...
export const recordMonoid = <V>( M: Monoid<V> ): Monoid<Record<string, V>> =>
	makeMonoid<Record<string, V>>(
		{},
		( a, b ) => {
			const keys = new Set( Object.keys( a ).concat( Object.keys( b ) ) )
			return Array.from( keys ).reduce( ( acc, key ) => ({ ...acc, [ key ]: M.concat( a[ key ], b[ key ] ) }), {} as Record<string, V> )
		},
	)

// @note: that shit extra cool too, could use it for PARALLEL decoder & vlaidation
export const functionMonoid = <B>( M: Monoid<B> ) => <A>(): Monoid<( value: A ) => B> =>
	makeMonoid<( value: A ) => B>(
		() => M.identity,
		( a, b ) => ( value ) => M.concat( a( value ), b( value ) ),
	)

// @note: damn
export const bagMonoid: Monoid<Record<string, number>> = recordMonoid( numberAdditionMonoid )
