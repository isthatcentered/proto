import React from "react"




export const FieldErrors = ( props: { errors: string[ ] } ) => (
	<div>
		{props.errors.length > 0 && (
			<p className="text-red-500">
				{props.errors[ 0 ]}
			</p>)}
	</div>
)
