import cases from "jest-in-case"
import * as V from "./validated"
import * as D from "./decoder"




const assertType = <TExpected>( value: TExpected ) => value

type AnyRecord = Record<any, any>
const whatever = ( value: any ) => value

describe( `Decoder`, () => {
	describe( `Primitives`, () => {
		cases(
			"number",
			params => expect( D.number( params.value ) ).toEqual( params.expected ),
			[
				{ name: "Positive numbers are valid", value: 1, expected: V.valid( 1 ) },
				{ name: "Negative numbers are valid", value: -1, expected: V.valid( -1 ) },
				{ name: "Floats are valid", value: .5, expected: V.valid( .5 ) },
				{ name: "NaN is invalid", value: NaN, expected: V.invalid( expect.anything() ) },
				{ name: "Infinity is invalid", value: Infinity, expected: V.invalid( expect.anything() ) },
				{ name: "Different type is invalid", value: "1", expected: V.invalid( expect.anything() ) },
			],
		)
		
		cases(
			"string",
			params => expect( D.string( params.value ) ).toEqual( params.expected ),
			[
				{ name: "Empty strings are valid", value: "", expected: V.valid( "" ) },
				{ name: "Different type is invalid", value: undefined, expected: V.invalid( expect.anything() ) },
			],
		)
		
		cases(
			"nonEmpty",
			params => expect( D.nonEmpty( params.value ) ).toEqual( params.expected ),
			[
				{ name: "A string with any non space char is valid", value: "not_blank_string", expected: V.valid( "not_blank_string" ) },
				{ name: "Blank strings are invalid", value: "    ", expected: V.invalid( expect.anything() ) },
				// { name: "An array with any non nil item is valid", value: "", expected: V.valid( "" ) },
				// { name: "Empty array is invalid", value: undefined, expected: V.invalid( expect.anything() ) },
			],
		)
		
		
		
	} )
	
	describe( `record({prop: decoder})`, () => {
		test( `Not a record is a fail`, () => {
			const decodeRecord = D.record( {} )
			
			expect( decodeRecord( undefined as any ) ).toEqual( V.invalid( [ expect.anything() ] ) )
		} )
		
		test( `All decoders passing returns Valid(value)`, () => {
			const originalValue = { propA: "prop_A_value", propB: "prop_B_value" }
			const decodeRecord = D.record<typeof originalValue, typeof originalValue>( {
				propA: D.identity,
				propB: D.identity,
			} )
			
			expect( decodeRecord( originalValue ) ).toEqual( V.valid( originalValue ) )
		} )
		
		test( `Errors are accululated`, () => {
			const decodeRecord = D.record( {
				propA: D.fail( whatever( "" ) ),
				propB: D.fail( whatever( "" ) ),
			} )
			
			expect( decodeRecord( whatever( {} ) ) ).toEqual( V.invalid( [ expect.anything(), expect.anything() ] ) )
		} )
		
		test( `First level failures are assigned the correct path`, () => {
			const firstLevelPropFailure = makeFailure( { path: "" } )
			const decodeRecord = D.record( {
				firstLevelProp: failing( firstLevelPropFailure ),
			} )
			
			const expectedFailure = {
				...firstLevelPropFailure,
				path: "firstLevelProp",
			}
			
			expect( decodeRecord( whatever( {} ) ) ).toMatchObject( V.invalid( [ expectedFailure ] ) )
		} )
		
		test( `Nested Failures are assigned the correct path`, () => {
			const nestedPropFailure = makeFailure( { path: "" } )
			const decodeRecord = D.record( {
				propWithNestedRecord: D.record( {
					nestedRecordProp: failing( nestedPropFailure ),
				} ),
			} )
			
			const expectedFailure = {
				...nestedPropFailure,
				path: "propWithNestedRecord.nestedRecordProp",
			}
			
			expect( decodeRecord( { propWithNestedRecord: {} } ) ).toMatchObject( V.invalid( [ expectedFailure ] ) )
		} )
	} )
	
	describe( `array(decoder)`, () => {
		test( `Not an array is a fail`, () => {
			const decodeArray = D.array( D.identity )
			
			expect( decodeArray( undefined ) ).toEqual( V.invalid( [ expect.anything() ] ) )
		} )
		
		test( `All decoders passing returns Valid([...values])`, () => {
			const originalValue = [ "item_1", "item_2" ]
			const decodeArray = D.array( D.identity )
			
			expect( decodeArray( originalValue ) ).toEqual( V.valid( originalValue ) )
		} )
		
		
		test( `Errors are accululated with the correct index`, () => {
			const decodeRecord = D.array( D.number )
			const originalValue = [ "fail", 1, "fail" ]
			
			expect( decodeRecord( originalValue ) ).toMatchObject( V.invalid( [ { path: "0" }, { path: "2" } ] ) )
		} )
		
		test( `Nested errors are accululated with the correct path`, () => {
			const decodeRecord = D.array( D.record( { prop: D.fail( "decoder_error" ) } ) )
			const originalValue = [ {} ]
			
			expect( decodeRecord( originalValue ) ).toMatchObject( V.invalid( [ { path: "0.prop" } ] ) )
		} )
	} )
	
	const makeFailure = ( overrides: Partial<{ path: string, message: string }> = {} ) => ({
		path:    "decoder_path",
		message: "decoder_failure_message",
		value:   "actual_value",
		...overrides,
	})
	
	const failing = ( failure: Partial<{ path: string, message: string }> ): D.Decoder<never> => () =>
		V.invalid( [
			makeFailure( failure ),
		] )
	
	/**
	 * - optional
	 * - and
	 * - or
	 * - either
	 * - oneOf
	 * - custom messages
	 * - compose
	 * - not ?
	 * - declarative encoding
	 * - dependant validation = compose(validateStruct, when(values => Validation<Partial<T>> )
	 */
} )



// https://typelevel.org/cats/datatypes/validated.html#parallel-validation
// versioning compose(v1, toV2, toV3) or compose(v2, toV3) or v3
// eq, not, and, either, is, contains, typeof, instanceof, sequence, struct
// type Valid<T> = E.Right<T>
// type Invalid<F> = E.Left<NEA.NonEmptyArray<F>>
// type Validated<F, T> = Valid<T> | Invalid<F>
//
// // @todo: custom validated type class
// const valid = <T>( value: T ): Validated<never, T> => E.right( value )
// const invalid = ( failure: Failure ): Validated<Failure, never> => E.left( NEA.of( failure ) )
// const validatedFromPredicate = <E, T>( predicate: Predicate<T>, onInvalid: ( value: T ) => E ) =>
// 	flow(
// 		E.fromPredicate( predicate, onInvalid ),
// 		E.mapLeft( NEA.of ),
// 	)
//
//
// type Failure = { path: string, reason: string, value: any }
// type ValidationOrigintype<T extends AnyValidation> = T extends Validation<infer A, any> ? A : never
// type ValidationCastType<T extends AnyValidation> = T extends Validation<any, infer B> ? B : never
// type ValidationContextType<T extends AnyValidation> = T extends Validation<any, any, infer C> ? C : never
//
// type Validation<A, B = A, C = never> = ( value: A, context: C ) => Validated<Failure, B>
//
// type AnyValidation = Validation<any, any, any>
//
//
// const record = <A extends Record<keyof B, any>, B extends AnyRecord>( _config: { [K in keyof B]: Validation<A[K], B[K], A> } ): Validation<A, B> => {
// 	return null as any
// }
//
// assertType<Validation<{ prop: string }, { prop: number }>>( record( { prop: null as any as Validation<string, number, { prop: string }> } ) )
//
//
// const predicate = <T>( predicate: Predicate<T>, reason: ( value: T ) => string ): Validation<T> =>
// 	validatedFromPredicate( predicate, value => ({ value, path: "", reason: reason( value ) }) )
//
// const identity = <T>( value: T ) => valid( value )
//
// const pass = identity
//
//
// const run = <A, B, C>( decoder: Validation<A, B, C>, value: A ): Validated<Failure, B> => decoder( value, value as any )
//
// describe( `record({...decoders})`, () => {
// 	test( `All decoders passing returns Valid(record)`, () => {
// 		const propValidation = jest.fn( identity )
// 		const recordValidation = record( {
// 			prop: propValidation,
// 		} )
// 		const originalValue = { prop: "something" }
//
// 		const decodedValue = run( recordValidation, originalValue )
//
// 		expect( decodedValue ).toEqual(E.right(originalValue))
//
// 	} )
// 	// Any decoder failing returns Invalid([...failures])
// 	// returns result of validation for each prop
// 	// passes context + value to each validator
// 	// accumulates errors
// } )
//
//
//
// test( `Blah`, () => {
// 	// const always
// 	// const when = <A, B, C>( map: ( value: A, context: C ) => Validation<A, B, C> ): Validation<A, B, C> => ( value, context ) => map( value, context )( value, context )
//
// 	// const stringNumber: Validation<number,  number, never> = and(decode(string => int), number)
// 	// const number: Validation<number,  number, never> = (value) => typeof value ==="number" && !isNaN(value) ? success(value) : failure("")
//
//
// 	// const odd = compose(
// 	// 	integer,
// 	// 	predicate((n) => n % 2 !== 0, 'Must be odd')
// 	// );
// 	// const shortString = compose(
// 	// 	string,
// 	// 	predicate((s) => s.length < 8, 'Must be less than 8 chars')
// 	// );
//
// 	// compose vs all
//
// // // and
// // // or
// // // predicate
// // // refinement
// // message(validation, "Nope nope nope")
// //
// //
// } )
// //
// // export default undefined
