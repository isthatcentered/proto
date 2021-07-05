import { ObjectShape } from "yup/lib/object"
import * as yup from "yup"
import * as DS from "../date-string"
import { RequiredStringSchema } from "yup/lib/string"
import { pipe } from "fp-ts/lib/function"




export type { Asserts } from "yup"

export const struct = <T extends ObjectShape>( spec: T ) =>
	 yup.object( spec ).required()


export const minDateString = ( min: DS.DateString, message?:string  ) => ( schema: DateStringSchema ): DateStringSchema =>
	 schema.test( {
			name:    "min-date-string",
			message: message || `La date ne peut être inférieure au ${DS.pretty( min )}`,
			test:    value =>
									value ?
									pipe( value, DS.min( min ) ) :
									false,
	 } )

// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const nonEmptyString = () => yup.string().min( 1, "Champ requis" ).required()

export const enumm = <T extends { [ name: string ]: any }>( enm: T ) =>
	 yup.mixed<ValuesOf<T>>().oneOf( Object.values( enm ) ).required()

export const numberBetween = ( min: number, max: number ) => yup.number().min( min ).max( max ).required()

type BooleanString = "true" | "false"
export const bool = () => yup.mixed<BooleanString>().oneOf<BooleanString>( [ "true", "false" ] ).required()

export const dateString = () => nonEmptyString()
	 .test( {
			name:    "is-date-string",
			message: "Date invalide",
			test:    value => {
				 console.log( "valid", value, DS.isValid( value || "" ) )
				 return DS.isValid( value || "" )
			},
	 } ) as DateStringSchema



// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------
type DateStringSchema = RequiredStringSchema<DS.DateString | undefined, Record<string, any>>
type ValuesOf<T extends { [ key: string ]: any }> = T extends { [ key: string ]: infer V } ? V : never
