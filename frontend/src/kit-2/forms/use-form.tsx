import { FormEvent, useState } from "react"




type AnyRecord = Record<any, any>


export const empty = <T extends any>() => undefined as any as T | undefined

export const optional = <T extends any>() => undefined as any as T | undefined

type InitialFormState<T extends AnyRecord> = {
	[K in keyof T]: T[K] | undefined
}

const useForm = <T extends AnyRecord>(
	config: {
		defaultValue: T, // @todo: Partial<Schema<A, _>>
		onSubmit: ( values: T ) => Promise<void> | void
	},
) => {
	const [ values, setData ] = useState<T>( config.defaultValue )
	const [ state, setState ] = useState<"pristine" | "dirty" | "error" | "valid">( "pristine" )
	
	const field = <K extends keyof T>( name: K ) => {
		return {
			name,
			value:    values[ name ],
			onChange: ( value: T[K] ) => setData( { ...values, [ name ]: value } ),
			// (e: ChangeEvent<HTMLInputElement> ) =>
		}
	}
	
	const form = () => ({
		onSubmit: ( e: FormEvent<HTMLFormElement> ) => {
			e.preventDefault()
			return config.onSubmit
		},
	})
	
	return [ values, state, { form, field } ] as const
}

export default useForm
