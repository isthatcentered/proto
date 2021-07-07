import { Connectable, FieldConnection } from "./connect"
import * as REMOTE from "../remote"
import { Code } from "../helpers"
import React, { ChangeEvent, PropsWithChildren } from "react"
import { useField } from "formik"
import classNames from "classnames"
import { FieldError, FieldPlaceholder } from "./index"
import { Label } from "./label"

type RadioSelectProps<T extends Connectable> = {
	data: REMOTE.Remote<any, Code<T>[]>
	children: (
		data: Code<T>[],
		props: { name: string; disabled?: boolean },
	) => any
	disabled?: boolean
	label: string
	className?: string
}

export const RadioSelect = <T extends Connectable>(
	props: RadioSelectProps<T> & FieldConnection<T>,
) => {
	const disabled = props.disabled || !REMOTE.isSuccess(props.data)
	return (
		<RadioGroup
			label={props.label}
			name={props.name}
			className={props.className}
			disabled={disabled}
		>
			{REMOTE.isSuccess(props.data) ? (
				props.children(props.data.value, {
					name: props.name,
					disabled: props.disabled,
				})
			) : (
				<FieldPlaceholder state={props.data.type} />
			)}
		</RadioGroup>
	)
}

export const RadioGroup = (
	props: PropsWithChildren<{
		name: string
		label: string
		disabled?: boolean
		className?: string
	}>,
) => (
	<fieldset className={props.className}>
		<Label label={props.label} disabled={props.disabled || false} as="legend" />

		{props.children}

		<FieldError name={props.name} />
	</fieldset>
)

export type RadioProps<T extends Connectable> = PropsWithChildren<
	FieldConnection<T>
> & { disabled?: boolean; onChange?: (value: T) => void }

export const RadioButton = <T extends Connectable>({
	onChange,
	...props
}: RadioProps<T>) => {
	const [field] = useField({ ...props, type: "radio" })
	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		onChange ? onChange(e.target.value as T) : field.onChange(e)

	return (
		<label
			className={classNames(
				"cursor-pointer leading-tight font-bold flex items-center justify-center py-3 px-4 w-full border-2 rounded-md focus:border-indigo-600 text-center focus-within:border-indigo-600",
				{
					"border-indigo-600 text-indigo-900 bg-indigo-50": field.checked,
					"border-gray-300 shadow-sm": !field.checked,
					"bg-gray-50 border-none text-gray-200": props.disabled,
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
		</label>
	)
}

export const CheckableRadio = <T extends Connectable>({
	onChange,
	...props
}: RadioProps<T>) => {
	const [field] = useField({ ...props, type: "radio" })
	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		onChange ? onChange(e.target.value as T) : field.onChange(e)

	return (
		<label className="ListRadio flex items-center">
			<input
				{...field}
				onChange={handleChange}
				disabled={props.disabled}
				className="sr-only"
				type="radio"
			/>
			<div className="mr-3">
				<div className="ListRadio-radio w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
					{field.checked && (
						<div className="w-2 h-2 rounded-full bg-indigo-600" />
					)}
				</div>
			</div>
			{props.children}
		</label>
	)
}
