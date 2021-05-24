import { pipe } from "fp-ts/lib/function"
import * as E from "fp-ts/lib/Either"
import * as t from "io-ts"
import * as D from "io-ts/Decoder"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import * as AR from "fp-ts/Array"
import * as AP from "fp-ts/Apply"
import { HKT, URIS } from "fp-ts/lib/HKT"
import { Applicative } from "fp-ts/lib/Applicative"
import { Traversable1, Traversable2 } from "fp-ts/lib/Traversable"
import { semigroupString } from "fp-ts/lib/Semigroup"




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
	test( `Validation vs Either`, () => {
		const validateUserNameError     = `validateUserName_error`,
		      validateUserPasswordError = `validateUserPassword_error`,
		      validateUserName          = E.fromPredicate( ( value: string ) => value.length > 2, _value => [ validateUserNameError ] ),
		      validatePassword          = E.fromPredicate( ( value: string ) => value.length > 8, _value => [ validateUserPasswordError ] )
		
		const validateCredsEither = ( username: string, password: string ): E.Either<string[], { username: string, password: string }> =>
			AP.sequenceS( E.Applicative )
			( {
				username: validateUserName( username ),
				password: validatePassword( password ),
			} )
		
		
		// Array<Either<E, T>> -> Either<E,Array<T>>
		//                                     Array of Eithers    ->   to Either of Array
		//                                     v         v                  v        v
		expect( AR.sequence( E.Applicative )( [ E.right( 3 ) ] ) ).toEqual( E.right( [ 3 ] ) )
		expect( AR.sequence( E.Applicative )( [ E.left( 3 ) ] ) ).toEqual( E.left( 3 ) )
		
		
		expect( validateCredsEither( "_", "_" ) ).toEqual( E.left( [ validateUserNameError ] ) )
		
		const validateCredsValidation = ( username: string, password: string ): E.Either<string[], { username: string, password: string }> =>
			AP.sequenceS( E.getApplicativeValidation( AR.getSemigroup<string>() ) )
			( {
				username: validateUserName( username ),
				password: validatePassword( password ),
			} )
		
		expect( validateCredsValidation( "_", "_" ) ).toEqual( E.left( [ validateUserNameError, validateUserPasswordError ] ) )
	} )
	
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
	
	
	
	test( ``, () => {
		// how the fuck does an applicative help you implement sequence ? -> The 'of' function
		// applicative lifts a non unary function into an F context (a -> b -> c ==> F[A] -> F[B] -> F[C])
		// sequence takes an F[G[A]] into G[F[A]]
		// The traversable[F_]  needs to be a foldable
		// To implement traverse he needs an applicative[G]
		// how the fuck does Applicative help sequencing
		
		const sequenceEither: Traversable2<"Either">["sequence"] = <F extends URIS>( F_: Applicative<F> ) => <E, A>( ma: E.Either<E, HKT<F, A>> ): HKT<F, E.Either<E, A>> =>
			E.isLeft( ma ) ?
			F_.of( ma ) :
			F_.map<A, E.Either<E, A>>( ma.right, E.right ) // ma.right is an HKT, that's why map works
		
		const sequenceOption: Traversable1<"Option">["sequence"] = <F extends URIS>( F_: Applicative<F> ) => <A>( ma: O.Option<HKT<F, A>> ): HKT<F, O.Option<A>> =>
			O.isNone( ma ) ?
			F_.of( ma ) :
			F_.map( ma.value, O.some )
		
		const sequenceArray: Traversable1<"Array">["sequence"] = <F extends URIS>( F_: Applicative<F> ) => <A>( ma: Array<HKT<F, A>> ): HKT<F, Array<A>> =>
			pipe(
				ma,
				AR.reduce( F_.of( [] as A[] ), ( acc, curr ) => {
					const append = F_.map( acc, as => ( a: A ) => [ ...as, a ] )
					return F_.ap( append, curr )
				} ),
			)
		
		
		
		expect( pipe( O.some( E.right( "a" ) ), sequenceOption( E.Applicative ) ) ).toEqual( E.right( O.some( "a" ) ) )
		expect( pipe( O.some( E.right( "a" ) ), O.sequence( E.Applicative ) ) ).toEqual( E.right( O.some( "a" ) ) )
		expect( pipe( O.some( E.left( "a" ) ), sequenceOption( E.Applicative ) ) ).toEqual( E.left( "a" ) )
		expect( pipe( O.some( E.left( "a" ) ), O.sequence( E.Applicative ) ) ).toEqual( E.left( "a" ) )
		//                                                                                       ^ We end up without an option because we use E.map. Map does nothing on lefts
		//                                                                                         If we used apply we would get a left[some["a"]] which would be wierd ?
		
		expect( pipe( O.some( E.right( "a" ) ), O.sequence( E.getApplicativeValidation( semigroupString ) ) ) ).toEqual( E.right( O.some( "a" ) ) )
		expect( pipe( O.some( E.left( "a" ) ), O.sequence( E.getApplicativeValidation( semigroupString ) ) ) ).toEqual( E.left( "a" ) )
		// ^
		// Applicative validation changes nothing on single item types (there's nothing to accumulate on the left when there can only be one left anyway)
		
		// How does that translate with arrays ?
		expect( pipe( [ E.left( "a" ), E.left( "b" ) ], AR.sequence( E.Applicative ) ) ).toEqual( E.left( "a" ) )
		expect( pipe( [ E.right( "a" ), E.left( "b" ) ], AR.sequence( E.Applicative ) ) ).toEqual( E.left( "b" ) )
		expect( pipe( [ E.right( "a" ), E.right( "b" ) ], AR.sequence( E.Applicative ) ) ).toEqual( E.right( [ "a", "b" ] ) )
		expect( pipe( [ E.left( "a" ), E.left( "b" ) ], AR.sequence( E.Applicative ) ) ).toEqual( E.left( "a" ) )
		
		//            Now we can have more than one left, so there's something to accumulate
		//            v
		expect( pipe( [ E.left( "a" ), E.left( "b" ) ], AR.sequence( E.getApplicativeValidation( semigroupString ) ) ) ).toEqual( E.left( "ab" ) )
		expect( pipe( [ E.right( "a" ), E.right( "b" ) ], AR.sequence( E.getApplicativeValidation( semigroupString ) ) ) ).toEqual( E.right( [ "a", "b" ] ) )
		expect( pipe( [ E.left( "a" ), E.left( "b" ) ], sequenceArray( E.getApplicativeValidation( semigroupString ) ) ) ).toEqual( E.left( "ab" ) )
		expect( pipe( [ E.right( "a" ), E.right( "b" ) ], sequenceArray( E.getApplicativeValidation( semigroupString ) ) ) ).toEqual( E.right( [ "a", "b" ] ) )
		//            ^
		//            Since we now have multiple items, I was forced to use ap() to merge all lefts into arr
		//            Since this applicative uses a semigroup to accumulate lefts, then it works
		
		// Ok, but how can I sequence two validations with that shit ?
		
		// can i compose a validator sequence a => validation with just applicative given there s no dependency (they all use a, no matter what happens to previous valdidation)
		//
		// can i implemebt "and" and "or" htat way ???
		
		
		
		 const blah  = AR.traverse(E.getApplicativeValidation(semigroupString))
		
	} )
} )

type Blah = { type: "a", a: string } | { type: "b", b: string }

type GetTypes<T extends { type: string }> = T["type"]

type GetSpecificUnion<T extends { type: any }, K extends T["type"]> = T["type"] extends K ? T : never

type indeed = GetTypes<Blah>
type indeed2 = GetSpecificUnion<Blah, "a">

