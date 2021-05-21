import * as REMOTE from "../remote"
import classNames from "classnames"
import React, { SelectHTMLAttributes } from "react"
import { Code, ElementProps } from "../helpers"
import { Label } from "./label"




type SelectProps = ElementProps<{
	label: string
	data: REMOTE.Remote<never, Code<string>[]>,
	onChange: ( value: string | undefined ) => void
	value: string | undefined
}, Omit<SelectHTMLAttributes<HTMLSelectElement>, "children">>

// @todo: Remote error
// @todo: Validation error (required)
export const Select = ( props: SelectProps ) => {
	const { label, data, onChange, value, className, ...selectProps } = props
	const disabled = props.disabled || REMOTE.isInitial( data )
	return (
		<Label
			label={props.label}
			className={className}
		>
			<select
				{...selectProps}
				disabled={disabled}
				onChange={e => onChange( e.target.value )}
				value={value || ""}
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
							"bg-gray-100":                           disabled,
							"animate-pulse bg-gray-100 border-none": REMOTE.isPending( data ),
						},
					)
				}
			>
				<option value=""/>
				{REMOTE.isSuccess( data ) && data.value.map( item =>
					<option key={item.value}
					        value={item.value}
					>
						{item.label}
					</option> )}
			</select>
		</Label>)
}
