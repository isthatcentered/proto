import { HTMLAttributes } from "react"




type AnyRecord = Record<any, any>

export type ElementProps<T extends AnyRecord, E = HTMLAttributes<HTMLElement>> = T & Omit<E, keyof T>

export type Code<T> = {
	value: T,
	label: string
}
