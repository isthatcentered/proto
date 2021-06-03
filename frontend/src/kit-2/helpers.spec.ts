import { Test } from "ts-toolbelt"
import { Get, IfElse, MergeUnions, OrElse, Paths } from "./helpers"




const pretend = <T>(): T => null as any
const checks: typeof Test.checks = () => null as any // cannot get prop "checks" of undefined otherwise
const check: typeof Test.check = () => null as any   // cannot get prop "check" of undefined otherwise

test( `IfElse<Predicate, OnTrue, OnFalse>`, () => {
	checks( [
		check<IfElse<1, "then", "else">, "then", Test.Pass>(),
		check<IfElse<0, "then", "else">, "else", Test.Pass>(),
	] )
} )

test( `OrElse<A, B>`, () => {
	checks( [
		check<OrElse<"value", "default">, "value", Test.Pass>(),
		check<OrElse<"value" | undefined, "default">, "default", Test.Pass>(),
	] )
} )

test( `MergeUnions<T>`, () => {
	checks( [
		// First level union
		check<MergeUnions<{ a: string } | { b: number }>, { a: string, b: number }, Test.Pass>(),
		// Shared keys
		check<MergeUnions<{ a: string } | { a: boolean }>, { a: string | boolean }, Test.Pass>(),
		// Primitives are kept untouched
		check<MergeUnions<Date>, Date, Test.Pass>(),
		check<MergeUnions<Date | number>, Date | number, Test.Pass>(),
		// Object | undefined returns Object
		check<MergeUnions<{ a: string } | undefined>, { a: string }, Test.Pass>(),
		// Nested Union
		//    Array
		check<MergeUnions<({ a: string } | { b: number })[]>, { a: string, b: number }[], Test.Pass>(),
		//    Record
		check<MergeUnions<{ a: { b: string } | { c: number } }>, { a: { b: string, c: number } }, Test.Pass>(),
	] )
} )


// test( `MatchDiscriminatedUnion<T>`, () => {
// 	type MatchDiscriminatedUnion<T extends Record<any, any>, K extends keyof T> = { [P in `on${Capitalize<string & T[K]>}`]: T extends { [P in Pick<T, K> as string]: T[K] } ? T : never }
// 	// const tryIt: Paths<{ a: string, b: { c: string } }[]> = null as any
//
// 	checks( [
// 		// Primitives are not decomposed
// 		check<MatchDiscriminatedUnion<{ a: "left", b: string } | { a: "right", c: number }, "a">, never, Test.Pass>( "debug" ),
// 	] )
// } )

// test( `StringPaths<T>`, () => {
// 	// const tryIt: Paths<{ a: string, b: { c: string } }[]> = null as any
//
// 	checks( [
// 		// Primitives are not decomposed
// 		check<Paths<Date>, never, Test.Pass>(),
// 		check<Paths<string>, never, Test.Pass>(),
// 		// Single level object returns all prop names
// 		check<Paths<{ a: string, b: string }>, "a" | "b", Test.Pass>(),
// 		// Nested objects have paths
// 		check<Paths<{ a: { b: string, c: string } }>, "a" | "a.b" | "a.c", Test.Pass>(),
// 		// Arrays are not decomposed
// 		check<Paths<{ a: string }[]>, `${number}.a`, Test.Pass>(),
// 		// Keys are strict
// 		check<`${number}.b`, Paths<{ a: string }[]>, Test.Fail>(),
// 		check<`a.b`, Paths<{ a: string }[]>, Test.Fail>(),
// 	] )
// } )


test( `Paths<T>`, () => {
	checks( [
		// Primitives are not decomposed
		check<Paths<Date>, [], Test.Pass>(),
		check<Paths<string>, [], Test.Pass>(),
		check<Paths<Date[]>, [ number ], Test.Pass>(),
		// check<Paths<{ list: Date[] }>, [ "list", number ], Test.Pass>("debug"), // @todo: this should pass
		// Single level object returns all prop names
		check<Required<Paths<{ a: string, b: string }>>, [ "a" ] | [ "b" ], Test.Pass>(),
		// Nested objects have paths
		check<Required<Paths<{ a: { b: string, c: string } }>>, [ "a", "b" ] | [ "a", "c" ], Test.Pass>(),
		// Arrays are not decomposed
		check<Required<Paths<{ a: string }[]>>, [ number, "a" ], Test.Pass>(),
		// Keys are strict
		check<number[], Required<Paths<[]>>, Test.Fail>(), // ts-toolbelt defaults to List<key> when there's an array in the mix
	] )
} )

test( `Path<T, P>`, () => {
	checks( [
		// Empty path returns T
		check<Get<{ a: string }, []>, { a: string }, Test.Pass>(),
		// First level path return type
		check<Get<{ a: string }, [ "a" ]>, string, Test.Pass>(),
		check<Get<{ a: string } | undefined, [ "a" ]>, string | undefined, Test.Pass>(),
		// Reaching non existing path returns never
		check<Get<{ a: string }, [ "b" ]>, never, Test.Pass>(),
		// reaching union
		check<Get<{ a: string } | { b: number }, [ "a" ]>, string, Test.Pass>(),
		check<Get<{ a: string } | { b: number }, [ "b" ]>, number, Test.Pass>(),
		// reaching undefined nested
		check<Get<{ a: string } | undefined, [ "a" ]>, string | undefined, Test.Pass>(),
		check<Get<{ a: { b: string } | undefined }, [ "a", "b" ]>, string, Test.Pass>(), // @todo: this should be string|undefined (MergeUnion removes undefined)
		// reachin array item
		check<Get<{ a: { b: string }[] }, [ "a", 0, "b" ]>, string, Test.Pass>(),
	] )
} )

