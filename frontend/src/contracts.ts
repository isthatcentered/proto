import { ComponentType } from "react"
import { FormikProps, withFormik, WithFormikConfig } from "formik"
import { pipe } from "fp-ts/function"
import { RequiredObjectSchema } from "yup/lib/object"
import * as Y from "./kit/yup"

export enum CODE_TYPE_VEHICULE {
	AUTO = "AUTO",
	MOTO = "MOTO",
	CAMPING_CAR = "CAMPING_CAR",
}

// -------------------------------------------------------------------------------------
// Etape 1 - Identification du véhicule
// -------------------------------------------------------------------------------------
export type InitParcoursStep = Step<
	{},
	{ codeTypeVehicule: CODE_TYPE_VEHICULE }
>

export type IdentificationVehiculeStep = Step<
	PickStep<InitParcoursStep, "codeTypeVehicule">,
	{
		numeroRepertoire: string
		anneeMiseEnCirculationVehicule: number
	}
>

export type UsageVehiculeStep = Step<
	PickStep<
		IdentificationVehiculeStep,
		"numeroRepertoire" | "anneeMiseEnCirculationVehicule"
	>,
	{
		/*
		 * - Date du jour par défaut
		 * - Doit être supérieure ou égale à la date du jour ]
		 */
		dateEffetContratDesiree: Date
		codeUsageVehicule: string
		leasingOuCreditEnCours: boolean
	}
>

// -------------------------------------------------------------------------------------
// Etape 2 - Identification du conducteur
// -------------------------------------------------------------------------------------
export type IdentificationConducteurStep = Step<
	PickStep<IdentificationVehiculeStep, "numeroRepertoire">,
	{
		nom: string
		prenom: string
		dateNaissance: Date
		dateObtentionPermis: Date
		codeTypeConducteur: string
		codeTypePermis: string
		codeExperienceConducteur: string
		codeCivilite: string
	}
>

type NouveauConducteur = {
	conduiteAccompagnee: boolean
	conduiteAccompagneeMaif: boolean
	conduiteAccompagneeMaifAvant2007: boolean
}

type ConducteurExperimente = {
	dateAnterioriteBonus050: Date
	coefficientBonusMalus: number
	dateSouscriptionAncienAssureur: Date
	dateDEcheanceAncienAssureur: Date
	conduiteAccompagnee: boolean
	conduiteAccompagneeMaif: boolean
	conduiteAccompagneeMaifAvant2007: boolean
	sinistreAvecCirconstanceAggravante: boolean
	retraitPermis: boolean
	sinistres: { dateSurvenance: Date; codeResponsabilite: string }[]
}
export type PasseConducteurStep = Step<
	PickStep<IdentificationVehiculeStep, "numeroRepertoire"> &
		PickStep<
			UsageVehiculeStep,
			"codeUsageVehicule" | "dateEffetContratDesiree"
		> &
		PickStep<
			IdentificationConducteurStep,
			| "nom"
			| "prenom"
			| "dateNaissance"
			| "dateObtentionPermis"
			| "codeTypeConducteur"
			| "codeExperienceConducteur"
		>,
	ConducteurExperimente | NouveauConducteur
>

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
export type Step<
	TIn extends Record<any, any>,
	TOut extends Record<any, any>,
> = ComponentType<{ onConfirm: (choices: TOut) => void } & TIn>

export type StepValues<T extends Step<any, any>> = T extends Step<infer O, any>
	? Parameters<O["onConfirm"]>[0]
	: never
// export type StepValues<T extends Step<any, any>> = T extends Step<any,infer V> ? V : never

export type StepProps<T extends Step<any, any>> = T extends Step<infer P, any>
	? P
	: never

type PickStep<T extends Step<any, any>, K extends keyof StepValues<T>> = Pick<
	StepValues<T>,
	K
>

export const makeStep = <
	TStep extends Step<any, any>,
	TSchema extends RequiredObjectSchema<any, any, any>,
>(
	component: ComponentType<StepProps<TStep> & FormikProps<Y.Asserts<TSchema>>>,
	formikConfig: WithFormikConfig<StepProps<TStep>, Y.Asserts<TSchema>>,
) => pipe(component, withFormik(formikConfig))
