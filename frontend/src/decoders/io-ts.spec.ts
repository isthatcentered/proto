import { pipe } from "fp-ts/lib/function"
import * as E from "fp-ts/lib/Either"
import * as t from "io-ts"
import * as D from "io-ts/Decoder"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import * as AP from "fp-ts/Apply"




type User = t.TypeOf<typeof User>
const User = t.type( {
	userId: t.number,
	name:   t.string,
} )

export const Person = D.struct( {
	name:    D.string,
	age:     D.number,
	address: D.struct( {
		street: D.string,
		number: D.number,
	} ),
} )

const getPaths = <A>( v: t.Validation<A> ): Array<string> => {
	return pipe(
		v,
		E.fold(
			errors => {
				
				// console.log( errors )
				// console.log( errors.map(e => e.context) )
				
				return errors.map( error => error.context.map( ( { key } ) => key ).join( "." ) )
			},
			() => [ "no errors" ],
		),
	)
}
test( `Blah`, () => {
	getPaths( User.decode( {} ) ) // => [ '.userId', '.name' ]
} )

test( `1 item failing in an array fails everyhting`, () => {
	const stringArrayDecoder = D.struct( {
		items: D.array( D.string ),
	} )
	const result = stringArrayDecoder.decode( { items: [ "1", 3 ] } )
	expect( E.isLeft( result ) ).toBe( true )
} )


describe( `fp-ts`, () => {
	// cases(
	// 	"fp-ts/Either",
	// 	_config => {
	// 	},
	// 	{
	// 		testName: {},
	// 	},
	// )
	
	
	test( `Traverse either`, () => {
		// traverse is about flipping containers
		// traverse array[T[_]] => T[Array[_]]
		// traverse Either<E, Opt<_>> -> Opt<Either<E, _>>
		const eitherOptionSequence = pipe(
			E.right( O.some( 5 ) ),
			E.sequence( O.Applicative ),
		)
		const eitherArraySequence = pipe(
			E.right( [ 5, 6 ] ),
			E.sequence( A.Applicative ),
		)
		
		const eitherArrayTraverse = pipe(
			E.right( [ 5, 6 ] ),
			E.traverse( A.Applicative )( A.map( i => i * 2 ) ),
		)
		
		const applySequenceSEitherRights = pipe(
			{
				prop:      E.right( 5 ),
				otherProp: E.right( "5" ),
			},
			AP.sequenceS( E.getApplicativeValidation( A.getSemigroup<number>() ) ),
		)
		
		const applySequenceSEitherLefts = pipe(
			{
				prop:      E.left( [ 4 ] ),
				otherProp: E.left( [ 5 ] ),
			},
			AP.sequenceS( E.getApplicativeValidation( A.getSemigroup<number>() ) ),
		)
		
		
		
		expect( eitherOptionSequence ).toEqual( O.some( E.right( 5 ) ) )
		expect( eitherArraySequence ).toEqual( [ E.right( 5 ), E.right( 6 ) ] )
		expect( eitherArrayTraverse ).toEqual( [ E.right( 10 ), E.right( 12 ) ] )
		expect( applySequenceSEitherRights ).toEqual( E.right( { prop: 5, otherProp: "5" } ) )
		expect( applySequenceSEitherLefts ).toEqual( E.left( [ 4, 5 ] ) )
	} )
} )

type Blah = {type: "a", a: string} |{type: "b", b: string}

type GetTypes<T extends {type: string}> = T["type"]

type GetSpecificUnion<T  extends {type: any}, K extends T["type"]> = T["type"] extends K ? T : never

type indeed = GetTypes<Blah>
type indeed2 = GetSpecificUnion<Blah, "a">

