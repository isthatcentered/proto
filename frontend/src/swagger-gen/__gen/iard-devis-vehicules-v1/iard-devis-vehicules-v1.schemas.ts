/*
 * Generated by orval v5.3.2 🍺
 * Do not edit manually.
 * iard-devis-vehicules-v1
 * "Cette API permet de gÃ©rer le contexte iard-devis-vehicules."
 * OpenAPI spec version: 1.0.0-SNAPSHOT
 */
export interface AcceptationRisqueVehicule {
	codeAcceptation: string
	libelleAcceptation: string
	justifications?: JustificationAcceptationRisque[]
}

export interface AutresFranchises {
	codeNatureFranchise: string
	libelleNatureFranchise: string
	detailsFranchise?: DetailFranchise[]
}

export interface CalculCrmRisqueVehicule {
	coefficientBonusMalusRetenu: number
	coefficientBonusMalusRetenuAnneeSuivante?: number
}

export interface ConditionFranchise {
	libelleConditionFranchise: string
}

export interface ConducteurAAssurer {
	nom: string
	prenom: string
	dateNaissance: string
	dateObtentionPermis?: string
	coefficientBonusMalus?: number
	codeExperienceConducteur: string
	codeTypeConducteur: string
	dateDEcheanceAncienAssureur?: string
	sinistreAvecCirconstanceAggravante?: boolean
	retraitPermis?: boolean
	resiliationAssureurPrecedent?: boolean
	sinistres?: Sinistre[]
}

export interface ConducteurAAssurerCrm {
	dateNaissance: string
	codeTypePermis?: string
	dateObtentionPermis: string
	dateAnterioriteBonus050?: string
	coefficientBonusMalus?: number
	codeExperienceConducteur: string
	codeTypeConducteur: string
	dateSouscriptionAncienAssureur?: string
	dateDEcheanceAncienAssureur?: string
	conduiteAccompagnee?: boolean
	conduiteAccompagneeMaif?: boolean
	conduiteAccompagneeMaifAvant2007?: boolean
	sinistres?: Sinistre[]
}

export interface ConducteurAAssurerDevis {
	nom?: string
	prenom?: string
	dateNaissance?: string
	identifiantPersonnePhysiqueConducteur?: string
	codeTypePermis?: string
	dateObtentionPermis?: string
	dateAnterioriteBonus050?: string
	coefficientBonusMalus?: number
	codeExperienceConducteur: string
	codeTypeConducteur: string
	dateSouscriptionAncienAssureur?: string
	dateDEcheanceAncienAssureur?: string
	conduiteAccompagnee?: boolean
	conduiteAccompagneeMaif?: boolean
	conduiteAccompagneeMaifAvant2007?: boolean
	sinistreAvecCirconstanceAggravante?: boolean
	retraitPermis?: boolean
	resiliationAssureurPrecedent?: boolean
	sinistres?: Sinistre[]
}

export interface ConducteurDevisSynthese {
	nom: string
	prenom: string
	dateNaissance: string
	codeTypePermis?: string
	libelleTypePermis?: string
	dateObtentionPermis?: string
	dateAnterioriteBonus050?: string
	codeExperienceConducteur: string
	libelleExperienceConducteur?: string
	codeTypeConducteur: string
	libelleTypeConducteur: string
	dateSouscriptionAncienAssureur?: string
	dateDEcheanceAncienAssureur?: string
	coefficientBonusMalusAncienAssureur?: number
	codeConduiteAccompagnee: string
	libelleConduiteAccompagnee: string
	codeAssujettissementClause: string
	libelleAssujettissementClause: string
}

export interface ContexteAcceptation {
	dateEffet?: string
	codeActeGestion: string
	codeOperationRisque: string
	modificationConducteur: boolean
}

export interface CreationDevisSynthese {
	conducteurAAssurer?: ConducteurDevisSynthese
	vehiculeAAssurer: VehiculeDevis
	idDevis: number
	dateRealisationDevis: string
	dateFinValiditeDevis: string
	dateEffetDevis: string
	tarifsFranchiseSyntheseDevis: TarifsFranchiseSyntheseDevis[]
}

export interface CreationRisqueVehiculeConducteurAAssurerSynthese {
	AcceptationDefinitive?: AcceptationRisqueVehicule
	idRisqueVehiculeConducteurAAssurer: number
}

export interface DateAntecedentsSinistralite {
	dateDebutCollecteSinistre: string
	dateAnterioriteBonus050: string
}

export interface DetailFranchise {
	montantFranchise: number
	conditions?: ConditionFranchise[]
}

export interface DetailNomenclature {
	code: string
	libelle: string
}

export interface DevisVehiculeConducteur {
	solutionChoisie: FormuleReferenceChoisie
	identifiantPersonnePhysique?: string
	identifiantBesoin?: string
	idRisqueVehiculeConducteurAAssurer: number
}

export interface FormuleReferenceChoisie {
	codeFormule: string
	codeNiveauGarantie: string
	codeNiveauFranchise: string
	options?: OptionATarifer[]
}

export interface FormuleReferenceEligibilite {
	codeFormule: string
	libelleFormule: string
	codeNiveauGarantie: string
	libelleNiveauGarantie: string
	codeNiveauFranchise: string
	libelleNiveauFranchise: string
	montantFranchiseDommage?: number
	options?: OptionEligibilite[]
}

export interface FranchiseEligible {
	codeNiveauFranchise: string
	libelleNiveauFranchise: string
	montantFranchiseDommage: number
}

export interface InfoAcceptationProspect {
	conducteur: ConducteurAAssurer
	vehicule: VehiculeAAssurer
	dateEffet?: string
}

export interface InfoAcceptationSocietaire {
	conducteur: ConducteurAAssurer
	contexteAcceptation: ContexteAcceptation
	vehicule: VehiculeAAssurer
}

export interface InfoAcceptationVehicule {
	numeroRepertoire: string
}

export interface InfoCalculCrmProspect {
	conducteur: ConducteurAAssurerCrm
	vehicule: VehiculeAAssurer
	dateEffet?: string
}

export interface InfoEditionDevis {
	identifiantPersonne?: string
	idDevis?: number
}

export interface JustificationAcceptationRisque {
	codeJustificationRisque?: string
	libelleJustificationRisque?: string
}

export interface LienDetailVehicule {
	method: string
	href: string
}

export interface Mesure {
	codeFamilleTarifaire: string
	libelleFamilleTarifaire: string
	codeModaliteFamilleTarifaire: string
	libelleModaliteFamilleTarifaire?: string
}

export interface Nomenclature {
	nomNomenclature: string
	detailNomenclature: DetailNomenclature[]
}

export interface OptionATarifer {
	codeOption: string
}

export interface OptionEligibilite {
	codeOption: string
	libelleOption: string
	montantPlafondOption?: number
}

export interface OptionEligible {
	codeOption: string
	libelleOption: string
	montantPlafondOption?: number
	optionsIncluses?: OptionEligibilite[]
	optionsExclues?: OptionEligibilite[]
}

export interface PresentationSolution {
	codeFormule: string
	libelleFormule: string
	franchisesEligibles?: FranchiseEligible[]
	options?: OptionEligible[]
}

export interface RisqueVehiculeConducteurAAssurer {
	conducteur: ConducteurAAssurerDevis
	vehicule: VehiculeAAssurerDevis
	identifiantPersonnePhysique: string
	identifiantBesoin?: string
	dateEffet?: string
}

export interface Sinistre {
	dateSurvenance: string
	codeResponsabilite?: string
}

export interface SolutionEligible {
	formuleReference: FormuleReferenceEligibilite
	codeProduit: string
	libelleProduit: string
}

export interface SolutionsEligiblesPresentation {
	solutionsEligibles: SolutionEligible[]
	presentationSolutions?: PresentationSolution[]
}

export interface TarifFormuleReference {
	codeFormule: string
	libelleFormule: string
	montantFormuleTTC: number
	options?: TarifOption[]
}

export interface TarifOption {
	codeOption: string
	libelleOption: string
	montantOptionTTC: number
}

export interface TarifsFranchiseSyntheseDevis {
	tarifsParFormule: TarifFormuleReference
	anneeTarif: string
	dateDebutPeriodeTarification: string
	dateFinPeriodeTarification: string
	nombreEcheanceAvecBonus050?: string
	coefficientBonusMalus?: number
	montantAnnuelHT: number
	montantAnnuelTTC: number
	montantAnnuelBrutTTC: number
	montantTarifJourUsageTTC?: number
	mesuresReductionCommerciale?: Mesure[]
	montantFranchiseContractuelle?: number
	autresFranchises?: AutresFranchises[]
}

export interface VehiculeAAssurer {
	numeroRepertoire: string
	codeUsageVehicule: string
}

export interface VehiculeAAssurerDevis {
	numeroRepertoire: string
	codeUsageVehicule: string
	anneeMiseEnCirculationVehicule: string
	achatVehiculePost01012021?: boolean
}

export interface VehiculeDevis {
	lienDetailVehicule?: LienDetailVehicule
	numeroRepertoire: string
	typeImmatriculationVehicule?: string
	libelleTypeImmatriculationVehicule?: string
	immatriculation?: string
	codeCategorie: string
	libelleCategorie: string
	codeGenre: string
	libelleGenre: string
	libelleMarque: string
	libelleFamille: string
	denominationCommercialeLongue: string
	dateMiseEnCirculationVehicule: string
	codeUsageVehicule?: string
	libelleUsageVehicule?: string
}

export type InfoEditionDevisBody = InfoEditionDevis

export type RecupererDatesAntecedentsSinistraliteParams = {
	dateDEcheanceAncienAssureur: string
}

export type SolutionsEligiblesGetParams = {
	idRisqueVehiculeConducteurAAssurer: number
	filtre?: SolutionsEligiblesGetFiltre
}

export type SolutionsEligiblesGetFiltre = "TIERS" | "TOUS-RISQUES"

export const SolutionsEligiblesGetFiltre = {
	TIERS: "TIERS" as SolutionsEligiblesGetFiltre,
	TOUSRISQUES: "TOUS-RISQUES" as SolutionsEligiblesGetFiltre,
}
