import React, { PropsWithChildren } from "react"




export const SectionHeaderStyles = ( props: PropsWithChildren<{}> ) => (
	<span {...props} className="font-bold text-indigo-700 text-2xl"/>
)

export const ClickableStyles = ( props: PropsWithChildren<{}> ) => (
	<span {...props} className="inline-block py-4 px-4 leading-none bg-indigo-600 text-white rounded-md font-bold shadow"/>
)
