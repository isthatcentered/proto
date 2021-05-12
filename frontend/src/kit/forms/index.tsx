import React, { InputHTMLAttributes, PropsWithChildren, SelectHTMLAttributes } from "react"
import { useField } from "formik"




type FieldProps = { label: string, name: string }

const Label = ( props: PropsWithChildren<{ label: string }> ) =>
	<label className="block">
		<span className="block mb-1 text-sm font-medium text-gray-700">{props.label}</span>
		{props.children}
	</label>

export const Input = ( props: FieldProps & InputHTMLAttributes<HTMLInputElement> & { placeholder: string } ) => {
	const { label, ...fieldProps } = props
	const [ field, meta ] = useField( props );
	return (
		<>
			<Label label={label}>
				<input
					{...field}
					{...fieldProps}
					id={fieldProps.name}
					className="py-2 px-3 w-full sm:text-sm rounded-md border focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-gray-300"
				/>
			</Label>
			{meta.touched && meta.error ?
			 (
				 <div className="text-red-500">{meta.error}</div>
			 ) :
			 null}
		</>
	);
};

export const Select = ( props: FieldProps & SelectHTMLAttributes<HTMLSelectElement> ) => {
	const { label, ...selectProps } = props
	const [ field, meta ] = useField( props );
	return (
		<>
			<Label label={label}>
				<select
					{...field}
					{...selectProps}
					id={selectProps.name}
					style={{
						"backgroundImage":    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
						"backgroundPosition": "right .5rem center",
						"backgroundRepeat":   "no-repeat",
						"backgroundSize":     "1.5em 1.5em",
					}}
					className="appearance-none block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				>
					<option value="">-</option>
					{selectProps.children}
				</select>
			</Label>
			{meta.touched && meta.error ?
			 (
				 <div className="error">{meta.error}</div>
			 ) :
			 null}
		</>
	);
};
