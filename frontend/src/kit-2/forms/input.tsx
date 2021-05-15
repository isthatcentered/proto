import React, { InputHTMLAttributes } from "react"
import classNames from "classnames"
import { flow, identity, pipe } from "fp-ts/function"
import { ElementProps } from "../helpers"




const defaultTo = <T extends any>( defaultValue: T ) => ( actual: T | undefined ) => actual ?? defaultValue

type InputProps<T> = ElementProps<{
	onChange: ( value: T ) => void,
	value: T | undefined
	decodeValue: ( value: string ) => T,            // go from input value to desired type
	encodeValue: ( value: T | undefined ) => string // go from your type to input value
}, InputHTMLAttributes<HTMLInputElement>>

export const Input = <T extends any>( { encodeValue, decodeValue, ...props }: InputProps<T> ) =>
	<input
		{...props}
		className={classNames( "py-2 px-3 w-full sm:text-sm rounded-md border-2 focus:border-indigo-500 block shadow-sm border-gray-300 outline-none focus:text-indigo-800", props.className )}
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
