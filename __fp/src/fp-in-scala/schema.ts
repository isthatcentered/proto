type Struct<T extends Record<any, any>> = {
	_tag: "STRUCT",
	map: {
		[K in keyof T]: Validation<T[K]>
	}
}
type List<T> = { _tag: "LIST", children: Validation<T> }
type And<T> = { _tag: "AND", left: Validation<T>, right: Validation<T> }
type Par<T> = { _tag: "PAR", children: Validation<T> }
type Or<T> = { _tag: "OR", left: Validation<T>, right: Validation<T> }
type Not<T> = { _tag: "NOT", validation: Validation<T> }
type Eq<T> = { _tag: "EQ", expected: T }
type Min<T> = { _tag: "MIN", min: T, }
type Max<T> = { _tag: "MAX", max: T, }

export type Validation<T> =
	| Struct<T>
	| List<T>
	| Par<T>
	| Or<T>
	| And<T>
	| Not<T>
	| Eq<T>
	| Min<T>
	| Max<T>

type ValueType<T extends Validation<any>> =
	T extends Validation<infer V> ?
	V :
	never

export const struct = <T extends Record<string, any>>( map: { [K in keyof T]: Validation<T[K]> } ): Validation<T> => {
	map
	return null as any
}

export const list = <T>( _validation: Validation<T> ): Validation<T[]> => {
	return null as any
}

export const either = <A, B>( _left: Validation<A>, _right: Validation<B> ): Validation<A | B> => {
	return null as any
}

export const eq = <T>( _expected: T ): Validation<T> => {
	return null as any
}

export const min = <T extends Date | number>( _min: T ): Validation<T> => {
	return null as any
}

export const max = <T extends Date | number>( max: T ): Validation<T> => {
	return { _tag: "MAX", max }
}

export const string: Validation<string> = eq( "" )

export const number: Validation<number> = eq( "" ) as any // @todo: contramap/prop


const blah = struct( {
	list: list( eq( 5 ) ),
	min:  max( 5 ),
} )
