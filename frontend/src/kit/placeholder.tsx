import * as REMOTE from "./remote"
import cn from "classnames"
import React from "react"




type PlaceholderProps = { state: REMOTE.Remote<any, any>["type"], className?: string }

const Placeholder = ( props: PlaceholderProps ) => (
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

export const Placeholders  = ( props: { count: number, children: ( items: number[] ) => any } ) => {
	 const items = Array.from( { length: props.count } ).map( ( _, index ) => index )
	 return props.children( items )
}
export const Placeholders2 = ( props: { count: number, render: ( props: PlaceholderProps ) => any } & PlaceholderProps ) => {
	 const items       = Array.from( { length: props.count } ).map( ( _, index ) => index )
	 const Placeholder = props.render
	 return <>
			{items.map( i =>
				 <Placeholder
						key={i}
						state={props.state}
				 /> )}
	 </>
}


export default Placeholder
