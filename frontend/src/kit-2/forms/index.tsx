import React, { ComponentType } from "react"
import classNames from "classnames"
import useForm from "./use-form"
import "./index.css"
import { ElementProps } from "../helpers"




export * from "./input"
export * from "./radio"


export { useForm }

export const Label = ( { label, children, as, ...props }: ElementProps<{ label: string, as?: ComponentType | string }> ) => {
	const Tag = as || "label" as any
	
	return <Tag {...props} className={classNames( "block", props.className )}>
		<span className="block mb-1 text-sm font-medium text-gray-700 mb-2">{label}</span>
		{children}
	</Tag>
}


