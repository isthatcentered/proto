import * as V from "../validation"
import { FormEvent, useState } from "react"
import { constant, identity, pipe } from "fp-ts/lib/function"
import * as R from "fp-ts/Record"
import * as E from "fp-ts/Either"
import * as NEA from "fp-ts/NonEmptyArray"
import { Kinda, prop } from "../helpers"
import * as AR from "fp-ts/Array"


//
// type RekordMapping<T extends AnyRecord> = {
// 	[K in keyof T]: T[K] extends Array<infer A> ? List<A> : (T[K] extends AnyRecord ? Rekord<T[K]> : Field<T[K]>)
// }
//
// type Rekord<T extends AnyRecord> = {
// 	type: "Rekord"
// 	fields: RekordMapping<T>
// 	name: string,
// 	value: Kinda<T>
// }
//
// type List<T> = {
// 	type: "List"
// 	name: string,
// 	value: T[]
// 	elements: FormElement<T>[]
// 	add: () => void
// 	remove: () => void
// 	clear: () => void
// }
//
// type Field<T> = {
// 	type: "Field"
// 	onChange: ( value: T | undefined ) => void
// 	value: T | undefined
// 	name: string
// 	errors?: string[]
// }
//
// type FormElement<T> =
// 	| Rekord<T>
// 	| List<T>
// 	| Field<T>
//
// type FormElementType<T extends FormElementType<any>> =
// 	T extends List<infer L> ?
// 	L[] : (
// 		T extends FormElement<infer V> ? V : never
// 		)
//
//
// const addParentPath = <T extends any>( parentPath: string, element: FormElement<T> ): FormElement<T> => ({
// 	...element,
// 	name: element.name.trim() !== "" ?
// 	      [ parentPath, element.name ].join( "." ) :
// 	      parentPath,
// })

const prependPath = ( newPath: string, currentPath: string | undefined ): string =>
	(currentPath || "").trim() !== "" ?
	[ newPath, currentPath ].join( "." ) :
	newPath


// type Connectable<T extends FormElement<any>> =
// 	T extends FormElement<infer V> ?
// 	( connect: { value: V | undefined, setValue: ( value: V | undefined ) => void, parentName: string } ) => V :
// 	never
//
// type ConnectedType<T extends Connectable<any>> = T extends Connectable<FormElement<infer V>> ? V : never
//
//
// // type RekordMapStruct<T extends Record<string, FormElement<any>>> = { [K in keyof T]: FormElementType<T[K]> }
// export const record = <T extends Record<string, Connectable<FormElement<any>>>>( fields: T ): Connectable<Rekord<{ [K in keyof T]: ConnectedType<T[K]> }>> =>
// 	connect =>
// 		({
// 			type:   "Rekord",
// 			name:   addParentPath( connect.parentName, "" ),
// 			fields: pipe(
// 				fields,
// 				R.mapWithIndex( ( index, field ) => ({
// 					...field( {
// 						parentName: index,
// 						value:      connect.value[ index ],
// 						setValue:   value => connect.setValue( { ...connect.value, [ index ]: value } ),
//
// 					} ),
// 				}) ),
// 			) as Record<keyof T, any>,
// 			value:  connect.value || {} as any,
// 		}) as any
//
// export const field = <T extends any>( schema: V.Validation<T> ): Connectable<Field<T>> => connect => {
// 	const validationResult = schema( null as T )
// 	return {
// 		type:     "Field",
// 		onChange: connect.setValue,
// 		value:    connect.value,
// 		name:     "",
// 		errors:   pipe( validationResult, E.mapLeft( NEA.map( prop( "message" ) ) ), E.foldW( identity, constant( undefined ) ) ),
// 	}
// }



type Primitives = string | number | boolean | null | undefined | Date

type RecordField<T> = {
	_tag: "RecordField",
	fields: {
		[K in keyof T]: T[K] extends Array<infer I> ?
		                ListField<I> : (
			                T[K] extends Primitives ?
			                PrimitiveField<T[K]> :
			                RecordField<T[K]>
			                )
	}
	set: ( value: Partial<Kinda<T>> | undefined ) => void
	clear: () => void,
	empty: boolean
	value: T | undefined
	valid: boolean
}

type ListField<T> = {
	_tag: "ListField",
	elements: (T extends Primitives ? PrimitiveField<T> : RecordField<T>)[]
	value: T[] | undefined
	add: ( value?: T ) => void
	remove: ( at: number ) => void
	clear: () => void
	empty: boolean
	valid: boolean
}

type PrimitiveField<T> = {
	_tag: "PrimitiveField",
	props: {
		onChange: ( value: T | undefined ) => void,
		name: string,
		value: T | undefined
	}
	set: ( value: T | undefined ) => void
	value: T | undefined
	fold: <A, B>( map: { onInvalid: () => A, onValid: ( value: T ) => B } ) => A | B
	errors: string[] | undefined
	valid: boolean
}

type ConnectParams<T> = { value: T | undefined, setValue: ( value: T | undefined ) => void, parentName: string }

type FormField<T> =
	| RecordField<T>
	| ListField<T>
	| PrimitiveField<T>

type RecordStruct<T> = {
	_tag: "RecordStruct",
	connect: ( linked: ConnectParams<T> ) => RecordField<T>
}
type ListStruct<T> = {
	_tag: "ListStruct",
	connect: ( linked: ConnectParams<T[]> ) => ListField<T>
}
type PrimitiveStruct<T> = {
	_tag: "PrimitiveStruct",
	connect: ( linked: ConnectParams<T> ) => PrimitiveField<T>
}

type Structure<T> =
	| RecordStruct<T>
	| ListStruct<T>
	| PrimitiveStruct<T>

type StructType<T extends Structure<any>> =
	T extends ListStruct<infer L> ?
	L[] : (
		T extends Structure<infer V> ? V : never
		)

export const record = <T extends Record<string, Structure<any>>>( struct: T ): RecordStruct<{ [K in keyof T]: StructType<T[K]> }> => ({
	_tag:    "RecordStruct",
	connect: ( link ) => {
		const fields = pipe(
			struct,
			R.mapWithIndex( ( key, field ) =>
				field.connect( {
					value:      (link.value || {} as any)[ key ],
					setValue:   ( value: any ) => link.setValue( { ...link.value, [ key ]: value } as any ),
					parentName: key,
				} ) ),
		)
		return ({
			_tag:   "RecordField",
			set:    values => link.setValue( { ...link.value, ...values } as any ),
			clear:  () => link.setValue( undefined ),
			empty:  link.value === undefined || R.isEmpty( link.value ),
			fields: fields as Record<keyof T, any>,
			value:  link.value,
			valid:  !pipe( fields, R.some( field => field.valid === false ) ),
		})
	},
})

export const list = <T extends any>( struct: Structure<T> ): ListStruct<T> => {
	return {
		_tag:    "ListStruct",
		connect: ( link ) => {
			const elements = pipe(
				link.value || [],
				AR.mapWithIndex( ( index, value ) => struct.connect( {
					value:      value as any,
					parentName: index.toString(),
					setValue:   ( value: any ) => {
						const copy = (link.value || []).concat()
						copy[ index ] = value
						link.setValue( copy )
					},
				} ) ),
			)
			return ({
				_tag:     "ListField",
				value:    link.value,
				elements: elements as any[],
				add:      ( value?: T ) => {
					link.setValue( [ ...(link.value || []), value as any ] )
				},
				clear:    () => {
					link.setValue( [] )
				},
				remove:   at => {
					link.setValue( link.value?.filter( ( _, index ) => index !== at ) )
				},
				empty:    (link.value || []).length === 0,
				valid:    !pipe( elements, AR.some( el => el.valid === false ) ),
			})
		},
	}
}

export const field = <T extends any>( validation: V.Validation<T> ): PrimitiveStruct<T> => {
	return {
		_tag:    "PrimitiveStruct",
		connect: ( link ) => {
			const validationResult = validation( link.value! )
			return ({
				_tag:   "PrimitiveField",
				props:  {
					name:     prependPath( link.parentName, "" ),
					onChange: link.setValue,
					value:    link.value,
				},
				set:    link.setValue,
				value:  link.value,
				fold:   ( map ) => pipe( validationResult, E.foldW( () => map.onInvalid(), map.onValid ) ),
				errors: pipe( validationResult, E.mapLeft( NEA.map( prop( "message" ) ) ), E.foldW( identity, constant( undefined ) ) ),
				valid:  !E.isLeft( validationResult ),
			})
		},
	}
}

export const useForm = <T extends Record<string, Structure<any>>>( config: { struct: T, onSubmit: ( values: { [K in keyof T]: StructType<T[K]> } ) => void, defaultValues?: Partial<{ [K in keyof T]: StructType<T[K]> }> } ) => {
	const [ value, setValue ] = useState( { ...config.defaultValues } as { [K in keyof T]: StructType<T[K]> } )
	const form = record( config.struct ).connect( {
		value,
		setValue:   setValue as ( value: { [K in keyof T]: StructType<T[K]> } | undefined ) => void,
		parentName: "",
	} )
	const isValid = false
	const isPending = false
	const props = {
		onSubmit: ( e: FormEvent<HTMLFormElement> ) => {
			e.preventDefault()
			// isValid ? call
		},
	}
	
	return [
		{
			...form,
			isValid,
			isPending,
			props,
		},
	] as const
}




