import { IdentificationVehiculeStep, StepProps } from "../../../contracts"
import * as VEHICULES from "../../../queries/vehicules"
import * as E from "fp-ts/Either"
import React from "react"
import { FormSubmitButton, FormTitle, Grid } from "../../../kit-2/shared"
import * as V from "../../../kit-2/validation"
import { useCarosseries, useEnergies, useFamilles, useFinitions, useMarques, useMotorisations, useNombrePortes, useTransmissions } from "./queries"
import * as Y from "../../../kit-2/yup"
import { pipe } from "fp-ts/function"
import { withFormik } from "formik"
import * as yup from "yup"
import { StepForm } from "../../init-parcours"
import { getConnect, Input2, RadioButton, RadioSelect, Select2 } from "../../../kit-2/forms-2"
import { useJouerAcceptationVehicule } from "../../../__gen/iard-devis-vehicules-v1/acceptation-risque-véhicule"




const usePageData = ( values: yup.Asserts<typeof schema2> ) => {
	 const marques              = useMarques(),
				 familles             = useFamilles( {
						listeAnneesCirculation: [ values.anneeMiseEnCirculationVehicule ],
						listeCodesMarque:       [ values.codeMarque ],
				 } ),
				 energies             = useEnergies( {
						listeAnneesCirculation: [ values.anneeMiseEnCirculationVehicule ],
						listeCodesMarque:       [ values.codeMarque ],
						listeCodesFamille:      [ values.codeFamille ],
				 } ),
				 transmissions        = useTransmissions( {
						listeAnneesCirculation: [ values.anneeMiseEnCirculationVehicule ],
						listeCodesMarque:       [ values.codeMarque ],
						listeCodesFamille:      [ values.codeFamille ],
						listeCodesEnergie:      [ values.codeEnergie ],
				 } ),
				 motorisations        = useMotorisations( {
						listeAnneesCirculation: [ values.anneeMiseEnCirculationVehicule ],
						listeCodesMarque:       [ values.codeMarque ],
						listeCodesFamille:      [ values.codeFamille ],
						listeCodesEnergie:      [ values.codeEnergie ],
						listeCodesTransmission: [ values.codeTransmission ],
				 } ),
				 carosseries          = useCarosseries( {
						listeAnneesCirculation:    [ values.anneeMiseEnCirculationVehicule ],
						listeCodesMarque:          [ values.codeMarque ],
						listeCodesFamille:         [ values.codeFamille ],
						listeCodesEnergie:         [ values.codeEnergie ],
						listeCodesTransmission:    [ values.codeTransmission ],
						listeLibellesMotorisation: [ values.codeMotorisation ],
				 } ),
				 configurationsPortes = useNombrePortes( {
						listeAnneesCirculation:    [ values.anneeMiseEnCirculationVehicule ],
						listeCodesMarque:          [ values.codeMarque ],
						listeCodesFamille:         [ values.codeFamille ],
						listeCodesEnergie:         [ values.codeEnergie ],
						listeCodesTransmission:    [ values.codeTransmission ],
						listeLibellesMotorisation: [ values.codeMotorisation ],
						listeCodesCarrosserie:     [ values.codeCarosserie ],
				 } ),
				 finitions            = useFinitions( {
						listeAnneesCirculation:    [ values.anneeMiseEnCirculationVehicule ],
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


const schema2 = Y.struct( {
	 codeMarque:                     Y.nonEmptyString(),
	 anneeMiseEnCirculationVehicule: Y.numberBetween( 1900, new Date().getFullYear() ),
	 codeFamille:                    Y.nonEmptyString(),
	 codeEnergie:                    Y.nonEmptyString(),
	 codeTransmission:               Y.nonEmptyString(),
	 codeMotorisation:               Y.nonEmptyString(),
	 codeCarosserie:                 Y.nonEmptyString(),
	 codeConfigurationPortes:        Y.nonEmptyString(),
	 numeroRepertoire:               Y.nonEmptyString(),
} )

// @todo: Identify via registration plate
// @todo: Select item automatically if only one choice (keep visible, just check it and store value)
const _IdentificationAuto: StepForm<IdentificationVehiculeStep, yup.Asserts<typeof schema2>> = ( props ) => {
	 const connect = getConnect( props )
	 const data    = usePageData( props.values )
	 
	 return (
			<form onSubmit={props.handleSubmit}>
				 <FormTitle>Votre véhicule</FormTitle>
				 <Select2
						label="Marque de votre véhicule :"
						data={data.marques}
						{...connect( "codeMarque" )}
				 />
				 
				 <div className="pt-8"/>
				 
				 <Input2
						{...connect( "anneeMiseEnCirculationVehicule" )}
						type="number"
						label="Date de 1ère mise en circulation"
						max={new Date().getFullYear()}
						placeholder="2020"
				 />
				 
				 <div className="pt-8"/>
				 
				 <Select2
						label="Modèle de votre véhicule :"
						data={data.familles}
						{...connect( "codeFamille" )}
				 />
				 
				 <div className="pt-8"/>
				 
				 {/* @note: Maif does essence, diesel, autre */}
				 <Select2
						label="Énergie :"
						data={data.energies}
						{...connect( "codeEnergie" )}
				 />
				 
				 <div className="pt-8"/>
				 
				 
				 {/* @note: Maif does Boite manuelle ? Oui/non */}
				 <Select2
						label="Transmission :"
						data={data.transmissions}
						{...connect( "codeTransmission" )}
				 />
				 
				 <div className="pt-8"/>
				 
				 <Select2
						label="Motorisation :"
						data={data.motorisations}
						{...connect( "codeMotorisation" )}
				 />
				 
				 <div className="pt-8"/>
				 
				 {/* @note: Maif does Berline/autres */}
				 <Select2
						label="Type de carosserie :"
						data={data.carosseries}
						{...connect( "codeCarosserie" )}
				 />
				 
				 <div className="pt-8"/>
				 
				 <RadioSelect
						{...connect( "codeConfigurationPortes" )}
						data={data.configurationsPortes}
						label="Nombre de portes :"
						component={RadioButton}
						wrapper={props => <Grid cols={3} {...props}/>}
				 />
				 
				 <div className="pt-8"/>
				 
				 <Select2
						label="Finition :"
						data={data.finitions}
						{...connect( "numeroRepertoire" )}
				 />
				 
				 <div className="pt-8"/>
				 
				 {props.isValid && (
						<FormSubmitButton disabled={props.isSubmitting}>
							 Valider
						</FormSubmitButton>)}
			</form>)
}


const IdentificationAuto = pipe(
	 _IdentificationAuto,
	 withFormik<StepProps<IdentificationVehiculeStep>, yup.Asserts<typeof schema2>>( {
			mapPropsToValues: () => ({
				 codeMarque:                     undefined!,
				 anneeMiseEnCirculationVehicule: undefined!,
				 codeFamille:                    undefined!,
				 codeEnergie:                    undefined!,
				 codeTransmission:               undefined!,
				 codeMotorisation:               undefined!,
				 codeCarosserie:                 undefined!,
				 codeConfigurationPortes:        undefined!,
				 numeroRepertoire:               undefined!,
			}),
			validationSchema: schema2,
			handleSubmit:     ( values, { props } ) =>
													 // @todo: get acceptation
													 VEHICULES.getAcceptation( { numeroRepertoire: values.numeroRepertoire } )
															.then( E.foldW( () => {
																		// @todo: display vehicule refused error
																 }, () =>
																		props.onConfirm( {
																			 anneeMiseEnCirculationVehicule: values.anneeMiseEnCirculationVehicule,
																			 numeroRepertoire:               values.numeroRepertoire,
																		} ),
															) ),
			
			
	 } ),
)

export default IdentificationAuto
