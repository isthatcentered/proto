import React, { PropsWithChildren } from "react"




export const SectionHeaderStyles = ( props: PropsWithChildren<{}> ) => (
	<span {...props} className="font-bold text-indigo-700 text-2xl"/>
)

export const ClickableStyles = ( props: PropsWithChildren<{}> ) => (
	<span {...props} className="inline-block py-4 px-4 leading-none bg-indigo-600 text-white rounded-md font-bold shadow"/>
)

export const FormSubmitButton = ( props: PropsWithChildren<{ disabled: boolean }> ) => (
	<button
		type="submit"
		disabled={props.disabled}
	>
		<ClickableStyles>{props.children}</ClickableStyles>
	</button>
)

export const FormTitle = ( props: PropsWithChildren<{}> ) => <h2 className="mb-8"><SectionHeaderStyles>{props.children}</SectionHeaderStyles></h2>
