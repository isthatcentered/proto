import React, { PropsWithChildren } from "react"
import { ErrorMessage } from "formik"
import cn from "classnames"
import * as REMOTE from "../remote"

export { getConnect } from "./connect"
export * from "./radios"
export * from "./label"
export * from "./yesNo"
export * from "./select"
export * from "./input"

export const FieldPlaceholder = (props: {
	state: REMOTE.Remote<any, any>["type"]
}) => {
	return (
		<div
			className={cn(
				`bg-gray-50 text-transparent py-2 rounded-md h-10 shadow-sm`,
				{ "animate-pulse": props.state === "pending" },
			)}
		/>
	)
}

export const FieldSubText = (props: PropsWithChildren<{}>) => (
	<p className="text-xs text-gray-700 italic">{props.children}</p>
)

export const FieldError = (props: { name: string }) => (
	<ErrorMessage name={props.name}>
		{message => (
			<div>
				<p className="text-red-500">{message}</p>
			</div>
		)}
	</ErrorMessage>
)
