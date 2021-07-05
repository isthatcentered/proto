import React, { PropsWithChildren, useMemo } from "react"




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
export const Grid           = ( props: PropsWithChildren<{ cols?: number, rows?: number, gap?: number, }> ) => (
	 <div className={`gap-${props.gap || 4} grid grid-cols-${props.cols} grid-rows-${props.rows}`}
				children={props.children}
	 />
)
export const useStaticValue = <T extends any>( value: T ): T =>
	 useMemo( () => value, [] )
