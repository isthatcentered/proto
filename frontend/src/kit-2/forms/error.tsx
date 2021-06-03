import React from "react"
import { FieldStatus } from "./types"




export const FieldErrors = ( props: { errors: string[ ], status: FieldStatus } ) => {
	const hasErrors = props.errors.length > 0
	const showErrors = hasErrors && props.status !== "pristine"
	return (
		<div>
			{showErrors && props.errors.map( ( err, index ) => (
				<p key={index}
				   className="text-red-500"
				>
					{err}
				</p>) )}
		</div>
	)
}
