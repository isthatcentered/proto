import * as D from "."
import * as F from "./validation-failure"
import * as E from "fp-ts/Either"
import { identity, pipe } from "fp-ts/lib/function";




type AnyRecord = Record<any, any>

type FormValues<T extends AnyRecord> = Required<{
	[K in keyof T]: T[K] extends number ?
	                number :
	                T extends string ?
	                T : // Allows string litterals
	                string
}>

type FormValuesDecoders<T extends AnyRecord> = Required<{
	[K in keyof T]: D.Decoder<FormValues<T>[K], T[K]> // T[K] extends number ? number : string
}>

const useFormState = <TValues extends AnyRecord>( config: {
	defaultValue: FormValues<TValues>
	decode: FormValuesDecoders<TValues>
} ) => {
	console.log( config )
}

describe( `Decoders`, () => {
	// infer
	// map ?
	// flatMap ?
	// .brand(decoder, type)
	
	
	// point            // Decoder<Point>
	// array(point)     // Decoder<Array<Point>>
	// optional(point)  // Decoder<Point | void>
	// nullable(point)  // Decoder<Point | null>
	// exact
	// inexact
	// regex
	
	const assertType = <T>( actual: T ) => {
		actual
	}
	
	describe( `fromStruct(decodersMap)`, () => {
		test( `Successful decoding returns decoder value`, () => {
			const propFieldDecoderValue = "decoded_prop_value"
			const propDecoder = jest.fn( D.always( propFieldDecoderValue ) )
			const structDecoderWithFailingField = D.struct( {
				prop: propDecoder,
			} )
			const originalValue = { prop: "original_prop_value" }
			
			const decodedValue = pipe(
				structDecoderWithFailingField( originalValue ),
				E.fold(
					fail( "Should be a right" ),
					identity,
				),
			)
			expect( decodedValue ).toEqual( { prop: propFieldDecoderValue } )
			expect( propDecoder ).toHaveBeenCalledWith( originalValue.prop )
		} )
		
		test( `Failed decoding compiles each field decoder error under a tree with correct path`, () => {
			const propFieldDecoderFailure = makeFailure( { path: "" } )
			const structDecoderWithFailingField = D.struct( {
				prop: D.fail( propFieldDecoderFailure ),
			} )
			
			const failures = pipe(
				structDecoderWithFailingField( {} ),
				E.fold(
					identity,
					fail( "Should be a left" ),
				),
			)
			
			expect( failures ).toEqual( [
				F.tree( {
					path:     "",
					children: [
						{
							...propFieldDecoderFailure,
							path: "prop",
						},
					],
				} ),
			] )
		} )
		
		test( `Type inference`, () => {
			const primitiveFieldInference = D.struct( {
				prop: D.unknownToString,
			} )
			assertType<D.Decoder<unknown, { prop: string }>>( primitiveFieldInference )
			
			const arrayFieldInference = D.struct( {
				prop: D.array( D.unknownToString ),
			} )
			
			assertType<D.Decoder<unknown, { prop: string[] }>>( arrayFieldInference )
			
			const recordFieldInference = D.struct( {
				prop: D.struct( {
					nested_prop: D.unknownToString,
				} ),
			} )
			assertType<D.Decoder<unknown, { prop: { nested_prop: string } }>>( recordFieldInference )
			
			// @todo
			const dtoTypeSpecified = D.struct<{ prop: number }>( {
				prop: D.unknownToNumber,
			} )
		} )
	} )
	
	describe( `array(decoder)`, () => {
		test( `All itemss passing returns Right(array)`, () => {
			const returnWhatYouGetPassedItemDecoder = D.identity
			const arrayDecoder = D.array( returnWhatYouGetPassedItemDecoder )
			const originalValue = [ "item_1", "item_2" ]
			
			const decodedValue = pipe( arrayDecoder( originalValue ), E.fold( fail( "Should be a right" ), identity ) )
			
			expect( decodedValue ).toEqual( originalValue )
		} )
		
		test( `Returns each item decoder error`, () => {
			const itemDecoderFailure = makeFailure( { path: "" } )
			const itemDecoder = D.fail( itemDecoderFailure )
			const itemArrayDecoder = D.array( itemDecoder )
			const failures = pipe( itemArrayDecoder( [ "item_1", "item_2" ] ), E.fold( identity, fail( "Should be a left" ) ) )
			
			expect( failures ).toEqual( [
				F.tree( {
					path:     "",
					children: [
						{ ...itemDecoderFailure, path: "0" },
						{ ...itemDecoderFailure, path: "1" },
					],
				} ),
			] )
		} )
		
		test( `Type inference`, () => {
			assertType<D.Decoder<unknown, string[]>>( D.array( D.always( "string" ) ) )
		} )
	} )
	
	describe( `and(a, b)`, () => {
		test( `All decoders passing returns Right(value)`, () => {
			const value = "some_value"
			const allPassDecoder = D.and( D.identity, D.identity )
			
			expect( allPassDecoder( value ) ).toEqual( E.right( value ) )
		} )
		
		test( `First decoder failing returns first decoder error`, () => {
			const firstDecoderError = makeFailure()
			const positiveNumberSringDecoder = D.and( D.fail( firstDecoderError ), D.identity )
			
			expect( positiveNumberSringDecoder( "some_value" ) ).toEqual( E.left( [ firstDecoderError ] ) )
		} )
		
		test( `Second decoder failing returns second decoder error`, () => {
			const secondDecoderError = makeFailure()
			const positiveNumberSringDecoder = D.and( D.identity, D.fail( secondDecoderError ) )
			
			expect( positiveNumberSringDecoder( "some_value" ) ).toEqual( E.left( [ secondDecoderError ] ) )
		} )
		
		test( `Typings`, () => {
			const stringToNumberDecoder: D.Decoder<string, number> = null as any
			const numberToBooleanDecoder: D.Decoder<number, boolean> = null as any
			
			assertType<D.Decoder<string, boolean>>( D.and( stringToNumberDecoder, numberToBooleanDecoder ) )
		} )
	} )
	
	describe( `or(a, b)`, () => {
		test( `A passes returns Right(A)`, () => {
			const value = "some_value"
			const firstDecoderPassingOr = D.or( D.identity, D.fail( makeFailure() ) )
			
			expect( firstDecoderPassingOr( value ) ).toEqual( E.right( value ) )
		} )
		
		test( `B passes returns Right(B)`, () => {
			const value = "some_value"
			const secondDecoderPassesOr = D.or( D.fail( makeFailure() ), D.identity )
			
			expect( secondDecoderPassesOr( value ) ).toEqual( E.right( value ) )
		} )
		
		test( `A & B failing returns both errors`, () => {
			const value = "neither_a_number_or_a_boolean"
			const decoderAError = makeFailure( { message: "decoder_a_error" } )
			const decoderBError = makeFailure( { message: "decoder_b_error" } )
			const aAndBFailingDecoder = D.or( D.fail( decoderAError ), D.fail( decoderBError ) )
			
			expect( aAndBFailingDecoder( value ) ).toEqual( E.left( expect.anything() ) )
		} )
		
		test( `Typings`, () => {
			assertType<D.Decoder<unknown, number | boolean>>( D.or( D.unknownToBoolean, D.unknownToNumber ) )
		} )
	} )

// 	describe( `fromTryCatch`, () => {
// 		test( `No throw returns Right(value)`, () => {
// 			const stringNumberDecoder = D.fromTryCatch( identity )
// 			const value = "some_value"
// 			expect( stringNumberDecoder( value ) ).toEqual( E.right( value ) )
// 		} )
//
// 		test( `Throw returns Left(Error.message)`, () => {
// 			const thrownErrorMessage = "thrown_error_message"
// 			const stringNumberDecoder = D.fromTryCatch( throws( new Error( thrownErrorMessage ) ) )
// 			expect( stringNumberDecoder( "some_value" ) ).toEqual( E.left( [thrownErrorMessage] ) )
// 		} )
//
// 		test( `Error message can be overriden`, () => {
// 			const errorMessageOverride = "error_message_override"
// 			const stringNumberDecoder = D.fromTryCatch( throws( new Error( "thrown_error_message" ) ), constant( errorMessageOverride ) )
// 			expect( stringNumberDecoder( "some_value" ) ).toEqual( E.left( [errorMessageOverride] ) )
// 		} )
//
//
// 		test( `Something wierd thrown`, () => {
// 			const thingThrown = "not_an_error_object"
// 			const stringNumberDecoder = D.fromTryCatch( throws( thingThrown ) )
// 			expect( stringNumberDecoder( "{not_valid_json}" ) ).toEqual( E.left( [`"${thingThrown}"`] ) )
// 		} )
// 	} )
} )

const makeFailure = ( overrides: Partial<Parameters<typeof F.leaf>[0]> = {} ) =>
	F.leaf( {
		path:    "",
		message: "failure_message",
		...overrides,
	} )

const fail = ( message: string ) => (): never => {
	throw message
}
