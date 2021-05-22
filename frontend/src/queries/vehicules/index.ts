import * as E from "fp-ts/Either"
import { JustificationAcceptationRisque } from "../../swagger/__generated__/iard-devis-vehicules"
import { crashOnError, iardDevisVehiculesClient, nomenclatureToCode, referentienModelesVehiculesClient } from "../clients"
import { pipe } from "fp-ts/function"
import * as T from "fp-ts/Task"
import { Code, ResolveType } from "../../kit-2/helpers"
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

export const useSpecs = ( params: UseQueryParams<Parameter<typeof getVehicule>> ) => {
	return useFakeTask( getVehicule, params, {} as ResolveType<typeof getVehicule> )
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
