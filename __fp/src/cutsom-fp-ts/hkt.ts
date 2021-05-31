// @ts-ignore
import { addOne } from "./typeclasses"



// @ts-ignore
export interface URItoKind1<A>
{
	// readonly [ URI ]: Option<A>
	// Option: Option<A>
	// ...
}

// @ts-ignore
export interface URItoKind2<E, A>
{
	// readonly [ URI ]: Either<E, A>
	// readonly Either: Either<E, A>
	// ...
}

export type URIS1 = keyof URItoKind1<any>

export type URIS2 = keyof URItoKind2<any, any>

export type Kind<URI extends URIS1, A> = URI extends URIS1 ? URItoKind1<A>[URI] : never

export type Kind2<URI extends URIS2, E, A> = URI extends URIS2
                                             ? URItoKind2<E, A>[URI]
                                             : never

export interface HKT<URI, A> {
	readonly _URI: URI
	readonly _A: A
}

export interface HKT2<URI, E, A> extends HKT<URI, A> {
	readonly _E: E
}

type EitherStringNum = URItoKind2<string, number>["Either"]
type EitherStringNum2 = Kind2<"Either", string, number>


