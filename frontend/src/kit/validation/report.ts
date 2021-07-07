import * as D from "io-ts/Decoder"
import * as DE from "io-ts/DecodeError"
import * as FS from "io-ts/FreeSemigroup"
import { pipe } from "fp-ts/lib/function"




export type Failure = { path: (string | number)[], message: string }

const report = ( error: D.DecodeError ): Failure[] => {
	const loop = ( error: D.DecodeError, path: (string | number)[], kind: typeof DE.optional | typeof DE.required | undefined ): Failure [] =>
		pipe(
			error,
			FS.fold(
				DE.fold( {
					Index:  ( index, kind, errors ) => [ ...loop( errors, [ ...path, index ], kind ) ], // array
					Key:    ( key, kind, errors ) => [ ...loop( errors, [ ...path, key ], kind ) ], // struct | record
					Member: ( _index, errors ) => [ ...loop( errors, path, kind ) ], // union | sum
					Wrap:   ( error, errors ) => [ { path, message: error }, ...loop( errors, path, kind ) ], // message
					Lazy:   ( _id, errors ) => [ ...loop( errors, path, kind ) ],
					Leaf:   ( _actual, error ) => {
						// const isMissing = kind === "required" && actual === undefined || actual === null
						// const message = isMissing ?
						//                 "Required" :
						//                 error
						return [ { path, message: error } ];
					},
				} ),
				( left, right ) => {
					return [ ...loop( left, path, kind ), ...loop( right, path, kind ) ]
				},
			),
		)
	
	return loop( error, [], undefined )
}

export default report
