import { getPath, setPath } from "./paths"




describe( `getPathValue(...path)`, () => {
	test( "First level path", () => {
		const propValue = "prop_value"
		const result = getPath( "prop", { prop: propValue } )
		expect( result ).toBe( propValue )
	} )
	
	test( "Nested object path", () => {
		const nestedPropValue = "nested_prop_value"
		const result = getPath( [ "prop", "nestedProp" ], {
			prop: {
				nestedProp: nestedPropValue,
			},
		} )
		
		expect( result ).toBe( nestedPropValue )
	} )
	
	test( "Nested array path", () => {
		const arrayItem = "item"
		const result = getPath( [ "prop", 0 ], {
			prop: [ arrayItem ],
		} )
		
		expect( result ).toBe( arrayItem )
	} )
	
	test( "Trying to reach undefined key path", () => {
		const nestedPropValue = "nested_prop_value"
		const thing: { prop: { nestedProp: string | undefined } } = {
			prop: {
				nestedProp: nestedPropValue,
			},
		}
		const result = getPath( [ "prop", "nestedProp" ], thing )
		
		expect( result ).toBe( nestedPropValue )
	} )
} )


describe( `setPathValue(...path)`, () => {
	test( "First level path", () => {
		const originalValue = "original_prop_value"
		const override = "override"
		const thing = { prop: originalValue }
		const result = setPath( "prop", override, thing )
		expect( result ).toEqual( { ...thing, prop: override } )
	} )
	
	test( "Nested object path", () => {
		const override = "override"
		const original = {
			prop: {
				nestedProp: "orginal_nested_prop_value",
			},
		}
		const result = setPath(
			[ "prop", "nestedProp" ],
			override,
			original,
		)
		
		expect( result ).toEqual( { ...original, prop: { nestedProp: override } } )
	} )
	
	test( "Nested array path", () => {
		const override = "override"
		const original = {
			prop: [ "orginal_nested_prop_value" ],
		}
		const result = setPath(
			[ "prop", 0 ],
			override,
			original,
		)
		
		expect( result ).toEqual( { ...original, prop: [ override ] } )
	} )
	
	test( "Trying to set undefined object path", () => {
		const override = "override"
		const thing: { prop: string } = <any>{}
		const result = setPath( "prop", override, thing )
		
		expect( result ).toEqual( { prop: override } )
	} )
	
	test( "Trying to set undefined array path", () => {
		const override = "override"
		const thing: string[] = undefined as any
		const result = setPath( 0, override, thing )
		
		expect( result ).toEqual( [ override ] )
	} )
} )
