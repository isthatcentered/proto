import { IdentificationVehiculeStep } from "../../../contracts"
import { ButtonRadioSelect, NumberInput, Select, useForm } from "../../../kit-2/forms"
import * as VEHICULES from "../../../queries/vehicules"
import * as E from "fp-ts/Either"
import React from "react"
import { FormSubmitButton, FormTitle } from "../../../kit-2/shared"
import * as V from "../../../kit-2/validation"
import { useCarosseries, useEnergies, useFamilles, useFinitions, useMarques, useMotorisations, useNombrePortes, useTransmissions } from "./queries"




const usePageData = ( values: V.ValidatedType<typeof schema> ) => {
	const marques              = useMarques(),
	      familles             = useFamilles( {
		      listeAnneesCirculation: [ values.anneeMiseEnCirculation ],
		      listeCodesMarque:       [ values.codeMarque ],
	      } ),
	      energies             = useEnergies( {
		      listeAnneesCirculation: [ values.anneeMiseEnCirculation ],
		      listeCodesMarque:       [ values.codeMarque ],
		      listeCodesFamille:      [ values.codeFamille ],
	      } ),
	      transmissions        = useTransmissions( {
		      listeAnneesCirculation: [ values.anneeMiseEnCirculation ],
		      listeCodesMarque:       [ values.codeMarque ],
		      listeCodesFamille:      [ values.codeFamille ],
		      listeCodesEnergie:      [ values.codeEnergie ],
	      } ),
	      motorisations        = useMotorisations( {
		      listeAnneesCirculation: [ values.anneeMiseEnCirculation ],
		      listeCodesMarque:       [ values.codeMarque ],
		      listeCodesFamille:      [ values.codeFamille ],
		      listeCodesEnergie:      [ values.codeEnergie ],
		      listeCodesTransmission: [ values.codeTransmission ],
	      } ),
	      carosseries          = useCarosseries( {
		      listeAnneesCirculation:    [ values.anneeMiseEnCirculation ],
		      listeCodesMarque:          [ values.codeMarque ],
		      listeCodesFamille:         [ values.codeFamille ],
		      listeCodesEnergie:         [ values.codeEnergie ],
		      listeCodesTransmission:    [ values.codeTransmission ],
		      listeLibellesMotorisation: [ values.codeMotorisation ],
	      } ),
	      configurationsPortes = useNombrePortes( {
		      listeAnneesCirculation:    [ values.anneeMiseEnCirculation ],
		      listeCodesMarque:          [ values.codeMarque ],
		      listeCodesFamille:         [ values.codeFamille ],
		      listeCodesEnergie:         [ values.codeEnergie ],
		      listeCodesTransmission:    [ values.codeTransmission ],
		      listeLibellesMotorisation: [ values.codeMotorisation ],
		      listeCodesCarrosserie:     [ values.codeCarosserie ],
	      } ),
	      finitions            = useFinitions( {
		      listeAnneesCirculation:    [ values.anneeMiseEnCirculation ],
		      listeCodesMarque:          [ values.codeMarque ],
		      listeCodesFamille:         [ values.codeFamille ],
		      listeCodesEnergie:         [ values.codeEnergie ],
		      listeCodesTransmission:    [ values.codeTransmission ],
		      listeLibellesMotorisation: [ values.codeMotorisation ],
		      listeCodesCarrosserie:     [ values.codeCarosserie ],
		      listeNombresPortes:        [ values.codeConfigurationPortes ],
	      } )
	
	return {
		marques,
		familles,
		energies,
		transmissions,
		motorisations,
		carosseries,
		configurationsPortes,
		finitions,
	}
}



const schema = V.struct( {
	codeMarque:              V.nonEmptyString,
	anneeMiseEnCirculation:  V.andThen( V.number, V.between( 1900, new Date().getFullYear() ) ),
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
const IdentificationAuto: IdentificationVehiculeStep = ( props ) => {
	const [ _values, form ] = useForm( {
		defaultValue: {},
		schema,
		onSubmit:     values =>
			              VEHICULES.getAcceptation( { numeroRepertoire: values.codeFinition } )
				              .then( E.foldW( () => {
						              // @todo: display vehicule refused error
					              }, () =>
						              props.onConfirm( {
							              anneeMiseEnCirculationVehicule: values.anneeMiseEnCirculation,
							              numeroRepertoire:               values.codeFinition,
						              } ),
				              ) ),
	} )
	
	const data = usePageData( _values as V.ValidatedType<typeof schema> )
	
	return (
		<form {...form.props}>
			<FormTitle>Votre véhicule</FormTitle>
			<Select
				className="mb-8"
				label="Marque de votre véhicule :"
				data={data.marques}
				{...form.connect( [ "codeMarque" ] )}
			/>
			
			<NumberInput
				{...form.connect( [ "anneeMiseEnCirculation" ] )}
				className="mb-8"
				label="Date de 1ère mise en circulation"
				max={new Date().getFullYear()}
				placeholder="2020"
			/>
			
			<Select
				className="mb-8"
				label="Modèle de votre véhicule :"
				data={data.familles}
				{...form.connect( [ "codeFamille" ] )}
			/>
			
			{/* @note: Maif does essence, diesel, autre */}
			<ButtonRadioSelect
				{...form.connect( [ "codeEnergie" ] )}
				className="mb-8"
				data={data.energies}
				label="Énergie :"
			/>
			
			{/* @note: Maif does Boite manuelle ? Oui/non */}
			<ButtonRadioSelect
				{...form.connect( [ "codeTransmission" ] )}
				className="mb-8"
				data={data.transmissions}
				label="Transmission :"
			/>
			
			<Select
				className="mb-8"
				label="Motorisation :"
				data={data.motorisations}
				{...form.connect( [ "codeMotorisation" ] )}
			/>
			
			{/* @note: Maif does Berline/autres */}
			<ButtonRadioSelect
				{...form.connect( [ "codeCarosserie" ] )}
				className="mb-8"
				data={data.carosseries}
				label="Type de carosserie :"
			/>
			
			<ButtonRadioSelect
				{...form.connect( [ "codeConfigurationPortes" ] )}
				className="mb-8"
				data={data.configurationsPortes}
				label="Nombre de portes :"
			/>
			
			<Select
				className="mb-8"
				label="Finition :"
				data={data.finitions}
				{...form.connect( [ "codeFinition" ] )}
			/>
			
			{form.isValid && (
				<FormSubmitButton disabled={form.isPending}>
					Valider
				</FormSubmitButton>)}
		</form>)
}

export default IdentificationAuto
