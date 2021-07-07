import * as Y from "../../kit-2/yup"
import { pipe } from "fp-ts/function"
import * as BS from "../../kit-2/boolean-string"




export const caSchema = Y.struct( {
	 conduiteAccompagnee:              Y.bool(),
	 conduiteAccompagneeMaif:          pipe(
			Y.bool().optional(),
			Y.when<BS.BooleanString>(
				 "conduiteAccompagnee",
				 ( ca, schema ) => ca === "true" ?
													 schema.required() :
													 schema,
			),
	 ),
	 conduiteAccompagneeMaifAvant2007: pipe(
			Y.bool().optional(),
			Y.when<BS.BooleanString>(
				 "conduiteAccompagneeMaif",
				 ( caMaif, schema ) => caMaif === "true" ?
															 schema.required() :
															 schema,
			),
	 ),
} )
