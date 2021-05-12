import React, { ComponentType, HTMLAttributes, InputHTMLAttributes } from "react"
import { flow, pipe } from "fp-ts/function"
import classNames from "classnames"
import useForm from "./use-form"
import { identity } from "fp-ts/lib/function"



type AnyRecord = Record<any, any>
type ElementProps<T extends AnyRecord, E = HTMLAttributes<HTMLElement>> = T & Omit<E, keyof T>

// const omit = <T extends AnyRecord, K extends keyof T>(keys: K[]) => (thing: T): Omit<T, K> =>


export { useForm }

const defaultTo = <T extends any>( defaultValue: T ) => ( actual: T | undefined ) => actual ?? defaultValue

export const Label = ( { label, children, as, ...props }: ElementProps<{ label: string, as?: ComponentType | string }> ) => {
	const Tag = as || "label" as any
	
	return <Tag {...props} className={classNames( "block", props.className )}>
		<span className="block mb-1 text-sm font-medium text-gray-700 mb-2">{label}</span>
		{children}
	</Tag>
}


type InputProps<T> = ElementProps<{
	onChange: ( value: T ) => void,
	value: T | undefined
	decodeValue: ( value: string ) => T,            // go from input value to desired type
	encodeValue: ( value: T | undefined ) => string // go from your type to input value
}, InputHTMLAttributes<HTMLInputElement>>

export const Input = <T extends any>( { encodeValue, decodeValue, ...props }: InputProps<T> ) =>
	<input
		{...props}
		className={classNames( "py-2 px-3 w-full sm:text-sm rounded-md border focus:border-2 focus:border-indigo-500 block shadow-sm border-gray-300 outline-none focus:ring-1 focus:ring-indigo-500 focus:text-indigo-800", props.className )}
		value={encodeValue( props.value )}
		onChange={e => pipe( e.target.value, decodeValue, props.onChange )}
	/>


const safeTextValue = defaultTo( "" )
export const TextInput = ( props: Omit<InputProps<string>, "decodeValue" | "encodeValue"> ) =>
	<Input
		{...props}
		decodeValue={identity}
		encodeValue={safeTextValue}
		type="text"
	/>

const safeNumberValue = flow( defaultTo<string | number>( "" ), v => v.toString() )
export const NumberInput = ( props: Omit<InputProps<number>, "decodeValue" | "encodeValue"> ) =>
	<Input
		{...props}
		decodeValue={parseInt}
		encodeValue={safeNumberValue}
		type="number"
	/>

const parseDate = ( date: string ) => new Date( date ) // 2021-05-13 -> Date
const stringifyDate = ( date?: Date ) =>
	date ?
	date.toISOString().slice( 0, 10 ) :
	"" // 2021-05-13 -> Date
export const DateInput = ( props: Omit<InputProps<Date>, "decodeValue" | "encodeValue"> ) =>
	<Input
		{...props}
		decodeValue={parseDate}
		encodeValue={stringifyDate}
		type="date"
	/>

type RadioGroupProps<T extends any> = ElementProps<{
	label: string,
	value: T,
	children: (
		helpers: { checked: ( value: T ) => boolean },
	) => any
}>
export const RadioGroup = <T extends any>( props: RadioGroupProps<T> ) => {
	const { label, children, value: groupValue, onChange, ...propz } = props
	// @todo: find a better way to remove unwanted props on field spread
	return (
		<fieldset {...propz}>
			<Label
				label={label}
				as="legend"
			/>
			{children( { checked: ( value: T ) => value === groupValue } )}
		</fieldset>)
}

type RadioProps<T extends any> = ElementProps<{
	onChange: ( value: T ) => void,
	value: T,
	checked: ( value: T ) => boolean
	children: ( checked: boolean ) => any
}, InputHTMLAttributes<HTMLInputElement>>

export const Radio = <T extends any>( { className, style, children, ...props }: RadioProps<T> ) => {
	const checked = props.checked( props.value )
	return (
		<label
			className={classNames( "", className )}
			style={style}
		>
			<input
				{...props}
				value={(props.value as any).toString()} // this is just for markup, we don't actually use it
				onChange={() => props.onChange( props.value )}
				checked={checked}
				className="sr-only"
				type="radio"
			/>
			{children( checked )}
		</label>)
}


export const ButtonRadio = <T extends any>( props: ElementProps<{ children: any }, RadioProps<T>> ) =>
	<Radio
		{...props}
		className={classNames( "", props.className )}
	>
		{checked =>
			<div className={classNames(
				"py-2 px-4 w-full sm:text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-center",
				{
					"border-2 border-indigo-500 text-indigo-600 font-bold": checked,
					"border border-gray-300":                               !checked,
				},
			)}
			>
				{props.children}
			</div>}
	</Radio>

export const ListRadio = <T extends any>( props: ElementProps<{ children: any }, RadioProps<T>> ) =>
	<Radio
		{...props}
		className={classNames( "block", props.className )}
	>
		{checked =>
			<div className="flex items-center">
				<div className="mr-3">
					<div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
						{checked && <div className="w-2 h-2 rounded-full bg-indigo-500"/>}
					</div>
				</div>
				{props.children}
			</div>}
	</Radio>

type YesNoProps = ElementProps<{
	label: string,
	name: string,
	value: boolean | undefined,
	onChange: ( value: boolean ) => void
}>

export const YesNo = ( { value, label, onChange, name, ...propz }: YesNoProps ) =>
	<RadioGroup
		{...propz}
		className={classNames( "mb-4", propz.className )}
		value={value}
		label={label}
	>{( helpers ) =>
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
			<ButtonRadio
				name={name}
				onChange={onChange}
				value={true}
				{...helpers}
			>
				Oui
			</ButtonRadio>
			
			<ButtonRadio
				name={name}
				onChange={onChange}
				{...helpers}
				value={false}
			>
				Non
			</ButtonRadio>
		</div>}
	</RadioGroup>
