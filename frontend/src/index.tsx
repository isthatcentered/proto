import React from "react";
import ReactDOM from "react-dom";
import { DateInput, Label, ListRadio, RadioGroup, useForm, YesNo } from "./forms"
import * as F from "./forms/use-form"
import { UsageVehiculeStep } from "./contracts"
import * as REMOTE from "./remote"




const useCodesTypesUtilisationVehicule = () => {
	return REMOTE.success( [
		{ value: "01", label: "Usage privé et professionnel" },
		{ value: "02", label: "Usage privé et professionnel occasionnel" },
	] )
}

const UsageVehicule: UsageVehiculeStep = ( _props ) => {
	const [ values, field ] = useForm( {
		codeUsageVehicule:       F.empty<string>(),
		leasingOuCredit:         F.empty<boolean>(),
		dateEffetContratDesiree: F.empty<Date>(),
	} )
	
	console.log( values )
	
	return <div>
		<Label className="mb-4"
		       label="A partir de quelle date souhaitez-vous être assuré"
		>
			<DateInput{...field( "dateEffetContratDesiree" )}/>
		</Label>
		
		<YesNo
			{...field( "leasingOuCredit" )}
			className="mb-4"
			label="Ce véhicule est-il financé à crédit (leasing, crédit auto) ?"
		/>
		
		<RadioGroup
			className="mb-4"
			label="Pour quels types de déplacements ce véhicule est-il utilisé ?"
			value={field( "codeUsageVehicule" ).value}
		>{helpers =>
			<>
				<ListRadio {...helpers} {...field( "codeUsageVehicule" )} value={"01"} className="mb-2">Usage privé et professionnel</ListRadio>
				<ListRadio {...helpers} {...field( "codeUsageVehicule" )} value={"02"}>Usage privé et professionnel occasionnel</ListRadio>
			</>}
		</RadioGroup>
	</div>
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

