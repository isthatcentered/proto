import { ComponentType } from "react"




type AnyRecord = Record<any, any>

type Step<TIn extends AnyRecord, TOut extends AnyRecord> = ComponentType<{ onConfirm: ( choices: TOut ) => void } & TIn>

type StepOut<T extends Step<any, any>> = T extends Step<infer O, any> ? Parameters<O["onConfirm"]>[0] : never

type PickStep<T extends Step<any, any>, K extends keyof StepOut<T>> = Pick<StepOut<T>, K>



// -------------------------------------------------------------------------------------
// Etape 1 - Identification du véhicule
// -------------------------------------------------------------------------------------
export type InitParcoursStep = Step<{}, { codeTypeVehicule: string }>

export type IdentificationVehiculeStep = Step<PickStep<InitParcoursStep, "codeTypeVehicule">, {
	numeroRepertoire: string
	anneeMiseEnCirculationVehicule: number,
	achatVehiculePost01012021: boolean
}>


export type UsageVehiculeStep = Step<PickStep<IdentificationVehiculeStep, "numeroRepertoire">, {
	/*
	 * - Date du jour par défaut
	 * - Doit être supérieure ou égale à la date du jour ]
	 */
	dateEffetContratDesiree: Date,
	codeUsageVehicule: string
	leasingOuCreditEnCours:boolean
}>

// -------------------------------------------------------------------------------------
// Etape 2 - Identification du conducteur
// -------------------------------------------------------------------------------------
export type IdentificationConducteurStep = Step<PickStep<IdentificationVehiculeStep, "numeroRepertoire">, {
	nom: string,
	prenom: string,
	dateNaissance: Date,
	dateObtentionPermis: Date,
	codeTypeConducteur: string,
	codeTypePermis: string,
	codeExperienceConducteur: string,
}>


export type PasseAssureStep = Step<PickStep<IdentificationVehiculeStep, "numeroRepertoire"> &
	PickStep<UsageVehiculeStep, "codeUsageVehicule" | "dateEffetContratDesiree"> &
	PickStep<IdentificationConducteurStep, "nom" | "prenom" | "dateNaissance" | "dateObtentionPermis" | "codeTypeConducteur" | "codeExperienceConducteur">,
	{
		dateAnterioriteBonus050: Date,
		coefficientBonusMalus: number,
		dateSouscriptionAncienAssureur: Date,
		dateDEcheanceAncienAssureur: Date,
		conduiteAccompagnee: boolean,
		conduiteAccompagneeMaif: boolean,
		conduiteAccompagneeMaifAvant2007: boolean,
		sinistreAvecCirconstanceAggravante: boolean,
		retraitPermis: boolean,
		resiliationAssureurPrecedent: boolean,
		sinistres: { dateSurvenance: Date, codeResponsabilite: string }[]
	}>
