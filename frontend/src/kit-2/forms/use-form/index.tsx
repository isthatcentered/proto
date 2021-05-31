import { FormEvent, useEffect, useRef, useState } from "react"
import { AnyRecord, Get, Kinda, MergeUnions, Paths, pick, prop } from "../../helpers"
import * as NEA from "fp-ts/NonEmptyArray"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as AR from "fp-ts/Array"
import * as STR from "fp-ts/string"
import * as V from "../../validation"
import { constant, flow, identity, pipe } from "fp-ts/function"
import { pathOr } from "ramda"
import setPathValue from "./set-path-value"




type FieldProps<T> = {
	name: string,
	value: T | undefined,
	onChange: ( value: T | undefined ) => void
}

type ArrayField<T> = {
	push: ( value?: T ) => void
	remove: ( at: number ) => void
}

export type Field<T> = {
	props: FieldProps<T>
	value: T
	errors: string[] | undefined
	isValid: boolean
	isEmpty: boolean
	fold: <A, B>( map: { onInvalid: () => A, onValid: ( value: T ) => B } ) => A | B
	set: ( value: T | undefined ) => void
	setPartial: ( value: Partial<T> ) => void
	clear: () => void
}



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


const getFieldErrors = ( path: string ) => <T extends any>( result: V.Validated<T> ): string[] =>
	pipe(
		result,
		E.mapLeft(
			flow(
				AR.filter( flow( prop( "path" ), ( p ) => p === path ) ),
				AR.map( prop( "message" ) ),
			),
		),
		E.fold( identity, constant( [] ) ),
	)



const useForm = <TFormValues extends AnyRecord>(
	config: {
		defaultValue: Partial<TFormValues>,
		schema: V.Validation<TFormValues>,
		onSubmit: ( values: TFormValues ) => Promise<void> | void
	},
) => {
	const _fieldsCache = useRef<Record<string, Field<any>>>( {} )
	const [ values, setData ] = useState( config.defaultValue as Kinda<TFormValues> )
	const [ isPending, setIsPending ] = useState<boolean>( false )
	const validation = config.schema( values as TFormValues )
	const failedProps = pipe( validation, getFailedProps )
	const isValid = E.isRight( validation )
	
	console.log( failedProps, validation )
	
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
	
	
	const props = ({
		onSubmit: ( e: FormEvent<HTMLFormElement> ) => {
			e.preventDefault()
			
			setIsPending( true )
		},
	})
	
	const connect = <T extends Paths<MergeUnions<TFormValues>>>( path: T ): Props<Get<MergeUnions<TFormValues>, T>> => {
		const name = path.join( "." )
		return ({
			name,
			value:    pathOr( undefined, path, values ),
			onChange: value => {
				if ( isPending )
					return
				setData( setPathValue( path, value, values ) as TFormValues )
			},
		})
	}
	
	const set = <T extends Paths<MergeUnions<TFormValues>>>( path: T, value: Get<MergeUnions<TFormValues>, T> ): void =>
		setData( setPathValue( path, value, values ) as TFormValues )
	
	const setPartial = <T extends Paths<MergeUnions<TFormValues>>>( path: T, value: Partial<Get<MergeUnions<TFormValues>, T>> ): void =>
		set( path, value as any )
	
	const clear = <T extends Paths<MergeUnions<TFormValues>>>( path: T ): void =>
		set( path, undefined as any )
	
	const validated = <T extends Paths<MergeUnions<TFormValues>>, A, B>( path: T, fold: { onInvalid: () => A, onValid: ( value: Get<MergeUnions<TFormValues>, T> ) => B } ): A | B =>
		failedProps.includes( path.join( "." ) ) ?
		fold.onInvalid() :
		fold.onValid( pathOr( undefined as any, path, values ) )
	
	// collection
	
	const pickValids = <K extends keyof TFormValues>( keys: K[] ): O.Option<Pick<TFormValues, K>> => {
		const requiresInvalidProp = keys.some( key => failedProps.includes( key as string ) )
		return requiresInvalidProp ?
		       O.none :
		       O.some( pipe( values as TFormValues, pick( keys ) ) )
	}
	
	return [ values, { props, isValid, isPending, pickValids, connect, set, setPartial, clear } ] as const
}

type Props<T> = {
	name: string,
	value: T | undefined,
	onChange: ( value: T | undefined ) => void
}
//
// type PathImpl<T, Key extends keyof T> =
// 	Key extends string ?
// 	NonNullable<T[Key]> extends Primitives ? never :
// 	T[Key] extends Record<string, any>
// 	? | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
// 		| `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
// 	: never
// 	                   : never;
//
// type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;
//
// type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;
//
// type PathValue<T, P extends Path<T>> =
// 	P extends `${infer Key}.${infer Rest}`
// 	? Key extends keyof T
// 	  ? Rest extends Path<T[Key]>
// 	    ? PathValue<T[Key], Rest>
// 	    : never
// 	  : never
// 	: P extends keyof T
// 	  ? T[P]
// 	  : never;

export default useForm
