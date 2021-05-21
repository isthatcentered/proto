import React, { useState } from "react";
import ReactDOM from "react-dom";
import InitParcours from "./steps/init-parcours"
import { IdentificationConducteurStep, IdentificationVehiculeStep, InitParcoursStep, StepOut, UsageVehiculeStep } from "./contracts"
import * as REMOTE from "./kit-2/remote"
import { Code, Kinda } from "./kit-2/helpers"
import * as yup from "yup"
import * as AUTOS from "./queries/autos"
import { ButtonRadioSelect, NumberInput, Select, useForm } from "./kit-2/forms"




type Parameter<T extends ( ...args: any[] ) => any> = Parameters<T>[0]

const useMarquesVehicule = () => {
	const state = REMOTE.success( [
		{ value: "683", label: "RENAULT" },
		{ value: "391", label: "VOLKSWAGEN" },
		{ value: "212", label: "AUDI" },
		{ value: "66", label: "BMW" },
		{ value: "219", label: "PEUGEOT" },
	] as Code<string>[] )
	return [ state ] as const
}

type UseQueryParams<T> =
	| { active: true, params: T }
	| { active: false }

const useFamillesVehicule = ( _params: Kinda<Parameter<typeof AUTOS.getFamilles>> ) => {
	// @todo: validate params
	// @todo: query
	const state = REMOTE.success( [
		{ value: "2554", label: "MEGANE" },
		{ value: "2553", label: "MASTER" },
		{ value: "2535", label: "CLIO" },
		{ value: "100000007829", label: "CAPTUR" },
	] as Code<string>[] )
	return [ state ] as const
}

const useEnergiesVehicule = ( _params: Kinda<Parameter<typeof AUTOS.getEnergies>> ) => {
	// @todo: validate params
	// @todo: query
	const state = REMOTE.success( [
		{ value: "1", label: "Essence" },
		{ value: "2", label: "Diesel" },
		{ value: "5", label: "Hybride essence" },
		{ value: "3", label: "G.P.L." },
	] as Code<string>[] )
	return [ state ] as const
}

const useTransmissionsVehicule = ( _params: Kinda<Parameter<typeof AUTOS.getTransmissions>> ) => {
	// @todo: validate params
	// @todo: query
	const state = REMOTE.success( [
		{ value: "1", label: "Boîte manuelle" },
		{ value: "3", label: "Boîte robotisée" },
	] as Code<string>[] )
	return [ state ] as const
}

const useMotorisationsVehicule = ( _params: Kinda<Parameter<typeof AUTOS.getMotorisations>> ) => {
	// @todo: validate params
	// @todo: query
	const state = REMOTE.success( [
		{ value: "1.3 TCE 140 CH", label: "1.3 TCE 140 CH" },
		{ value: "1.3 TCE 115 CH", label: "1.3 TCE 115 CH" },
		{ value: "1.3 TCE 160 CH", label: "1.3 TCE 160 CH" },
		{ value: "1.8 TCE 300 CH", label: "1.8 TCE 300 CH" },
		{ value: "1.8 TCE 280 CH", label: "1.8 TCE 280 CH" },
		{ value: "1.6 SCE 115 CH", label: "1.6 SCE 115 CH" },
		{ value: "2.0 150 CH", label: "2.0 150 CH" },
	] as Code<string>[] )
	return [ state ] as const
}

const useCarosseriesVehicule = ( _params: Kinda<Parameter<typeof AUTOS.getTypesCarosserie>> ) => {
	// @todo: validate params
	// @todo: query
	const state = REMOTE.success( [
		{ value: "01", label: "Berline" },
		{ value: "03", label: "Break" },
	] as Code<string>[] )
	return [ state ] as const
}

const useConfigurationsPortesVehicule = ( _params: Kinda<Parameter<typeof AUTOS.getConfigurationsPortes>> ) => {
	// @todo: validate params
	// @todo: query
	const state = REMOTE.success( [
		{ value: "5", label: "5" },
	] as Code<string>[] )
	return [ state ] as const
}

const useFinitionsVehicule = ( _params: Kinda<Parameter<typeof AUTOS.getFinitions>> ) => {
	// @todo: validate params
	// @todo: query
	const state = REMOTE.success( [
		{ value: "C0781", label: "MEGANE IV 1.3 TCE 140 CH ZEN" },
		{ value: "C0778", label: "MEGANE IV 1.3 TCE 140 CH INTENS" },
		{ value: "C0780", label: "MEGANE IV 1.3 TCE 140 CH LIMITED" },
		{ value: "C2302", label: "MEGANE IV 1.3 TCE 140 CH BUSINESS" },
		{ value: "C2303", label: "MEGANE IV 1.3 TCE 140 CH BUSINESS INTENS" },
		{ value: "C9769", label: "MEGANE IV 1.3 TCE 140 CH GT LINE" },
		{ value: "E0402", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH INTENS" },
		{ value: "E0403", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH EXPORT" },
		{ value: "E0404", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH RS LINE" },
	] as Code<string>[] )
	return [ state ] as const
}

const schema = yup.object( {
	codeMarque:              yup.string().required(),
	anneeMiseEnCirculation:  yup.number().required(),
	codeFamille:             yup.string().required(),
	codeEnergie:             yup.string().required(),
	codeTransmission:        yup.string().required(),
	codeMotorisation:        yup.string().required(),
	codeCarosserie:          yup.string().required(),
	codeConfigurationPortes: yup.string().required(),
	codeFinition:            yup.string().required(),
} )


// @todo: Identify via registration plate
const IdentificationVehicule: IdentificationVehiculeStep = ( props ) => {
	const [ values, formState, { form, field } ] = useForm( {
		defaultValue: {},
		schema,
		onSubmit:     values =>
			              props.onConfirm( {
				              anneeMiseEnCirculationVehicule: values.anneeMiseEnCirculation,
				              numeroRepertoire:               values.codeFinition,
			              } ),
	} )
	
	console.log( values )
	
	const [ marquesVehicule ] = useMarquesVehicule()
	const [ famillesVehicule ] = useFamillesVehicule( values )
	const [ energiesVehicule ] = useEnergiesVehicule( values )
	const [ transmissionsVehicule ] = useTransmissionsVehicule( values )
	const [ motorisationsVehicule ] = useMotorisationsVehicule( values )
	const [ carosseriesVehicule ] = useCarosseriesVehicule( values )
	const [ configurationsPortesVehicule ] = useConfigurationsPortesVehicule( values )
	const [ finitionsVehicule ] = useFinitionsVehicule( values )
	
	return (
		<div>
			<Select
				className="mb-8"
				label="Marque de votre véhicule :"
				data={marquesVehicule}
				{...field( "codeMarque" )}
			/>
			
			<NumberInput
				{...field( "anneeMiseEnCirculation" )}
				className="mb-8"
				label="Date de 1ère mise en circulation"
			/>
			
			<Select
				className="mb-8"
				label="Modèle de votre véhicule :"
				data={famillesVehicule}
				{...field( "codeFamille" )}
			/>
			
			{/* @note: Maif does essence, diesel, autre */}
			<ButtonRadioSelect
				{...field( "codeEnergie" )}
				className="mb-8"
				data={energiesVehicule}
				label="Énergie :"
			/>
			
			{/* @note: Maif does Boite manuelle ? Oui/non */}
			<ButtonRadioSelect
				{...field( "codeTransmission" )}
				className="mb-8"
				data={transmissionsVehicule}
				label="Transmission :"
			/>
			
			<Select
				className="mb-8"
				label="Motorisation :"
				data={motorisationsVehicule}
				{...field( "codeMotorisation" )}
			/>
			
			{/* @note: Maif does Berline/autres */}
			<ButtonRadioSelect
				{...field( "codeCarosserie" )}
				className="mb-8"
				data={carosseriesVehicule}
				label="Type de carosserie :"
			/>
			
			<ButtonRadioSelect
				{...field( "codeConfigurationPortes" )}
				className="mb-8"
				data={configurationsPortesVehicule}
				label="Nombre de portes :"
			/>
			
			<Select
				className="mb-8"
				label="Finition :"
				data={finitionsVehicule}
				{...field( "codeFinition" )}
			/>
			
			véhicule accepté ? go next
		</div>)
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

const stepOverride: Step = { type: "identification-vehicule", data: { codeTypeVehicule: "code_type_vehicule" } }

const initialState: Step = stepOverride || { type: "init-parcours" }

const App = () => {
	const [ step, setNextStep ] = useState<Step>( initialState )
	
	return (
		<div
			className="container mx-auto px-4 pt-4"
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
						return null
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

