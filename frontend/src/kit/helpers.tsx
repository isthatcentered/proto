import { ComponentType, HTMLAttributes } from "react"
import { pipe, Predicate } from "fp-ts/function"
import * as AR from "fp-ts/Array"
import { Object, Union } from "ts-toolbelt"
import { cond as RCond } from "ramda"




export type AnyRecord = Record<any, any>

export type ElementProps<T extends AnyRecord, E = HTMLAttributes<HTMLElement>> = T & Omit<E, keyof T>

export type Code<T> = {
	 value: T,
	 label: string
}

export const prop = <T extends AnyRecord, K extends keyof T>( key: K ) => ( record: T ): T[K] => record[ key ]

// The Partial<T> type allows us to not specify a key, we want a type error if a key is missing.

export type Kinda<T extends AnyRecord> = {
	 [K in keyof T]: T[K] | undefined
}

export type FilteredKeys<T, U> = {
	 [P in keyof T]: T[P] extends U ? P : never
}[keyof T];



export type DeepKinda<T> =
	 T extends Primitives ? T | undefined :
	 T extends Array<infer I> ? (NonNullable<DeepKinda<I>>[]) | undefined :
	 T extends Record<string, any> ? {
																			[K in keyof T]: DeepKinda<T[K]>
																	 } | undefined : never


export type Clazz<T> = new ( ...args: any[] ) => T;

export const pick = <T extends AnyRecord, K extends keyof T>( keys: K[] ) => ( thing: T ): Pick<T, K> =>
	 pipe(
			keys,
			AR.reduce( {} as Pick<T, K>, ( acc, key ) => ({ ...acc, [ key ]: thing[ key ] }) ),
	 )

export type ResolveType<T> = T extends PromiseLike<infer U> ? U | T : never;

export  type Constructable = {
	 new(): any;
	 new( ...args: any[] ): any;
}



export type Lookup<T, K extends Partial<T>> = T extends K ? T : never


export type Primitives = string | number | boolean | null | undefined | Date

export type MergeUnions<T> =
	 [ NonNullable<T> ] extends [ Primitives ] ? T :
	 [ NonNullable<T> ] extends [ Array<infer I> ] ? MergeUnions<I>[] :
	 [ NonNullable<T> ] extends [ object ] ? Union.Merge<NonNullable<{
			[K in keyof T]: MergeUnions<T[K]>
	 }>> : never

export type ArrayProps<T extends Record<string, any>> = {
	 [K in keyof T as T[K ] extends any[] ? K : never]: T[K]
}

export type IfElse<TPredicate extends 1 | 0, TOnTrue, TOnfalse> = TPredicate extends 1 ? TOnTrue : TOnfalse

export type OrElse<A, B> = IfElse<Union.Has<A, undefined>, B, A>

type PathImpl<T, Key extends keyof T> =
	 Key extends string ?
	 NonNullable<T[Key]> extends Primitives ? never :
	 T[Key] extends Record<string, any>
	 ? | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
		 | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
	 : never
											: never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

type __Paths<T> =
	 T extends Primitives ? never :
	 T extends Array<infer I> ? `${number}.${string & __Paths<I>}` :
	 PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;


type __PathValue<T, P extends __Paths<T>> =
	 P extends `${infer Key}.${infer Rest}`
	 ? Key extends keyof T
		 ? Rest extends __Paths<T[Key]>
			 ? __PathValue<T[Key], Rest>
			 : never
		 : never
	 : P extends keyof T
		 ? T[P]
		 : never;

type StrictPaths<T> =
	 T extends (string | number)[] ? T :
	 T extends string[] ? T :
	 never

export type Paths<T> = StrictPaths<[ NonNullable<T> ] extends [ Primitives ] ? [] :
																	 [ NonNullable<T> ] extends [ Array<infer I> ] ? [ number, ...Paths<I> ] :
																	 [ NonNullable<T> ] extends [ object ] ? Object.Paths<NonNullable<T>> : never>


export type Get<T, P extends (string | number)[], hasUndefined extends 1 | 0 = 0> =
	 [ P ] extends [ [] ] ? IfElse<hasUndefined, T | undefined, T> :
			// [ MergeUnions<NonNullable<T>> ] extends [ object ] ?
			// (Object.Path<MergeUnions<NonNullable<T>>, P>) : never
	 [ P ] extends [ [ infer Head, ...infer _Tail ] ] ?
	 (
			Head extends keyof MergeUnions<NonNullable<T>> ?
			Get<MergeUnions<NonNullable<T>>[Head], (_Tail extends (string | number)[] ? _Tail : []), IfElse<hasUndefined, 1, IfElse<Union.Has<T, undefined>, 1, 0>>> : never
			) : never


// // A | B -> A & B
// type UnionToIntersection<U> = (U extends any
//                                ? ( k: U ) => void
//                                : never) extends (( k: infer I ) => void)
//                               ? I
//                               : never;
// // { a: number, c: number } | { b: string, c: number } -> { a?: number, b?: string, c: number }
// export type FlattenUnion<T> = {
// 	[K in keyof UnionToIntersection<T>]: (
// 		K extends keyof T ? T[K] extends any[] ? T[K] : T[K] extends object ? FlattenUnion<T[K]> : T[K] : UnionToIntersection<T>[K] | undefined)
// }

// export type Yolo<T> = {
// 	[K in keyof FlattenUnion<T>]-?: NonNullable<FlattenUnion<T>[K]> extends Primitives ?
// 	                                FlattenUnion<T>[K] :
// 	                                Yolo<NonNullable<FlattenUnion<T>[K]>>
// }

// export type DeepRequired<T extends Record<string, any>> =
// 	T extends Primitives ? T :
// 	T extends Array<infer I> ? DeepRequired<I>[] :
// 	Required<{
// 		[K in keyof T]: DeepRequired<T[K]>
// 	}>
//
// export type DeepMerge<T> = FlattenUnion<T>
// // T extends Primitives ? T :
// // T extends Array<infer I> ? DeepMerge<I>[] :
// // T extends object ?
// // Union.Merge<T> :
// // never

// export type Paths<T extends object> = Object.Paths<DeepMerge<T>>

// export type Path<T extends object, P extends (string | number | symbol)[]> = Object.Path<DeepMerge<T>, P>


export type DeepPartial<T> =
	 T extends Primitives ? T :
	 T extends Array<infer I> ? DeepPartial<I>[] :
	 T extends Record<string, any> ? Partial<{
			[K in keyof T]: Partial<T[K]>
	 }> : never

const cond = <A extends any, R>( rules: Array<[ Predicate<A>, ( value: A ) => R ]> ) => ( a: A ): R => RCond( rules )( a )

export type Props<T extends ComponentType<any>> = T extends ComponentType<infer P> ? P : never

export const notNil = <T extends any>( value: T ): value is NonNullable<T> =>
	 value !== undefined && value !== null

export const eq = <A extends B, B extends string | number>( expected: A ) => ( actual: B ) => expected === actual
