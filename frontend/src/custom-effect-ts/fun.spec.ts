import * as AR from "fp-ts/Array"
import { pipe } from "fp-ts/function"
import * as M from "./monoid"
import * as NEA from "fp-ts/NonEmptyArray"
import { Foldable } from "./index"
import * as O from "./option"




describe( `Monoids`, () => {
	test( `Fold with monoid`, () => {
		const words = [ "Hello", "Dear", "word" ]
		const folded = pipe(
			words,
			AR.reduce( M.stringMonoid.identity, M.stringMonoid.concat ),
		)
		expect( folded ).toEqual( "HelloDearword" )
	} )
	
	test( `Folds`, () => {
		const foldLeftList = <A, B>( z: B, map: ( acc: B, curr: A ) => B ) => ( as: A[] ): B => {
			// [a, b, c]
			// z, a     -> "a"
			// "", a    -> "a"
			// "a", b   -> "ab"
			// "ab", c  -> "abc"
			const loop = ( acc: B, tail: A[] ): B =>
				AR.isNonEmpty( tail ) ?
					// evaluate left (z) first then right (recursive calls)
				loop( map( acc, NEA.head( tail ) ), NEA.tail( tail ) ) :
				acc
			
			return loop( z, as )
		}
		
		const foldRightList = <A, B>( z: B, map: ( curr: A, acc: B ) => B ) => ( as: A[] ): B => {
			// evaluate right first (recursive calls) then left (z)
			const loop = ( tail: A[], acc: B ): B =>
				AR.isNonEmpty( tail ) ?
				loop( NEA.tail( tail ), map( NEA.head( tail ), acc ) ) :
				acc
			
			return loop( as, z )
		}
		
		expect( pipe( [ "a", "b", "c" ], foldLeftList( M.stringMonoid.identity, M.stringMonoid.concat ) ) ).toBe( "abc" )
		expect( pipe( [ "a", "b", "c" ], foldRightList( M.stringMonoid.identity, M.stringMonoid.concat ) ) ).toBe( "cba" )
		
		const foldableOption = (): Foldable<"Option"> => ({
			URI:       "Option",
			foldLeft:  ( z, map ) => ( a ) =>
				O.isNone( a ) ?
				z :
				map( z, a.some ),
			concat:    null as any,
			foldMap:   null as any,
			foldRight: null as any,
		})
		
		expect( M.productMonoid( M.stringMonoid, M.numberAdditionMonoid ).concat( [ "a", 1 ], [ "b", 1 ] ) ).toEqual( [ "ab", 2 ] )
		
		
		expect( M.recordMonoid( M.listMonoid<string | number>() ).concat( { hello: [ 1 ] }, { hello: [ "yup" ] } ) ).toEqual( { hello: [ 1, "yup" ] } )
		
		const functionMonoid = M.functionMonoid( M.listMonoid<string>() )<number>().concat( value => [ value.toString() ], value => [ (value + 1).toString() ] )
		expect( functionMonoid( 5 ) ).toEqual( [ "5", "6" ] )
		
		expect( M.bagMonoid.concat( { a: 1, is: 1 }, { a: 1 } ) ).toEqual( { a: 2, is: 1 } )
	} )
} )


