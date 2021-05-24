import * as RND from "fp-ts/Random"
import { pipe } from "fp-ts/lib/function"




export type Gen<A> = () => A

export const map = <A, B>( ab: ( a: A ) => B ) => ( fa: Gen<A> ): Gen<B> =>
	() => ab( fa() )

export const flatMap = <A, B>( afb: ( a: A ) => Gen<B> ) => ( fa: Gen<A> ): Gen<B> =>
	afb( fa() )

export const choose = ( start: number, stop: number ): Gen<number> =>
	RND.randomInt( start, stop )

export const unit = <A>( a: A ): Gen<A> => () => a

export const boolean = RND.randomBool

export const listOfN = <A>( n: Gen<number>, gen: Gen<A> ): Gen<A[]> =>
	pipe(
		n,
		flatMap( n => () => Array.from( { length: n } ).map( gen ) ),
	)

// pull value from each generator with equal likelyhood
export const union = <A>( left: Gen<A>, right: Gen<A> ): Gen<A> =>
	pipe(
		boolean,
		flatMap( bool =>
			bool ?
			left :
			right ),
	)

export const weighted = <A>( a: [ Gen<A>, number ], b: [ Gen<A>, number ] ): Gen<A> =>
	pipe(
		RND.random,
		flatMap( rand => {
				const aThreshold = a[ 1 ] / (a[ 1 ] + b[ 1 ]) // 3 / (3 + 2) -> .6
				return rand < aThreshold ?
				       a[ 0 ] :
				       b[ 0 ]
			},
		),
	)
