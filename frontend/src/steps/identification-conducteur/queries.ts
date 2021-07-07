import {
	useRecupererValeursExperienceConducteur,
	useRecupererValeursTypeConducteur,
	useRecupererValeursTypePermis,
} from "../../swagger-gen/__gen/iard-devis-vehicules-v1/nomenclatures"
import * as REMOTE from "../../kit/remote"
import { useNomenclature } from "../../swagger-gen"

export const useTypesConducteur = () =>
	useNomenclature(useRecupererValeursTypeConducteur())

export const useExperiencesConducteur = () =>
	useNomenclature(useRecupererValeursExperienceConducteur())

export const useTypesPermisForVehicule = (numeroRepertoire: string) =>
	useNomenclature(useRecupererValeursTypePermis(numeroRepertoire))
// @todo: Use partenaires-personnes-besoin when endpoint created

export const useCodesCivilite = () =>
	REMOTE.success([
		{ value: "f", label: "Madame" },
		{ value: "h", label: "Monsieur" },
	])
