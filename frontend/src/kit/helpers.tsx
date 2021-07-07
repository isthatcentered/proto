import { ComponentType } from "react"
import { pipe } from "fp-ts/function"
import * as AR from "fp-ts/Array"

export type AnyRecord = Record<any, any>

export type Code<T> = {
	value: T
	label: string
}

export const prop =
	<T extends AnyRecord, K extends keyof T>(key: K) =>
	(record: T): T[K] =>
		record[key]

export const pick =
	<T extends AnyRecord, K extends keyof T>(keys: K[]) =>
	(thing: T): Pick<T, K> =>
		pipe(
			keys,
			AR.reduce({} as Pick<T, K>, (acc, key) => ({
				...acc,
				[key]: thing[key],
			})),
		)

export type ResolveType<T> = T extends PromiseLike<infer U> ? U | T : never

export type Props<T extends ComponentType<any>> = T extends ComponentType<
	infer P
>
	? P
	: never

export const notNil = <T extends any>(value: T): value is NonNullable<T> =>
	value !== undefined && value !== null

export const eq =
	<A extends B, B extends string | number>(expected: A) =>
	(actual: B) =>
		expected === actual
