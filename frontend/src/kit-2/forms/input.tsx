import React, { InputHTMLAttributes } from "react"
import { flow, identity, pipe } from "fp-ts/function"
import { ElementProps } from "../helpers"
import { Label } from "./label"
import { FieldErrors } from "./error"
import { FieldStatus } from "./types"




const defaultTo = <T extends any>( defaultValue: T ) => ( actual: T | undefined ) => actual ?? defaultValue

type InputProps<T> = ElementProps<{
	label: string
	onChange: ( value: T ) => void,
	value: T | undefined
	errors: string[]
	status: FieldStatus
	decodeValue: ( value: string ) => T,            // go from input value to desired type
	encodeValue: ( value: T | undefined ) => string // go from your type to input value
}, InputHTMLAttributes<HTMLInputElement>>

// @todo: errors accessibility
// @todo: error state styles
export const Input = <T extends any>( { encodeValue, decodeValue, label, className, errors, status, ...inputProps }: InputProps<T> ) =>
	<Label
		label={label}
		className={className}
	>
		<input
			{...inputProps}
			className={"py-2 px-3 w-full sm:text-sm rounded-md border-2 focus:border-indigo-500 block shadow-sm border-gray-300 outline-none focus:text-indigo-800 cursor-text"}
			value={encodeValue( inputProps.value )}
			onChange={e => pipe( e.target.value, decodeValue, inputProps.onChange )}
		/>
		
		<FieldErrors errors={errors}
		             status={status}
		/>
	</Label>

type PreconfiguredInputProps<T> = Omit<InputProps<T>, "decodeValue" | "encodeValue" | "type">

const safeTextValue = defaultTo( "" )
export const TextInput = ( props: PreconfiguredInputProps<string> ) =>
	<Input
		{...props}
		decodeValue={identity}
		encodeValue={safeTextValue}
		type="text"
	/>

const safeNumberValue = flow( defaultTo<string | number>( "" ), v => v.toString() )
export const NumberInput = ( props: PreconfiguredInputProps<number> ) =>
	<Input
		{...props}
		decodeValue={parseFloat}
		encodeValue={safeNumberValue}
		type="number"
	/>

const parseDate = ( date: string ) => new Date( date ) // 2021-05-13 -> Date
const stringifyDate = ( date?: Date ) =>
	date ?
	date.toISOString().slice( 0, 10 ) :
	"" // 2021-05-13 -> Date
export const DateInput = ( props: PreconfiguredInputProps<Date> ) =>
	<Input
		{...props}
		decodeValue={parseDate}
		encodeValue={stringifyDate}
		type={"date"}
	/>

const stringifyDateMonth = ( date?: Date ) =>
	date ?
	date.toISOString().slice( 0, 7 ) :
	"" // 2021-05 -> Date
export const MonthInput = ( props: PreconfiguredInputProps<Date> ) =>
	<Input
		{...props}
		decodeValue={parseDate}
		encodeValue={stringifyDateMonth}
		type={"month"}
	/>
