import { Alternative, charP, jsonBool, JsonBoolFalse, JsonBoolTrue, JsonNumber, jsonNumber, some, spanP, stringLitteral, stringP } from "./index"
import * as O from "fp-ts/Option"




test( `charP(char)`, () => {
	expect( charP( "a" ).run( "abc" ) ).toEqual( O.some( [ "bc", "a" ] ) )
	expect( charP( "a" ).run( "_" ) ).toEqual( O.none )
} )

test( `stringP(str)`, () => {
	expect( stringP( "expected" ).run( "expectedTAIL" ) ).toEqual( O.some( [ "TAIL", "expected" ] ) )
	expect( stringP( "true" ).run( "true" ) ).toEqual( O.some( [ "", "true" ] ) )
	expect( stringP( "true" ).run( "false" ) ).toEqual( O.none )
} )

test( `spanP(str)`, () => {
	const isDigit = ( char: string ) => !isNaN( parseInt( char ) )
	
	expect( spanP( isDigit ).run( "123" ) ).toEqual( O.some( [ "", "123" ] ) )
	expect( spanP( isDigit ).run( "not_a_number" ) ).toEqual( O.none )
	expect( spanP( isDigit ).run( "123TAIL" ) ).toEqual( O.some( [ "TAIL", "123" ] ) )
} )

test( `stringLitteral(str)`, () => {
	expect( stringLitteral.run( "\"expected\"TAIL" ) ).toEqual( O.some( [ "TAIL", "expected" ] ) )
	expect( stringLitteral.run( "no_quotes" ) ).toEqual( O.none )
} )

test( `JsonBool(str)`, () => {
	expect( jsonBool.run( "true" ) ).toEqual( O.some( [ "", JsonBoolTrue ] ) )
	expect( jsonBool.run( "false" ) ).toEqual( O.some( [ "", JsonBoolFalse ] ) )
	expect( jsonBool.run( "not_a_boolean" ) ).toEqual( O.none )
	expect( jsonBool.run( "trueTAIL" ) ).toEqual( O.some( [ "TAIL", JsonBoolTrue ] ) )
} )

test( `jsonNumber(str)`, () => {
	expect( jsonNumber.run( "123" ) ).toEqual( O.some( [ "", JsonNumber( 123 ) ] ) )
	expect( jsonNumber.run( "not_a_number" ) ).toEqual( O.none )
	expect( jsonNumber.run( "123TAIL" ) ).toEqual( O.some( [ "TAIL", JsonNumber( 123 ) ] ) )
} )


test( `some(Parser)`, () => {
	const parser123 = Alternative.alt(
		Alternative.alt(
			charP( "1" ),
			() => charP( "2" ),
		),
		() => charP( "3" ),
	)
	expect( some( parser123 ).run( "123" ) ).toEqual( O.some( [ "23", [ "1" ] ] ) )
	expect( some( parser123 ).run( "nope" ) ).toEqual( O.none )
	
	
} )
