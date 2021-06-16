import * as V from "../../kit-2/validation"
import * as STR from "fp-ts/string"
import { constant } from "fp-ts/lib/function"



// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
type SinistreCollision = { codeNature: CODES_NATURES_SINISTRE.COLLISION, dateSurvenance: Date, codeResponsabilite: string }
type SinistreAutre = { codeNature: CODES_NATURES_SINISTRE.AUTRE, dateSurvenance: Date, }
type Sinistre =
	| SinistreCollision
	| SinistreAutre

// Those are discarded when using the data, you can use whatever you want
export enum CODES_NATURES_SINISTRE
{
	COLLISION = "COLLISION",
	AUTRE     = "AUTRE",
}


// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------
export const isSinistreCollision = ( sinistre: Sinistre ): sinistre is SinistreCollision =>
	sinistre.codeNature === CODES_NATURES_SINISTRE.COLLISION

export const isSinistreAutre = ( sinistre: Sinistre ): sinistre is SinistreCollision =>
	sinistre.codeNature === CODES_NATURES_SINISTRE.AUTRE


// -------------------------------------------------------------------------------------
// Schema
// -------------------------------------------------------------------------------------
const schema = V.cond<Sinistre>( [
	[
		isSinistreAutre,
		V.struct<SinistreAutre>( {
			dateSurvenance: V.date,
			codeNature:     V.eq( CODES_NATURES_SINISTRE.AUTRE, STR.Eq ),
		} ),
	],
	[
		constant(true),
		V.struct<SinistreCollision>( {
			dateSurvenance:     V.date,
			codeNature:         V.eq( CODES_NATURES_SINISTRE.COLLISION, STR.Eq ),
			codeResponsabilite: V.string,
		} ),
	],
] )


// -------------------------------------------------------------------------------------
// Data
// -------------------------------------------------------------------------------------
export const codesNaturesSinistre = [ { value: CODES_NATURES_SINISTRE.AUTRE, label: "Autre" }, { value: CODES_NATURES_SINISTRE.COLLISION, label: "Collision" } ]

export default schema
