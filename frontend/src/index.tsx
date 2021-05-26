import React, { useState } from "react";
import ReactDOM from "react-dom";
import InitParcours from "./steps/init-parcours"
import { IdentificationConducteurStep, IdentificationVehiculeStep, InitParcoursStep, PasseAssureStep, StepOut, UsageVehiculeStep } from "./contracts"
import IdentificationVehicule from "./steps/identification-vehicule"
import UsageVehicule from "./steps/usage-vehicule"
import IdentificationConducteur from "./steps/identification-conducteur"
import { FormSubmitButton, FormTitle } from "./kit-2/shared"
import { useForm } from "./kit-2/forms"
import * as V from "./kit-2/validation"
import * as BOOL from "fp-ts/boolean"
import { pick } from "./kit-2/helpers"




const blah = V.either(
	V.record( {
		conduiteAccompagnee:              V.eq( false, BOOL.Eq ),
		conduiteAccompagneeMaif:          V.nil,
		conduiteAccompagneeMaifAvant2007: V.nil,
	} ),
	V.record( {
		conduiteAccompagnee:              V.eq( true, BOOL.Eq ),
		conduiteAccompagneeMaif:          V.boolean,
		conduiteAccompagneeMaifAvant2007: V.boolean,
	} ),
)

// validation array
// @todo: validation dependant fields || nested fields
const schema = V.sequence(
	V.record( {
		dateAnterioriteBonus050:            V.date,
		coefficientBonusMalus:              V.number,
		dateSouscriptionAncienAssureur:     V.date,
		dateDEcheanceAncienAssureur:        V.date,
		conduiteAccompagnee:                V.boolean,
		conduiteAccompagneeMaif:            V.either( V.nil, V.boolean ),
		conduiteAccompagneeMaifAvant2007:   V.either( V.nil, V.boolean ),
		sinistreAvecCirconstanceAggravante: V.boolean,
		retraitPermis:                      V.boolean,
		resiliationAssureurPrecedent:       V.boolean,
		sinistres:                          V.array( V.record( { dateSurvenance: V.date, codeResponsabilite: V.string } ) ),
		// conduiteAccompagnee2:               V.either(
		// 	V.nil,
		// 	V.record( {
		// 		conduiteAccompagneeMaif:          V.boolean,
		// 		conduiteAccompagneeMaifAvant2007: V.boolean,
		// 	} ),
		// ),
	} ),
	V.given(
		values => values.conduiteAccompagnee === true,
		V.contramap( pick( [ "conduiteAccompagneeMaifAvant2007", "conduiteAccompagneeMaif" ] ), V.record( {
			conduiteAccompagneeMaifAvant2007: V.boolean,
			conduiteAccompagneeMaif:          V.boolean,
		} ) ),
	),
)

// @todo: alt
// @todo: message
// @todo: use either for ca
const PasseAssure: PasseAssureStep = ( props ) => {
	const [ _values, form ] = useForm( {
		defaultValue: {},
		schema,
		onSubmit:     values => props.onConfirm( {
			...values,
			conduiteAccompagneeMaif:          values.conduiteAccompagneeMaif || false,
			conduiteAccompagneeMaifAvant2007: values.conduiteAccompagneeMaifAvant2007 || false,
		} ),
	} )
	
	return (
		<form {...form.props}>
			<FormTitle>Le passé du conducteur</FormTitle>
			{form.isValid && <FormSubmitButton disabled={form.isPending}>Valider</FormSubmitButton>}
		</form>
	)
}

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

const stepOverride: Step | undefined =
	      // undefined
	      // {type: "identification-vehicule", data: {codeTypeVehicule: "1234"}}
	      // { type: "usage-vehicule", data: { codeTypeVehicule: "code_type_vehicule", numeroRepertoire: "1234", anneeMiseEnCirculationVehicule: 2020 } }
	      { type: "identification-conducteur", data: { codeTypeVehicule: "code_type_vehicule", numeroRepertoire: "1234", anneeMiseEnCirculationVehicule: 2020, leasingOuCreditEnCours: false, dateEffetContratDesiree: new Date(), codeUsageVehicule: "1234" } }

const initialState: Step = stepOverride || { type: "init-parcours" }

// @todo: allow going back to previous step
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
							anneeMiseEnCirculationVehicule={step.data.anneeMiseEnCirculationVehicule}
							numeroRepertoire={step.data.numeroRepertoire}
							onConfirm={values => setNextStep( { type: "identification-conducteur", data: { ...step.data, ...values } } )}
						/>
					case "identification-conducteur":
						return <IdentificationConducteur
							numeroRepertoire={step.data.numeroRepertoire}
							onConfirm={
								values => setNextStep( { type: "passe-assure", data: { ...step.data, ...values } } )
							}
						/>
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

