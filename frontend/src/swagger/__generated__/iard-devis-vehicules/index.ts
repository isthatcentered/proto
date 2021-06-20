/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * Retour de l'acceptation du risque
 */
export interface AcceptationRisqueVehicule {
  /**
   * Code du retour de l'acceptation du risque. Exemple: Accepté.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CACPRIS)
   * @example 01
   */
  codeAcceptation: string;

  /**
   * Libellé du retour de l'acceptation du risque
   * @example Accepté
   */
  libelleAcceptation: string;

  /** Liste de justifications accompagnant l'acceptation du risque (Liste réservée en interne Maif) */
  justifications?: JustificationAcceptationRisque[];
}

/**
 * Description d'une franchise
 */
export interface AutresFranchises {
  /**
   * Code nature de la franchise. <br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CNATFRN)
   * @example 02
   */
  codeNatureFranchise: string;

  /**
   * Libelle de la nature de la franchise
   * @example Bris d'élément vitré
   */
  libelleNatureFranchise: string;

  /** Détails d'une franchise qui contient le montant et les conditions d'application de celui-ci */
  detailsFranchise?: DetailFranchise[];
}

/**
 * Retour du calcul coefficient de bonus/malus
 */
export interface CalculCrmRisqueVehicule {
  /**
   * Coefficient de Bonus ou Malus du conducteur retenu qui sera appliqué à la Maif. Ce coefficient peut prendre toutes les valeurs entre '050' et '350'. Par exemple : pour un bonus de 45% il faut saisir 055.
   * @format int32
   * @example 55
   */
  coefficientBonusMalusRetenu: number;

  /**
   * Coefficient de Bonus ou Malus du conducteur retenu qui sera appliqué à la Maif l'année suivante. Ce coefficient peut prendre toutes les valeurs entre '050' et '350'. Par exemple : pour un bonus de 45% il faut saisir 055.
   * @format int32
   * @example 55
   */
  coefficientBonusMalusRetenuAnneeSuivante?: number;
}

/**
 * Détail d'une condition
 */
export interface ConditionFranchise {
  /**
   * Condition d'application de la franchise
   * @example en cas de remplacement
   */
  libelleConditionFranchise: string;
}

/**
 * Conducteur à assurer
 */
export interface ConducteurAAssurer {
  /**
   * Nom du conducteur. Les caractères autorisés sont les caractères alphabétiques (minuscules, majuscules) y compris les caractères alphabétiques accentués, le tiret, l'espace et l'apostrophe.
   * @example DUPOND
   */
  nom: string;

  /**
   * Prénom du conducteur. Les caractères autorisés sont les caractères alphabétiques (minuscules, majuscules) y compris les caractères alphabétiques accentués, le tiret, l'espace et l'apostrophe.
   * @example ALAIN
   */
  prenom: string;

  /** Date de naissance du conducteur<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateNaissance: string;

  /** Date d'obtention du permis<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateObtentionPermis?: string;

  /**
   * Coefficient de Bonus ou Malus du conducteur. Ce coefficient peut prendre toutes les valeurs entre '050' et '350'. Par exemple : pour un bonus de 45% il faut saisir 055.
   * @format int32
   * @example 55
   */
  coefficientBonusMalus?: number;

  /**
   * Code expérience du conducteur. Il s'agit du passé assurantiel du conducteur. Exemple : Sans Expérience.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CEXPCDD)
   * @example 04
   */
  codeExperienceConducteur: string;

  /**
   * Code type de conducteur déclaré. Statut du conducteur vis-à-vis du sociétaire. Exemple : Conjoint.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TCDD)
   * @example 2
   */
  codeTypeConducteur: string;

  /** Date d'échéance de l'ancien assureur.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Valeur par défaut : date du jour_ */
  dateDEcheanceAncienAssureur?: string;

  /**
   * Booleen indiquant la présence ou pas de sinistre avec des circonstances aggravantes au cours des 24 dernier mois. Si "true" alors il y a présence de sinistres qui remplissent cette condition.
   * @example false
   */
  sinistreAvecCirconstanceAggravante?: boolean;

  /**
   * Booleen indiquant si le permis a été retiré ou annulé au cours des 24 derniers mois. Si "true" alors le permis du conducteur remplie cette condition.
   * @example false
   */
  retraitPermis?: boolean;

  /**
   * Booleen indiquant si le conducteur a été résilié par l'assureur précédent.
   * @example false
   */
  resiliationAssureurPrecedent?: boolean;

  /** Sinistres a prendre en compte pour jouer l'acceptation */
  sinistres?: Sinistre[];
}

/**
 * Conducteur à assurer
 */
export interface ConducteurAAssurerCrm {
  /** Date de naissance du conducteur<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateNaissance: string;

  /**
   * Code du type de permis<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CPRM)
   * @example B
   */
  codeTypePermis?: string;

  /** Date d'obtention du permis<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateObtentionPermis: string;

  /** Date à partir de laquelle le conducteur possède un bonus à 50%.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateAnterioriteBonus050?: string;

  /**
   * Coefficient de Bonus ou Malus du conducteur. Ce coefficient peut prendre toutes les valeurs entre '050' et '350'. Par exemple : pour un bonus de 45% il faut saisir 055.
   * @format int32
   * @example 55
   */
  coefficientBonusMalus?: number;

  /**
   * Code expérience du conducteur. Il s'agit du passé assurantiel du conducteur. Exemple : Sans Expérience.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CEXPCDD)
   * @example 04
   */
  codeExperienceConducteur: string;

  /**
   * Code type de conducteur déclaré. Statut du conducteur vis-à-vis du sociétaire. Exemple : Conjoint.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TCDD)
   * @example 2
   */
  codeTypeConducteur: string;

  /** Date de souscription chez l'assureur précédent.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Valeur par défaut : date du jour_ */
  dateSouscriptionAncienAssureur?: string;

  /** Date d'échéance de l'ancien assureur.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Valeur par défaut : date du jour_ */
  dateDEcheanceAncienAssureur?: string;

  /**
   * Booleen indiquant si le conducteur a réalisé une conduite accompagnée. Si "true" alors le conducteur a bien réalisé une conduite accompagnée.
   * @example false
   */
  conduiteAccompagnee?: boolean;

  /**
   * Booleen indiquant si le conducteur a réalisé une conduite accompagnée en étant assuré à la Maif. Si "true" alors le conducteur a bien réalisé une conduite accompagnée en étant assuré à la Maif.
   * @example false
   */
  conduiteAccompagneeMaif?: boolean;

  /**
   * Booleen indiquant si le conducteur a réalisé une conduite accompagnée en étant assuré à la Maif avant le 01/01/2007 ou pas. Si "true" alors le conducteur a bien réalisé une conduite accompagnée en étant assuré à la Maif avant le 01/01/2007.
   * @example false
   */
  conduiteAccompagneeMaifAvant2007?: boolean;

  /** Sinistres a prendre en compte pour le calcul du coefficient bonus/malus */
  sinistres?: Sinistre[];
}

/**
 * Conducteur à assurer. Les prénom, nom et date de naissance du conducteur peuvent être défini unitairement ou via l'identifiantPersonnePhysique si la personne est connue.
 */
export interface ConducteurAAssurerDevis {
  /**
   * Nom du conducteur. Les caractères autorisés sont les caractères alphabétiques (minuscules, majuscules) y compris les caractères alphabétiques accentués, le tiret, l'espace et l'apostrophe.
   * @example DUPOND
   */
  nom?: string;

  /**
   * Prénom du conducteur. Les caractères autorisés sont les caractères alphabétiques (minuscules, majuscules) y compris les caractères alphabétiques accentués, le tiret, l'espace et l'apostrophe.
   * @example ALAIN
   */
  prenom?: string;

  /** Date de naissance du conducteur<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateNaissance?: string;

  /**
   * Identifiant technique de la personne physique. Code interne MAIF
   * @example 1-5EB-942
   */
  identifiantPersonnePhysiqueConducteur?: string;

  /**
   * Code du type de permis<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CPRM)
   * @example B
   */
  codeTypePermis?: string;

  /** Date d'obtention du permis<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateObtentionPermis?: string;

  /** Date à partir de laquelle le conducteur possède un bonus à 50%.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateAnterioriteBonus050?: string;

  /**
   * Coefficient de Bonus ou Malus du conducteur. Ce coefficient peut prendre toutes les valeurs entre '050' et '350'. Par exemple : pour un bonus de 45% il faut saisir 055.
   * @format int32
   * @example 55
   */
  coefficientBonusMalus?: number;

  /**
   * Code expérience du conducteur. Il s'agit du passé assurantiel du conducteur. Exemple : Sans Expérience.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CEXPCDD)
   * @example 04
   */
  codeExperienceConducteur: string;

  /**
   * Code type de conducteur déclaré. Statut du conducteur vis-à-vis du sociétaire. Exemple : Conjoint.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TCDD)
   * @example 2
   */
  codeTypeConducteur: string;

  /** Date de souscription chez l'assureur précédent.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Valeur par défaut : date du jour_ */
  dateSouscriptionAncienAssureur?: string;

  /** Date d'échéance de l'ancien assureur.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Valeur par défaut : date du jour_ */
  dateDEcheanceAncienAssureur?: string;

  /**
   * Booleen indiquant si le conducteur a réalisé une conduite accompagnée. Si "true" alors le conducteur a bien réalisé une conduite accompagnée.
   * @example false
   */
  conduiteAccompagnee?: boolean;

  /**
   * Booleen indiquant si le conducteur a réalisé une conduite accompagnée en étant assuré à la Maif. Si "true" alors le conducteur a bien réalisé une conduite accompagnée en étant assuré à la Maif.
   * @example false
   */
  conduiteAccompagneeMaif?: boolean;

  /**
   * Booleen indiquant si le conducteur a réalisé une conduite accompagnée en étant assuré à la Maif avant le 01/01/2007 ou pas. Si "true" alors le conducteur a bien réalisé une conduite accompagnée en étant assuré à la Maif avant le 01/01/2007.
   * @example false
   */
  conduiteAccompagneeMaifAvant2007?: boolean;

  /**
   * Booleen indiquant la présence ou pas de sinistre avec des circonstances aggravantes au cours des 24 dernier mois. Si "true" alors il y a présence de sinistres qui remplissent cette condition.
   * @example false
   */
  sinistreAvecCirconstanceAggravante?: boolean;

  /**
   * Booleen indiquant si le permis a été retiré ou annulé au cours des 24 derniers mois. Si "true" alors le permis du conducteur remplie cette condition.
   * @example false
   */
  retraitPermis?: boolean;

  /**
   * Booleen indiquant si le conducteur a été résilié par l'assureur précédent.
   * @example false
   */
  resiliationAssureurPrecedent?: boolean;

  /** Sinistres a prendre en compte pour enregistrer un risque à assurer */
  sinistres?: Sinistre[];
}

/**
 * Synthèse du conducteur à assurer dans le cadre du devis
 */
export interface ConducteurDevisSynthese {
  /**
   * Nom du conducteur. Les caractères autorisés sont les caractères alphabétiques (minuscules, majuscules) y compris les caractères alphabétiques accentués, le tiret, l'espace et l'apostrophe.
   * @example DUPOND
   */
  nom: string;

  /**
   * Prénom du conducteur. Les caractères autorisés sont les caractères alphabétiques (minuscules, majuscules) y compris les caractères alphabétiques accentués, le tiret, l'espace et l'apostrophe.
   * @example ALAIN
   */
  prenom: string;

  /** Date de naissance du conducteur<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateNaissance: string;

  /**
   * Code du type de permis<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CPRM)
   * @example B
   */
  codeTypePermis?: string;

  /**
   * Libellé associé au code du type de permis
   * @example 4 roues assujettis (B,BE)
   */
  libelleTypePermis?: string;

  /** Date d'obtention du permis<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateObtentionPermis?: string;

  /** Date à partir de laquelle le conducteur possède un bonus à 50%.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateAnterioriteBonus050?: string;

  /**
   * Code expérience du conducteur. Il s'agit du passé assurantiel du conducteur. Exemple : Sans Expérience.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CEXPCDD)
   * @example 04
   */
  codeExperienceConducteur: string;

  /**
   * Libellé de l'expérience du conducteur
   * @example Sans Experience
   */
  libelleExperienceConducteur?: string;

  /**
   * Code type de conducteur déclaré. Statut du conducteur vis-à-vis du sociétaire. Exemple : Conjoint.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TCDD)
   * @example 2
   */
  codeTypeConducteur: string;

  /**
   * Libellé associé au code du type de conducteur
   * @example Sociétaire
   */
  libelleTypeConducteur: string;

  /** Date de souscription chez l'assureur précédent.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Valeur par défaut : date du jour_ */
  dateSouscriptionAncienAssureur?: string;

  /** Date d'échéance de l'ancien assureur.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Valeur par défaut : date du jour_ */
  dateDEcheanceAncienAssureur?: string;

  /**
   * Coefficient de Bonus ou Malus du conducteur chez son assureur précédent. Ce coefficient peut prendre toutes les valeurs entre '050' et '350'. Par exemple : pour un bonus de 45% il faut saisir 055.
   * @format int32
   * @example 55
   */
  coefficientBonusMalusAncienAssureur?: number;

  /**
   * Code conduite accompagnée. Exemple : Sans AAC.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CAAC).
   * @example 01
   */
  codeConduiteAccompagnee: string;

  /**
   * Libellé de la conduite accompagnée
   * @example Sans AAC
   */
  libelleConduiteAccompagnee: string;

  /**
   * Code assujettissement à la clause du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CASJCLA)
   * @example 1
   */
  codeAssujettissementClause: string;

  /**
   * Libellé de l'assujettissement à la clause du véhicule
   * @example true
   */
  libelleAssujettissementClause: string;
}

/**
 * Contexte de l'acceptation
 */
export interface ContexteAcceptation {
  /** Date d'effet <br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Exemple : 2018-10-27_<br> */
  dateEffet?: string;

  /**
   * Code acte de gestion.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CACTGES)
   * @example 001
   */
  codeActeGestion: string;

  /**
   * Code des types d'opérations liés au risque.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=COPERIS)
   * @example 01
   */
  codeOperationRisque: string;

  /**
   * Booleen indiquant si il s'agit d'un cas de modification du conducteur ou pas.
   * @example false
   */
  modificationConducteur: boolean;
}

/**
 * Synthèse du devis qui vient d'être créé
 */
export interface CreationDevisSynthese {
  /** Synthèse du conducteur à assurer dans le cadre du devis */
  conducteurAAssurer?: ConducteurDevisSynthese;

  /** Synthèse du véhicule à assurer dans le cadre du devis */
  vehiculeAAssurer: VehiculeDevis;

  /**
   * Identifiant technique du devis
   * @format int64
   * @example 800000436176
   */
  idDevis: number;

  /** Date à laquelle le devis a été réalisé */
  dateRealisationDevis: string;

  /** Date de fin de validité du devis */
  dateFinValiditeDevis: string;

  /** Date d'effet <br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Exemple : 2018-10-27_<br> */
  dateEffetDevis: string;

  /** Liste des tarifs et des franchises pour une solution en fonction de l'année pour laquelle ils sont calculés. */
  tarifsFranchiseSyntheseDevis: TarifsFranchiseSyntheseDevis[];
}

/**
 * Synthèse du risque véhicule et conducteur à assurer qui vient d'être créé
 */
export interface CreationRisqueVehiculeConducteurAAssurerSynthese {
  /** Retour de l'acceptation du risque */
  AcceptationDefinitive?: AcceptationRisqueVehicule;

  /**
   * Identifiant du risque véhicule et conducteur à assurer
   * @format int64
   * @example 800000436176
   */
  idRisqueVehiculeConducteurAAssurer: number;
}

/**
 * Dates en lien avec les antécédents de sinistralité du conducteur
 */
export interface DateAntecedentsSinistralite {
  /** Date de début à partir de laquelle on s'intéresse aux sinistres du conducteur.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateDebutCollecteSinistre: string;

  /** Date à partir de laquelle le conducteur possède un bonus à 50%.<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateAnterioriteBonus050: string;
}

/**
 * Détails d'une franchise
 */
export interface DetailFranchise {
  /**
   * Montant de la franchise (exprimé en centimes d'euro)
   * @format int64
   * @example 5000
   */
  montantFranchise: number;

  /** Liste de condition d'application de la franchise */
  conditions?: ConditionFranchise[];
}

/**
 * Code et libellé d'une nomenclature
 */
export interface DetailNomenclature {
  /**
   * Code
   * @example 1
   */
  code: string;

  /**
   * Libellé associé au code
   * @example description du code
   */
  libelle: string;
}

/**
 * Regroupe les informations à passer en entrée pour enregistrer un devis pour une personne physique connue à la MAIF
 */
export interface DevisVehiculeConducteur {
  /** Définition de la formule de base dans le cadre de l'enregistrement d'un devis */
  solutionChoisie: FormuleReferenceChoisie;

  /**
   * Identifiant technique de la personne physique. Code interne MAIF
   * @example 1-5EB-942
   */
  identifiantPersonnePhysique?: string;

  /**
   * Identifiant technique du besoin
   * @example 1-7EX-999
   */
  identifiantBesoin?: string;

  /**
   * Identifiant du risque véhicule et conducteur à assurer
   * @format int64
   * @example 800000436176
   */
  idRisqueVehiculeConducteurAAssurer: number;
}

/**
 * Définition de la formule de base dans le cadre de l'enregistrement d'un devis
 */
export interface FormuleReferenceChoisie {
  /**
   * Code de la formule de référence. Exemple : Initiale <br/>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFORREF)
   * @example 7
   */
  codeFormule: string;

  /**
   * Niveau de garantie. Exemple : Standard <br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature_ext.do?nomPhysique=CNIVGARREF)
   * @example 1
   */
  codeNiveauGarantie: string;

  /**
   * Niveau de franchise. Exemple : Franchise moyenne <br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature_ext.do?nomPhysique=CNIVFRNREF)
   * @example 3
   */
  codeNiveauFranchise: string;

  /** Liste des options à enregistrer pour cette formule de référence */
  options?: OptionATarifer[];
}

/**
 * Définition de la formule de base dans le cadre d'une éligibilité
 */
export interface FormuleReferenceEligibilite {
  /**
   * Code de la formule de référence. Exemple : Initiale <br/>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFORREF)
   * @example 7
   */
  codeFormule: string;

  /**
   * Libellé de la formule de référence
   * @example Initiale
   */
  libelleFormule: string;

  /**
   * Niveau de garantie. Exemple : Standard <br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature_ext.do?nomPhysique=CNIVGARREF)
   * @example 1
   */
  codeNiveauGarantie: string;

  /**
   * Libellé du niveau de garantie
   * @example Standard
   */
  libelleNiveauGarantie: string;

  /**
   * Niveau de franchise. Exemple : Franchise moyenne <br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature_ext.do?nomPhysique=CNIVFRNREF)
   * @example 3
   */
  codeNiveauFranchise: string;

  /**
   * Libellé du niveau de franchise
   * @example Franchise NAVI
   */
  libelleNiveauFranchise: string;

  /**
   * Montant de la franchise dommage (exprimé en centimes d'€)
   * @format int64
   * @example 17500
   */
  montantFranchiseDommage?: number;

  /** Liste des options éligibles pour cette formule de référence */
  options?: OptionEligibilite[];
}

/**
 * Détail de la franchise éligible
 */
export interface FranchiseEligible {
  /**
   * Niveau de franchise. Exemple : Franchise moyenne <br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature_ext.do?nomPhysique=CNIVFRNREF)
   * @example 3
   */
  codeNiveauFranchise: string;

  /**
   * Libellé du niveau de franchise
   * @example Franchise NAVI
   */
  libelleNiveauFranchise: string;

  /**
   * Montant de la franchise dommage (exprimé en centimes d'€)
   * @format int64
   * @example 17500
   */
  montantFranchiseDommage: number;
}

/**
 * Regroupe les informations à passer en entrée pour jouer l'acceptation d'un prospect uniquement
 */
export interface InfoAcceptationProspect {
  /** Conducteur à assurer */
  conducteur: ConducteurAAssurer;

  /** Véhicule à assurer */
  vehicule: VehiculeAAssurer;

  /** Date d'effet <br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Exemple : 2018-10-27_<br> */
  dateEffet?: string;
}

/**
 * Regroupe les informations à passer en entrée pour jouer l'acceptation d'un sociétaire
 */
export interface InfoAcceptationSocietaire {
  /** Conducteur à assurer */
  conducteur: ConducteurAAssurer;

  /** Contexte de l'acceptation */
  contexteAcceptation: ContexteAcceptation;

  /** Véhicule à assurer */
  vehicule: VehiculeAAssurer;
}

/**
 * Information à passer en entrée pour jouer l'acceptation.
 */
export interface InfoAcceptationVehicule {
  /**
   * Numéro de répertoire issu du référentiel de véhicules MAIF
   * @example 97836
   */
  numeroRepertoire: string;
}

/**
 * Regroupe les informations à passer en entrée pour calculer le coefficient de bonus/malus d'un prospect uniquement
 */
export interface InfoCalculCrmProspect {
  /** Conducteur à assurer */
  conducteur: ConducteurAAssurerCrm;

  /** Véhicule à assurer */
  vehicule: VehiculeAAssurer;

  /** Date d'effet <br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Exemple : 2018-10-27_<br> */
  dateEffet?: string;
}

/**
 * Informations à fournir pour éditer un devis
 */
export interface InfoEditionDevis {
  /**
   * Identifiant technique de la personne physique ou morale. Code interne MAIF
   * @example 1-5EB-942
   */
  identifiantPersonne?: string;

  /**
   * Identifiant technique du devis
   * @format int64
   * @example 800000436176
   */
  idDevis?: number;
}

/**
 * Justification associée à l'acceptation du risque
 */
export interface JustificationAcceptationRisque {
  /**
   * Code de justification associée à l’acceptation du risque<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CJUSRIS)
   * @example 8
   */
  codeJustificationRisque?: string;

  /**
   * Libellé associé au code de justification
   * @example Résiliation assureur précédent
   */
  libelleJustificationRisque?: string;
}

/**
 * Lien vers le détail du tarif. Pour les contrats APR et OME, il n'y a pas de lien.
 */
export interface LienDetailVehicule {
  /**
   * Verbe HTTP à utiliser pour l'appel (HATEOAS)
   * @example GET
   */
  method: string;

  /**
   * Lien à utiliser pour accéder à la ressource liée (HATEOAS)
   * @example referentiel/modeles_vehicules/vehicules/97836
   */
  href: string;
}

export interface Mesure {
  /**
   * Code de la famille tarifaire. Exemple : Portefeuille du sociétaire (croisement société et du public cible). <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFTA)
   * @example 26
   */
  codeFamilleTarifaire: string;

  /**
   * Libellé de la famille tarifaire.
   * @example Mesure de réduction pour les véhicules phares
   */
  libelleFamilleTarifaire: string;

  /**
   * Code modalité de la famille tarifaire
   * @example 04
   */
  codeModaliteFamilleTarifaire: string;

  /**
   * Libellé de la modalité de la famille tarifaire.
   * @example Citroen C3
   */
  libelleModaliteFamilleTarifaire?: string;
}

/**
 * Valeurs et libellés possibles pour cette nomenclature.
 */
export interface Nomenclature {
  /**
   * Nom de la nomenclature
   * @example nom de la nomenclature
   */
  nomNomenclature: string;

  /** Liste des codes et libellés possibles pour cette nomenclature */
  detailNomenclature: DetailNomenclature[];
}

/**
 * Définition d'une option dans le cadre d'une tarification
 */
export interface OptionATarifer {
  /**
   * Code option. Exemple : Biens transportés plafond 1750 €<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFORREF)
   * @example 15
   */
  codeOption: string;
}

/**
 * Définition d'une option dans le cadre d'une éligibilité
 */
export interface OptionEligibilite {
  /**
   * Code option. Exemple : Biens transportés plafond 1750 €<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFORREF)
   * @example 15
   */
  codeOption: string;

  /**
   * Libellé de l'option
   * @example Biens transportés plafond 1750 €
   */
  libelleOption: string;

  /**
   * Montant du plafond de l'option (exprimé en centimes d'€)
   * @format int64
   * @example 175000
   */
  montantPlafondOption?: number;
}

/**
 * Détail d'une option éligible
 */
export interface OptionEligible {
  /**
   * Code option. Exemple : Biens transportés plafond 1750 €<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFORREF)
   * @example 15
   */
  codeOption: string;

  /**
   * Libellé de l'option
   * @example Biens transportés plafond 1750 €
   */
  libelleOption: string;

  /**
   * Montant du plafond de l'option (exprimé en centimes d'€)
   * @format int64
   * @example 175000
   */
  montantPlafondOption?: number;

  /** Liste des options incluses avec cette option si elle est sélectionnée */
  optionsIncluses?: OptionEligibilite[];

  /** Liste des options exclues par cette option si elle est sélectionnée */
  optionsExclues?: OptionEligibilite[];
}

/**
 * Détail de la solution
 */
export interface PresentationSolution {
  /**
   * Code de la formule de référence. Exemple : Initiale <br/>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFORREF)
   * @example 7
   */
  codeFormule: string;

  /**
   * Libellé de la formule de référence
   * @example Initiale
   */
  libelleFormule: string;

  /** Liste des franchises éligibles pour cette formule de référence */
  franchisesEligibles?: FranchiseEligible[];

  /** Liste des options éligibles pour cette formule de référence */
  options?: OptionEligible[];
}

/**
 * Regroupe les informations à passer en entrée pour enregistrer un risque à assurer pour une personne physique connue à la MAIF
 */
export interface RisqueVehiculeConducteurAAssurer {
  /** Conducteur à assurer. Les prénom, nom et date de naissance du conducteur peuvent être défini unitairement ou via l'identifiantPersonnePhysique si la personne est connue. */
  conducteur: ConducteurAAssurerDevis;

  /** Véhicule à assurer */
  vehicule: VehiculeAAssurerDevis;

  /**
   * Identifiant technique de la personne physique. Code interne MAIF
   * @example 1-5EB-942
   */
  identifiantPersonnePhysique: string;

  /**
   * Identifiant technique du besoin
   * @example 1-7EX-999
   */
  identifiantBesoin?: string;

  /** Date d'effet <br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Exemple : 2018-10-27_<br> */
  dateEffet?: string;
}

/**
 * Sinistre qui sera pris en compte
 */
export interface Sinistre {
  /** Date de survenance d'un sinistre<br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_ */
  dateSurvenance: string;

  /**
   * Code indiquant la résponsabilité lors du sinistre. Exemple : Responsabilité totale.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CRSPEVE)
   * @example 2
   */
  codeResponsabilite?: string;
}

/**
 * Détail de la solution
 */
export interface SolutionEligible {
  /** Définition de la formule de base dans le cadre d'une éligibilité */
  formuleReference: FormuleReferenceEligibilite;

  /**
   * Code du produit. Exemple : VAM <br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CPDTREF)
   * @example 5
   */
  codeProduit: string;

  /**
   * Libellé du produit
   * @example VAM
   */
  libelleProduit: string;
}

/**
 * Liste des solutions éligibles et leur présentation
 */
export interface SolutionsEligiblesPresentation {
  /** Liste des solutions éligibles */
  solutionsEligibles: SolutionEligible[];

  /** Présentation possible pour chaque solution éligible */
  presentationSolutions?: PresentationSolution[];
}

/**
 * Montant Annuel TTC qui s'applique pour la formule de référence.
 */
export interface TarifFormuleReference {
  /**
   * Code de la formule de référence. Exemple : Initiale <br/>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFORREF)
   * @example 7
   */
  codeFormule: string;

  /**
   * Libellé de la formule de référence
   * @example Initiale
   */
  libelleFormule: string;

  /**
   * Montant annuel de la formule toutes taxes comprises (exprimé en centimes d'€)
   * @format int64
   * @example 32070
   */
  montantFormuleTTC: number;

  /** Liste des options avec leur montant annuel TTC */
  options?: TarifOption[];
}

/**
 * Montant Annuel TTC qui s'applique pour l'option.
 */
export interface TarifOption {
  /**
   * Code option. Exemple : Biens transportés plafond 1750 €<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CFORREF)
   * @example 15
   */
  codeOption: string;

  /**
   * Libellé de l'option
   * @example Biens transportés plafond 1750 €
   */
  libelleOption: string;

  /**
   * Montant annuel de l'option toutes taxes comprises (exprimé en centimes d'€)
   * @format int64
   * @example 1690
   */
  montantOptionTTC: number;
}

export interface TarifsFranchiseSyntheseDevis {
  /** Montant Annuel TTC qui s'applique pour la formule de référence. */
  tarifsParFormule: TarifFormuleReference;

  /**
   * Année d'exercice du tarif.
   * @example 2020
   */
  anneeTarif: string;

  /** Date de début de la période tarifée */
  dateDebutPeriodeTarification: string;

  /** Date de fin de la période tarifée */
  dateFinPeriodeTarification: string;

  /**
   * Nombre d'échéance avec un coefficient de bonus à 50%. Maximum à 4.
   * @example 0
   */
  nombreEcheanceAvecBonus050?: string;

  /**
   * Coefficient de Bonus ou Malus du conducteur. Ce coefficient peut prendre toutes les valeurs entre '050' et '350'. Par exemple : pour un bonus de 45% il faut saisir 055.
   * @format int32
   * @example 55
   */
  coefficientBonusMalus?: number;

  /**
   * Montant tarif annuel hors taxe (exprimé en centimes d'€)
   * @format int64
   * @example 28065
   */
  montantAnnuelHT: number;

  /**
   * Montant tarif annuel toutes taxes comprises (exprimé en centimes d'€)
   * @format int64
   * @example 32070
   */
  montantAnnuelTTC: number;

  /**
   * Montant tarif annuel hors mesure de réduction et/ou majoration toutes taxes comprises (exprimé en centimes d'€)
   * @format int64
   * @example 32070
   */
  montantAnnuelBrutTTC: number;

  /**
   * Montant du tarif journalié toutes taxes comprises (exprimé en centimes d'€) dans les cas de formule à la demande. C'est le montant payé en plus pour une journée où des garanties supplémentaires sont activées.
   * @format int64
   * @example 390
   */
  montantTarifJourUsageTTC?: number;

  /** Liste des mesures de réduction commerciale qui s'appliquent à ce tarif */
  mesuresReductionCommerciale?: Mesure[];

  /**
   * Montant de la franchise contractuelle (exprimé en centimes d'€)
   * @format int64
   * @example 28000
   */
  montantFranchiseContractuelle?: number;

  /** Liste d'une ou plusieurs franchises pour le risque. */
  autresFranchises?: AutresFranchises[];
}

/**
 * Véhicule à assurer
 */
export interface VehiculeAAssurer {
  /**
   * Numéro de répertoire issu du référentiel de véhicules MAIF
   * @example 97836
   */
  numeroRepertoire: string;

  /**
   * Code usage du véhicule. Exemple : Usage privé et professionnel.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CUSARIS)
   * @example 1
   */
  codeUsageVehicule: string;
}

/**
 * Véhicule à assurer
 */
export interface VehiculeAAssurerDevis {
  /**
   * Numéro de répertoire issu du référentiel de véhicules MAIF
   * @example 97836
   */
  numeroRepertoire: string;

  /**
   * Code usage du véhicule. Exemple : Usage privé et professionnel.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CUSARIS)
   * @example 1
   */
  codeUsageVehicule: string;

  /**
   * Année de la première mise en circulation du véhicule à assurer.
   * @example 2019
   */
  anneeMiseEnCirculationVehicule: string;

  /**
   * Booleen indiquant si le véhicule a été acheté après le 01/01/2021 ou pas. Pour un véhicule électrique ce booléen est à renseigner obligatoire jusqu'au 31/12/2023 inclu.
   * @example false
   */
  achatVehiculePost01012021?: boolean;
}

/**
 * Synthèse du véhicule à assurer dans le cadre du devis
 */
export interface VehiculeDevis {
  /** Lien vers le détail du tarif. Pour les contrats APR et OME, il n'y a pas de lien. */
  lienDetailVehicule?: LienDetailVehicule;

  /**
   * Numéro de répertoire issu du référentiel de véhicules MAIF
   * @example 97836
   */
  numeroRepertoire: string;

  /**
   * Type d'immatriculation du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TIDEVEH)
   * @example 7
   */
  typeImmatriculationVehicule?: string;

  /**
   * Libellé du type d'immatriculation du véhicule
   * @example Immatriculation SIV
   */
  libelleTypeImmatriculationVehicule?: string;

  /**
   * Immatriculation
   * @example AA-123-AA
   */
  immatriculation?: string;

  /**
   * Code catégorie du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCATVEH)
   * @example 01
   */
  codeCategorie: string;

  /**
   * Libellé de la catégorie du véhicule
   * @example 4 Roues (VP et utilitaires légers) PTAC <= 3,5 t
   */
  libelleCategorie: string;

  /**
   * Code genre du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CGENVEH)
   * @example 01
   */
  codeGenre: string;

  /**
   * Libellé genre du véhicule
   * @example Voiture particulière
   */
  libelleGenre: string;

  /**
   * Libelle de la marque du véhicule
   * @example FIAT
   */
  libelleMarque: string;

  /**
   * Libelle de la famille du véhicule
   * @example DUCATO
   */
  libelleFamille: string;

  /**
   * Dénomination commerciale longue du véhicule
   * @example 316 COMPACT 1.6 I 102 CH AUTO
   */
  denominationCommercialeLongue: string;

  /** Date de première mise en circulation du véhicule' */
  dateMiseEnCirculationVehicule: string;

  /**
   * Code usage du véhicule. Exemple : Usage privé et professionnel.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CUSARIS)
   * @example 1
   */
  codeUsageVehicule?: string;

  /**
   * Libellé de l'usage du véhicule
   * @example Usage privé et professionnel occasionnel
   */
  libelleUsageVehicule?: string;
}

export interface RecupererDatesAntecedentsSinistraliteParams {
  /** Date de dernière échéance de l'assureur précédent. <br>_Format attendu : cf. [Norme ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601)_<br>_Exemple : 2018-04-23_ */
  dateDEcheanceAncienAssureur: string;
}

export interface SolutionsEligiblesGetParams {
  /**
   * Identifiant du risque véhicule et conducteur à assurer
   * @format int64
   */
  idRisqueVehiculeConducteurAAssurer: number;

  /** Critère de filtrage sur la liste des solutions éligibles à remonter. Si aucun filtre n'est passé, toutes les solutions éligibles sont remontées.<br>_Valeurs Possibles :_<br><ul><li> **TIERS** : Pour ne remonter que les solutions éligibles de type formule au tiers</li> <li> **TOUS-RISQUES** : Pour ne remonter que les solutions éligibles de type formule tous risques</li></ul> */
  filtre?: "TIERS" | "TOUS-RISQUES";
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "//intranet.api-recx.build-klif.cloud.maif.local:40054/iard/devis_vehicules/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title iard-devis-vehicules-v1
 * @baseUrl //intranet.api-recx.build-klif.cloud.maif.local:40054/iard/devis_vehicules/v1
 *
 * "Cette API permet de gÃ©rer le contexte iard-devis-vehicules."
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  acceptationRisqueVehicule = {
    /**
     * No description
     *
     * @tags Acceptation risque véhicule
     * @name RecupererDatesAntecedentsSinistralite
     * @summary Permet de récupérer les dates qui sont en lien avec les antécédents de sinistralité du conducteur.
     * @request GET:/antecedents_sinistralite/dates
     */
    recupererDatesAntecedentsSinistralite: (
      query: RecupererDatesAntecedentsSinistraliteParams,
      params: RequestParams = {},
    ) =>
      this.http.request<DateAntecedentsSinistralite, void>({
        path: `/antecedents_sinistralite/dates`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Acceptation risque véhicule
     * @name JouerAcceptationProspect
     * @summary Permet de jouer l'acceptation du risque pour un prospect à partir des critères fournis en paramètres
     * @request POST:/jouer_acceptation/prospect
     */
    jouerAcceptationProspect: (body: InfoAcceptationProspect, params: RequestParams = {}) =>
      this.http.request<AcceptationRisqueVehicule, void>({
        path: `/jouer_acceptation/prospect`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Acceptation risque véhicule
     * @name JouerAcceptationSocietaire
     * @summary Permet de jouer l'acceptation du risque pour un societaire à partir de critères fournis en paramètres
     * @request POST:/jouer_acceptation/societaire/{referenceSocietaire}
     */
    jouerAcceptationSocietaire: (
      referenceSocietaire: string,
      body: InfoAcceptationSocietaire,
      params: RequestParams = {},
    ) =>
      this.http.request<AcceptationRisqueVehicule, void>({
        path: `/jouer_acceptation/societaire/${referenceSocietaire}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Acceptation risque véhicule
     * @name JouerAcceptationVehicule
     * @summary Permet de jouer l'acceptation du risque à partir d'un vehicule uniquement
     * @request POST:/jouer_acceptation/vehicule
     */
    jouerAcceptationVehicule: (body: InfoAcceptationVehicule, params: RequestParams = {}) =>
      this.http.request<AcceptationRisqueVehicule, void>({
        path: `/jouer_acceptation/vehicule`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  calculCrm = {
    /**
     * No description
     *
     * @tags Calcul crm
     * @name CalculCrmProspect
     * @summary Permet de calculer le coefficient de bonus/malus à date pour un prospect à partir des critères fournis en paramètres
     * @request POST:/calculer_coefficient_bonus_malus
     */
    calculCrmProspect: (body: InfoCalculCrmProspect, params: RequestParams = {}) =>
      this.http.request<CalculCrmRisqueVehicule, void>({
        path: `/calculer_coefficient_bonus_malus`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  devis = {
    /**
     * No description
     *
     * @tags Devis
     * @name CreerDevis
     * @summary Permet d'enregistrer un devis à partir d'un risque (véhicule et conducteur) à assurer pour une personne connue à partir des critères fournis en paramètres
     * @request POST:/devis
     */
    creerDevis: (body: DevisVehiculeConducteur, params: RequestParams = {}) =>
      this.http.request<CreationDevisSynthese, void>({
        path: `/devis`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  editions = {
    /**
     * No description
     *
     * @tags Editions
     * @name LancerCreationEditionDevisMail
     * @summary Produit une édition du devis passé en paramètre et l'envoi par email
     * @request POST:/devis/editions/mail
     */
    lancerCreationEditionDevisMail: (body: InfoEditionDevis, params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/devis/editions/mail`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Editions
     * @name LancerCreationEditionDevisPdf
     * @summary Produit une édition instantanée du devis passé en paramètre
     * @request POST:/devis/editions/pdf
     */
    lancerCreationEditionDevisPdf: (body: InfoEditionDevis, params: RequestParams = {}) =>
      this.http.request<string, void>({
        path: `/devis/editions/pdf`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  nomenclatures = {
    /**
     * @description La liste des codes et libellés est différente en fonction du contexte d'appel.(paramètre Header HTTP).
     *
     * @tags Nomenclatures
     * @name RecupererValeursExperienceConducteur
     * @summary Permet de récupérer les codes et libellés possibles pour la nomenclature codeExperienceConducteur.
     * @request GET:/experiences_conducteur
     */
    recupererValeursExperienceConducteur: (params: RequestParams = {}) =>
      this.http.request<Nomenclature, void>({
        path: `/experiences_conducteur`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description La liste des codes et libellés est différente en fonction du contexte d'appel.(paramètre Header HTTP).
     *
     * @tags Nomenclatures
     * @name RecupererValeursOrigineSocietaire
     * @summary Permet de récupérer les codes et libellés possibles pour la nomenclature codeOrigineSocietaire.
     * @request GET:/passe_autre_assurance
     */
    recupererValeursOrigineSocietaire: (params: RequestParams = {}) =>
      this.http.request<Nomenclature, void>({
        path: `/passe_autre_assurance`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description La liste des codes et libellés est différente en fonction du contexte d'appel.(paramètre Header HTTP).
     *
     * @tags Nomenclatures
     * @name RecupererValeursResponsabiliteSinistre
     * @summary Permet de récupérer les codes et libellés possibles pour la nomenclature codeResponsabilite.
     * @request GET:/responsabilites_sinistre
     */
    recupererValeursResponsabiliteSinistre: (params: RequestParams = {}) =>
      this.http.request<Nomenclature, void>({
        path: `/responsabilites_sinistre`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description La liste des codes et libellés est différente en fonction du contexte d'appel.(paramètre Header HTTP).
     *
     * @tags Nomenclatures
     * @name RecupererValeursTypeConducteur
     * @summary Permet de récupérer les codes et libellés possibles pour la nomenclature codeTypeConducteur.
     * @request GET:/types_conducteur
     */
    recupererValeursTypeConducteur: (params: RequestParams = {}) =>
      this.http.request<Nomenclature, void>({
        path: `/types_conducteur`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Le numéro de répertoire peut être recherché via l'**API referentiel/modeles_vehicules**.<br> La liste des codes et libellés est différente en fonction du contexte d'appel.(paramètre Header HTTP).
     *
     * @tags Nomenclatures
     * @name RecupererValeursTypePermis
     * @summary Permet de récupérer les codes et libellés possibles pour la nomenclature codeTypePermis en fonction d'un véhicule.
     * @request GET:/types_permis/vehicule/{numeroRepertoire}
     */
    recupererValeursTypePermis: (numeroRepertoire: string, params: RequestParams = {}) =>
      this.http.request<Nomenclature, void>({
        path: `/types_permis/vehicule/${numeroRepertoire}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Le numéro de répertoire peut être recherché via l'**API referentiel/modeles_vehicules**.<br> La liste des codes et libellés est différente en fonction du contexte d'appel.(paramètre Header HTTP).
     *
     * @tags Nomenclatures
     * @name RecupererValeursUsage
     * @summary Permet de récupérer les codes et libellés possibles pour la nomenclature codeUsageVehicule en fonction d'un véhicule.
     * @request GET:/usages/vehicule/{numeroRepertoire}
     */
    recupererValeursUsage: (numeroRepertoire: string, params: RequestParams = {}) =>
      this.http.request<Nomenclature, void>({
        path: `/usages/vehicule/${numeroRepertoire}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  risqueAAssurer = {
    /**
     * No description
     *
     * @tags Risque à assurer
     * @name SolutionsEligiblesGet
     * @summary Permet de récupérer toutes les combinaisons de solutions éligibles pour un risque véhicule et conducteur à assurer créé précédemment.
     * @request GET:/solutions_eligibles
     */
    solutionsEligiblesGet: (query: SolutionsEligiblesGetParams, params: RequestParams = {}) =>
      this.http.request<SolutionsEligiblesPresentation, void>({
        path: `/solutions_eligibles`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risque à assurer
     * @name CreerRisqueAAssurerSocPotentiel
     * @summary Permet d'enregistrer un risque (véhicule et conducteur) à assurer pour une personne connue, dans le cas d'une souscription, à partir des critères fournis en paramètres
     * @request POST:/vehicule_conducteur_a_assurer
     */
    creerRisqueAAssurerSocPotentiel: (body: RisqueVehiculeConducteurAAssurer, params: RequestParams = {}) =>
      this.http.request<CreationRisqueVehiculeConducteurAAssurerSynthese, void>({
        path: `/vehicule_conducteur_a_assurer`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
