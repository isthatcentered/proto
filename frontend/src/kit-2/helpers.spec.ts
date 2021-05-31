import { Test } from "ts-toolbelt"
import { Get, IfElse, MergeUnions, OrElse, Paths } from "./helpers"




const pretend = <T>(): T => null as any

test( `IfElse<Predicate, OnTrue, OnFalse>`, () => {
	Test.checks( [
		Test.check<IfElse<1, "then", "else">, "then", Test.Pass>(),
		Test.check<IfElse<0, "then", "else">, "else", Test.Pass>(),
	] )
} )

test( `OrElse<A, B>`, () => {
	Test.checks( [
		Test.check<OrElse<"value", "default">, "value", Test.Pass>(),
		Test.check<OrElse<"value" | undefined, "default">, "default", Test.Pass>(),
	] )
} )

test( `MergeUnions<T>`, () => {
	Test.checks( [
		// First level union
		Test.check<MergeUnions<{ a: string } | { b: number }>, { a: string, b: number }, Test.Pass>(),
		// Shared keys
		Test.check<MergeUnions<{ a: string } | { a: boolean }>, { a: string | boolean }, Test.Pass>(),
		// Primitives are kept untouched
		Test.check<MergeUnions<Date>, Date, Test.Pass>(),
		Test.check<MergeUnions<Date | number>, Date | number, Test.Pass>(),
		// Object | undefined returns Object
		Test.check<MergeUnions<{ a: string } | undefined>, { a: string }, Test.Pass>(),
		// Nested Union
		//    Array
		Test.check<MergeUnions<({ a: string } | { b: number })[]>, { a: string, b: number }[], Test.Pass>(),
		//    Record
		Test.check<MergeUnions<{ a: { b: string } | { c: number } }>, { a: { b: string, c: number } }, Test.Pass>(),
	] )
} )

// test( `StringPaths<T>`, () => {
// 	// const tryIt: Paths<{ a: string, b: { c: string } }[]> = null as any
//
// 	Test.checks( [
// 		// Primitives are not decomposed
// 		Test.check<Paths<Date>, never, Test.Pass>(),
// 		Test.check<Paths<string>, never, Test.Pass>(),
// 		// Single level object returns all prop names
// 		Test.check<Paths<{ a: string, b: string }>, "a" | "b", Test.Pass>(),
// 		// Nested objects have paths
// 		Test.check<Paths<{ a: { b: string, c: string } }>, "a" | "a.b" | "a.c", Test.Pass>(),
// 		// Arrays are not decomposed
// 		Test.check<Paths<{ a: string }[]>, `${number}.a`, Test.Pass>(),
// 		// Keys are strict
// 		Test.check<`${number}.b`, Paths<{ a: string }[]>, Test.Fail>(),
// 		Test.check<`a.b`, Paths<{ a: string }[]>, Test.Fail>(),
// 	] )
// } )

test( `Paths<T>`, () => {
	Test.checks( [
		// Primitives are not decomposed
		Test.check<Paths<Date>, [], Test.Pass>(),
		Test.check<Paths<string>, [], Test.Pass>(),
		Test.check<Paths<Date[]>, [ number ], Test.Pass>(  ),
		// Test.check<Paths<{ list: Date[] }>, [ "list", number ], Test.Pass>("debug"), // @todo: this should pass
		// Single level object returns all prop names
		Test.check<Required<Paths<{ a: string, b: string }>>, [ "a" ] | [ "b" ], Test.Pass>(),
		// Nested objects have paths
		Test.check<Required<Paths<{ a: { b: string, c: string } }>>, [ "a", "b" ] | [ "a", "c" ], Test.Pass>(),
		// Arrays are not decomposed
		Test.check<Required<Paths<{ a: string }[]>>, [ number, "a" ], Test.Pass>(),
		// Keys are strict
		Test.check<number[], Required<Paths<[]>>, Test.Fail>(), // ts-toolbelt defaults to List<key> when there's an array in the mix
	] )
} )

test( `Path<T, P>`, () => {
	Test.checks( [
		// Empty path returns T
		Test.check<Get<{ a: string }, []>, { a: string }, Test.Pass>(),
		// First level path return type
		Test.check<Get<{ a: string }, [ "a" ]>, string, Test.Pass>(),
		Test.check<Get<{ a: string } | undefined, [ "a" ]>, string | undefined, Test.Pass>(),
		// Reaching non existing path returns never
		Test.check<Get<{ a: string }, [ "b" ]>, never, Test.Pass>(),
		// reaching union
		Test.check<Get<{ a: string } | { b: number }, [ "a" ]>, string, Test.Pass>(),
		Test.check<Get<{ a: string } | { b: number }, [ "b" ]>, number, Test.Pass>(),
		// reaching undefined nested
		Test.check<Get<{ a: string } | undefined, [ "a" ]>, string | undefined, Test.Pass>(),
		Test.check<Get<{ a: { b: string } | undefined }, [ "a", "b" ]>, string, Test.Pass>(), // @todo: this should be string|undefined (MergeUnion removes undefined)
		// reachin array item
		Test.check<Get<{ a: { b: string }[] }, [ "a", 0, "b" ]>, string, Test.Pass>(),
	] )
} )
