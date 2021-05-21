import * as REMOTE from "../kit-2/remote"
import { Code } from "../kit-2/helpers"
import { UsageVehiculeStep } from "../contracts"
import { AsyncRadioGroup, CheckableRadio, CheckableRadioPlaceholder, DateInput, useForm, YesNo } from "../kit-2/forms"
import * as DATES from "../kit-2/dates"
import { Placeholders } from "../kit-2/placeholder"
import * as AR from "fp-ts/Array"
import React from "react"
import * as V from "../kit-2/validation"




const schema = V.record( {
	codeUsageVehicule:       V.string,
	leasingOuCredit:         V.boolean,
	dateEffetContratDesiree: V.date, // @todo: Validation, date > today
} )

const useCodesTypesUtilisationVehicule = () => {
	const state = REMOTE.success( [
		{ value: "01", label: "Usage privé et professionnel" },
		{ value: "02", label: "Usage privé et professionnel occasionnel" },
	] as Code<string>[] )
	return [ state ] as const
}

const UsageVehicule: UsageVehiculeStep = ( _props ) => {
	const [ values, form ] = useForm( {
		defaultValue: {
			dateEffetContratDesiree: new Date(),
		},
		schema,
		onSubmit:     console.log,
	} )
	
	const [ codesTypesUtilisationVehicule ] = useCodesTypesUtilisationVehicule()
	
	return (
		<form {...form.props}>
			<DateInput
				{...form.field( "dateEffetContratDesiree" )}
				min={DATES.today().toISOString()}
				className="mb-4"
				label="A partir de quelle date souhaitez-vous être assuré"
			/>
			
			<YesNo
				{...form.field( "leasingOuCredit" )}
				className="mb-4"
				label="Ce véhicule est-il financé à crédit (leasing, crédit auto) ?"
			/>
			{/* @todo: iplement using radio select */}
			<AsyncRadioGroup
				{...form.field( "codeUsageVehicule" )}
				className="mb-4"
				label="Pour quels types de déplacements ce véhicule est-il utilisé ?"
				value={form.field( "codeUsageVehicule" ).value}
				data={codesTypesUtilisationVehicule}
				placeholder={props => (
					<div className="grid gap-3">
						<Placeholders count={2}>
							{AR.map( index =>
								<CheckableRadioPlaceholder key={index} {...props}/>,
							)}
						</Placeholders>
					</div>)}
			>
				{( results, radioProps ) =>
					results.map( r =>
						(
							<CheckableRadio
								{...radioProps}
								key={r.value + r.label}
								value={r.value}
								className="mb-2"
							>
								{r.label}
							</CheckableRadio>
						),
					)
				}
			</AsyncRadioGroup>
			<button type="submit">Etape suivante</button>
		</form>)
}

export default UsageVehicule
