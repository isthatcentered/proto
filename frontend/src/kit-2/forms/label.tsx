import { ElementProps } from "../helpers"
import React, { ComponentType } from "react"
import classNames from "classnames"




export const Label = ( { label, children, as, ...props }: ElementProps<{ label: string, as?: ComponentType | string }> ) => {
	const Tag = as || "label" as any
	
	return <Tag {...props} className={classNames( "block", props.className )}>
		<span className="block font-medium mb-4">{label}</span>
		{children}
	</Tag>
}
