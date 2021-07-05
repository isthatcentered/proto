import { FormEvent, useEffect, useState } from "react"
import { AnyRecord, ArrayProps, DeepKinda, MergeUnions, pick } from "../../helpers"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as AR from "fp-ts/Array"
import * as REC from "fp-ts/Record"
import * as V from "../../validation"
import { constant, identity, pipe, Predicate } from "fp-ts/function"
import { pathOr } from "ramda"
import setPathValue from "./set-path-value"
import { FieldProps, FieldStatus } from "../types"
import * as TPL from "fp-ts/Tuple"




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
				bagMonoid.concat( acc, { [ failure.path.join( "." ) ]: [ failure.message ] } ),
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
		defaultValue?: Partial<TFormValues>,
		schema: V.Validation<TFormValues>,
		onSubmit: ( values: TFormValues ) => Promise<void> | void
	},
) => {
	type _TFlattenedValues = MergeUnions<TFormValues>
	type _TKindaValues = NonNullable<DeepKinda<TFormValues>>
	const [ values, _setData ] = useState<_TKindaValues>( (config.defaultValue || {}) as _TKindaValues )
	const [ fieldsStatuses, _setFieldsStatuses ] = useState<Record<string, FieldStatus>>( {} )
	const [ isPending, setIsPending ] = useState<boolean>( false )
	const fieldsCache = new MutableCache<Field<any>>()
	const _fields: Record<string, Field<any>> = {}
	const _invariants: Array<[ Predicate<_TKindaValues>, ( value: _TKindaValues ) => _TKindaValues ]> = []
	const validation = V.run( config.schema, values as TFormValues )
	const _errorsLog = getErrorsLog( validation )
	const isValid = E.isRight( validation )
	const utils = {
		setFieldStatus: setFieldStatus( _setFieldsStatuses ),
		getFieldStatus: getFieldStatus( fieldsStatuses ),
		getFieldErrors: getFieldErrors( _errorsLog ),
	}
	
	
	const setData = ( path: (string | number)[], value: any ): void => {
		pipe(
			_invariants,
			AR.reduce(
				setPathValue( path, value, values ),
				( acc, [ predicate, update ] ) =>
					predicate( acc ) ?
					update( acc ) :
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
	
	
	
	const connect: {
		<K extends keyof _TFlattenedValues, K2 extends keyof _TFlattenedValues[K], K3 extends keyof _TFlattenedValues[K][K2], K4 extends keyof _TFlattenedValues[K][K2][K3]>( path: [ K, K2, K3, K4 ], overrides?: {
			onChange?: ( value: _TFlattenedValues[K][K2][K3][K4] ) => void
		} ): FieldProps<_TFlattenedValues[K][K2][K3][K4]>
		<K extends keyof _TFlattenedValues, K2 extends keyof _TFlattenedValues[K], K3 extends keyof _TFlattenedValues[K][K2]>( path: [ K, K2, K3 ], overrides?: {
			onChange?: ( value: _TFlattenedValues[K][K2][K3] ) => void
		} ): FieldProps<_TFlattenedValues[K][K2][K3]>
		<K extends keyof _TFlattenedValues, K2 extends keyof _TFlattenedValues[K]>( path: [ K, K2 ], overrides?: {
			onChange?: ( value: _TFlattenedValues[K][K2] ) => void
		} ): FieldProps<_TFlattenedValues[K][K2]>
		<K extends keyof _TFlattenedValues>( path: [ K ], overrides?: {
			onChange?: ( value: _TFlattenedValues[K] ) => void
		} ): FieldProps<_TFlattenedValues[K]>
	} = ( path: (string | number)[], overrides?: {
		onChange?: ( value: any ) => void
	} ) => {
		const name = path.join( "." )
		const status = utils.getFieldStatus( name )
		const setValue = ( value: any | undefined ) => {
			if ( isPending )
				return
			status === "pristine" && utils.setFieldStatus( name )( "dirty" )
			overrides?.onChange ?
			overrides.onChange( value ) :
			setData( path, value )
		}
		const value = pathOr( undefined, path, values )
		const errors = utils.getFieldErrors( path )
		
		return ({
			name,
			value,
			status,
			errors,
			onChange: setValue,
		})
	}
	
	const collection = <K extends keyof ArrayProps<TFormValues>>( path: [ K ] ): CollectionUtils<TFormValues[K][number]> => {
		type _ItemType = TFormValues[K][number]
		const field = connect( path as any ) as any as FieldProps<_ItemType[]>
		const as = field.value || []
		const _setData = ( value: _ItemType[] ) => setData( path as string[], value )
		return {
			isEmpty: !field.value || !field.value.length,
			isValid: true, // @todo: should be false if any sub field is invalid
			clear:   () => _setData( [] ),
			push:    ( item: any ) => _setData( [ ...as, item ] ),
			set:     ( at: number, value: _ItemType ) => _setData( as.map( ( item, index ) => index === at ?
			                                                                                  value :
			                                                                                  item ) ),
			remove:  ( at: number ) => _setData( as.filter( ( _, index ) => index !== at ) ),
		}
	}
	
	
	// @todo: remove and use connect(...path) like methods
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
	
	const rules = <K extends keyof _TFlattenedValues>( path: K, rules: Array<[ Predicate<Partial<_TFlattenedValues[K]>>, ( value: _TKindaValues[K] ) => _TKindaValues[K] ]> ) => {
		const fieldInvariantsAsGlobalInvariants: typeof _invariants = pipe(
			rules,
			AR.map( TPL.bimap( setter => values => ({
				...values,
				[ path ]: setter( values[ path ] ),
			}), predicate => values => predicate( values[ path ] ) ) ),
		)
		_invariants.push( ...fieldInvariantsAsGlobalInvariants )
	}
	
	const pickValids = <K extends keyof TFormValues>( keys: K[] ): O.Option<Pick<TFormValues, K>> => {
		const requiresInvalidProp = keys.some( key => utils.getFieldErrors( [ key as string ] ).length )
		return requiresInvalidProp ?
		       O.none :
		       O.some( pipe( values as TFormValues, pick( keys ) ) )
	}
	
	const set: {
		<K extends keyof TFormValues>( path: [ K ], value: TFormValues[K] ): void
		( value: _TKindaValues ): void
	} = ( ...args: any[] ): void =>
		args.length === 2 ?
		setData( args[ 0 ] as string[], args[ 1 ] ) :
		setData( [], args[ 0 ] )
	
	return [ values, { props, isValid, isPending, pickValids, connect, fields, collection, invariants, values: values as _TKindaValues, rules, set } ] as const
}

type CollectionUtils<T> = {
	isEmpty: boolean,
	isValid: boolean
	clear: () => void
	push: ( item: T ) => void,
	remove: ( at: number ) => void,
	set: ( at: number, value: T ) => void
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
