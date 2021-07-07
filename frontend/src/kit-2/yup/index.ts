import { ObjectShape } from "yup/lib/object"
import * as yup from "yup"
import { BaseSchema } from "yup"
import * as DS from "../date-string"
import { RequiredStringSchema } from "yup/lib/string"
import { pipe } from "fp-ts/lib/function"
import { RequiredNumberSchema } from "yup/lib/number"
import { AnySchema } from "yup/lib/schema"
import { BooleanString } from "../boolean-string"




export type { Asserts } from "yup"

export const struct = <T extends ObjectShape>( spec: T ) =>
	 yup.object( spec ).required()


export const minDateString = ( min: DS.DateString, message?: string ) => ( schema: DateStringSchema ): DateStringSchema =>
	 schema.test( {
			name:    "min-date-string",
			message: message || `La date ne peut être inférieure au ${DS.pretty( min )}`,
			test:    value =>
									value ?
									pipe( value, DS.min( min ) ) :
									false,
	 } )

export const maxDateString = ( max: DS.DateString, message?: string ) => ( schema: DateStringSchema ): DateStringSchema =>
	 schema.test( {
			name:    "max-date-string",
			message: message || `La date ne peut dépasser le ${DS.pretty( max )}`,
			test:    value =>
									value ?
									pipe( value, DS.max( max ) ) :
									false,
	 } )


export const numberBetween = ( min: number, max: number, message?: string ) => ( schema: NumberSchema ) =>
	 schema.min( min, message ).max( max, message )

export const when = <A>( key: string, map: ( value: A | undefined, schema: BaseSchema<any, any> ) => BaseSchema<any, any> ) => <S extends BaseSchema<any, any>>( schema: S ): S =>
	 schema.when( key, map )

export const array = <T extends AnySchema>( schema: T ) => yup.array().of( schema ).required()

// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const nonEmptyString = ( message?: string ) => yup.string().required().test( {
	 name:    "non-empty-string",
	 message: message || `Ne peut être vide`,
	 test:    value => value ?
										 value.trim() !== "" :
										 true,
} )

export const enumm = <T extends { [ name: string ]: any }>( enm: T ) =>
	 yup.mixed<ValuesOf<T>>().oneOf( Object.values( enm ) ).required()

export const number = () => yup.number().required()

export const bool = () => yup.mixed<BooleanString>().oneOf<BooleanString>( [ "true", "false" ] ).required()

export const dateString = () => nonEmptyString()
	 .test( {
			name:    "is-date-string",
			message: "Date invalide",
			test:    value => DS.isValid( value || "" ),
	 } ) as DateStringSchema



// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------
export type DateStringSchema = RequiredStringSchema<DS.DateString | undefined, Record<string, any>>
export type NumberSchema = RequiredNumberSchema<number | undefined, Record<string, any>>
export type StringSchema = RequiredStringSchema<string | undefined, Record<string, any>>
type ValuesOf<T extends { [ key: string ]: any }> = T extends { [ key: string ]: infer V } ? V : never
