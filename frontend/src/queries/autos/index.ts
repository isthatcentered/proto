import { SwaggerQuery } from "../../swagger/http-client"
import { HttpResponse } from "../../swagger/__generated__/referentiel-modeles-vehicules"
import * as T from "fp-ts/Task"
import { crashOnError, referentienModelesVehiculesClient } from "../clients"
import { Code } from "../../kit-2/helpers"

type VehiculeSpec = {
	codeMarque: string
	anneeMiseEnCirculation: number
	codeFamille: string
	codeEnergie: string
	codeTransmission: string
	codeMotorisation: string
	codeCarosserie: string
	codeConfigurationPortes: string
}

type ArrayItemType<T extends Array<any>> = T extends Array<infer I> ? I : never

const httpResponseAsTask = <TResolve>(
	query: () => Promise<HttpResponse<TResolve, void>>,
): T.Task<TResolve> => () =>
	query().then(res => {
		if (res.ok) return res.data
		throw res.error // Everything is configure to work, if something goes wrong we can't do anything but crash/say "something went wrong
	})

const getCodes = <TParams, TResolve extends any[]>(
	query: SwaggerQuery<TParams, void, TResolve>,
	toCode: (item: ArrayItemType<TResolve>) => Code<string>,
) => (params: TParams) =>
	query(params)
		.then(crashOnError)
		.then(items => items.map(toCode))

export const getMarques = getCodes(
	() =>
		referentienModelesVehiculesClient.autos.recupererListeMarquesAutos({
			listeCodesCategorie: ["STANDARD"],
		}),
	i => ({
		value: i.codeMarque,
		label: i.libelleMarque,
	}),
)

export const getFamilles = getCodes(
	(params: Pick<VehiculeSpec, "anneeMiseEnCirculation" | "codeMarque">) =>
		referentienModelesVehiculesClient.autos.recupererListeFamillesAutos({
			listeCodesCategorie: ["STANDARD"],
			listeAnneesCirculation: [params.anneeMiseEnCirculation],
			listeCodesMarque: [params.codeMarque],
		}),
	i => ({ label: i.libelleFamille, value: i.codeFamille }),
)

export const getEnergies = getCodes(
	(
		params: Pick<
			VehiculeSpec,
			"anneeMiseEnCirculation" | "codeMarque" | "codeFamille"
		>,
	) =>
		referentienModelesVehiculesClient.autos.recupererListeEnergiesAutos({
			listeCodesCategorie: ["STANDARD"],
			listeCodesMarque: [params.codeMarque],
			listeAnneesCirculation: [params.anneeMiseEnCirculation],
			listeCodesFamille: [params.codeFamille],
		}),
	i => ({ label: i.libelleEnergie, value: i.codeEnergie }),
)

export const getTransmissions = getCodes(
	(
		params: Pick<
			VehiculeSpec,
			"anneeMiseEnCirculation" | "codeMarque" | "codeFamille" | "codeEnergie"
		>,
	) =>
		referentienModelesVehiculesClient.autos.recupererListeTransmissionsAutos({
			listeCodesCategorie: ["STANDARD"],
			listeCodesMarque: [params.codeMarque],
			listeAnneesCirculation: [params.anneeMiseEnCirculation],
			listeCodesFamille: [params.codeFamille],
			listeCodesEnergie: [params.codeEnergie],
		}),
	i => ({ label: i.libelleTransmission, value: i.codeTransmission }),
)

export const getMotorisations = getCodes(
	(
		params: Pick<
			VehiculeSpec,
			| "anneeMiseEnCirculation"
			| "codeMarque"
			| "codeFamille"
			| "codeEnergie"
			| "codeTransmission"
		>,
	) =>
		referentienModelesVehiculesClient.autos.recupererListeMotorisationsAutos({
			listeCodesCategorie: ["STANDARD"],
			listeCodesMarque: [params.codeMarque],
			listeCodesTransmission: [params.codeTransmission],
			listeAnneesCirculation: [params.anneeMiseEnCirculation],
			listeCodesFamille: [params.codeFamille],
			listeCodesEnergie: [params.codeEnergie],
		}),
	i => ({ label: i.libelleMotorisation, value: i.libelleMotorisation }),
)

export const getTypesCarosserie = getCodes(
	(
		params: Pick<
			VehiculeSpec,
			| "anneeMiseEnCirculation"
			| "codeMarque"
			| "codeFamille"
			| "codeEnergie"
			| "codeTransmission"
			| "codeMotorisation"
		>,
	) =>
		referentienModelesVehiculesClient.autos.recupererListeCarrosseriesAutos({
			listeCodesCategorie: ["STANDARD"],
			listeCodesMarque: [params.codeMarque],
			listeLibellesMotorisation: [params.codeMotorisation],
			listeCodesTransmission: [params.codeTransmission],
			listeAnneesCirculation: [params.anneeMiseEnCirculation],
			listeCodesFamille: [params.codeFamille],
			listeCodesEnergie: [params.codeEnergie],
		}),
	i => ({ label: i.libelleCarrosserie, value: i.codeCarrosserie }),
)

export const getConfigurationsPortes = getCodes(
	(
		params: Pick<
			VehiculeSpec,
			| "anneeMiseEnCirculation"
			| "codeMarque"
			| "codeFamille"
			| "codeEnergie"
			| "codeTransmission"
			| "codeMotorisation"
			| "codeCarosserie"
		>,
	) =>
		referentienModelesVehiculesClient.autos.recupererListeNbPortesAutos({
			listeCodesCategorie: ["STANDARD"],
			listeCodesMarque: [params.codeMarque],
			listeCodesCarrosserie: [params.codeCarosserie],
			listeLibellesMotorisation: [params.codeMotorisation],
			listeCodesTransmission: [params.codeTransmission],
			listeAnneesCirculation: [params.anneeMiseEnCirculation],
			listeCodesFamille: [params.codeFamille],
			listeCodesEnergie: [params.codeEnergie],
		}),
	i => ({
		label: i.nombrePortes,
		value: i.nombrePortes,
	}),
)

export const getFinitions = getCodes(
	(
		params: Pick<
			VehiculeSpec,
			| "anneeMiseEnCirculation"
			| "codeMarque"
			| "codeFamille"
			| "codeEnergie"
			| "codeTransmission"
			| "codeMotorisation"
			| "codeCarosserie"
			| "codeConfigurationPortes"
		>,
	) =>
		referentienModelesVehiculesClient.autos.recupererListeAutos({
			listeCodesCategorie: ["STANDARD"],
			listeCodesMarque: [params.codeMarque],
			listeNombresPortes: [params.codeConfigurationPortes],
			listeCodesCarrosserie: [params.codeCarosserie],
			listeLibellesMotorisation: [params.codeMotorisation],
			listeCodesTransmission: [params.codeTransmission],
			listeAnneesCirculation: [params.anneeMiseEnCirculation],
			listeCodesFamille: [params.codeFamille],
			listeCodesEnergie: [params.codeEnergie],
		}),
	i => ({ label: i.denominationCommerciale, value: i.numeroRepertoire }),
)

