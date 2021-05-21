import { HTMLAttributes } from "react"




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
