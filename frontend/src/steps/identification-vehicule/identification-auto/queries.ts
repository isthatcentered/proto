import * as A2 from "../../../swagger-gen/__gen/referentiel-modeles-vehicules/autos"
import { notNil, prop } from "../../../kit/helpers"
import * as AR from "fp-ts/Array"
import * as EI from "fp-ts/Either"
import { jouerAcceptationVehicule } from "../../../swagger-gen/__gen/iard-devis-vehicules-v1/acceptation-risque-véhicule"
import { useQuery } from "../../../swagger-gen"

export const useMarques = () => {
	return useQuery(
		A2.useRecupererListeMarquesAutos,
		undefined,
		AR.map(a => ({ label: a.libelleMarque, value: a.codeMarque })),
		true,
	)
}

export const useFamilles = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
	}>,
) =>
	useQuery(
		A2.useRecupererListeFamillesAutos,
		params.anneeMiseEnCirculation && params.codeMarque
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
			  }
			: undefined,
		AR.map(a => ({ label: a.libelleFamille, value: a.codeFamille })),
	)

export const useEnergies = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
		codeFamille: string
	}>,
) =>
	useQuery(
		A2.useRecupererListeEnergiesAutos,
		params.anneeMiseEnCirculation && params.codeMarque && params.codeFamille
			? {
					listeAnneesCirculation: [params.anneeMiseEnCirculation],
					listeCodesMarque: [params.codeMarque],
					listeCodesFamille: [params.codeFamille],
			  }
			: undefined,
		AR.map(a => ({ label: a.libelleEnergie, value: a.codeEnergie })),
	)

export const useTransmissions = (
	params: Partial<{
		codeMarque: string
		anneeMiseEnCirculation: number
		codeFamille: string
		codeEnergie: string
	}>,
) =>
	useQuery(
		A2.useRecupererListeTransmissionsAutos,
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
		AR.map(a => ({ label: a.libelleTransmission, value: a.codeTransmission })),
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
	useQuery(
		A2.useRecupererListeMotorisationsAutos,
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
		AR.map(a => ({
			label: a.libelleMotorisation,
			value: a.libelleMotorisation,
		})),
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
	useQuery(
		A2.useRecupererListeCarrosseriesAutos,
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
		AR.map(a => ({ label: a.libelleCarrosserie, value: a.codeCarrosserie })),
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
	useQuery(
		A2.useRecupererListeNbPortesAutos,
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
		AR.map(a => ({ label: a.nombrePortes, value: a.nombrePortes })),
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
	useQuery(
		A2.useRecupererListeAutos,
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
		AR.map(a => ({
			label: a.denominationCommerciale,
			value: a.numeroRepertoire,
		})),
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
