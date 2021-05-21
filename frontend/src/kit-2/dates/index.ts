import * as ORD from "fp-ts/Ord"
import * as NUM from "fp-ts/number"
import * as EQ from "fp-ts/Eq"
import { concatAll } from "fp-ts/Monoid"



// -------------------------------------------------------------------------------------
// Typeclass instances
// -------------------------------------------------------------------------------------
const _ordDay = ORD.contramap<number, Date>( date => date.getDay() )( NUM.Ord )
const _ordMonth = ORD.contramap<number, Date>( date => date.getMonth() )( NUM.Ord )
const _ordYear = ORD.contramap<number, Date>( date => date.getFullYear() )( NUM.Ord )

/**
 * Compares year first.
 * If both are equal compares month.
 * If both are equal compares day.
 *
 *
 * a                   b                result
 * --------------------------------------------
 * 01/24/2020          01/24/2020       0 (a === b)
 * 02/24/2020          01/24/2020       1 (a > b)
 * 01/24/2020          02/24/2020      -1 (a < b)
 * ...
 */
export const Ord: ORD.Ord<Date> = concatAll( ORD.getMonoid<Date>() )( [ _ordYear, _ordMonth, _ordDay ] )

export const Eq: EQ.Eq<Date> = Ord


// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------
export const isSame = ( a: Date ) => ( b: Date ): boolean =>
	Ord.equals( a, b )


export const isAfter = ( a: Date ) => ( b: Date ): boolean =>
	ORD.gt( Ord )( b, a )

export const isBefore = ( a: Date ) => ( b: Date ): boolean =>
	ORD.lt( Ord )( b, a )


// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const now = () => new Date()

export const today = () => {
	const today = now()
	today.setHours( 0, 0, 0 )
	return today
}

// -------------------------------------------------------------------------------------
// Destructors
// -------------------------------------------------------------------------------------
