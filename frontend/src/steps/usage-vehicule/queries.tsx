import * as REMOTE from "../../kit-2/remote"
import { Code, prop } from "../../kit-2/helpers"
import { pipe } from "fp-ts/function"
import { useRecupererValeursUsage } from "../../__gen/iard-devis-vehicules-v1/nomenclatures"
import * as AR from "fp-ts/Array"
import { useRecupererVehiculeParNumeroRepertoire } from "../../__gen/referentiel-modeles-vehicules/vehicules"
import { Nomenclature } from "../../__gen/iard-devis-vehicules-v1/iard-devis-vehicules-v1.schemas"
import { UseQueryResult } from "react-query"
import { AxiosResponse } from "axios"




export const useNomenclature = ( nomenclature: UseQueryResult<AxiosResponse<Nomenclature>, any> ): REMOTE.Remote<any, Code<string>[]> =>
	 pipe(
			nomenclature,
			REMOTE.fromQueryState,
			REMOTE.map( prop( "detailNomenclature" ) ),
			REMOTE.map( AR.map( code => ({ value: code.code, label: code.libelle }) ) ),
	 )

export const useVehiculeSpecs = ( numeroRepertoire: string ) =>
	 REMOTE.fromQueryState( useRecupererVehiculeParNumeroRepertoire( numeroRepertoire ) )

export const useCodesUtilisationVehicule = ( numeroRepertoire: string ): REMOTE.Remote<any, Code<string>[]> =>
	 useNomenclature( useRecupererValeursUsage( numeroRepertoire ) )
