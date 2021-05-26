import * as E from "fp-ts/Either"
import { JustificationAcceptationRisque } from "../../swagger/__generated__/iard-devis-vehicules"
import { crashOnError, iardDevisVehiculesClient, nomenclatureToCode, referentienModelesVehiculesClient } from "../clients"
import { pipe } from "fp-ts/function"
import * as T from "fp-ts/Task"
import { Code } from "../../kit-2/helpers"
import { Parameter, useFakeTask, UseQueryParams } from "../../kit-2/use-task"




const getVehicule = ( params: { numeroRepertoire: string } ) =>
	referentienModelesVehiculesClient.vehicules
		.recupererVehiculeParNumeroRepertoire( params.numeroRepertoire )
		.then( crashOnError )

// @todo: type 404 not found
export const getAcceptation = ( _params: {
	numeroRepertoire: string
} ): Promise<E.Either<JustificationAcceptationRisque[], true>> =>
	Promise.resolve( E.right( true ) ) // @todo: Queries, re-activate
// iardDevisVehiculesClient.acceptationRisqueVehicule
// 	.jouerAcceptationVehicule( { ...params } )
// 	.then( crashOnError )
// 	.then( result =>
// 		result.codeAcceptation === "01"
// 		?
// 		E.right( { ...result } )
// 		:
// 		E.left( result.justifications || [] ),
// 	)

// @todo: type 404 not found
const getTypesUtilisation = ( params: {
	numeroRepertoire: string
} ): Promise<Code<string>[]> =>
	iardDevisVehiculesClient.nomenclatures
		.recupererValeursUsage( params.numeroRepertoire )
		.then( crashOnError )
		.then( nomenclatureToCode )

const getTypesPermis = ( params: { numeroRepertoire: string } ) =>
	pipe(
		() =>
			iardDevisVehiculesClient.nomenclatures.recupererValeursTypePermis(
				params.numeroRepertoire,
			),
		T.map( crashOnError ),
		T.map( nomenclatureToCode ),
	)()


export const useTypesPermis = ( params: UseQueryParams<Parameter<typeof getTypesUtilisation>> ) =>
	useFakeTask(
		getTypesPermis,
		params,
		[
			{ value: "B", label: "4 roues assujettis (B,BE)" },
		],
	)



// @todo: use real query
export const useSpecs = ( params: UseQueryParams<Parameter<typeof getVehicule>> ) => {
	return useFakeTask( getVehicule, params, {
			numeroRepertoire:              "D0287",
			codeMarque:                    "683",
			libelleMarque:                 "RENAULT",
			codeCategorie:                 "1",
			codeCategorieOrigine:          "0",
			libelleCategorieOrigine:       "Sans Information",
			codeFamille:                   "2554",
			libelleFamille:                "MEGANE",
			nombrePortes:                  "5",
			typeMotorisation:              "2",
			libelleMotorisation:           "1.5 BLUE DCI 115 CH",
			codeEnergie:                   "2",
			libelleEnergie:                "Diesel",
			codeTransmission:              "3",
			libelleTransmission:           "Boîte robotisée",
			puissanceFiscale:              "6",
			cylindre:                      "1461",
			codeCarrosserie:               "03",
			libelleCarrosserie:            "Break",
			denominationCommercialeCourte: "MEGANE IV ESTATE 1.5 BLUE DCI 115 CH INTENS EDC",
			denominationCommercialeLongue: "MEGANE IV ESTATE",
			codeAssujettissementClause:    "1",
			libelleAssujettissementClause: "Oui",
			codeNiveauFinition:            "C",
			libelleNiveauFinition:         "Elevé",
			libelleFamilleCellule:         null as any,
			libelleMarqueChassis:          null as any,
			libelleFamilleChassis:         "MEGANE",
			libelleTypeMineTasse:          "MAIF",
			codeSituationModele:           "1",
			libelleSituationModele:        "En cours",
			dateDebutFabrication:          "2018-12-04",
			dateFinFabrication:            "2020-11-03",
			codeDegreAutonomie:            "N0",
			libelleObservationLong:        null as any,
			champRecherche:                "RENAULT MEGANE MEGANE IV 4 ESTATE MEGANE IV 4 ESTATE 1.5 1,5 BLUE DCI 601 115 CH INTENS EDC Diesel Boîte robotisée Break",
			codeGenre:                     "01",
			libelleGenre:                  "Voiture particulière",
			codeGestion:                   "0",
			libelleGestion:                "Pas d'information",
			codeInterditNovice:            "2",
			libelleInterditNovice:         "Faux",
			codeSegment:                   "M1",
			libelleSegment:                "M1",
			codeVocation:                  "0",
			libelleVocation:               null as any,
			codeGroupeTarification:        "K04D",
			poidsAVide:                    1398,
			puissance:                     "115",
			libelleGenerationModele:       "IV",
		},
	)
}

export const useCodesTypesUtilisation = ( params: UseQueryParams<Parameter<typeof getTypesUtilisation>> ) =>
	useFakeTask(
		getTypesUtilisation,
		params,
		[
			{ value: "01", label: "Usage privé et professionnel" },
			{ value: "02", label: "Usage privé et professionnel occasionnel" },
		],
	)
