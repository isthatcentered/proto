import React, { ComponentType, PropsWithChildren } from "react"
import classNames from "classnames"

export const Label = ({
	label,
	children,
	as,
	...props
}: PropsWithChildren<{
	label: string
	as?: ComponentType | string
	disabled: boolean
	className?: string
}>) => {
	const Tag = as || ("label" as any)

	return (
		<Tag
			{...props}
			className={classNames("block", props.className, {
				"text-gray-300": props.disabled,
			})}
		>
			<span className="block font-medium mb-4">{label}</span>
			{children}
		</Tag>
	)
}
