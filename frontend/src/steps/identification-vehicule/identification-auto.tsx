import { IdentificationVehiculeStep } from "../../contracts"
import { ButtonRadioSelect, NumberInput, Select, useForm } from "../../kit-2/forms"
import * as VEHICULES from "../../queries/vehicules"
import * as E from "fp-ts/Either"
import React, { useMemo } from "react"
import * as AUTOS from "../../queries/autos"
import { constant, pipe } from "fp-ts/function"
import * as O from "fp-ts/Option"
import { FormSubmitButton, FormTitle } from "../../kit-2/shared"
import { Parameter, useFakeTask, UseQueryParams } from "../../kit-2/use-task"
import { Code, pick } from "../../kit-2/helpers"
import * as REMOTE from "../../kit-2/remote"
import * as V from "../../kit-2/validation"

import * as A2 from "../../__gen/referentiel-modeles-vehicules/autos"
import { UseQueryOptions, UseQueryResult } from "react-query"
import { AxiosResponse } from "axios"
import {
	RecupererListeAutosParams,
	RecupererListeCarrosseriesAutosParams,
	RecupererListeEnergiesAutosParams,
	RecupererListeFamillesAutosParams,
	RecupererListeMotorisationsAutosParams,
	RecupererListeNbPortesAutosParams,
	RecupererListeTransmissionsAutosParams,
} from "../../__gen/referentiel-modeles-vehicules/referentiel-modeles-vehicules.schemas"
import * as AR from "fp-ts/Array"



//
// const useMarquesVehicule = () => {
// 	const state = REMOTE.success( [
// 		{ value: "683", label: "RENAULT" },
// 		{ value: "391", label: "VOLKSWAGEN" },
// 		{ value: "212", label: "AUDI" },
// 		{ value: "66", label: "BMW" },
// 		{ value: "219", label: "PEUGEOT" },
// 	] as Code<string>[] )
// 	return [ state ] as const
// }
//
// const useFamillesVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getFamilles>> ) => {
// 	// @todo: query
// 	return useFakeTask( AUTOS.getFamilles, params, [
// 		{ value: "2554", label: "MEGANE" },
// 		{ value: "2553", label: "MASTER" },
// 		{ value: "2535", label: "CLIO" },
// 		{ value: "100000007829", label: "CAPTUR" },
// 	] )
// }
//
// const useEnergiesVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getEnergies>> ) => {
// 	// @todo: query
// 	const mock = [
// 		{ value: "1", label: "Essence" },
// 		{ value: "2", label: "Diesel" },
// 		{ value: "5", label: "Hybride essence" },
// 		{ value: "3", label: "G.P.L." },
// 	] as Code<string>[]
// 	return useFakeTask( AUTOS.getEnergies, params, mock )
// }
//
// const useTransmissionsVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getTransmissions>> ) => {
// 	// @todo: query
// 	const mock = [
// 		{ value: "1", label: "Boîte manuelle" },
// 		{ value: "3", label: "Boîte robotisée" },
// 	] as Code<string>[]
// 	return useFakeTask( AUTOS.getTransmissions, params, mock )
// }
//
// const useMotorisationsVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getMotorisations>> ) => {
// 	// @todo: query
// 	const mock = [
// 		{ value: "1.3 TCE 140 CH", label: "1.3 TCE 140 CH" },
// 		{ value: "1.3 TCE 115 CH", label: "1.3 TCE 115 CH" },
// 		{ value: "1.3 TCE 160 CH", label: "1.3 TCE 160 CH" },
// 		{ value: "1.8 TCE 300 CH", label: "1.8 TCE 300 CH" },
// 		{ value: "1.8 TCE 280 CH", label: "1.8 TCE 280 CH" },
// 		{ value: "1.6 SCE 115 CH", label: "1.6 SCE 115 CH" },
// 		{ value: "2.0 150 CH", label: "2.0 150 CH" },
// 	] as Code<string>[]
// 	return useFakeTask( AUTOS.getMotorisations, params, mock )
// }
//
// const useCarosseriesVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getTypesCarosserie>> ) => {
// 	// @todo: query
// 	const mock = [
// 		{ value: "01", label: "Berline" },
// 		{ value: "03", label: "Break" },
// 	] as Code<string>[]
// 	return useFakeTask( AUTOS.getTypesCarosserie, params, mock )
// }
//
// const useConfigurationsPortesVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getConfigurationsPortes>> ) => {
// 	// @todo: query
// 	const mock = [
// 		{ value: "5", label: "5" },
// 	] as Code<string>[]
// 	return useFakeTask( AUTOS.getConfigurationsPortes, params, mock )
// }
//
// const useFinitionsVehicule = ( params: UseQueryParams<Parameter<typeof AUTOS.getFinitions>> ) => {
// 	// @todo: query
// 	const mock = [
// 		{ value: "C0781", label: "MEGANE IV 1.3 TCE 140 CH ZEN" },
// 		{ value: "C0778", label: "MEGANE IV 1.3 TCE 140 CH INTENS" },
// 		{ value: "C0780", label: "MEGANE IV 1.3 TCE 140 CH LIMITED" },
// 		{ value: "C2302", label: "MEGANE IV 1.3 TCE 140 CH BUSINESS" },
// 		{ value: "C2303", label: "MEGANE IV 1.3 TCE 140 CH BUSINESS INTENS" },
// 		{ value: "C9769", label: "MEGANE IV 1.3 TCE 140 CH GT LINE" },
// 		{ value: "E0402", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH INTENS" },
// 		{ value: "E0403", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH EXPORT" },
// 		{ value: "E0404", label: "MEGANE IV (07/2020) 1.3 TCE 140 CH RS LINE" },
// 	] as Code<string>[]
// 	return useFakeTask( AUTOS.getFinitions, params, mock )
// }

const schema = V.struct( {
	codeMarque:              V.nonEmptyString,
	anneeMiseEnCirculation:  V.andThen( V.number, V.between( 1980, new Date().getFullYear() ) ),
	codeFamille:             V.nonEmptyString,
	codeEnergie:             V.nonEmptyString,
	codeTransmission:        V.nonEmptyString,
	codeMotorisation:        V.nonEmptyString,
	codeCarosserie:          V.nonEmptyString,
	codeConfigurationPortes: V.nonEmptyString,
	codeFinition:            V.nonEmptyString,
} )



const remoteFromQueryState = <E, A>( state: UseQueryResult<AxiosResponse<A>, E> ): REMOTE.Remote<E, A> => {
	switch ( state.status ) {
		case "idle":
			return REMOTE.initial
		case "loading":
			return REMOTE.pending
		case "error":
			return REMOTE.failure( state.error )
		case "success":
			return REMOTE.success( state.data.data )
	}
}

const decoder = V.partial( {
	listeCodesCategorie:       V.array( V.nonEmptyString ),
	listeCodesMarque:          V.array( V.nonEmptyString ),
	listeAnneesCirculation:    V.array( V.andThen( V.number, V.gte( 1900 ) ) ),
	listeCodesFamille:         V.array( V.nonEmptyString ),
	listeCodesEnergie:         V.array( V.nonEmptyString ),
	listeNombresPortes:        V.array( V.nonEmptyString ),
	listeCodesTransmission:    V.array( V.nonEmptyString ),
	listeLibellesMotorisation: V.array( V.nonEmptyString ),
	listeCodesCarrosserie:     V.array( V.nonEmptyString ),
} )


const useQueryResultAsSelectData = <E, A, B>( map: ( a: A ) => Code<B>, queryResult: UseQueryResult<AxiosResponse<A[]>, E> ): REMOTE.Remote<E, Code<B>[]> =>
	useMemo(
		() =>
			pipe(
				remoteFromQueryState( queryResult ),
				REMOTE.map( AR.map( map ) ),
			),
		[ queryResult.status ],
	)


type GeneratedReactQuery<TParams, TError, TResult> = ( params?: TParams, config?: { query?: UseQueryOptions<any, any, any> } ) => UseQueryResult<AxiosResponse<TResult>, TError>

const useValidatedQuery = <TParams extends Record<any, any>, TError, TResult>( params: TParams, validation: V.Validation<TParams, any>, query: GeneratedReactQuery<TParams, TError, TResult> ) => {
	const queryConfig: [ TParams, { query?: UseQueryOptions<any, any, any> } ] = pipe(
		validation.decode( params ),
		E.foldW(
			constant( [ undefined!, { query: { enabled: false as boolean } } ] ),
			params => [ params, { query: { enabled: true } } ],
		),
	)
	
	return query( ...queryConfig )
}

const useMarques = () => {
	const queryState = A2.useRecupererListeMarquesAutos()
	return useQueryResultAsSelectData( a => ({ label: a.libelleMarque, value: a.codeMarque }), queryState )
}

const useFamilles = ( params: RecupererListeFamillesAutosParams ) =>
	useQueryResultAsSelectData(
		a => ({ label: a.libelleFamille, value: a.codeFamille }),
		useValidatedQuery( params, decoder, A2.useRecupererListeFamillesAutos ),
	)


const useEnergies = ( params: RecupererListeEnergiesAutosParams ) =>
	useQueryResultAsSelectData(
		a => ({ label: a.libelleEnergie, value: a.codeEnergie }),
		useValidatedQuery( params, decoder, A2.useRecupererListeEnergiesAutos ),
	)

const useTransmissions = ( params: RecupererListeTransmissionsAutosParams ) =>
	useQueryResultAsSelectData(
		a => ({ label: a.libelleTransmission, value: a.codeTransmission }),
		useValidatedQuery( params, decoder, A2.useRecupererListeTransmissionsAutos ),
	)

const useMotorisations = ( params: RecupererListeMotorisationsAutosParams ) =>
	useQueryResultAsSelectData(
		a => ({ label: a.libelleMotorisation, value: a.libelleMotorisation }),
		useValidatedQuery( params, decoder, A2.useRecupererListeMotorisationsAutos ),
	)

const useNombrePortes = ( params: RecupererListeNbPortesAutosParams ) =>
	useQueryResultAsSelectData(
		a => ({ label: a.nombrePortes, value: a.nombrePortes }),
		useValidatedQuery( params, decoder, A2.useRecupererListeNbPortesAutos ),
	)

const useCarosseries = ( params: RecupererListeCarrosseriesAutosParams ) =>
	useQueryResultAsSelectData(
		a => ({ label: a.libelleCarrosserie, value: a.codeCarrosserie }),
		useValidatedQuery( params, decoder, A2.useRecupererListeCarrosseriesAutos ),
	)

const useFinitions = ( params: RecupererListeAutosParams ) =>
	useQueryResultAsSelectData(
		a => ({ label: a.libelleFamille, value: a.codeFamille }),
		useValidatedQuery( params, decoder, A2.useRecupererListeFamillesAutos ),
	)


const usePageData = ( form: V.ValidatedType<typeof schema> ) => {
	const params = {
		listeAnneesCirculation:    [ form.anneeMiseEnCirculation ],
		listeCodesMarque:          [ form.codeMarque ],
		listeCodesFamille:         [ form.codeFamille ],
		listeCodesEnergie:         [ form.codeEnergie ],
		listeCodesTransmission:    [ form.codeTransmission ],
		listeLibellesMotorisation: [ form.codeMotorisation ],
		listeCodesCarrosserie:     [ form.codeCarosserie ],
		listeNombresPortes:        [ form.codeConfigurationPortes ],
	}
	
	const marques              = useMarques(),
	      familles             = useFamilles( pipe( params, pick( [
		      "listeAnneesCirculation",
		      "listeCodesMarque",
	      ] ) ) ),
	      energies             = useEnergies( pipe( params, pick( [
		      "listeAnneesCirculation",
		      "listeCodesMarque",
		      "listeCodesFamille",
	      ] ) ) ),
	      transmissions        = useTransmissions( pipe( params, pick( [
		      "listeAnneesCirculation",
		      "listeCodesMarque",
		      "listeCodesFamille",
		      "listeCodesEnergie",
	      ] ) ) ),
	      motorisations        = useMotorisations( pipe( params, pick( [
		      "listeAnneesCirculation",
		      "listeCodesMarque",
		      "listeCodesFamille",
		      "listeCodesEnergie",
		      "listeCodesTransmission",
	      ] ) ) ),
	      carosseries          = useCarosseries( pipe( params, pick( [
		      "listeAnneesCirculation",
		      "listeCodesMarque",
		      "listeCodesFamille",
		      "listeCodesEnergie",
		      "listeCodesTransmission",
		      "listeLibellesMotorisation",
	      ] ) ) ),
	      configurationsPortes = useNombrePortes( pipe( params, pick( [
		      "listeAnneesCirculation",
		      "listeCodesMarque",
		      "listeCodesFamille",
		      "listeCodesEnergie",
		      "listeCodesTransmission",
		      "listeLibellesMotorisation",
		      "listeCodesCarrosserie",
	      ] ) ) ),
	      finitions            = useFinitions( params )
	
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
	
	const data = usePageData( _values as any )
	
	// const [ marquesVehicule ] = useMarquesVehicule()
	// const [ famillesVehicule ] = useFamillesVehicule(
	// 	pipe(
	// 		form.pickValids( [ "anneeMiseEnCirculation", "codeMarque" ] ),
	// 		O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
	// 	),
	// )
	// const [ energiesVehicule ] = useEnergiesVehicule(
	// 	pipe(
	// 		form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille" ] ),
	// 		O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
	// 	),
	// )
	// const [ transmissionsVehicule ] = useTransmissionsVehicule(
	// 	pipe(
	// 		form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie" ] ),
	// 		O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
	// 	),
	// )
	// const [ motorisationsVehicule ] = useMotorisationsVehicule(
	// 	pipe(
	// 		form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie", "codeTransmission" ] ),
	// 		O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
	// 	),
	// )
	// const [ carosseriesVehicule ] = useCarosseriesVehicule(
	// 	pipe(
	// 		form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie", "codeTransmission", "codeMotorisation" ] ),
	// 		O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
	// 	),
	// )
	// const [ configurationsPortesVehicule ] = useConfigurationsPortesVehicule(
	// 	pipe(
	// 		form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie", "codeTransmission", "codeMotorisation", "codeCarosserie" ] ),
	// 		O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
	// 	),
	// )
	// const [ finitionsVehicule ] = useFinitionsVehicule(
	// 	pipe(
	// 		form.pickValids( [ "anneeMiseEnCirculation", "codeMarque", "codeFamille", "codeEnergie", "codeTransmission", "codeMotorisation", "codeCarosserie", "codeConfigurationPortes" ] ),
	// 		O.foldW( constant( { active: false } ), values => ({ params: values, active: true }) ),
	// 	),
	// )
	
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
