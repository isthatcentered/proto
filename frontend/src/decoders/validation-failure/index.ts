
type Tree = {
	type: "tree",
	path: string
	children: ValidationFailure[]
}

type Leaf = {
	type: "leaf",
	path: string
	message: string,
}

export type ValidationFailure = Tree | Leaf

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const tree = ( params: Omit<Tree, "type"> ): Tree => ({
	...params,
	type: "tree",
})

export const leaf = ( params: Omit<Leaf, "type"> ): Leaf => ({
	...params,
	type: "leaf",
})


// -------------------------------------------------------------------------------------
// Operations
// -------------------------------------------------------------------------------------
type AnyRecord = Record<any, any>
export type StructReport<T extends AnyRecord> = {
	[K in keyof T]: T[K] extends AnyRecord ?
	                StructReport<T[K]> :
	                T[K] extends AnyRecord[] ?
	                StructReport<T[K]>[] :
	                T[K] extends any[] ?
	                string[] :
	                string
}

export const toStruct = <T>( errors: ValidationFailure ): StructReport<T> => {
	switch ( errors.type ) {
		case "tree":
			return errors.children.reduce( ( acc, curr ) => ({ ...acc, [ curr.path ]: toStruct( curr ) }), {} as any )
		case "leaf":
			return errors.message as any
	}
}

