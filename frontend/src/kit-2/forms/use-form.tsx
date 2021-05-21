import { FormEvent, useEffect, useState } from "react"
import * as yup from "yup"
import { BaseSchema } from "yup"
import { Kinda } from "../helpers"




export const empty = <T extends any>() => undefined as any as T | undefined

export const optional = <T extends any>() => undefined as any as T | undefined

type Values<TSchema extends BaseSchema> = yup.InferType<TSchema>

const useForm = <TSchema extends BaseSchema>(
	config: {
		defaultValue: Partial<Values<TSchema>>,
		schema: TSchema,
		onSubmit: ( values: Values<TSchema> ) => Promise<void> | void
	},
) => {
	const [ values, setData ] = useState( config.defaultValue as Kinda<Values<TSchema>> )
	const [ state, setState ] = useState<"valid" | "invalid" | "pending">( "invalid" )
	
	const field = <K extends keyof Values<TSchema>>( name: K ) => {
		return {
			name,
			value:    values[ name ],
			onChange: ( value: Values<TSchema>[K] | undefined ) => setData( { ...values, [ name ]: value } ),
		}
	}
	
	useEffect( () => {
		let isCurrentEffect = true
		config.schema.isValid( values, { abortEarly: true } )
			.then( isValid => {
					if ( !isCurrentEffect ) {
						console.log( "abort" )
						return
					}
					setState(
						isValid ?
						"valid" :
						"invalid",
					)
				},
			)
		return () => {
			isCurrentEffect = false
		}
	}, [ values ] )
	
	const form = ({
		onSubmit: ( e: FormEvent<HTMLFormElement> ) => {
			e.preventDefault()
			config.schema.validate( values, { abortEarly: false } )
				.then( values => {
					console.log( "valid", values )
					return config.onSubmit( values )
				} )
				.then( () => {
				
				} )
				.catch( err => {
					console.log( err.inner )
				} )
			
		},
	})
	
	// keep a ref record of all valid fields on prev validation
	// if all the fields asked for are valid, return them
	// orElse(() => B)
	const pickValids = <K extends keyof Values<TSchema>>( _keys: K[] ): Pick<Values<TSchema>, K> => {
		return {} as any
	}
	
	return [ values, state, { form, field } ] as const
}

export default useForm
