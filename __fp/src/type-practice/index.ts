import { Object, Union } from "ts-toolbelt";
import { Path, Paths } from "../kit-2/helpers"




type AnyRecord = Record<any, any>

const pretend = <T>(): T => null as any
const todo = null as any

type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

const assertType = <_T extends true>(): void => <any>null

const assertNotType = <_T extends false>(): void => <any>null

const debugType = <TExpected, TActual extends TExpected>( _a: TExpected, _b: TActual ): void => <any>null

type ArrayItem<T extends unknown[]> = T[number]

test( `Pick<T, K>`, () => {
	type Pick<T extends AnyRecord, K extends keyof T> = {
		[P in K]: T[P]
	}
	
	assertType<TypeEq<{ a: string, b: number }, Pick<{ a: string, b: number, c: string }, "a" | "b">>>()
} )

test( `Readonly<T>`, () => {
	type Readonly<T extends AnyRecord> = {
		readonly [K in keyof T]: T[K]
	}
	
	assertType<TypeEq<{ readonly a: string, }, Readonly<{ a: string, }>>>()
} )

test( `Readonly<T>`, () => {
	type Readonly<T extends AnyRecord> = {
		readonly [K in keyof T]: T[K]
	}
	
	assertType<TypeEq<{ readonly a: string, }, Readonly<{ a: string, }>>>()
} )

test( `TupleToObject<T>`, () => {
	type TupleToObject<T extends any[]> = {
		[K in T[number]]: K
	}
	
	// Indexed types
	// type Age = typeof MyArray[number]["age"];
	
	assertType<TypeEq<{ tesla: "tesla", "model 3": "model 3", "model X": "model X", "model Y": "model Y" }, TupleToObject<[ "tesla", "model 3", "model X", "model Y" ]>>>()
} )

test( `Head<T>`, () => {
	type Head<T extends any[]> = T[0]
	
	const result: Head<[ "tesla", "model 3" ]> = todo
	
	assertType<TypeEq<"tesla", Head<[ "tesla", "model 3" ]>>>()
} )

test( `Length<T>`, () => {
	type Length<T extends any[]> = T["length"]
	
	const result: Length<[ "tesla", "model 3" ]> = todo
	
	assertType<TypeEq<2, Length<[ "tesla", "model 3" ]>>>()
} )

test( `Omit<T>`, () => {
	type Omit<T extends AnyRecord, K extends keyof T> = {
		[P in keyof T as P extends K ? never : P]: T[P]
	}
	
	assertType<TypeEq<{ b: string }, Omit<{ a: string, b: string }, "a">>>()
} )

test( `If<bool, A, B>`, () => {
	type If<A, B, C> = A extends true ? B : C
	
	assertType<TypeEq<"a", If<true, "a", "b">>>()
	assertType<TypeEq<"b", If<false, "a", "b">>>()
} )


test( `Concat<A, B>`, () => {
	// https://github.com/ghaiklor/type-challenges-solutions/blob/main/en/easy-concat.md
	// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types
	type Concat<A extends unknown[], B extends unknown[]> = [ ...A, ...B ]
	
	const result: Concat<[ 1 ], [ 2 ]> = todo
	
	assertType<TypeEq<[ 1, 2 ], Concat<[ 1 ], [ 2 ]>>>()
} )

test( `Includes<B, A>`, () => {
	type Includes<B, A extends unknown[]> = B extends A[number] ? true : false
	
	const result: Includes<"a", [ "a", "b" ]> = todo
	
	assertType<TypeEq<true, Includes<"a", [ "a", "b" ]>>>()
	assertType<TypeEq<false, Includes<"c", [ "a", "b" ]>>>()
} )


test( `ReadonlySpec<T, K>`, () => {
	type ReadonlySpec<T, K extends keyof T = keyof T> = T & { readonly [P in K]: T[P] }
	
	const result: ReadonlySpec<{ a: string, b: string, }, "a"> = todo
	// result.a = ""
	result.b = ""
} )


test( `DeepReadonly<T>`, () => {
	type DeepReadonly<T> = {
		readonly [K in keyof T]: T[K] extends Record<string, unknown> ? DeepReadonly<T[K]> : T[K]
	}
	
	const result: DeepReadonly<{ a: string, b: { c: string }, }> = todo
	
	assertType<TypeEq<{ readonly a: string, readonly b: { readonly c: string } }, DeepReadonly<{ a: string, b: { c: string }, }>>>()
} )


test( `TupleToUnion<T>`, () => {
	type TupleToUnion<T extends unknown[]> = T[number]
	
	const result: TupleToUnion<[ 1, 2, 3 ]> = todo
	
	assertType<TypeEq<1 | 2 | 3, TupleToUnion<[ 1, 2, 3 ]>>>()
} )

test( `Chainable<T>`, () => {
	type Chainable<A> = {
		with: <K extends string, B>( key: K, value: B ) => Chainable<A & { [P in K]: B }>
		get: () => A
	}
	
	const makeConfig: Chainable<{}> = todo
	
	const config = makeConfig.with( "a", "a_value" ).with( "b", 5 )
	
	assertType<TypeEq<Chainable<{ a: string } & { b: number }>, typeof config>>()
} )

test( `Last<T>`, () => {
	// type Last<T extends unknown[]> = [ undefined, ...T ][T["length"]]
	type Last<T extends unknown[]> = T extends [ ...any, infer Last ] ? Last : undefined
	
	const result: Last<[ 1, 2, 3 ]> = todo
	
	assertType<TypeEq<3, Last<[ 1, 2, 3 ]>>>()
	assertType<TypeEq<3, Last<[ 3 ]>>>()
	assertType<TypeEq<undefined, Last<[]>>>()
} )

test( `Pop<T>`, () => {
	// type Last<T extends unknown[]> = [ undefined, ...T ][T["length"]]
	type Pop<T extends unknown[]> = T extends [ ...infer Start, infer _Last ] ? Start : []
	
	const result: Pop<[ 1, 2, 3 ]> = todo
	
	assertType<TypeEq<[ 1, 2 ], Pop<[ 1, 2, 3 ]>>>()
	assertType<TypeEq<[], Pop<[ 3 ]>>>()
	assertType<TypeEq<[], Pop<[]>>>()
} )

test( `PromiseAll<T>`, () => {
	type PromiseAll<T extends Promise<unknown>[]> = Promise<{
		[K in keyof T]: T[K] extends Promise<infer R> ? R : never
	}>
	
	const result: PromiseAll<[ Promise<string>, Promise<number> ]> = todo
	
	assertType<TypeEq<Promise<[ string, number ]>, PromiseAll<[ Promise<string>, Promise<number> ]>>>()
} )

test( `Lookup<T>`, () => {
	type Lookup<T extends { type: any }, K extends T["type"]> = T extends { type: K } ? T : never
	
	const result: Lookup<{ type: "dog", bark: boolean } | { type: "cat", meow: boolean }, "cat"> = todo
	
	assertType<TypeEq<{ type: "cat", meow: boolean }, Lookup<{ type: "dog", bark: boolean } | { type: "cat", meow: boolean }, "cat">>>()
} )

test( `Trim<T>`, () => {
	type Whitespace = " " | "\n" | "\t"
	type Trim<T extends string> =
		T extends `${Whitespace}${infer Tail}` ? Trim<Tail> :
		T extends `${infer Start}${Whitespace}` ? Trim<Start> : T
	
	const result: Trim<"  Hello  "> = todo
	
	assertType<TypeEq<"Hello", Trim<"  Hello   ">>>()
} )


test( `Replace<T, A, B>`, () => {
	type Replace<T extends string, A extends string, B extends string> =
		T extends `${infer Left}${A}${infer Right}` ? `${Left}${B}${Right}` : T
	
	const result: Replace<"types are fun!", "fun", "awesome"> = todo
	
	assertType<TypeEq<"types are awesome!", Replace<"types are fun!", "fun", "awesome">>>()
} )


test( `ReplaceAll<T, A, B>`, () => {
	type ReplaceAll<T extends string, A extends string, B extends string> =
		T extends `${infer Left}${A}${infer Right}` ? `${Left}${B}${ReplaceAll<Right, A, B>}` : T
	
	const result: ReplaceAll<"t y p e s", " ", ""> = todo
	
	assertType<TypeEq<"types", ReplaceAll<"t y p e s", " ", "">>>()
} )


test( `AppendArg<T, A>`, () => {
	type AppendArg<T extends ( ...args: any[] ) => any, A> =
		T extends ( ...args: infer P ) => infer R ?
		( ...args: [ ...P, A ] ) => R :
		never
	
	const result: AppendArg<( a: string ) => number, number> = todo
	
	assertType<TypeEq<( a: string, b: number ) => number, AppendArg<( a: string ) => number, number>>>()
} )

test( `Permutation<T>`, () => {
	type Permutation<T, C = T> =
		[ T ] extends [ never ] ? [] :
			// v distribute C                               v over every T
		C extends infer U ? [ U, ...Permutation<Exclude<T, U>> ] : []
	
	const result: Permutation<"A" | "B"> = todo
	
	assertType<TypeEq<[ "A", "B" ] | [ "B", "A" ], Permutation<"A" | "B">>>()
} )

test( `StringLength<T>`, () => {
	type StringLength<T extends string, C extends number[] = []> =
		(T extends `${infer _Head}${infer Tail}` ? StringLength<Tail, [ ...C, 0 ]> : C["length"])
	
	
	const result: StringLength<"Hello"> = todo
	
	assertType<TypeEq<5, StringLength<"Hello">>>()
	assertType<TypeEq<0, StringLength<"">>>()
} )

test( `Flatten<T>`, () => {
	type Flatten<T> =
		T extends [] ? [] :
		T extends [ infer H, ...infer T ] ? [ ...Flatten<H>, ...Flatten<T> ] : [ T ]
	
	const result: Flatten<[ 1, 2, [ 3, 4 ], [ [ [ 5 ] ] ] ]> = todo
	
	assertType<TypeEq<[ 1, 2, 3, 4, 5 ], Flatten<[ 1, 2, [ 3, 4 ], [ [ [ 5 ] ] ] ]>>>()
} )


test( `AppendToObject<T>`, () => {
	type AppendToObject<T, K extends string, V> = {
		[P in keyof T | K]: P extends keyof T ? T[P] : V
	}
	
	const result: AppendToObject<{ a: string }, "b", number> = todo
	
	assertType<TypeEq<{ a: string, b: number }, AppendToObject<{ a: string }, "b", number>>>()
} )

test( `Absolute<T>`, () => {
	type Absolute<T extends string | number> =
		`${T}` extends `-${infer N}` ? N : `${T}`
	
	
	const result: Absolute<-5> = todo
	
	assertType<TypeEq<"5", Absolute<-5>>>()
	assertType<TypeEq<"5", Absolute<"-5">>>()
} )


test( `StringToUnion<T>`, () => {
	type StringToUnion<T extends string> =
		T extends `${infer H}${infer T}` ? H | StringToUnion<T> : never
	
	
	const result: StringToUnion<"blah"> = todo
	
	assertType<TypeEq<"b" | "l" | "a" | "h", StringToUnion<"blah">>>()
} )

test( `Merge<A,B>`, () => {
	type Merge<A, B> = {
		[P in keyof A | keyof B]: P extends keyof B ? B[P] : P extends keyof A ? A[P] : never
	}
	
	const result: Merge<{ a: number; b: string; }, { b: number; }> = todo
	
	assertType<TypeEq<{ a: number, b: number }, Merge<{ a: number; b: string; }, { b: number; }>>>()
	assertType<TypeEq<{ a: number, b: string }, Merge<{ a: number; b: string; }, {}>>>()
} )

test( `Blah`, () => {
	
	
	const date: Date = todo
	
	const merged: Union.Merge<{ a: false } | { a: true, b: true }> = todo
	
	
	const paths: Paths<{ a?: { b?: "" } }> = [ "a", "b" ]
	// const paths2: Paths<{ a?: { b?: "" } }> = [ "a", "bk" ] // should fail
	
	const paths3: Paths<typeof merged> = [ "a" ]
	const paths4: Paths<typeof merged> = [ "b" ]
	
	// const paths5: Paths<{ a: { b: { c: { d: string } | { e: number } } } }> = [ "a", "nope" ] // should fail
	const paths6: Paths<{ a: { b: { c: { d: string } | { e: number } } } }> = [ "a", "b", "c", "d" ]
	const paths7: Paths<{ a: { b: { c: { d: string } | { e: number } } } }> = [ "a", "b", "c", "e" ]
	const paths8: Paths<{ a: false } | { a: true, b: true }> = [ "b" ]
	const paths9: Paths<{ a: false } | { a: true, b: true }> = [ "a" ]
	const paths10: Paths<{ a: { b: string }[] }> = [ "a", 0, "b" ]
	// const paths11: Paths<{ a: { b: string }[] }> = [ "a", 0, "nope" ] // should fail
	
	
	const path1: Path<{ a: string } | { b: number }, [ "b" ]> = todo
	// const path2: Path<{ a: string } | { b: number }, [ "nope" ]> = todo // should fail
	const path3: Path<{ a: { b: string } | { c: number } }, [ "a", "b" ]> = todo
	const path4: Path<{ a: { b: string } | { c: number } }, [ "a", "c" ]> = todo
	// const path5: Path<{ a: { b: string } | { c: number } }, [ "a", "nope" ]> = todo // should fail
	const path6: Path<{ a?: { b: string } | { c?: number } }, [ "a", "c" ]> = todo
} )
// debugType(pretend<{ a: string }>(), pretend<Omit<{ a: string, b: string }, "a">>())

export default undefined
