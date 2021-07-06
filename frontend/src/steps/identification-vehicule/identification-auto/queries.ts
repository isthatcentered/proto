import {
	 RecupererListeAutosParams,
	 RecupererListeCarrosseriesAutosParams,
	 RecupererListeEnergiesAutosParams,
	 RecupererListeFamillesAutosParams,
	 RecupererListeMotorisationsAutosParams,
	 RecupererListeNbPortesAutosParams,
	 RecupererListeTransmissionsAutosParams,
} from "../../../__gen/referentiel-modeles-vehicules/referentiel-modeles-vehicules.schemas"
import * as A2 from "../../../__gen/referentiel-modeles-vehicules/autos"
import { UseQueryOptions, UseQueryResult } from "react-query"
import { AxiosResponse } from "axios"
import * as REMOTE from "../../../kit-2/remote"
import * as V from "../../../kit-2/validation"
import { constant, pipe } from "fp-ts/function"
import { Code, prop } from "../../../kit-2/helpers"
import * as AR from "fp-ts/Array"
import * as EI from "fp-ts/Either"
import { jouerAcceptationVehicule } from "../../../__gen/iard-devis-vehicules-v1/acceptation-risque-véhicule"
import { notNil } from "../../../kit-2/predicates/predicates"




type GeneratedReactQuery<TParams, TError, TResult> = ( params?: TParams, config?: { query?: UseQueryOptions<any, any, any> } ) => UseQueryResult<AxiosResponse<TResult>, TError>

const useSelectData = <P, E, A extends any[]>(
	 query: GeneratedReactQuery<P, E, A>,
	 validation: V.Validation<P, any>,
	 asCodes: ( item: A[number] ) => Code<string>,
	 params: P,
) => {
	 const queryConfig: [ P, { query?: UseQueryOptions<any, any, any> } ] = pipe(
			validation.decode( params ),
			EI.foldW(
				 constant( [ undefined!, { query: { enabled: false as boolean } } ] ),
				 params => [ params, { query: { enabled: true } } ],
			),
	 )
	 
	 const queryResult = query( ...queryConfig )
	 
	 return pipe(
			REMOTE.fromQueryState( queryResult ),
			REMOTE.map( AR.map( asCodes ) ),
	 )
}


const autoListsParamsDecoder = V.partial( {
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

export const useMarques = () => {
	 const queryState = A2.useRecupererListeMarquesAutos()
	 return pipe(
			REMOTE.fromQueryState( queryState ),
			REMOTE.map( AR.map( a => ({ label: a.libelleMarque, value: a.codeMarque }) ) ),
	 )
}

export const useFamilles = ( params: Pick<RecupererListeFamillesAutosParams, "listeAnneesCirculation" | "listeCodesMarque"> ) =>
	 useSelectData(
			A2.useRecupererListeFamillesAutos,
			autoListsParamsDecoder,
			a => ({ label: a.libelleFamille, value: a.codeFamille }),
			params,
	 )

export const useEnergies = ( params: Pick<RecupererListeEnergiesAutosParams, "listeAnneesCirculation" | "listeCodesMarque" | "listeCodesFamille"> ) =>
	 useSelectData(
			A2.useRecupererListeEnergiesAutos,
			autoListsParamsDecoder,
			a => ({ label: a.libelleEnergie, value: a.codeEnergie }),
			params,
	 )


export const useTransmissions = ( params: Pick<RecupererListeTransmissionsAutosParams, "listeAnneesCirculation" | "listeCodesMarque" | "listeCodesFamille" | "listeCodesEnergie"> ) =>
	 useSelectData(
			A2.useRecupererListeTransmissionsAutos,
			autoListsParamsDecoder,
			a => ({ label: a.libelleTransmission, value: a.codeTransmission }),
			params,
	 )

export const useMotorisations = ( params: Pick<RecupererListeMotorisationsAutosParams, "listeAnneesCirculation" | "listeCodesMarque" | "listeCodesFamille" | "listeCodesEnergie" | "listeCodesTransmission"> ) =>
	 useSelectData(
			A2.useRecupererListeMotorisationsAutos,
			autoListsParamsDecoder,
			a => ({ label: a.libelleMotorisation, value: a.libelleMotorisation }),
			params,
	 )

export const useCarosseries = ( params: Pick<RecupererListeCarrosseriesAutosParams, "listeAnneesCirculation" | "listeCodesMarque" | "listeCodesFamille" | "listeCodesEnergie" | "listeCodesTransmission" | "listeLibellesMotorisation"> ) =>
	 useSelectData(
			A2.useRecupererListeCarrosseriesAutos,
			autoListsParamsDecoder,
			a => ({ label: a.libelleCarrosserie, value: a.codeCarrosserie }),
			params,
	 )

export const useNombrePortes = ( params: Pick<RecupererListeNbPortesAutosParams, "listeAnneesCirculation" | "listeCodesMarque" | "listeCodesFamille" | "listeCodesEnergie" | "listeCodesTransmission" | "listeLibellesMotorisation" | "listeCodesCarrosserie"> ) =>
	 useSelectData(
			A2.useRecupererListeNbPortesAutos,
			autoListsParamsDecoder,
			a => ({ label: a.nombrePortes, value: a.nombrePortes }),
			params,
	 )

export const useFinitions = ( params: RecupererListeAutosParams ) =>
	 useSelectData(
			A2.useRecupererListeAutos,
			autoListsParamsDecoder,
			a => ({ label: a.denominationCommerciale, value: a.numeroRepertoire }),
			params,
	 )

export const verifyVehiculeAccepted = ( numeroRepertoire: string ): Promise<EI.Either<string[], void>> =>
	 jouerAcceptationVehicule( { numeroRepertoire } )
			.then( prop( "data" ) )
			.then( result =>
				 result.codeAcceptation === "01" ?
				 EI.right( undefined ) :
				 EI.left( (result.justifications || []).map( prop( "libelleJustificationRisque" ) ).filter( notNil ) ) )
