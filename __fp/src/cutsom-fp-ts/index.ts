import * as T from "fp-ts/Task"
import * as TE from "fp-ts/TaskEither"
import * as EQ from "fp-ts/Eq"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import * as NEA from "fp-ts/NonEmptyArray"
import * as R from "fp-ts/Record"
import { pipe } from "fp-ts/function"



// https://dev.to/ryanleecode/practical-guide-to-fp-ts-p6-the-do-notation-noj
const blah = pipe(
	T.bindTo( "a" )( T.of( "Hello" ) ),
	T.bind( "e", () => T.of( 5 ) ),
	T.chainFirst(_env => T.of(new Date())) // returns env instead of date (basically for side effect)
)
