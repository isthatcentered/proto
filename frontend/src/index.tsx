import React, { useState } from "react";
import ReactDOM from "react-dom";
import InitParcours from "./steps/init-parcours"
import { IdentificationConducteurStep, IdentificationVehiculeStep, InitParcoursStep, StepOut, UsageVehiculeStep } from "./contracts"
import IdentificationVehicule from "./steps/identification-vehicule"
import UsageVehicule from "./steps/usage-vehicule"



// Each step data is the accumulated data of all the previous steps
type IdentificationVehiculeData = StepOut<InitParcoursStep>
type UsageVehiculeData = IdentificationVehiculeData & StepOut<IdentificationVehiculeStep>
type IdentificationConducteurData = UsageVehiculeData & StepOut<UsageVehiculeStep>
type PasseAssureData = IdentificationConducteurData & StepOut<IdentificationConducteurStep>

type Step =
	| { type: "init-parcours" }
	| { type: "identification-vehicule", data: IdentificationVehiculeData }
	| { type: "usage-vehicule", data: UsageVehiculeData }
	| { type: "identification-conducteur", data: IdentificationConducteurData }
	| { type: "passe-assure", data: PasseAssureData }

const stepOverride: Step = undefined as any//{ type: "identification-vehicule", data: { codeTypeVehicule: "code_type_vehicule" } }

const initialState: Step = stepOverride || { type: "init-parcours" }

const App = () => {
	const [ step, setNextStep ] = useState<Step>( initialState )
	console.log( step )
	
	return (
		<div
			className="container mx-auto px-4 py-16 mb-12"
			style={{ maxWidth: 500 }}
		>
			{(() => {
				switch ( step.type ) {
					case "init-parcours":
						return <InitParcours onConfirm={values => setNextStep( { type: "identification-vehicule", data: values } )}/>
					case "identification-vehicule":
						// @todo: go to autos/bikes/campers according to given "typeVehicule"
						return <IdentificationVehicule
							{...step.data}
							onConfirm={values => setNextStep( { type: "usage-vehicule", data: { ...step.data, ...values } } )}
						/>
					case "usage-vehicule":
						return <UsageVehicule
							numeroRepertoire={step.data.numeroRepertoire}
							onConfirm={values => setNextStep( { type: "identification-conducteur", data: { ...step.data, ...values } } )}
						/>
					case "identification-conducteur":
						return null
					case "passe-assure":
						return null
				}
			})()}
			
			{/*<UsageVehicule*/}
			{/*	numeroRepertoire={"1234"}*/}
			{/*	onConfirm={console.log}*/}
			{/*/>*/}
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

