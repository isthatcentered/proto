import React, { PropsWithChildren } from "react"
import { ErrorMessage, FormikProps, useField } from "formik"
import { Label } from "../forms"
import classNames from "classnames"




export type FieldConnection<T extends string | number> =
	 {
			value: T | undefined,
			name: string,
	 }

export type Field<T extends string | number> = FieldConnection<T> & { label?: string, placeholder?: string, disabled?: boolean }


export const getConnect = <T extends Record<string, any>>( form: FormikProps<T> ) =>
	 <K extends keyof T>( path: K, props?: { value?: T[K] } ): FieldConnection<T[K]> => {
			return {
				 name:  path as string,
				 value: props?.value || form.values[ path ],
			}
	 }


export const RadioGroup = <T extends string | number>( props: PropsWithChildren<FieldConnection<T> & { label: string }> ) => (
	 <fieldset>
			<Label label={props.label}
						 as="legend"
			/>
			
			{props.children}
			
			<FieldError name={props.name}/>
	 </fieldset>)


export const RadioButton = <T extends string | number>( props: PropsWithChildren<Field<T>> ) => {
	 const [ field, meta, helpers ] = useField( { ...props, type: "radio" } )
	 return (
			<label className={classNames(
				 "cursor-pointer leading-tight font-bold flex items-center justify-center py-3 px-4 w-full border-2 rounded-md focus:border-indigo-600 text-center focus-within:border-indigo-600",
				 {
						"border-indigo-600 text-indigo-900 bg-indigo-50": field.checked,
						"border-gray-300 shadow":                         !field.checked,
				 },
			)}
			>
				 <input
						{...field}
						className="sr-only"
						type="radio"
				 />
				 {props.children}
			</label>)
}


export const FieldSubText = ( props: PropsWithChildren<{}> ) => (
	 <p className="text-xs text-gray-700 italic">
			{props.children}
	 </p>
)

export const FieldError = ( props: { name: string } ) =>
	 <ErrorMessage name={props.name}>
			{message =>
				 <div>
						<p className="text-red-500">
							 {message}
						</p>
				 </div>
			}
	 </ErrorMessage>
