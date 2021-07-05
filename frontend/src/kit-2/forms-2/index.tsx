import React, { ComponentType, InputHTMLAttributes, PropsWithChildren } from "react"
import { ErrorMessage, FormikProps, useField } from "formik"
import classNames from "classnames"
import cn from "classnames"
import * as REMOTE from "../remote"
import { Code } from "../helpers"




export type FieldConnection<T extends string | number> =
	 {
			value: T | undefined,
			name: string,
	 }


export const getConnect = <T extends Record<string, any>>( form: FormikProps<T> ) =>
	 <K extends keyof T>( path: K, props?: { value?: T[K] } ): FieldConnection<T[K]> => {
			return {
				 name:  path as string,
				 value: props?.value || form.values[ path ],
			}
	 }



export const Label = ( { label, children, as, ...props }: PropsWithChildren<{ label: string, as?: ComponentType | string, disabled: boolean }> ) => {
	 const Tag = as || "label" as any
	 
	 return <Tag {...props} className={classNames( "block", { "text-gray-300": props.disabled } )}>
			<span className="block font-medium mb-4">{label}</span>
			{children}
	 </Tag>
}

type RadioSelectProps<T extends string | number> = {
	 data: REMOTE.Remote<any, Code<T>[]>,
	 wrapper: ( props: PropsWithChildren<{}> ) => any
	 component: ( props: PropsWithChildren<FieldConnection<T>> ) => any
	 disabled?: boolean
	 label: string
}
export const RadioSelect = <T extends string | number>( props: RadioSelectProps<T> & FieldConnection<T> ) => {
	 const disabled = props.disabled || !REMOTE.isSuccess( props.data )
	 const Radio    = props.component
	 const Wrapper  = props.wrapper
	 return (
			<RadioGroup
				 label={props.label}
				 name={props.name}
				 disabled={disabled}
			>
				 {REMOTE.isSuccess( props.data ) ?
					<Wrapper>
						 {props.data.value.map( code =>
								<Radio
									 key={code.value}
									 value={code.value}
									 name={props.name}
									 children={code.label}
								/> )}
					</Wrapper> :
					<FieldPlaceholder state={props.data.type}/>}
			</RadioGroup>)
}



export const RadioGroup = <T extends string | number>( props: PropsWithChildren<{ name: string, label: string, disabled?: boolean }> ) => (
	 <fieldset>
			<Label label={props.label}
						 disabled={props.disabled || false}
						 as="legend"
			/>
			
			{props.children}
			
			<FieldError name={props.name}/>
	 </fieldset>)


export const RadioButton = <T extends string | number>( props: PropsWithChildren<FieldConnection<T>> ) => {
	 const [ field, meta, helpers ] = useField( { ...props, type: "radio" } )
	 return (
			<label
				 className={classNames(
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

export const FieldPlaceholder = ( props: { state: REMOTE.Remote<any, any>["type"] } ) => {
	 return <div
			className={cn(
				 `bg-gray-50 text-transparent py-2 rounded-md h-10`,
				 { "animate-pulse": props.state === "pending" },
			)}
	 />
}

export const Select2 = <T extends string | number>( props: PropsWithChildren<FieldConnection<T> & { data: REMOTE.Remote<any, Code<T>[]>, label: string, disabled?: boolean }> ) => {
	 const [ field, meta, helpers ] = useField( { ...props } )
	 const disabled                 = props.disabled || !REMOTE.isSuccess( props.data )
	 const pending                  = REMOTE.isPending( props.data )
	 return (
			<Label
				 label={props.label}
				 disabled={disabled}
			>
				 {REMOTE.isSuccess( props.data ) ?
					<select
						 {...field}
						 disabled={disabled}
						 style={{
								backgroundImage:    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
								backgroundPosition: "right .5rem center",
								backgroundRepeat:   "no-repeat",
								backgroundSize:     "1.5em 1.5em",
						 }}
						 className={
								classNames(
									 "appearance-none block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
									 {
											"bg-gray-50":               disabled,
											"animate-pulse bg-gray-50": pending,
									 },
								)
						 }
					>
						 <option value="">-</option>
						 {REMOTE.isSuccess( props.data ) && props.data.value.map( code =>
								<option key={code.value}
												value={code.value}
								>
									 {code.label}
								</option>,
						 )}
					</select> :
					<FieldPlaceholder state={props.data.type}/>}
			
			</Label>
	 )
}

export const Input2 = <T extends number | string>( props: FieldConnection<T> & InputHTMLAttributes<HTMLInputElement> & { label: string } ) => {
	 const [ field, meta, helpers ] = useField( { ...props } )
	 return (
			<Label
				 label={props.label}
				 disabled={props.disabled || false}
			>
				 <input
						{...field}
						value={field.value || ""}
						className={"py-2 px-3 w-full sm:text-sm rounded-md border-2 focus:border-indigo-500 block shadow-sm border-gray-300 outline-none focus:text-indigo-800 cursor-text"}
				 />
				 <FieldError name={props.name}/>
			</Label>)
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
