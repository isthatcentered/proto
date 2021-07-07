import * as REMOTE from "../../kit/remote"
import { Code } from "../../kit/helpers"
import { useRecupererValeursUsage } from "../../swagger-gen/__gen/iard-devis-vehicules-v1/nomenclatures"
import { useRecupererVehiculeParNumeroRepertoire } from "../../swagger-gen/__gen/referentiel-modeles-vehicules/vehicules"
import { useNomenclature } from "../../swagger-gen"

export const useVehiculeSpecs = (numeroRepertoire: string) =>
	REMOTE.fromQueryState(
		useRecupererVehiculeParNumeroRepertoire(numeroRepertoire),
	)

export const useCodesUtilisationVehicule = (
	numeroRepertoire: string,
): REMOTE.Remote<any, Code<string>[]> =>
	useNomenclature(useRecupererValeursUsage(numeroRepertoire))
