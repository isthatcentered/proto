// traversable can bemplemented in terms of apply, that's why they ask for ut
// i can't have an apply par since
import * as V from "."
import * as E from "fp-ts/Either"
import * as NEA from "fp-ts/NonEmptyArray"
import { pipe } from "fp-ts/lib/function"
import { prop } from "../helpers"


// const age = either( // <- this = monoid kleisli or
// 	empty / defaultTo(() => 5) ,
// 	chain( // <- that shit a monad ?? taskeither is
// 		number, positive, defaultTo( 5 ), // compose returns first failure (guard) (chain?)
// 		par / sequence( // <- that shit an applicative/traversable ??
// 		max( 108, ( { max, actual } ) => `Dude, max is ${max}, how old are you ???` ),
// 		min( 10 ),
// 		defaultTo( 10 ),
// 		), // Par returns list of failures
// 	),
// )
//const validators = [trim, isNotEmpty, hasNumbers];
//
// Validation.of('123456').validateAll(validators); // => Valid('123456')
// Validation.of('123456 ').validateAll(validators); // => Valid('123456')
// Validation.of('wrong zipcode').validateAll(validators); // => Invalid(['Must have numbers'], 'wrong zipcode')
// Validation.of('   ').validateAll(validators); // => Invalid(['Can`t be empty', 'Must have numbers'], '')

const validation = V.either(
	V.defaultTo( 18 ),
	V.sequence(
		V.identity,
		// number,
		// positive,
		// all(
		// 	min(18),
		// 	max(100)
		// )
	),
)


describe( `validation<A,B> `, () => {
	describe( `sequence(...validations)`, () => {
		test( "All validations passing returns right(value)", () => {
			const alwaysPassingSequence = V.sequence( V.identity, V.identity )
			const value = "value"
			
			expect( alwaysPassingSequence( value ) ).toEqual( E.right( value ) )
		} )
		
		test( "A validation failing aborts sequence", () => {
			const failingValidationMessage = "second_validation_failure_message"
			const passingValidation = V.identity
			const failingValidation = V.fail( failingValidationMessage )
			const shortCircuitedValidation = jest.fn( V.identity )
			
			const sequenceWithSecondValidationFailing = V.sequence( passingValidation, failingValidation, shortCircuitedValidation )
			
			expect( sequenceWithSecondValidationFailing( "value" ) ).toEqual( E.left( expect.anything() ) )
			expect( shortCircuitedValidation ).not.toHaveBeenCalled()
		} )
	} )
	
	
	describe( `par(...validations)`, () => {
		test( "All validations passing returns right(value)", () => {
			const alwaysPassingPar = V.sequence( V.identity, V.identity )
			const value = "value"
			
			expect( alwaysPassingPar( value ) ).toEqual( E.right( value ) )
		} )
		
		test( "Accumulates failing validations", () => {
			const failingValidationMessage = "validation_failure_message"
			const failingValidation = jest.fn( V.fail( failingValidationMessage ) )
			
			const sequenceWithSecondValidationFailing = V.par( failingValidation, failingValidation, failingValidation )
			
			expect( sequenceWithSecondValidationFailing( "value" ) ).toEqual( E.left( [ expect.anything(), expect.anything(), expect.anything() ] ) )
			expect( failingValidation ).toHaveBeenCalledTimes( 3 )
		} )
	} )
	
	describe( `either(left, right)`, () => {
		test( `Both validation failings returns both errors`, () => {
			const bothValidationsFailingEither = V.either( V.fail( "left_validation_failure" ), V.fail( "right_validation_failure" ) )
			expect( bothValidationsFailingEither( "value" ) ).toEqual( E.left( [ expect.anything(), expect.anything() ] ) )
		} )
		
		test( `First validation passing returns right(value)`, () => {
			const failingRightValidation = jest.fn( V.fail( "right_validation_failure" ) )
			const firstValidationSucceedingEither = V.either( V.identity, failingRightValidation )
			const value = "value"
			
			expect( firstValidationSucceedingEither( value ) ).toEqual( E.right( value ) )
			expect( failingRightValidation ).not.toHaveBeenCalled()
		} )
		
		test( `Second validation passing returns right(value)`, () => {
			const failingLeftValidation = jest.fn( V.fail( "left_validation_failure" ) )
			const firstValidationSucceedingEither = V.either( failingLeftValidation, V.identity )
			const value = "value"
			
			expect( firstValidationSucceedingEither( value ) ).toEqual( E.right( value ) )
			expect( failingLeftValidation ).toHaveBeenCalled()
		} )
	} )
	
	describe( `record({key: validation})`, () => {
		test( `Accumulates failures with the correct path`, () => {
			const recordValidation = V.record( {
				a: V.fail( "a_prop_failure" ),
				b: V.fail( "b_prop_failure" ),
			} )
			
			const result = recordValidation( {} as any )
			
			expect( result ).toEqual( E.left( [ expect.anything(), expect.anything() ] ) )
			expect( pipe( result, E.mapLeft( NEA.map( prop( "path" ) ) ) ) ).toEqual( E.left( [ "a", "b" ] ) )
		} )
		
		test( `All validations passing returns right(value)`, () => {
			const recordValidation = V.record( {
				a: V.identity,
				b: V.identity,
			} )
			const value = { a: "a_value", b: "b_value" }
			
			expect( recordValidation( value ) ).toEqual( E.right( value ) )
		} )
	} )
	
	describe( `array(validation)`, () => {
		test( `Accumulates failures with the correct path`, () => {
			const arrayValidation = V.array( V.fail( "validation_failure" ) )
			
			const result = arrayValidation( [ "item_1", "item_2" ] )
			
			expect( result ).toEqual( E.left( [ expect.anything(), expect.anything() ] ) )
			expect( pipe( result, E.mapLeft( NEA.map( prop( "path" ) ) ) ) ).toEqual( E.left( [ "0", "1" ] ) )
		} )
		
		test( `All validations passing returns right(value)`, () => {
			const arrayValidation = V.array(  V.identity )
			const value = [ "item_1", "item_2" ]
			
			expect( arrayValidation( value ) ).toEqual( E.right( value ) )
		} )
	} )
} )
