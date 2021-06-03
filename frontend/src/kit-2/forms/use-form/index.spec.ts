import { whereEq } from "ramda"




test( ``, () => {
	expect( whereEq( { a: { b: false } } )( { a: { b: false } } ) ).toBe( true )
	expect( whereEq( { a: { b: true } } )( { a: { b: true, c: true } } ) ).toBe( false )
	expect( whereEq( { a: { b: true } } )( { a: { b: false } } ) ).toBe( false )
	expect( whereEq( { a: { b: true } } )( { a: undefined } ) ).toBe( false )
} )
