import { ObjectShape } from "yup/lib/object"
import * as yup from "yup"




export const struct = <T extends ObjectShape>( spec: T ) =>
	 yup.object( spec ).required()

// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const nonEmptyString = () => yup.string().min( 1, "Ne peut être vide" ).required()

export const enumm = <T extends { [ name: string ]: any }>( enm: T ) =>
	 yup.mixed<ValuesOf<T>>().oneOf( Object.values( enm ) ).required()

export const numberBetween = ( min: number, max: number ) => yup.number().min( min ).max( max ).required()

type BooleanString = "true" | "false"
export const bool = () => yup.mixed<BooleanString>().oneOf<BooleanString>( [ "true", "false" ] ).required()

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------
type ValuesOf<T extends { [ key: string ]: any }> = T extends { [ key: string ]: infer V } ? V : never
