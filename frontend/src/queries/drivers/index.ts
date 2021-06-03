import * as T from "fp-ts/Task"
import { crashOnError, iardDevisVehiculesClient, iardStringDate, nomenclatureToCode } from "../clients";
import { pipe } from "fp-ts/function";
import { Code } from "../../kit-2/helpers"
import { Parameter, useFakeTask, UseQueryParams } from "../../kit-2/use-task"
import { ConducteurAAssurer, VehiculeAAssurer } from "../../swagger/__generated__/iard-devis-vehicules"
import * as E from "fp-ts/Either"




const getTypesConducteurs: T.Task<Code<string>[]> =
	      pipe(
		      iardDevisVehiculesClient.nomenclatures.recupererValeursTypeConducteur,
		      T.map( crashOnError ),
		      T.map( nomenclatureToCode ),
	      )

export const useTypesConducteur = () => {
	return useFakeTask( getTypesConducteurs, { active: true, params: {} }, [
		{ value: "01", label: "Vous" },
		{ value: "02", label: "Votre conjoint(e)" },
		{ value: "03", label: "Votre concubin(e)" },
	] )
}


// @todo: This endpoint doesn't exist yet, update when ready
export const getCivilites: T.Task<Code<string>[]> =
	             T.of( [
		             { value: "f", label: "Madame" },
		             { value: "h", label: "Monsieur" },
	             ] )

export const useCodesCivilite = () => {
	return useFakeTask( getCivilites, { active: true, params: {} }, [
		{ value: "f", label: "Madame" },
		{ value: "h", label: "Monsieur" },
	] )
}


const getExperiencesConducteur: T.Task<Code<string>[]> =
	      pipe(
		      iardDevisVehiculesClient.nomenclatures.recupererValeursExperienceConducteur,
		      T.map( crashOnError ),
		      T.map( nomenclatureToCode ),
	      )

export const useExperiencesConducteur = () => {
	return useFakeTask( getExperiencesConducteur, { active: true, params: {} }, [
		{ value: "02", label: "Conducteur occasionnel d'un véhicule assuré MAIF" },
		{ value: "03", label: "Assuré auprès d'une autre société" },
		{ value: "04", label: "Sans Expérience" },
	] )
}

const getAntecedentsSinistralites = ( params: { dateEcheanceAncienAssureur: Date } ) =>
	pipe(
		() => iardDevisVehiculesClient.acceptationRisqueVehicule.recupererDatesAntecedentsSinistralite( {
			dateDEcheanceAncienAssureur: iardStringDate( params.dateEcheanceAncienAssureur ),
		} ),
		T.map( crashOnError ),
		T.map( data => ({
			dateAnterioriteBonus050:   new Date( data.dateAnterioriteBonus050 ),
			dateDebutCollecteSinistre: new Date( data.dateDebutCollecteSinistre ),
		}) ),
	)()


export const useDatesAntecedentsSinistralites = ( params: UseQueryParams<Parameter<typeof getAntecedentsSinistralites>> ) =>
	useFakeTask(
		getAntecedentsSinistralites,
		params,
		{
			dateAnterioriteBonus050:   new Date(),
			dateDebutCollecteSinistre: new Date(),
		},
	)


const getResponsabilitesSinistre =
	      pipe(
		      () => iardDevisVehiculesClient.nomenclatures.recupererValeursResponsabiliteSinistre(),
		      T.map( crashOnError ),
		      T.map( nomenclatureToCode ),
	      )

export const useResponsabilitesSinistre = () =>
	useFakeTask(
		getResponsabilitesSinistre,
		{ active: true, params: {} },
		[
			{ value: "01", label: "Exclue" },
			{ value: "02", label: "Totale" },
			{ value: "03", label: "Demie" },
		],
	)

type   _ConducteurAAssurer = Pick<ConducteurAAssurer,
	"nom"
	| "prenom"
	| "coefficientBonusMalus"
	| "codeExperienceConducteur"
	| "codeTypeConducteur"
	| "sinistreAvecCirconstanceAggravante"
	| "retraitPermis"
	| "resiliationAssureurPrecedent"
	> &
	{
		dateNaissance: Date,
		dateObtentionPermis: Date,
		dateDEcheanceAncienAssureur: Date,
		sinistres: {
			dateSurvenance: Date;
			codeResponsabilite?: string;
		}[]
	}

export const jouerAcceptationProspect = ( _params: { dateEffet: Date, vehicule: VehiculeAAssurer, conducteur: _ConducteurAAssurer } ): Promise<E.Either<string[], true>> =>
	Promise.resolve( E.right( true ) )
// @todo: queries, re-activate
// pipe(
// 	() => iardDevisVehiculesClient.acceptationRisqueVehicule.jouerAcceptationProspect( {
// 		...params,
// 		conducteur: {
// 			...params.conducteur,
// 			dateObtentionPermis:         iardStringDate( params.conducteur.dateObtentionPermis ),
// 			dateNaissance:               iardStringDate( params.conducteur.dateNaissance ),
// 			dateDEcheanceAncienAssureur: iardStringDate( params.conducteur.dateDEcheanceAncienAssureur ),
// 		},
// 		dateEffet:  iardStringDate( params.dateEffet ),
// 	} ),
// 	T.map( crashOnError ),
// 	T.map(
// 		result =>
// 			result.codeAcceptation === "01"
// 			?
// 			E.right( <true>true ) :
// 			E.left( result.justifications || [] ),
// 	),
// 	TE.mapLeft(
// 		flow(
// 			AR.map( prop( "libelleJustificationRisque" ) ),
// 			AR.filter( ( value ): value is string => !!value ),
// 		),
// 	),
// )()


