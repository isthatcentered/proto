import { HTMLAttributes } from "react"
import { pipe } from "fp-ts/function"
import * as AR from "fp-ts/Array"




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
