import React, { ChangeEvent, ComponentType, InputHTMLAttributes, PropsWithChildren } from "react"
import { ErrorMessage, FormikProps, useField } from "formik"
import classNames from "classnames"
import cn from "classnames"
import * as REMOTE from "../remote"
import { Code } from "../helpers"
import { Grid } from "../shared"



// Formik only works with string | numbers, nothing fancier. Hence this constraint
type Connectable = string | number

export type FieldConnection<T extends Connectable> =
	 {
			value: T | undefined,
			name: string,
	 }

type ConnectOverrides<T> = {
	 value?: T
}

type ConnectReturn<T> = T extends Connectable ? FieldConnection<T> : never

interface ConnectFn<T>
{
	 <K extends keyof T, K2 extends keyof T[K], K3 extends keyof T[K][K2]>( path: [ K, K2, K3 ], overrides?: ConnectOverrides<T[K][K2][K3]> ): ConnectReturn<T[K][K2][K3]>
	 
	 <K extends keyof T, K2 extends keyof T[K]>( path: [ K, K2 ], overrides?: ConnectOverrides<T[K][K2]> ): ConnectReturn<T[K][K2]>
	 
	 <K extends keyof T>( path: K, overrides?: ConnectOverrides<T[K]> ): ConnectReturn<T[K]>
}


const makeFieldName = ( path: (string | number)[] ): string => {
	 const dottedPath = path.map( segement =>
				 typeof segement === "number" ?
				 `[${segement}]` :
				 segement,
			)
			.join( "." ) // a.[0].b
	 
	 return dottedPath.replace( ".[", "[" ).replace( "].", "]" ) // // a[0]b
}

export const getConnect = <T extends Record<string, any>>( form: FormikProps<T> ): ConnectFn<T> =>
	 ( path: string | number | (string | number)[], props: ConnectOverrides<any> = {} ): any => {
			return {
				 name:  makeFieldName( [ path ].flat() ),
				 value: props.value || form.values[ path as any ],
			}
	 }


export const Label = ( { label, children, as, ...props }: PropsWithChildren<{ label: string, as?: ComponentType | string, disabled: boolean, className?: string }> ) => {
	 const Tag = as || "label" as any
	 
	 return <Tag {...props} className={classNames( "block", props.className, { "text-gray-300": props.disabled } )}>
			<span className="block font-medium mb-4">{label}</span>
			{children}
	 </Tag>
}

type RadioSelectProps<T extends Connectable> =
	 
	 {
			data: REMOTE.Remote<any, Code<T>[]>,
			children: ( data: Code<T>[], props: { name: string, disabled?: boolean } ) => any
			disabled?: boolean
			label: string
			className?: string
	 }

export const RadioSelect = <T extends Connectable>( props: RadioSelectProps<T> & FieldConnection<T> ) => {
	 const disabled = props.disabled || !REMOTE.isSuccess( props.data )
	 return (
			<RadioGroup
				 label={props.label}
				 name={props.name}
				 className={props.className}
				 disabled={disabled}
			>
				 {REMOTE.isSuccess( props.data ) ?
					props.children( props.data.value, { name: props.name, disabled: props.disabled } ) :
					<FieldPlaceholder state={props.data.type}/>}
			</RadioGroup>)
}


export const RadioGroup = <T extends Connectable>( props: PropsWithChildren<{ name: string, label: string, disabled?: boolean, className?: string }> ) => (
	 <fieldset className={props.className}>
			<Label label={props.label}
						 disabled={props.disabled || false}
						 as="legend"
			/>
			
			{props.children}
			
			<FieldError name={props.name}/>
	 </fieldset>)


type RadioProps<T extends Connectable> = PropsWithChildren<FieldConnection<T>> & { disabled?: boolean, onChange?: ( value: T ) => void }

export const RadioButton = <T extends Connectable>( { onChange, ...props }: RadioProps<T> ) => {
	 const [ field, meta, helpers ] = useField( { ...props, type: "radio" } )
	 const handleChange             = ( e: ChangeEvent<HTMLInputElement> ) =>
			onChange ?
			onChange( e.target.value as T ) :
			field.onChange( e )
	 
	 return (
			<label
				 className={classNames(
						"cursor-pointer leading-tight font-bold flex items-center justify-center py-3 px-4 w-full border-2 rounded-md focus:border-indigo-600 text-center focus-within:border-indigo-600",
						{
							 "border-indigo-600 text-indigo-900 bg-indigo-50": field.checked,
							 "border-gray-300 shadow-sm":                      !field.checked,
							 "bg-gray-50 border-none text-gray-200":           props.disabled,
						},
				 )}
			>
				 <input
						{...field}
						onChange={handleChange}
						disabled={props.disabled}
						className="sr-only"
						type="radio"
				 />
				 {props.children}
			</label>)
}

export const CheckableRadio2 = <T extends Connectable>( { onChange, ...props }: RadioProps<T> ) => {
	 const [ field, meta, helpers ] = useField( { ...props, type: "radio" } )
	 const handleChange             = ( e: ChangeEvent<HTMLInputElement> ) =>
			onChange ?
			onChange( e.target.value as T ) :
			field.onChange( e )
	 
	 return (<label className="ListRadio flex items-center">
			<input
				 {...field}
				 onChange={handleChange}
				 disabled={props.disabled}
				 className="sr-only"
				 type="radio"
			/>
			<div className="mr-3">
				 <div className="ListRadio-radio w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
						{field.checked && <div className="w-2 h-2 rounded-full bg-indigo-600"/>}
				 </div>
			</div>
			{props.children}
	 </label>)
}


export const YesNo2 = ( { onChange, ...props }: { label: string, className?: string } & RadioProps<"true" | "false"> ) => (
	 <RadioGroup {...props}>
			<Grid cols={2}>
				 <RadioButton
						value="true"
						name={props.name}
						disabled={props.disabled}
						onChange={onChange}
						children="Oui"
				 />
				 <RadioButton
						value="false"
						name={props.name}
						disabled={props.disabled}
						onChange={onChange}
						children="Non"
				 />
			</Grid>
	 </RadioGroup>)

export const FieldPlaceholder = ( props: { state: REMOTE.Remote<any, any>["type"] } ) => {
	 return <div
			className={cn(
				 `bg-gray-50 text-transparent py-2 rounded-md h-10 shadow-sm`,
				 { "animate-pulse": props.state === "pending" },
			)}
	 />
}

export const Select2 = <T extends Connectable>( props: PropsWithChildren<FieldConnection<T> & { data: REMOTE.Remote<any, Code<T>[]>, label: string, disabled?: boolean, className?: string }> ) => {
	 const [ field, meta, helpers ] = useField( { ...props } )
	 const disabled                 = props.disabled || !REMOTE.isSuccess( props.data )
	 const pending                  = REMOTE.isPending( props.data )
	 return (
			<Label
				 label={props.label}
				 disabled={disabled}
				 className={props.className}
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

export const Input2 = <T extends number | string>( { className, ...props }: FieldConnection<T> & InputHTMLAttributes<HTMLInputElement> & { label: string, className?: string } ) => {
	 const [ field, meta, helpers ] = useField( { ...props } )
	 return (
			<Label
				 label={props.label}
				 disabled={props.disabled || false}
				 className={className}
			>
				 <input
						{...props}
						{...field}
						value={field.value || ""}
						className={classNames(
							 "py-2 h-10 px-3 w-full sm:text-sm rounded-md border-2 focus:border-indigo-500 block shadow-sm border-gray-300 outline-none focus:text-indigo-800 cursor-text",
							 {
									"border-none bg-gray-50": props.disabled,
							 },
						)}
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
