import * as F from "."
import cases from "jest-in-case"




describe( `ValidationFailure`, () => {
	cases(
		"toStruct",
		config => {
			expect( F.toStruct( config.failure ) ).toEqual( config.expected )
		},
		{
			// @todo: tree = propname => recursiveResult, leaf = message
			"Primitive fields are reported as string": {
				failure:  F.tree( {
					path:     "",
					children: [
						F.leaf( {
							path:    "primitiveProp",
							message: "primitive_prop_error",
							
						} ),
					],
				} ),
				expected: { primitiveProp: "primitive_prop_error" },
			},
			"Record fields are reported as Records":   {
				failure:  F.tree( {
					path:     "",
					children: [
						{
							type:     "tree",
							path:     "recordProp",
							children: [
								{
									type:    "leaf",
									path:    "nestedRecordProp",
									message: "cannot be empty",
								},
							],
						},
					],
				} ),
				expected: { recordProp: { nestedRecordProp: "cannot be empty" } },
			},
		},
	)
	
} )

