import { FormEvent, useEffect, useState } from "react"
import { AnyRecord, Kinda, pick, prop } from "../helpers"
import * as NEA from "fp-ts/NonEmptyArray"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as AR from "fp-ts/Array"
import * as STR from "fp-ts/string"
import * as V from "../validation"
import { constant, flow, identity, pipe } from "fp-ts/function"
import { getPath, setPath } from "./paths"




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

const getFieldProps: {
	<T extends AnyRecord | any[]>( values: T, form: { setData: ( value: any ) => void, isPending: boolean } ): <K extends keyof T, K2 extends keyof T[K], K3 extends keyof T[K][K2]>( keys:[key: K, key2: K2, key3: K3] ) => FieldProps<T[K][K2][K3]>
	<T extends AnyRecord | any[]>( values: T, form: { setData: ( value: any ) => void, isPending: boolean } ): <K extends keyof T, K2 extends keyof T[K]>(keys:[ key: K, key2: K2 ]) => FieldProps<T[K][K2]>
	<T extends AnyRecord | any[]>( values: T, form: { setData: ( value: any ) => void, isPending: boolean } ): <K extends keyof T>( keys:[key: K] ) => FieldProps<T[K]>
} =
	      ( values: AnyRecord | any[], form: { setData: ( value: any ) => void, isPending: boolean } ) => ( keys: any[] ) =>
		      ({
			      name:     keys.join( "." ),
			      value:    getPath( keys, values ),
			      onChange: ( value: any ) => {
				      if ( form.isPending )
					      return
				      form.setData( setPath( keys, value, values ) )
			      },
		      })

const useForm = <TFormValues extends AnyRecord>(
	config: {
		defaultValue: Partial<TFormValues>,
		schema: V.Validation<TFormValues>,
		onSubmit: ( values: TFormValues ) => Promise<void> | void
	},
) => {
	const [ values, setData ] = useState( config.defaultValue as Kinda<TFormValues> )
	const [ isPending, setIsPending ] = useState<boolean>( false )
	const validation = config.schema( values as TFormValues )
	const failedProps = pipe( validation, getFailedProps )
	const isValid = E.isRight( validation )
	
	// console.log( failedProps, validation )
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
	
	const field2 = getFieldProps(values, {isPending, setData})
	
	
	
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
		       O.some( pipe( values as TFormValues, pick( keys ) ) )
	}
	
	return [ values, { props, field, isValid, isPending, pickValids, field2 } ] as const
}

type FieldProps<T> = {
	name: T,
	value: T | undefined,
	onChange: ( value: T | undefined ) => void
}

export default useForm
