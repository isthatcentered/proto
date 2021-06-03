import { FormEvent, useEffect, useState } from "react"
import { AnyRecord, DeepKinda, Kinda, MergeUnions, pick } from "../../helpers"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as AR from "fp-ts/Array"
import * as REC from "fp-ts/Record"
import * as V from "../../validation"
import { constant, identity, pipe, Predicate } from "fp-ts/function"
import { pathOr } from "ramda"
import setPathValue from "./set-path-value"
import { FieldProps, FieldStatus } from "../types"




const navigator = <T extends any>( thing: T ): T => {
	const PATH_KEY = "__path"
	
	const _monkeyPatchPath = ( path: (string | number)[] ) => <T extends any>( thing: T ): T => {
		(thing as any).__proto__[ PATH_KEY ] = path
		return thing
	}
	
	const canBeProxied = ( value: any ): boolean => typeof value === "object"
	
	const _builder = ( value: any, path: (string | number)[] ): any =>
		new Proxy( value, {
			
			get: ( target, prop ) => {
				if ( prop === PATH_KEY )
					return path
				
				const propAsNumber = parseInt( prop.toString() )
				const segement = !isNaN( propAsNumber ) ?
				                 propAsNumber :
				                 prop.toString()
				
				const nextValue = target[ prop ] === undefined || target[ prop ] === null ?
				                  "" : // undefined and null cannot be monkey patched. Since in react check are done via &&, it's kind of ok
				                  target[ prop ]
				
				return pipe(
					canBeProxied( nextValue ) ?
					_builder( target[ prop ], [ ...path, segement ] ) :
					nextValue,
					_monkeyPatchPath( [ ...path, segement ] ),
				)
			},
		} )
	
	return _builder( thing, [] )
}



type SetStateFn<T> = ( computeState: (( state: T ) => T) ) => void

// -------------------------------------------------------------------------------------
// Errors
// -------------------------------------------------------------------------------------
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
	const parentName = path.slice( 0, -1 ).join( "." )
	const name = path.join( "." )
	return [ ...(log[ parentName ] || []), ...(log[ name ] || []) ]
}

// -------------------------------------------------------------------------------------
// Statuses
// -------------------------------------------------------------------------------------
const setFieldStatus = ( setLog: SetStateFn<Record<string, FieldStatus>> ) => ( name: string ) => ( status: FieldStatus ): void => {
	setLog( log => ({ ...log, [ name ]: status }) )
}

const getFieldStatus = ( log: Record<string, FieldStatus> ) => ( name: string ): FieldStatus =>
	log[ name ] || "pristine"

// -------------------------------------------------------------------------------------
// Cache
// -------------------------------------------------------------------------------------
class MutableCache<T>
{
	private __store: Record<string, T> = {}
	
	
	get( key: string ): O.Option<T>
	{
		return O.fromNullable( this.__store[ key ] )
	}
	
	
	getOrCreate( key: string, orCreate: ( key: string ) => T ): T
	{
		const match = pipe(
			this.get( key ),
			O.getOrElse( () => orCreate( key ) ),
		)
		this.set( key, match )
		
		return match
	}
	
	
	set( key: string, value: T )
	{
		this.__store[ key ] = value
	}
	
	
	clear( key: string ): void
	{
		this.__store[ key ] = undefined as any
	}
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
	const [ values, _setData ] = useState( config.defaultValue as Kinda<_TFlattenedValues> )
	const [ fieldsStatuses, _setFieldsStatuses ] = useState<Record<string, FieldStatus>>( {} )
	const [ isPending, setIsPending ] = useState<boolean>( false )
	const fieldsCache = new MutableCache<Field<any>>()
	const _fields: Record<string, Field<any>> = {}
	const _invariants: Array<[ Predicate<_TFlattenedKindaValues>, ( value: _TFlattenedKindaValues ) => _TFlattenedKindaValues ]> = []
	const validation = config.schema( values as TFormValues )
	const _errorsLog = getErrorsLog( validation )
	const isValid = E.isRight( validation )
	const utils = {
		setFieldStatus: setFieldStatus( _setFieldsStatuses ),
		getFieldStatus: getFieldStatus( fieldsStatuses ),
		getFieldErrors: getFieldErrors( _errorsLog ),
	}
	
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
	
	// const connectz: {
	// 	<A extends Record<any, any>, K extends keyof A, K2 extends keyof A[K], K3 extends keyof A[K][K2], K4 extends keyof A[K][K2][K3]>( path: [ K, K2, K3, K4 ], a: A ): FieldProps<A[K][K2][K3][K4]>
	// 	<A extends Record<any, any>, K extends keyof A, K2 extends keyof A[K], K3 extends keyof A[K][K2]>( path: [ K, K2, K3 ], a: A ): FieldProps<A[K][K2][K3]>
	// 	<A extends Record<any, any>, K extends keyof A, K2 extends keyof A[K]>( path: [ K, K2 ], a: A ): FieldProps<A[K][K2]>
	// 	<A extends Record<any, any>, K extends keyof A>( path: [ K ], a: A ): FieldProps<A[K]>
	// } = <A extends Record<any, any>>( path: (string | number)[], _a: A ) => {
	// 	const name = path.join( "." )
	// 	return ({
	// 		name,
	// 		value:    pathOr( undefined, path, values ),
	// 		status:   utils.getFieldStatus( name ),
	// 		errors:   _errorsLog[ name ] || [],
	// 		onChange: ( value: any ) => {
	// 			if ( isPending )
	// 				return
	// 			setData( path, value )
	// 		},
	// 	})
	// }
	//
	//
	
	
	const connect: {
		<K extends keyof _TFlattenedValues, K2 extends keyof _TFlattenedValues[K], K3 extends keyof _TFlattenedValues[K][K2], K4 extends keyof _TFlattenedValues[K][K2][K3]>( path: [ K, K2, K3, K4 ] ): FieldProps<_TFlattenedValues[K][K2][K3][K4]>
		<K extends keyof _TFlattenedValues, K2 extends keyof _TFlattenedValues[K], K3 extends keyof _TFlattenedValues[K][K2]>( path: [ K, K2, K3 ] ): FieldProps<_TFlattenedValues[K][K2][K3]>
		<K extends keyof _TFlattenedValues, K2 extends keyof _TFlattenedValues[K]>( path: [ K, K2 ] ): FieldProps<_TFlattenedValues[K][K2]>
		<K extends keyof _TFlattenedValues>( path: [ K ] ): FieldProps<_TFlattenedValues[K]>
	} = ( path: (string | number)[] ) => {
		const name = path.join( "." )
		return ({
			name,
			value:    pathOr( undefined, path, values ),
			status:   utils.getFieldStatus( name ),
			errors:   _errorsLog[ name ] || [],
			onChange: ( value: any ) => {
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
		fieldsCache.getOrCreate(
			path.join( "." ),
			name => {
				const setValue = ( value: T | undefined ) => {
					utils.getFieldStatus( name ) !== "dirty" && utils.setFieldStatus( name )( "dirty" )
					setData( path, value )
				}
				const value = pathOr( undefined, path, values ) as T
				const errors = utils.getFieldErrors( path )
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
						status:   utils.getFieldStatus( name ),
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
		)
	
	const fields = makeField<TFormValues>( [] )
	
	const invariants = ( rules: typeof _invariants ): void => {
		_invariants.push( ...rules )
	}
	
	const pickValids = <K extends keyof TFormValues>( keys: K[] ): O.Option<Pick<TFormValues, K>> => {
		const requiresInvalidProp = keys.some( key => utils.getFieldErrors( [ key as string ] ).length )
		return requiresInvalidProp ?
		       O.none :
		       O.some( pipe( values as TFormValues, pick( keys ) ) )
	}
	
	return [  values, { props, isValid, isPending, pickValids, connect, fields, collection, invariants } ] as const
}

type Field<T> = {
	path: (string | number)[]
	props: FieldProps<T>
	value: T
	set: ( value: T | (( currentValue: T ) => T) ) => void
	clear: () => void
	isValid: boolean
	validated: <A, B>( fold: { onInvalid: () => A, onValid: ( value: T ) => B } ) => A | B
	field: <K extends keyof T>( key: K ) => Field<T[K]>
	force: <K extends keyof MergeUnions<T>>( key: K ) => Field<MergeUnions<T>[K]>
}



export default useForm
