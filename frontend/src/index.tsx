import React from "react";
import ReactDOM from "react-dom";
import { AsyncRadioGroup, ButtonRadioPlaceholder, CheckableRadio, CheckableRadioPlaceholder, DateInput, Label, useForm, YesNo } from "./kit-2/forms"
import * as F from "./kit-2/forms/use-form"
import { UsageVehiculeStep } from "./contracts"
import * as REMOTE from "./remote"
import { Code } from "./kit-2/helpers"
import { Placeholders } from "./kit-2/placeholder"
import * as AR from "fp-ts/Array"




const useCodesTypesUtilisationVehicule = () => {
	const state = REMOTE.success( [
		{ value: "01", label: "Usage privé et professionnel" },
		{ value: "02", label: "Usage privé et professionnel occasionnel" },
	] as Code<string>[] )
	return [ state ] as const
}

const UsageVehicule: UsageVehiculeStep = ( _props ) => {
	const [ values, state, { field, form } ] = useForm( {
		defaultValue: {
			codeUsageVehicule:       F.empty<string>(),
			leasingOuCredit:         F.empty<boolean>(),
			dateEffetContratDesiree: F.empty<Date>(),
		},
		onSubmit:     console.log,
	} )
	
	console.log( values )
	const [ codesTypesUtilisationVehicule ] = useCodesTypesUtilisationVehicule()
	
	return (
		<form {...form()}>
			<Label
				className="mb-4"
				label="A partir de quelle date souhaitez-vous être assuré"
			>
				<DateInput{...field( "dateEffetContratDesiree" )}/>
			</Label>
			
			<YesNo
				{...field( "leasingOuCredit" )}
				className="mb-4"
				label="Ce véhicule est-il financé à crédit (leasing, crédit auto) ?"
			/>
			{/* @todo: iplement using radio select */}
			<AsyncRadioGroup
				{...field( "codeUsageVehicule" )}
				className="mb-4"
				label="Pour quels types de déplacements ce véhicule est-il utilisé ?"
				value={field( "codeUsageVehicule" ).value}
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
		</form>)
}


const App = () => {
	
	
	return (
		<div className="container mx-auto px-4 pt-4"
		     style={{ maxWidth: 500 }}
		>
			
			
			<UsageVehicule
				numeroRepertoire={"1234"}
				onConfirm={console.log}
			/>
		</div>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
	,
	document.getElementById( "root" ),
);

