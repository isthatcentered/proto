import { pipe, Predicate, Refinement } from "fp-ts/function"
import * as AR from "fp-ts/Array"
import { MonoidAll } from "fp-ts/boolean"
import * as REC from "fp-ts/Record"

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const predicate =
	<A>(predicate: Predicate<A>): Refinement<A, A> =>
	(a): a is A =>
		predicate(a)

// -------------------------------------------------------------------------------------
// Combinators
// -------------------------------------------------------------------------------------
export const chain: {
	<A, B extends A>(ab: Refinement<A, B>): Refinement<A, B>
	<A, B extends A, C extends B>(
		ab: Refinement<A, B>,
		bc: Refinement<B, C>,
	): Refinement<A, C>
	<A, B extends A, C extends B, D extends C>(
		ab: Refinement<A, B>,
		bc: Refinement<B, C>,
		cd: Refinement<C, D>,
	): Refinement<A, D>
} =
	(...refinements: Refinement<any, any>[]): Refinement<any, any> =>
	(value: any): value is any =>
		pipe(
			refinements,
			AR.reduce(true as boolean, (acc, refinement) => acc && refinement(value)),
		)

export const struct =
	<T extends Record<string, Refinement<any, any>>>(
		spec: T,
	): Refinement<
		{ [K in keyof T]: Unrefined<T[K]> },
		{ [K in keyof T]: Refined<T[K]> }
	> =>
	(a): a is { [K in keyof T]: Refined<T[K]> } =>
		pipe(
			spec,
			REC.foldMapWithIndex(MonoidAll)((key, refinement) => refinement(a[key])),
		)

export const partial = <T extends Record<string, Refinement<any, any>>>(
	spec: T,
): Refinement<
	Partial<{ [K in keyof T]: Unrefined<T[K]> }>,
	Partial<{ [K in keyof T]: Refined<T[K]> }>
> => struct(pipe(spec, REC.map(optional))) as Refinement<any, any>

export const array =
	<A, B extends A>(refinement: Refinement<A, B>): Refinement<A[], B[]> =>
	(as): as is B[] =>
		pipe(
			as,
			AR.foldMap(MonoidAll)(a => refinement(a)),
		)

export const optional =
	<A, B extends A>(
		predicate: Refinement<A, B>,
	): Refinement<A | undefined, B | undefined> =>
	(a): a is B | undefined =>
		a === undefined ? true : predicate(a)

// -------------------------------------------------------------------------------------
// Interop
// -------------------------------------------------------------------------------------
export const asPredicate = <A, B extends A>(
	refinement: Refinement<A, B>,
): Predicate<B> => refinement

// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const Pass = <A>(a: A): a is A => true

export const Fail = <A>(a: A): a is A => false

export const isNumber = (value: unknown): value is number =>
	typeof value === "number" && !isNaN(value) && value !== Infinity

export const isString = (value: unknown): value is string =>
	typeof value === "string"

export const notBlank = predicate((value: string) => value.trim() !== "")

export const isNonEmptyString = chain(isString, notBlank)

export const gte = (min: number) => predicate((value: number) => value >= min)

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------
type Unrefined<T extends Refinement<any, any>> = T extends Refinement<
	infer A,
	any
>
	? A
	: never

type Refined<T extends Refinement<any, any>> = T extends Refinement<
	any,
	infer A
>
	? A
	: never

// -------------------------------------------------------------------------------------
// Old
// -------------------------------------------------------------------------------------

export const allPass =
	<A, B>(...predicates: Predicate<A>[]): Predicate<A> =>
	a =>
		!predicates.some(predicate => !predicate(a))

export const anyPass =
	<A>(...predicates: Predicate<A>[]): Predicate<A> =>
	a =>
		predicates.some(predicate => predicate(a))

export const and = <A, B extends A, C extends B>(
	left: Refinement<A, B>,
	right: Refinement<B, C>,
): Refinement<A, C> => chain(left, right)

export const isNotEmpty = (value: string): value is string =>
	value.trim() !== ""

export const boolean = (value: unknown): value is boolean =>
	typeof value === "boolean"

export const date = (value: unknown): value is Date => value instanceof Date

export const record =
	<A>() =>
	(value: unknown): value is A =>
		typeof value === "object" && !Array.isArray(value)
