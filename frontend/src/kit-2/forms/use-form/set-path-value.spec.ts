import cases from "jest-in-case"
import setPathValue from "./set-path-value"




describe( `setPathValue`, () => {
	
	cases(
		"setPathValue",
		params => {
			const result = setPathValue( params.path, params.value, params.original )
			expect( result ).toEqual( params.expected )
		},
		[
			{
				name:     `Setting undefined record prop`,
				path:     [ "prop" ],
				original: undefined,
				value:    "new_value",
				expected: { prop: "new_value" },
			},
			{
				name:     `Setting undefined array item`,
				path:     [ 0 ],
				original: undefined,
				value:    "new_value",
				expected: [ "new_value" ],
			},
			{
				name:     `Setting undefined array item (not as first item)`,
				path:     [ 2 ],
				original: undefined,
				value:    "new_value",
				expected: [ undefined, undefined, "new_value" ],
			},
			{
				name:     `Preserves already existing path members (record)`,
				path:     [ "prop", "nestedProp", "b" ],
				original: { prop: { nestedProp: { a: "a_value" } } },
				value:    "new_value",
				expected: { prop: { nestedProp: { a: "a_value", b: "new_value" } } },
			},
			{
				name:     `Preserves already existing path members (array)`,
				path:     [ 1 ],
				original: [ "item_1" ],
				value:    "new_value",
				expected: [ "item_1", "new_value" ],
			},
			{
				name:     `Empty path sets root value`,
				path:     [],
				original: "original_value",
				value:    "new_value",
				expected: "new_value",
			},
			{
				name:     `Overrides whatever is present at path`,
				path:     [ "prop" ],
				original: { prop: { a: "prop.a" } },
				value:    "new_value",
				expected: { prop: "new_value" },
			},
		],
	)
} )
