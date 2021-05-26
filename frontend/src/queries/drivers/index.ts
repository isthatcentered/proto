import * as T from "fp-ts/Task"
import { crashOnError, iardDevisVehiculesClient, iardStringDate, nomenclatureToCode } from "../clients";
import { pipe } from "fp-ts/function";
import { Code } from "../../kit-2/helpers"
import { useFakeTask } from "../../kit-2/use-task"




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

export const getAntecedentsSinistralites = ( params: { dateEcheanceAncienAssureur: Date } ) =>
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


export const getResponsabilitesSinistre =
	             pipe(
		             () => iardDevisVehiculesClient.nomenclatures.recupererValeursResponsabiliteSinistre(),
		             T.map( crashOnError ),
		             T.map( nomenclatureToCode ),
	             )

export enum CODES_NATURES_SINISTRE
{
	COLLISION = "01",
	AUTRE     = "02",
}
