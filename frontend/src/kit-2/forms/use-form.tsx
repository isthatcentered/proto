import { FormEvent, useEffect, useState } from "react"
import { AnyRecord, Kinda, pick, prop } from "../helpers"
import * as NEA from "fp-ts/NonEmptyArray"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as AR from "fp-ts/Array"
import * as STR from "fp-ts/string"
import * as V from "../validation"
import { constant, flow, identity, pipe } from "fp-ts/function"




const getFailedProps = <T extends any>( result: V.Validated<T> ): string[] =>
	pipe(
		result,
		E.mapLeft(
			flow(
				NEA.map( prop( "path" ) ),
				AR.uniq( STR.Eq ),
			),
		),
		E.fold( identity, constant( [] ) ),
	)


const useForm = <TFormValues extends AnyRecord, TValidatedValues extends Record<keyof TFormValues, any>>(
	config: {
		defaultValue: Partial<TFormValues>,
		schema: V.Validation<TValidatedValues, TFormValues>,
		onSubmit: ( values: TValidatedValues ) => Promise<void> | void
	},
) => {
	const [ values, setData ] = useState( config.defaultValue as Kinda<TFormValues> )
	const [ isPending, setIsPending ] = useState<boolean>( false )
	const validation = config.schema( values as TFormValues )
	const failedProps = pipe( validation, getFailedProps )
	const isValid = E.isRight( validation )
	
	console.log( failedProps )
	useEffect( () => {
		if ( !isPending )
			return
		
		let mounted = true
		Promise.resolve( validation )
			.then(
				E.foldW(
					() => null,
					config.onSubmit,
				),
			)
			.finally( () => mounted && setIsPending( false ) )
		
		return () => {
			mounted = false
		}
	}, [ isPending ] )
	
	const field = <K extends keyof TFormValues>( name: K ) => ({
		name,
		value:    values[ name ],
		onChange: ( value: TFormValues[K] | undefined ) => {
			if ( isPending )
				return
			setData( { ...values, [ name ]: value } )
		},
	})
	
	const props = ({
		onSubmit: ( e: FormEvent<HTMLFormElement> ) => {
			e.preventDefault()
			
			setIsPending( true )
		},
	})
	
	const pickValids = <K extends keyof TFormValues>( keys: K[] ): O.Option<Pick<TFormValues, K>> => {
		const requiresInvalidProp = keys.some( key => failedProps.includes( key as string ) )
		return requiresInvalidProp ?
		       O.none :
		       O.some( pipe( values as TValidatedValues, pick( keys ) ) )
	}
	
	return [ values, { props, field, isValid, isPending, pickValids } ] as const
}

export default useForm
