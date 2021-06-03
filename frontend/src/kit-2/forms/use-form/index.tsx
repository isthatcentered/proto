import { FormEvent, useEffect, useState } from "react"
import { AnyRecord, DeepKinda, Get, Kinda, MergeUnions, Paths, pick } from "../../helpers"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as AR from "fp-ts/Array"
import * as REC from "fp-ts/Record"
import * as V from "../../validation"
import { constant, identity, pipe, Predicate } from "fp-ts/function"
import { pathOr } from "ramda"
import setPathValue from "./set-path-value"




const bagMonoid = REC.getMonoid( AR.getMonoid<string>() )

const getErrorsLog = ( validated: V.Validated<any> ): Record<string, string[]> =>
	pipe(
		validated,
		E.mapLeft(
			AR.reduce( {} as Record<string, string[]>, ( acc, failure ) =>
				bagMonoid.concat( acc, { [ failure.path ]: [ failure.message ] } ),
			),
		),
		E.fold( identity, constant( {} ) ),
	)


const getFieldErrors = ( log: Record<string, string[]> ) => ( path: (string | number)[] ): string[] => {
	const parentName = path[ path.length - 2 ]
	const name = path.join( "." )
	return [ ...(log[ parentName ] || []), ...(log[ name ] || []) ]
}


const useForm = <TFormValues extends AnyRecord>(
	config: {
		defaultValue: Partial<TFormValues>,
		schema: V.Validation<TFormValues>,
		onSubmit: ( values: TFormValues ) => Promise<void> | void
	},
) => {
	type _TFlattenedValues = MergeUnions<TFormValues>
	type _TFlattenedKindaValues = NonNullable<DeepKinda<MergeUnions<TFormValues>>>
	type _Paths = Paths<_TFlattenedValues>
	const [ values, _setData ] = useState( config.defaultValue as Kinda<_TFlattenedValues> )
	const [ isPending, setIsPending ] = useState<boolean>( false )
	const _fields: Record<string, Field<any>> = {}
	const _invariants: Array<[ Predicate<_TFlattenedKindaValues>, ( value: _TFlattenedKindaValues ) => _TFlattenedKindaValues ]> = []
	const validation = config.schema( values as TFormValues )
	const _errorsLog = getErrorsLog( validation )
	const _getFieldErrors = getFieldErrors( _errorsLog )
	
	const isValid = E.isRight( validation )
	
	console.log( "errors", _errorsLog )
	
	const setData = ( path: (string | number)[], value: any ): void => {
		pipe(
			_invariants,
			AR.reduce(
				setPathValue( path, value, values ),
				( acc, [ predicate, update ] ) =>
					predicate( acc as _TFlattenedKindaValues ) ?
					update( acc as _TFlattenedKindaValues ) as _TFlattenedValues :
					acc,
			),
			_setData,
		)
	}
	
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
	
	const connect = <T extends _Paths>( path: T ): Props<Get<_TFlattenedValues, T>> => {
		const name = path.join( "." )
		return ({
			name,
			value:    pathOr( undefined, path, values ),
			errors:   _errorsLog[ name ] || [],
			onChange: value => {
				if ( isPending )
					return
				setData( path, value )
			},
		})
	}
	
	
	const collection = <T extends any>( field: Field<T[]> | Field<T[] | undefined> ) =>
		({
			isEmpty: !(field.props.value || []).length,
			push:    ( item: Partial<T> ) => setData( field.path, [ ...field.props.value || [], item ] ),
			remove:  ( at: number ) => setData( field.path, (field.props.value || []).filter( ( _, index ) => index !== at ) ),
		})
	
	
	
	const makeField = <T extends any>( path: (string | number)[] ): Field<T> =>
		pipe(
			_fields,
			REC.lookup( path.join( "." ) ),
			O.getOrElse( () => {
					const name = path.join( "." )
					const setValue = ( value: T | undefined ) => setData( path, value )
					const value = pathOr( undefined, path, values ) as T
					const errors = _getFieldErrors( path )
					const isValid = !errors.length
					const nextField = ( key: any ): Field<any> => makeField( [ ...path, key as string | number ] )
					
					
					const field: Field<T> = {
						path,
						value,
						set:       fnOrNextValue => {
							const update = typeof fnOrNextValue === "function" ?
							               (fnOrNextValue as ( currentValue: T ) => T)( value! ) :
							               fnOrNextValue
							setValue( update )
						},
						clear:     () => setValue( undefined ),
						props:     {
							errors,
							value,
							name,
							onChange: setValue,
						},
						isValid,
						field:     nextField,
						force:     nextField,
						validated: fold =>
							           isValid ?
							           fold.onValid( pathOr( undefined as any, path, values ) ) :
							           fold.onInvalid(),
					}
					
					_fields[ name ] = field
					
					return field
				},
			),
		)
	const fields = makeField<TFormValues>( [] )
	
	const invariants = ( rules: typeof _invariants ): void => {
		_invariants.push( ...rules )
	}
	
	const pickValids = <K extends keyof TFormValues>( keys: K[] ): O.Option<Pick<TFormValues, K>> => {
		const requiresInvalidProp = keys.some( key => _getFieldErrors( [ key as string ] ).length )
		return requiresInvalidProp ?
		       O.none :
		       O.some( pipe( values as TFormValues, pick( keys ) ) )
	}
	
	return [ values, { props, isValid, isPending, pickValids, connect, fields, collection, invariants } ] as const
}

type Field<T> = {
	path: (string | number)[]
	props: Props<T>
	value: T
	set: ( value: T | (( currentValue: T ) => T) ) => void
	clear: () => void
	isValid: boolean
	validated: <A, B>( fold: { onInvalid: () => A, onValid: ( value: T ) => B } ) => A | B
	field: <K extends keyof T>( key: K ) => Field<T[K]>
	force: <K extends keyof MergeUnions<T>>( key: K ) => Field<MergeUnions<T>[K]>
}

type Props<T> = {
	name: string,
	errors: string[]
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
