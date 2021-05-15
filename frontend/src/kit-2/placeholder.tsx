import * as REMOTE from "../remote"
import cn from "classnames"
import React, { ComponentType } from "react"
import { ElementProps } from "./helpers"




const Placeholder = ( props: ElementProps<{ state: REMOTE.Remote<any, any>["type"] }> ) => (
	<div
		{...props}
		className={cn(
			props.className,
			`bg-gray-100 text-transparent`,
			{ "animate-pulse": props.state === "pending" },
		)}
	>
		&nsbp;
	</div> // The extra space allows us to apply same padding & font size as element we are trying to mimic to get the same height
)

export const Placeholders = ( props: { count: number, children: ( items: number[] ) => any } ) => {
	const items = Array.from( { length: props.count } ).map( ( _, index ) => index )
	return props.children( items )
}

export default Placeholder
