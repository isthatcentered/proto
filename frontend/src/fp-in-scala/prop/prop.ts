import * as E from "fp-ts/Either"
import { Gen } from "./gen"
import { constant, Predicate } from "fp-ts/function"
import * as AR from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"




type Prop = ( count: number ) => E.Either<[ string, number ], void>

// for each generated value, check predicate passes
export const forAll = <A>( gen: Gen<A>, predicate: Predicate<A> ): Prop =>
	( count ) =>
		pipe(
			Array.from( { length: count } ),
			AR.map( gen ),
			AR.traverseWithIndex( E.Applicative )( ( index, a ) =>
				predicate( a ) ?
				E.right( undefined ) :
				E.left( [ `Prop failed with value ${JSON.stringify( a )}`, index ]   ) as E.Either<[ string, number ], void>,
			),
			E.map( constant( undefined ) ),
		)

export const and = ( left: Prop, right: Prop ): Prop =>
	count =>
		pipe(
			left( count ),
			E.chain( () => right( count ) ),
		)
