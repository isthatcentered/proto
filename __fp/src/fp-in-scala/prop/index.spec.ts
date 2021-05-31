import * as GEN from "./gen"
import * as PROP from "./prop"
import * as E from "fp-ts/Either"




test( `Demo`, () => {
	const intList = GEN.listOfN( GEN.unit( 5 ), GEN.choose( 0, 100 ) )
	
	const reverse = <A>( as: A[] ): A[] => as.concat().reverse()
	
	const maintainsSize = PROP.forAll(
		intList,
		ns => reverse( ns ).length === ns.length,
	)
	
	const doesntMuateOriginalArray = PROP.forAll(
		intList,
		ns => reverse( ns ) !== ns,
	)
	
	expect( PROP.and( maintainsSize, doesntMuateOriginalArray )( 4 ) ).toEqual( E.right( undefined ) )
	// check( prop )
	// check( failingProp )
} )
