import cases from "jest-in-case"
import encode, { JsonPrimitive } from "./encode-query-params"




describe( `encodeQueryParams(query)`, () => {
	cases(
		"`encodeQueryParams(query)`",
		async ( { expected, query } ) => expect( encode( query ) ).toBe( expected ),
		{
			"Each key value of the query object is mapped":     {
				query:    <Record<string, JsonPrimitive>>{
					key_1: "key_1_value",
					key_2: "key_2_value",
				},
				expected: "key_1=key_1_value&key_2=key_2_value",
			},
			"Array values are stored under same key": {
				query:    <Record<string, JsonPrimitive>>{
					key_1: [ "item_1", "item_2" ],
				},
				expected: "key_1=item_1,item_2",
			},
		},
	)
} )
