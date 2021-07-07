import * as A2 from "../../../swagger-gen/__gen/referentiel-modeles-vehicules/autos"
import * as REMOTE from "../../../kit/remote"
import { pipe } from "fp-ts/function"
import { notNil, prop } from "../../../kit/helpers"
import * as AR from "fp-ts/Array"
import * as EI from "fp-ts/Either"
import { jouerAcceptationVehicule } from "../../../swagger-gen/__gen/iard-devis-vehicules-v1/acceptation-risque-véhicule"
import { useSelectData } from "../../../swagger-gen"

export const useMarques = () => {
	const queryState = A2.useRecupererListeMarquesAutos()
	return pipe(
		REMOTE.fromQueryState(queryState),
		REMOTE.map(AR.map(a => ({ label: a.libelleMarque, value: a.codeMarque }))),
	)
}

export const useFamilles = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
	}>,
) =>
	useSelectData(
		A2.useRecupererListeFamillesAutos,
		a => ({ label: a.libelleFamille, value: a.codeFamille }),
		params.anneeMiseEnCirculation && params.codeMarque
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
			  }
			: undefined,
	)

export const useEnergies = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
		codeFamille: string
	}>,
) =>
	useSelectData(
		A2.useRecupererListeEnergiesAutos,
		a => ({ label: a.libelleEnergie, value: a.codeEnergie }),
		params.anneeMiseEnCirculation && params.codeMarque && params.codeFamille
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
					listeCodesFamille: [params.codeFamille],
			  }
			: undefined,
	)

export const useTransmissions = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
		codeFamille: string
		codeEnergie: string
	}>,
) =>
	useSelectData(
		A2.useRecupererListeTransmissionsAutos,
		a => ({ label: a.libelleTransmission, value: a.codeTransmission }),
		params.anneeMiseEnCirculation &&
			params.codeMarque &&
			params.codeFamille &&
			params.codeEnergie
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
					listeCodesFamille: [params.codeFamille],
					listeCodesEnergie: [params.codeEnergie],
			  }
			: undefined,
	)

export const useMotorisations = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
		codeFamille: string
		codeEnergie: string
		codeTransmission: string
	}>,
) =>
	useSelectData(
		A2.useRecupererListeMotorisationsAutos,
		a => ({ label: a.libelleMotorisation, value: a.libelleMotorisation }),
		params.anneeMiseEnCirculation &&
			params.codeMarque &&
			params.codeFamille &&
			params.codeEnergie &&
			params.codeTransmission
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
					listeCodesFamille: [params.codeFamille],
					listeCodesEnergie: [params.codeEnergie],
					listeCodesTransmission: [params.codeTransmission],
			  }
			: undefined,
	)

export const useCarosseries = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
		codeFamille: string
		codeEnergie: string
		codeTransmission: string
		codeMotorisation: string
	}>,
) =>
	useSelectData(
		A2.useRecupererListeCarrosseriesAutos,
		a => ({ label: a.libelleCarrosserie, value: a.codeCarrosserie }),
		params.anneeMiseEnCirculation &&
			params.codeMarque &&
			params.codeFamille &&
			params.codeEnergie &&
			params.codeTransmission &&
			params.codeMotorisation
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
					listeCodesFamille: [params.codeFamille],
					listeCodesEnergie: [params.codeEnergie],
					listeCodesTransmission: [params.codeTransmission],
					listeLibellesMotorisation: [params.codeMotorisation],
			  }
			: undefined,
	)

export const useNombrePortes = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
		codeFamille: string
		codeEnergie: string
		codeTransmission: string
		codeMotorisation: string
		codeCarrosserie: string
	}>,
) =>
	useSelectData(
		A2.useRecupererListeNbPortesAutos,
		a => ({ label: a.nombrePortes, value: a.nombrePortes }),
		params.anneeMiseEnCirculation &&
			params.codeMarque &&
			params.codeFamille &&
			params.codeEnergie &&
			params.codeTransmission &&
			params.codeMotorisation &&
			params.codeCarrosserie
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
					listeCodesFamille: [params.codeFamille],
					listeCodesEnergie: [params.codeEnergie],
					listeCodesTransmission: [params.codeTransmission],
					listeLibellesMotorisation: [params.codeMotorisation],
					listeCodesCarrosserie: [params.codeCarrosserie],
			  }
			: undefined,
	)

export const useFinitions = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
		codeFamille: string
		codeEnergie: string
		codeConfigurationPortes: string
		codeTransmission: string
		codeMotorisation: string
		codeCarrosserie: string
	}>,
) =>
	useSelectData(
		A2.useRecupererListeAutos,
		a => ({
			label: a.denominationCommerciale,
			value: a.numeroRepertoire,
		}),
		params.anneeMiseEnCirculation &&
			params.codeMarque &&
			params.codeFamille &&
			params.codeEnergie &&
			params.codeTransmission &&
			params.codeMotorisation &&
			params.codeCarrosserie &&
			params.codeConfigurationPortes
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
					listeCodesFamille: [params.codeFamille],
					listeCodesEnergie: [params.codeEnergie],
					listeCodesTransmission: [params.codeTransmission],
					listeLibellesMotorisation: [params.codeMotorisation],
					listeCodesCarrosserie: [params.codeCarrosserie],
					listeNombresPortes: [params.codeConfigurationPortes],
			  }
			: undefined,
	)

export const verifyVehiculeAccepted = (
	numeroRepertoire: string,
): Promise<EI.Either<string[], void>> =>
	jouerAcceptationVehicule({ numeroRepertoire })
		.then(prop("data"))
		.then(result =>
			result.codeAcceptation === "01"
				? EI.right(undefined)
				: EI.left(
						(result.justifications || [])
							.map(prop("libelleJustificationRisque"))
							.filter(notNil),
				  ),
		)
