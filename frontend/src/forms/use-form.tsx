import { useState } from "react"




type AnyRecord = Record<any, any>


export const empty = <T extends any>() => undefined as any as T | undefined

export const optional = <T extends any>() => undefined as any as T | undefined

type InitialFormState<T extends AnyRecord> = {
	[K in keyof T]: T[K] | undefined
}

const useForm = <T extends AnyRecord>(
	defaultValue: T,
) => {
	const [ values, setData ] = useState<T>( defaultValue )
	
	const getField = <K extends keyof T>( name: K ) => {
		return {
			name,
			value:    values[ name ],
			onChange: ( value: T[K] ) => setData( { ...values, [ name ]: value } ),
			// (e: ChangeEvent<HTMLInputElement> ) =>
		}
	}
	
	return [ values, getField ] as const
}

export default useForm
