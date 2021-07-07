import { FieldConnection } from "./connect"
import React, { InputHTMLAttributes } from "react"
import { useField } from "formik"
import { Label } from "./label"
import classNames from "classnames"
import { FieldError } from "./index"

export const Input = <T extends number | string>({
	className,
	...props
}: FieldConnection<T> &
	InputHTMLAttributes<HTMLInputElement> & {
		label: string
		className?: string
	}) => {
	const [field] = useField({ ...props })
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
			<FieldError name={props.name} />
		</Label>
	)
}
