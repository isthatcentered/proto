import { Parameter, useFakeTask, UseQueryParams } from "../kit-2/use-task"
import * as AUTOS from "../queries/autos"
import * as VEHICULES from "../queries/vehicules"
import { Code } from "../kit-2/helpers"
import { IdentificationVehiculeStep } from "../contracts"
import { ButtonRadioSelect, NumberInput, Select, useForm } from "../kit-2/forms"
import { constant, pipe } from "fp-ts/function"
import { ClickableStyles, SectionHeaderStyles } from "../kit-2/shared"
import React, { useEffect } from "react"
import * as REMOTE from "../kit-2/remote"
import * as V from "../kit-2/validation"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"




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

const useFamillesVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getFamilles>> ) => {
	// @todo: query
	return useFakeTask( AUTOS.getFamilles, params, [
		{ value: "2554", label: "MEGANE" },
		{ value: "2553", label: "MASTER" },
		{ value: "2535", label: "CLIO" },
		{ value: "100000007829", label: "CAPTUR" },
	] )
}

const useEnergiesVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getEnergies>> ) => {
	// @todo: query
	const mock = [
		{ value: "1", label: "Essence" },
		{ value: "2", label: "Diesel" },
		{ value: "5", label: "Hybride essence" },
		{ value: "3", label: "G.P.L." },
	] as Code<string>[]
	return useFakeTask( AUTOS.getEnergies, params, mock )
}

const useTransmissionsVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getTransmissions>> ) => {
	// @todo: query
	const mock = [
		{ value: "1", label: "Boîte manuelle" },
		{ value: "3", label: "Boîte robotisée" },
	] as Code<string>[]
	return useFakeTask( AUTOS.getTransmissions, params, mock )
}

const useMotorisationsVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getMotorisations>> ) => {
	// @todo: query
	const mock = [
		{ value: "1.3 TCE 140 CH", label: "1.3 TCE 140 CH" },
		{ value: "1.3 TCE 115 CH", label: "1.3 TCE 115 CH" },
		{ value: "1.3 TCE 160 CH", label: "1.3 TCE 160 CH" },
		{ value: "1.8 TCE 300 CH", label: "1.8 TCE 300 CH" },
		{ value: "1.8 TCE 280 CH", label: "1.8 TCE 280 CH" },
		{ value: "1.6 SCE 115 CH", label: "1.6 SCE 115 CH" },
		{ value: "2.0 150 CH", label: "2.0 150 CH" },
	] as Code<string>[]
	return useFakeTask( AUTOS.getMotorisations, params, mock )
}

const useCarosseriesVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getTypesCarosserie>> ) => {
	// @todo: query
	const mock = [
		{ value: "01", label: "Berline" },
		{ value: "03", label: "Break" },
	] as Code<string>[]
	return useFakeTask( AUTOS.getTypesCarosserie, params, mock )
}

const useConfigurationsPortesVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getConfigurationsPortes>> ) => {
	// @todo: query
	const mock = [
		{ value: "5", label: "5" },
	] as Code<string>[]
	return useFakeTask( AUTOS.getConfigurationsPortes, params, mock )
}

const useFinitionsVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getFinitions>> ) => {
	// @todo: query
	const mock = [
		{ value: "C0781", label: "MEGANE IV 1.3 TCE 140 CH ZEN" },
		{ value: "C0778", label: "MEGANE IV 1.3 TCE 140 CH INTENS" },
		{ value: "C0780", label: "MEGANE IV 1.3 TCE 140 CH LIMITED" },
		{ value: "C2302", label: "MEGANE IV 1.3 TCE 140 CH BUSINESS" },
		{ value: "C2303", label: "MEGANE IV 1.3 TCE 140 CH BUSINESS INTENS" },
		{ value: "C9769", label: "MEGANE IV 1.3 TCE 140 CH GT LINE" },
		{ value: "E0402", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH INTENS" },
		{ value: "E0403", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH EXPORT" },
		{ value: "E0404", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH RS LINE" },
	] as Code<string>[]
	return useFakeTask( AUTOS.getFinitions, params, mock )
}

const schema = V.record( {
	codeMarque:              V.nonEmptyString,
	anneeMiseEnCirculation:  V.sequence( V.number, V.between( 1980, new Date().getFullYear() ) ),
	codeFamille:             V.nonEmptyString,
	codeEnergie:             V.nonEmptyString,
	codeTransmission:        V.nonEmptyString,
	codeMotorisation:        V.nonEmptyString,
	codeCarosserie:          V.nonEmptyString,
	codeConfigurationPortes: V.nonEmptyString,
	codeFinition:            V.nonEmptyString,
} )

// @todo: Identify via registration plate
// @todo: Select item automatically if only one choice (keep visible, just check it and store value)
const IdentificationVehicule: IdentificationVehiculeStep = ( props ) => {
	const [ _values, form ] = useForm( {
		defaultValue: {},
		schema,
		onSubmit:     values =>
			              VEHICULES.getAcceptation( values.codeFinition )
				              .then( E.foldW( () => {
						              // @todo: display vehicule refused error
					              }, () =>
						              props.onConfirm( {
							              anneeMiseEnCirculationVehicule: values.anneeMiseEnCirculation,
							              numeroRepertoire:               values.codeFinition,
						              } ),
				              ) ),
	} )
	
	useEffect( () => {
		AUTOS.getMarques( {} ).then( console.log ).catch(console.log )
	}, [] )
	
	
	const [ marquesVehicule ] = useMarquesVehicule()
	const [ famillesVehicule ] = useFamillesVehicule(
		pipe(
			form.pickValids( [ "anneeMiseEnCirculation", "codeMarque" ] ),
			O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
		),
	)
	const [ energiesVehicule ] = useEnergiesVehicule(
		pipe(
			form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille" ] ),
			O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
		),
	)
	const [ transmissionsVehicule ] = useTransmissionsVehicule(
		pipe(
			form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie" ] ),
			O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
		),
	)
	const [ motorisationsVehicule ] = useMotorisationsVehicule(
		pipe(
			form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie", "codeTransmission" ] ),
			O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
		),
	)
	const [ carosseriesVehicule ] = useCarosseriesVehicule(
		pipe(
			form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie", "codeTransmission", "codeMotorisation" ] ),
			O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
		),
	)
	const [ configurationsPortesVehicule ] = useConfigurationsPortesVehicule(
		pipe(
			form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie", "codeTransmission", "codeMotorisation", "codeCarosserie" ] ),
			O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
		),
	)
	const [ finitionsVehicule ] = useFinitionsVehicule(
		pipe(
			form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie", "codeTransmission", "codeMotorisation", "codeCarosserie", "codeConfigurationPortes" ] ),
			O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
		),
	)
	
	return (
		<form {...form.props}>
			<h2 className="mb-8"><SectionHeaderStyles>Votre véhicule</SectionHeaderStyles></h2>
			<Select
				className="mb-8"
				label="Marque de votre véhicule :"
				data={marquesVehicule}
				{...form.field( "codeMarque" )}
			/>
			
			<NumberInput
				{...form.field( "anneeMiseEnCirculation" )}
				className="mb-8"
				label="Date de 1ère mise en circulation"
				max={new Date().getFullYear()}
				placeholder="2020"
			/>
			
			<Select
				className="mb-8"
				label="Modèle de votre véhicule :"
				data={famillesVehicule}
				{...form.field( "codeFamille" )}
			/>
			
			{/* @note: Maif does essence, diesel, autre */}
			<ButtonRadioSelect
				{...form.field( "codeEnergie" )}
				className="mb-8"
				data={energiesVehicule}
				label="Énergie :"
			/>
			
			{/* @note: Maif does Boite manuelle ? Oui/non */}
			<ButtonRadioSelect
				{...form.field( "codeTransmission" )}
				className="mb-8"
				data={transmissionsVehicule}
				label="Transmission :"
			/>
			
			<Select
				className="mb-8"
				label="Motorisation :"
				data={motorisationsVehicule}
				{...form.field( "codeMotorisation" )}
			/>
			
			{/* @note: Maif does Berline/autres */}
			<ButtonRadioSelect
				{...form.field( "codeCarosserie" )}
				className="mb-8"
				data={carosseriesVehicule}
				label="Type de carosserie :"
			/>
			
			<ButtonRadioSelect
				{...form.field( "codeConfigurationPortes" )}
				className="mb-8"
				data={configurationsPortesVehicule}
				label="Nombre de portes :"
			/>
			
			<Select
				className="mb-8"
				label="Finition :"
				data={finitionsVehicule}
				{...form.field( "codeFinition" )}
			/>
			
			{form.isValid && (
				<button
					type="submit"
					disabled={form.isPending}
				>
					<ClickableStyles>Valider</ClickableStyles>
				</button>)}
		</form>)
}

export default IdentificationVehicule
