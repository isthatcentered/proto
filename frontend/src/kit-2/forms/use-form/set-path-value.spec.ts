import cases from "jest-in-case"
import setPathValue from "./set-path-value"




describe( `setPathValue`, () => {
	
	cases(
		"fp-ts/optionT",
		params => {
			const result = setPathValue( params.path, "new_value", params.original )
			expect( result ).toEqual( params.expected )
		},
		[
			{ name: `Setting undefined record prop`, path: [ "prop" ], original: undefined, expected: { prop: "new_value" } },
			{ name: `Setting undefined array item`, path: [ 0 ], original: undefined, expected: [ "new_value" ] },
			{ name: `Setting undefined array item (not as first item)`, path: [ 2 ], original: undefined, expected: [ undefined, undefined, "new_value" ] },
			{ name: `Preserves already existing path members (record)`, path: [ "prop", "nestedProp", "b" ], original: { prop: { nestedProp: { a: "a_value" } } }, expected: { prop: { nestedProp: { a: "a_value", b: "new_value" } } } },
			{ name: `Preserves already existing path members (array)`, path: [ 1 ], original: [ "item_1" ], expected: [ "item_1", "new_value" ] },
		],
	)
} )
