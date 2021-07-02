import classNames from "classnames"
import React, { ComponentProps, ComponentType, InputHTMLAttributes } from "react"
import { Code, ElementProps } from "../helpers"
import * as REMOTE from "../remote"
import Placeholder, { Placeholders } from "../placeholder"
import * as AR from "fp-ts/Array"
import { Label } from "./label"
import { FieldErrors } from "./error"
import { FieldStatus } from "./types"




type RadioProps<T extends any> = ElementProps<{
	onChange: ( value: T ) => void,
	value: T,
	checked: ( value: T ) => boolean
	children: any
}, InputHTMLAttributes<HTMLInputElement>>

type RadioGroupProps<T extends any> = ElementProps<{
	errors: string[]
	label: string,
	value: T | undefined,
	name: string,
	status: FieldStatus,
	children: (
		radioProps: Omit<RadioProps<T>, "value" | "children">,
	) => any
}, Omit<RadioProps<T>, "checked">>

export const RadioGroup = <T extends any>( props: RadioGroupProps<T> ) => {
	const {
		      label,
		      children,
		      value: groupValue,
		      className,
		      style,
		      errors,
				status,
		      ...propz
	      } = props
	
	const radioProps = {
		...propz,
		checked: ( value: T ) => value === groupValue,
	}
	// @todo: find a better way to remove unwanted props on field spread
	return (
		<fieldset
			className={className}
			style={style}
		>
			<Label
				label={label}
				as="legend"
			/>
			{children( radioProps )}
			
			<FieldErrors errors={errors} status={status}/>
		</fieldset>)
}

export const UnstyledRadio = <T extends any>( { className, style, children, ...props }: RadioProps<T> ) =>
	(
		<label
			className={classNames( "", className )}
			style={style}
		>
			<input
				{...props}
				value={(props.value as any).toString()} // this is just for markup, we don't actually use it
				onChange={() => props.onChange( props.value )}
				checked={props.checked( props.value )}
				className="sr-only"
				type="radio"
			/>
			{children}
		</label>)

export const ButtonRadio = <T extends any>( props: RadioProps<T> ) => {
	const checked = props.checked( props.value )
	return <UnstyledRadio
		{...props}
		className={classNames(
			"cursor-pointer leading-tight font-bold flex items-center justify-center py-3 px-4 w-full border-2 rounded-md focus:border-indigo-600 text-center focus-within:border-indigo-600",
			{
				"border-indigo-600 text-indigo-900 bg-indigo-50": checked,
				"border-gray-300 shadow":                         !checked,
			}, props.className,
		)}
	>
		{props.children}
	</UnstyledRadio>
}

export const ButtonRadioPlaceholder = ( props: ElementProps<{}, ComponentProps<typeof Placeholder>> ) => {
	return (
		<Placeholder
			{...props}
			className="py-2 rounded-md"
		/>)
}
export const CheckableRadio = <T extends any>( props: RadioProps<T> ) => {
	const checked = props.checked( props.value )
	return <UnstyledRadio
		{...props}
		className={classNames( "ListRadio flex items-center", props.className )}
	>
		<div className="mr-3">
			<div className="ListRadio-radio w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
				{checked && <div className="w-2 h-2 rounded-full bg-indigo-600"/>}
			</div>
		</div>
		{props.children}
	</UnstyledRadio>
}



export const CheckableRadioPlaceholder = ( props: ComponentProps<typeof Placeholder> ) =>
	(
		<div className={"flex items-center"}>
			<Placeholder {...props} className="w-5 h-5 mr-3"/>
			<Placeholder {...props} className="w-full h-5"/>
		</div>)

type AsyncRadioProps<T extends any> = ElementProps<{
	data: REMOTE.Remote<any, Code<T>[]>
	children: ( results: Code<T>[], radioProps: Parameters<RadioGroupProps<T>["children"]>[0] ) => any
	placeholder?: ComponentType<{ state: REMOTE.Remote<any, any>["type"] }>
}, RadioGroupProps<T>>

export const AsyncRadioGroup = <T extends any>( props: AsyncRadioProps<T> ) => {
	const { value, label, data, placeholder, ...propz } = props
	const Placeholder = placeholder || (() => null)
	return (
		<RadioGroup
			{...propz}
			className={classNames( "", propz.className )}
			value={value}
			label={label}
		>{( helpers ) =>
			REMOTE.isSuccess( data ) ?
			propz.children( data.value, helpers ) :
			<Placeholder state={data.type}/>
		}
		</RadioGroup>
	)
}
// the props {children: never} is a hack, the ide complains otherwise
export const ButtonRadioSelect = <T extends any>( props: ElementProps<{ cols?: number, children?: never }, Omit<AsyncRadioProps<T>, "children" | "placeholder">> ) => (
	// @todo: the radio group component basically only exists to pass the radio props (checked), remove this
	<AsyncRadioGroup
		{...props}
		placeholder={props => (
			<div className="grid grid-cols-3 gap-3">
				<Placeholders count={3}>
					{AR.map( index =>
						<ButtonRadioPlaceholder key={index} {...props}/>,
					)}
				</Placeholders>
			</div>)}
	>
		
		{( results, radioProps ) =>
			<div className={`grid grid-cols-${props.cols || 3} gap-3 auto-rows-fr`}>
				{results.map( r =>
					(
						<ButtonRadio
							{...radioProps}
							key={r.value + r.label}
							value={r.value}
						>
							{r.label}
						</ButtonRadio>
					),
				)}
			</div>
		}
	</AsyncRadioGroup>
)

export const YesNo = ( props: Omit<RadioGroupProps<boolean>, "children"> ) =>
	<RadioGroup {...props}>
		{radioProps => (
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				<ButtonRadio
					{...radioProps}
					value={true}
				>
					Oui
				</ButtonRadio>
				<ButtonRadio
					{...radioProps}
					value={false}
				>
					Non
				</ButtonRadio>
			</div>
		)}
	</RadioGroup>
