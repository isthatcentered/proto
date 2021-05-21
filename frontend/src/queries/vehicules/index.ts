import * as E from "fp-ts/Either"
import { AcceptationRisqueVehicule, JustificationAcceptationRisque } from "../../swagger/__generated__/iard-devis-vehicules"
import { crashOnError, iardDevisVehiculesClient, nomenclatureToCode, referentienModelesVehiculesClient } from "../clients"
import { pipe } from "fp-ts/function"
import * as T from "fp-ts/Task"
import { Code } from "../../kit-2/helpers"




export const getVehicule = ( params: { numeroRepertoire: string } ) =>
	referentienModelesVehiculesClient.vehicules
		.recupererVehiculeParNumeroRepertoire( params.numeroRepertoire )
		.then( crashOnError )

// @todo: type 404 not found
export const getAcceptation = ( params: {
	numeroRepertoire: string
} ): Promise<E.Either<JustificationAcceptationRisque[],
	Omit<AcceptationRisqueVehicule, "justifications">>> =>
	iardDevisVehiculesClient.acceptationRisqueVehicule
		.jouerAcceptationVehicule( { ...params } )
		.then( crashOnError )
		.then( result =>
			result.codeAcceptation === "01"
			?
			E.right( { ...result } )
			:
			E.left( result.justifications || [] ),
		)

// @todo: type 404 not found
export const getTypesUtilisation = ( params: {
	numeroRepertoire: string
} ): Promise<Code<string>[]> =>
	iardDevisVehiculesClient.nomenclatures
		.recupererValeursUsage( params.numeroRepertoire )
		.then( crashOnError )
		.then( nomenclatureToCode )

// @todo: type 404 not found
export const getTypesPermis = ( params: { numeroRepertoire: string } ) =>
	pipe(
		() =>
			iardDevisVehiculesClient.nomenclatures.recupererValeursTypePermis(
				params.numeroRepertoire,
			),
		T.map( crashOnError ),
		T.map( nomenclatureToCode ),
	)()
