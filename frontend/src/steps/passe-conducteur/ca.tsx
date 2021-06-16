import * as V from "../../kit-2/validation"
import * as BOOL from "fp-ts/boolean"
import { constant } from "fp-ts/function"



// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
type NoCA = { conduiteAccompagnee: false }

type CANotMAIF = { conduiteAccompagnee: true; conduiteAccompagneeMaif: false }

type CAWithMAIF = { conduiteAccompagnee: true, conduiteAccompagneeMaif: true, conduiteAccompagneeMaifAvant2007: boolean }

export type CA = NoCA | CANotMAIF | CAWithMAIF

// -------------------------------------------------------------------------------------
// Constants
// -------------------------------------------------------------------------------------
export const NoCA: NoCA = { conduiteAccompagnee: false }
export const CANotMaif: CANotMAIF = { conduiteAccompagnee: true, conduiteAccompagneeMaif: false }

// -------------------------------------------------------------------------------------
// Schema
// -------------------------------------------------------------------------------------
const noCA = V.struct( {
	conduiteAccompagnee: V.eq( false, BOOL.Eq ),
} )


const caWithoutMaif = V.struct( {
	conduiteAccompagnee:     V.eq( true, BOOL.Eq ),
	conduiteAccompagneeMaif: V.eq( false, BOOL.Eq ),
} )

const caWithMaif = V.struct( {
	conduiteAccompagnee:              V.eq( true, BOOL.Eq ),
	conduiteAccompagneeMaif:          V.eq( true, BOOL.Eq ),
	conduiteAccompagneeMaifAvant2007: V.boolean,
} )

const schema = V.cond<CA>( [
	[ ( a ): a is NoCA => (!a || !a.conduiteAccompagnee), noCA ],
	[ ( a ): a is CANotMAIF => a.conduiteAccompagnee && !a.conduiteAccompagneeMaif, caWithoutMaif ],
	[ constant( true ), caWithMaif ],
] )

// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------
export const isNoCA = V.asRefinement( noCA )

export const isCaNotMaif = V.asRefinement( caWithoutMaif )

export default schema
