import * as REMOTE from "../../kit-2/remote"
import { Code, prop } from "../../kit-2/helpers"
import { pipe } from "fp-ts/function"
import { useRecupererValeursUsage } from "../../__gen/iard-devis-vehicules-v1/nomenclatures"
import * as AR from "fp-ts/Array"
import { useRecupererVehiculeParNumeroRepertoire } from "../../__gen/referentiel-modeles-vehicules/vehicules"




export const useVehiculeSpecs = ( numeroRepertoire: string ) =>
	 REMOTE.fromQueryState( useRecupererVehiculeParNumeroRepertoire( numeroRepertoire ) )

export const useCodesUtilisationVehicule = ( numeroRepertoire: string ): REMOTE.Remote<any, Code<string>[]> =>
	 pipe(
			useRecupererValeursUsage( numeroRepertoire ),
			REMOTE.fromQueryState,
			REMOTE.map( prop( "detailNomenclature" ) ),
			REMOTE.map( AR.map( code => ({ value: code.code, label: code.libelle }) ) ),
	 )
