import React, { PropsWithChildren, ReactNode } from "react"




type RadioGroupProps<T extends string> = {
	name: string,
	value: T,
	onRadioClicked: ( value: T ) => void,
	required?: boolean,
	children: ( props: Omit<RadioProps<T>, "value"> ) => ReactNode
}
export const RadioGroup = <T extends string>( props: RadioGroupProps<T> ) => {
	const context: Omit<RadioProps<T>, "value"> = {
		groupValue: props.value,
		name:       props.name,
		onClicked:  props.onRadioClicked,
		required: props.required||false
	}
	
	return (
		<>{props.children( context )}
		</>)
}

type RadioProps<T extends string> = { value: T, name: string, required?: boolean, groupValue: T, onClicked: ( value: T ) => void }

const Radio = <T extends string>( props: PropsWithChildren<RadioProps<T>> ) => {
	return (
		<label>
			<input type="radio"
			       value={props.value}
			       required={props.required}
			       checked={props.groupValue === props.value}
			       onChange={e => props.onClicked( e.target.value as T )}
			/>
			{props.children}
		</label>)
}
export default Radio
