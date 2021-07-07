import { Connectable, FieldConnection } from "./connect"
import React, { PropsWithChildren } from "react"
import * as REMOTE from "../remote"
import { Code } from "../helpers"
import { useField } from "formik"
import { Label } from "./label"
import classNames from "classnames"
import { FieldPlaceholder } from "./index"

export const Select = <T extends Connectable>(
	props: PropsWithChildren<
		FieldConnection<T> & {
			data: REMOTE.Remote<any, Code<T>[]>
			label: string
			disabled?: boolean
			className?: string
		}
	>,
) => {
	const [field] = useField({ ...props })
	const disabled = props.disabled || !REMOTE.isSuccess(props.data)
	const pending = REMOTE.isPending(props.data)
	return (
		<Label label={props.label} disabled={disabled} className={props.className}>
			{REMOTE.isSuccess(props.data) ? (
				<select
					{...field}
					disabled={disabled}
					style={{
						backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
						backgroundPosition: "right .5rem center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "1.5em 1.5em",
					}}
					className={classNames(
						"appearance-none block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
						{
							"bg-gray-50": disabled,
							"animate-pulse bg-gray-50": pending,
						},
					)}
				>
					<option value="">-</option>
					{REMOTE.isSuccess(props.data) &&
						props.data.value.map(code => (
							<option key={code.value} value={code.value}>
								{code.label}
							</option>
						))}
				</select>
			) : (
				<FieldPlaceholder state={props.data.type} />
			)}
		</Label>
	)
}
