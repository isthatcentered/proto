import cases from "jest-in-case"
import { identity, pipe } from "fp-ts/lib/function"
import * as D from "io-ts/Decoder"
import * as E from "fp-ts/Either"
import report from "./report"
import * as V from "./index"
import { Failure } from "./index"
import * as BOOL from "fp-ts/boolean"
import { eqString } from "fp-ts/Eq"




describe( `Reporter`, () => {
	cases(
		"Reporter",
		params => {
			const result = pipe(
				params.decoder.decode( params.value ),
				E.foldW( report, identity ),
			)
			
			expect( result ).toEqual( params.expected )
		},
		[
			{
				name:     "Undefined root returns empty path",
				decoder:  D.boolean as D.Decoder<any, any>,
				value:    undefined,
				expected: [ { path: [], message: "boolean" } ] as Failure[],
			},
			{
				name:     "Nested record error returns full path",
				decoder:  D.struct( { a: D.struct( { b: D.boolean, c: D.boolean } ) } ),
				value:    { a: {} },
				expected: [ { path: [ "a", "b" ], message: "boolean" }, { path: [ "a", "c" ], message: "boolean" } ] as Failure[],
			},
			{
				name:     "Nested array error returns full path",
				decoder:  D.array( D.struct( { a: D.boolean } ) ),
				value:    [ { a: undefined } ],
				expected: [ { path: [ 0, "a" ], message: "boolean" } ] as Failure[],
			},
			{
				name:     "Union returns only last decoder error",
				decoder:  D.union(D.string, D.boolean),
				value:    undefined,
				expected: [ { path: [], message: "string" }, { path: [], message: "boolean" } ] as Failure[],
			},
			// @todo: message override
			// @todo: undefined value, required kind (but that won't solve the translation pb)
		],
	)
} )
