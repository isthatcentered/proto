import { RadioButton, RadioGroup, RadioProps } from "./radios"
import { Grid } from "../shared"
import React from "react"

export const YesNo = ({
	onChange,
	...props
}: { label: string; className?: string } & RadioProps<"true" | "false">) => (
	<RadioGroup {...props}>
		<Grid cols={2}>
			<RadioButton
				value="true"
				name={props.name}
				disabled={props.disabled}
				onChange={onChange}
				children="Oui"
			/>
			<RadioButton
				value="false"
				name={props.name}
				disabled={props.disabled}
				onChange={onChange}
				children="Non"
			/>
		</Grid>
	</RadioGroup>
)
