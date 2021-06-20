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

export interface AvertissementDTO {
  code?: string;
  message?: string;
}

/**
 * Carrosserie du véhicule
 */
export interface CarrosserieVehicule {
  /**
   * Code de la carrosserie <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH)
   * @example 01
   */
  codeCarrosserie: string;

  /**
   * Libellé de la carrosserie
   * @example Berline
   */
  libelleCarrosserie: string;
}

/**
 * Châssis du véhicule
 */
export interface ChassisVehicule {
  /**
   * Libellé de la marque du châssis
   * @example CITROEN
   */
  libelleMarqueChassis: string;

  /**
   * Libellé de la famille du châssis
   * @example JUMPER
   */
  libelleFamilleChassis: string;
}

/**
 * Energie du véhicule
 */
export interface EnergieVehicule {
  /**
   * Code de l'énergie <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH)
   * @example 1
   */
  codeEnergie: string;

  /**
   * Libellé de l'énergie
   * @example Essence
   */
  libelleEnergie: string;
}

/**
 * Famille de cellule du véhicule
 */
export interface FamilleCelluleVehicule {
  /**
   * Libellé de la famille de cellule
   * @example JUMPER
   */
  libelleFamilleCellule: string;
}

/**
 * Famille du véhicule
 */
export interface FamilleVehicule {
  /**
   * Code de la famille
   * @example 3074
   */
  codeFamille: string;

  /**
   * Libellé de la famille
   * @example 323
   */
  libelleFamille: string;
}

export interface FamilleVehiculeDTO {
  libelleLongFamilleVehicule?: string;
  numeroIdentifiantFamille?: string;
}

/**
 * Objet comprenant : <ul><li>Le groupe tarifaire du véhicule pour l'année en cours _A_</li><li>Le groupe tarifaire du véhicule pour l'année _A-1_</li><li>Le groupe tarifaire du véhicule pour l'année _A+1_</li></ul>
 */
export interface GroupeTarificationVehicule {
  /**
   * Code groupe de tarification pour l'année précédente à l'année en cours<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CGRO)
   * @example G02D
   */
  codeGroupeTarificationAM1: string;

  /**
   * Libellé associé au code groupe de tarification pour l'année précédente à l'année en cours
   * @example Groupe G02D
   */
  libelleGroupeTarificationAM1: string;

  /**
   * Code groupe de tarification pour l'année en cours<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CGRO)
   * @example G02D
   */
  codeGroupeTarification: string;

  /**
   * Libellé associé au code groupe de tarification pour l'année en cours
   * @example Groupe G02D
   */
  libelleGroupeTarification: string;

  /**
   * Code groupe de tarification pour l'année suivant l'année en cours<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CGRO)
   * @example GU2D
   */
  codeGroupeTarificationAP1: string;

  /**
   * Libellé associé au code groupe de tarification pour l'année suivant l'année en cours
   * @example Groupe GU2D
   */
  libelleGroupeTarificationAP1: string;
}

/**
 * Paramètre de la pagination
 */
export interface InfoPagination {
  /**
   * Numéro de la page à afficher.
   * @format int32
   * @example 2
   */
  page: number;

  /**
   * Nombre total de pages à afficher.
   * @format int32
   * @example 9757
   */
  totalPages: number;

  /**
   * Nombre d'éléments à afficher sur une page.
   * @format int32
   * @example 10
   */
  nombreElements: number;

  /**
   * Nombre total d'éléments à afficher.
   * @format int32
   * @example 2000
   */
  totalElements: number;

  /**
   * Détermine si on affiche la première page.
   * @example true
   */
  premierePage: boolean;

  /**
   * Détermine si on affiche la dernière page.
   * @example false
   */
  dernierePage: boolean;

  /**
   * Taille de la page affichée. Identique au nombreElements.
   * @format int32
   * @example 10
   */
  taillePage: number;

  /** Eléments de tri appliqué */
  triPagination: TriPagination[];
}

/**
 * Contient les informations nécessaire pour la création d'un SRA (Sécurité et Réparations Automobiles)
 */
export interface InfoSraVehPost {
  /**
   * Code SRA.
   * @example A206038
   */
  codeSra: string;

  /**
   * Numéro de répertoire du véhicule
   * @example 97836
   */
  numeroRepertoire?: string;
}

/**
 * Contient les informations nécessaire pour la modification d'un SRA (Sécurité et Réparations Automobiles)
 */
export interface InfoSraVehPut {
  /**
   * Code SRA.
   * @example A206038
   */
  codeSra: string;

  /**
   * Numéro de répertoire du véhicule
   * @example 97836
   */
  numeroRepertoire?: string;
}

/**
 * Marque du véhicule
 */
export interface MarqueVehicule {
  /**
   * Code de la marque
   * @example 811
   */
  codeMarque: string;

  /**
   * Libellé de la marque
   * @example MAZDA
   */
  libelleMarque: string;
}

export interface MarqueVehiculeDTO {
  libelleMarque?: string;
  numeroIdentifiantMRQ?: string;
}

export interface ModelVehDTOLight {
  modeleVehicule?: ModeleVehPDDLight;
}

export interface ModeleVehPDDLight {
  codeGroupeTarification?: string;
  libelleFamilleVehicule?: string;
  libelleMarque?: string;
  numeroRepertoireVehicule?: string;
}

export interface ModeleVehicule {
  /** @format int32 */
  anneeDateDebutFabrication?: number;

  /** @format int32 */
  anneeDateFinFabrication?: number;
  champRechercheVehicule?: string;

  /** @format int32 */
  codeCarrosserieVehicule?: number;

  /** @format int32 */
  codeCategorieVehicule?: number;
  codeDegreAutonomie?: string;

  /** @format int32 */
  codeEnergieVehicule?: number;
  codeGenreVehicule?: string;

  /** @format int32 */
  codeGestionVehicule?: number;
  codeGroupeTarification?: string;

  /** @format int32 */
  codeInterditNovice?: number;
  codeNiveauFinitionVehicule?: string;
  codeSegmentVehicule?: string;
  codeVocationVehicule?: string;
  dateDebutFabrication?: string;
  dateFinFabrication?: string;
  denominationCommercialeCourte?: string;
  denominationCommercialeLongue?: string;
  libelleEnergieVehicule?: string;
  libelleFamilleVehicule?: string;
  libelleGenerationModeleVehicule?: string;
  libelleGenreVehicule?: string;
  libelleGestionVehicule?: string;
  libelleInterditNovice?: string;
  libelleLongCarrosserieVehicule?: string;
  libelleLongTransmissionVehicule?: string;
  libelleMarque?: string;
  libelleMotorisationVehicule?: string;
  libelleNiveauFinitionVehicule?: string;
  libelleObservationLong?: string;
  libelleSegmentVehicule?: string;
  libelleVocationVehicule?: string;

  /** @format int32 */
  nombrePorte?: number;
  numeroRepertoireVehicule?: string;

  /** @format int32 */
  puissanceFiscale?: number;

  /** @format int32 */
  puissanceVehicule?: number;
  sraVehicules?: SraVehiculePDD[];

  /** @format int32 */
  typeTransmissionVehicule?: number;
}

/**
 * Motorisation du véhicule
 */
export interface MotorisationVehicule {
  /**
   * Libellé de la motorisation
   * @example 1.1 54 CH
   */
  libelleMotorisation: string;
}

/**
 * Finition du véhicule
 */
export interface NiveauFinitionVehicule {
  /**
   * Libellé du niveau de finition
   * @example L
   */
  libelleNiveauFinition: string;
}

/**
 * Nombre de portes du véhicule
 */
export interface NombrePortesVehicule {
  /**
   * Nombre de portes
   * @example 3
   */
  nombrePortes: string;
}

/**
 * Puissance fiscale du véhicule
 */
export interface PuissanceFiscaleVehicule {
  /**
   * Puissance fiscale
   * @example 5
   */
  puissanceFiscale: string;
}

export type Sort = object;

/**
 * SRA (Sécurité et Réparations Automobiles)
 */
export interface Sra {
  /**
   * Code état du SRA.<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CETASRAVEH)
   * @example 01
   */
  codeEtatSraVehicule: string;

  /**
   * Libellé du code etat du SRA
   * @example Code SRAVEH associé à un modèle véhicule
   */
  libelleEtatSraVehicule: string;

  /**
   * Code SRA.
   * @example A206038
   */
  codeSra: string;

  /**
   * Numéro de répertoire du véhicule
   * @example 97836
   */
  numeroRepertoire?: string;

  /**
   * Date de mise à jour
   * @example 20/12/17 01:10:59,156671000
   */
  dateMiseAJour: string;
}

/**
 * SRA demandés et info pour la gestion de la pagination
 */
export interface SraPagination {
  /** Paramètre de la pagination */
  infoPagination: InfoPagination;

  /** Liste des SRA demandés */
  sraDemandes: Sra[];
}

export interface SraVehDto {
  cetaSraVeh?: string;
  codeSraVeh?: string;

  /** @format date-time */
  dateMaj?: string;

  /** @format int64 */
  idSraVeh?: number;
  numRepVeh?: string;
}

export interface SraVehiculePDD {
  codeEtat?: string;
  codeSRAVehicule?: string;

  /** @format int64 */
  numeroIdentifiantSRAVEH?: number;
  numeroRepertoireVehicule?: string;
}

/**
 * Transmission du véhicule
 */
export interface TransmissionVehicule {
  /**
   * Code de la transmission <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH)
   * @example 1
   */
  codeTransmission: string;

  /**
   * Libellé de la transmission
   * @example Boîte manuelle
   */
  libelleTransmission: string;
}

/**
 * Paramètre de tri appliqué lors de la pagination
 */
export interface TriPagination {
  /**
   * Sens du tri effectué
   * @example ASC
   */
  direction?: string;

  /**
   * Donnée sur laquelle le tri est effectué.
   * @example dateMiseAJour
   */
  property?: string;

  /**
   * ignoreCase
   * @example false
   */
  ignoreCase?: boolean;

  /**
   * nullHandling
   * @example NATIVE
   */
  nullHandling?: string;

  /**
   * Détermine si le tri est de type descendant
   * @example false
   */
  descending?: boolean;

  /**
   * Détermine si le tri est de type ascendant
   * @example true
   */
  ascending?: boolean;
}

export interface VehiculeAssureDTO {
  avertissements?: AvertissementDTO[];
  dateMEC?: string;
  immatriculation?: string;
  modelesVeh?: ModeleVehicule[];
}

/**
 * Détail du véhicule
 */
export interface VehiculeDetail {
  /**
   * Numéro de répertoire du véhicule
   * @example 97836
   */
  numeroRepertoire: string;

  /**
   * Code de la marque du véhicule
   * @example 219
   */
  codeMarque: string;

  /**
   * Libelle de la marque du véhicule
   * @example FIAT
   */
  libelleMarque: string;

  /**
   * Code catégorie du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCATVEH)
   * @example 01
   */
  codeCategorie: string;

  /**
   * Code catégorie d'origine du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCATVEH)
   * @example 01
   */
  codeCategorieOrigine?: string;

  /**
   * Libellé de la catégorie d'origine du véhicule
   * @example 4 Roues (VP et utilitaires légers) PTAC <= 3,5 t
   */
  libelleCategorieOrigine?: string;

  /**
   * Code de la famille du véhicule
   * @example 737
   */
  codeFamille: string;

  /**
   * Libelle de la famille du véhicule
   * @example DUCATO
   */
  libelleFamille: string;

  /**
   * Nombre de portes
   * @example 3
   */
  nombrePortes?: string;

  /**
   * Type de motorisation du véhicule
   * @example 1
   */
  typeMotorisation: string;

  /**
   * Libellé de la motorisation du véhicule
   * @example 1.6 I 102 CH
   */
  libelleMotorisation?: string;

  /**
   * Code énergie du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH)
   * @example 1
   */
  codeEnergie?: string;

  /**
   * Libellé de l'énergie du véhicule
   * @example Essence
   */
  libelleEnergie?: string;

  /**
   * Code transmission du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH)
   * @example 1
   */
  codeTransmission?: string;

  /**
   * Libellé de la transmission du véhicule
   * @example Boîte manuelle
   */
  libelleTransmission?: string;

  /**
   * Puissance fiscale
   * @example 5
   */
  puissanceFiscale?: string;

  /**
   * Cylindre
   * @example 1071
   */
  cylindre?: string;

  /**
   * Code carrosserie du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH)
   * @example 01
   */
  codeCarrosserie?: string;

  /**
   * Libellé de la carrosserie du véhicule
   * @example Berline
   */
  libelleCarrosserie?: string;

  /**
   * Dénomination commerciale courte du véhicule
   * @example 316 IA COMPACT 102 CH
   */
  denominationCommercialeCourte: string;

  /**
   * Dénomination commerciale longue du véhicule
   * @example 316 COMPACT 1.6 I 102 CH AUTO
   */
  denominationCommercialeLongue: string;

  /**
   * Code assujettissement à la clause du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CASJCLA)
   * @example 1
   */
  codeAssujettissementClause: string;

  /**
   * Libellé assujettissement à la clause
   * @example Oui
   */
  libelleAssujettissementClause: string;

  /**
   * Code niveau de la finition du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CNFIVEH)
   * @example C
   */
  codeNiveauFinition: string;

  /**
   * Libellé du niveau de la finition du véhicule
   * @example Elevé
   */
  libelleNiveauFinition: string;

  /**
   * Libellé de la famille cellule du véhicule
   * @example DUCATO
   */
  libelleFamilleCellule?: string;

  /** Libellé de la marque du chassis du véhicule */
  libelleMarqueChassis?: string;

  /**
   * Libellé de la famille du chassis du véhicule
   * @example FIAT
   */
  libelleFamilleChassis: string;

  /**
   * Libellé du type mine du véhicule
   * @example MFD51X2CXXXX
   */
  libelleTypeMineTasse: string;

  /**
   * Code de la situation du modèle <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=SMOD)
   * @example 1
   */
  codeSituationModele: string;

  /**
   * Libellé de la situation du modèle
   * @example En cours
   */
  libelleSituationModele: string;

  /**
   * Date de début de fabrication (au format aaaa-mm-jj)
   * @example 1985-01-01
   */
  dateDebutFabrication?: string;

  /**
   * Date de fin de fabrication (au format aaaa-mm-jj)
   * @example 1987-12-01
   */
  dateFinFabrication?: string;

  /**
   * Code degré autonomie du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CDEGANM)
   * @example N0
   */
  codeDegreAutonomie: string;

  /**
   * Libellé observation du véhicule
   * @example PE30390-
   */
  libelleObservationLong: string;

  /**
   * Champ de recherche
   * @example FIAT DUCATO 316 COMPACT 1.6 I 102 CH AUTO Diesel Boîte manuelle Berline
   */
  champRecherche: string;

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
   * Code de gestion <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CGESVEH)
   * @example 2
   */
  codeGestion?: string;

  /**
   * Libellé de gestion
   * @example Réseau avec analyse
   */
  libelleGestion?: string;

  /**
   * Code interdit novice du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CINTNOV)
   * @example 1
   */
  codeInterditNovice?: string;

  /**
   * Libellé interdit novice du véhicule
   * @example Vrai
   */
  libelleInterditNovice?: string;

  /**
   * Code segment du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CSEGVEH)
   * @example B1
   */
  codeSegment?: string;

  /**
   * Libellé du segment du véhicule
   * @example Segment B1
   */
  libelleSegment?: string;

  /**
   * Code vocation du véhicule<br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CVOCVEH)
   * @example 01
   */
  codeVocation?: string;

  /**
   * Libellé vocation du véhicule
   * @example Sport pour V.P / Enduro pour moto
   */
  libelleVocation?: string;

  /**
   * Code du groupe de tarification
   * @example E03E
   */
  codeGroupeTarification: string;

  /**
   * Poids à vide du véhicule
   * @format int32
   * @example 1140
   */
  poidsAVide?: number;

  /**
   * Puissance du véhicule
   * @example 54
   */
  puissance?: string;

  /**
   * Libellé génération du modèle du véhicule
   * @example E
   */
  libelleGenerationModele?: string;
}

/**
 * Synthèse du véhicule
 */
export interface VehiculeSynthese {
  /**
   * Numéro répertoire
   * @example 11019
   */
  numeroRepertoire: string;

  /**
   * Dénomination commerciale<br>(Correspond à `denominationCommercialeCourte` dans le modèle _VehiculeDetail_)
   * @example 323 1.1 54 CH L
   */
  denominationCommerciale: string;

  /**
   * Dénomination commerciale longue
   * @example 323 1.1 54 CH L
   */
  denominationCommercialeLongue?: string;

  /**
   * Lien vers le détail du véhicule
   * @example /referentiel/modeles_vehicules/v1/vehicules/11019
   */
  lienDetailVehicule: string;
}

export interface PageSraVehDto {
  content?: SraVehDto[];
  first?: boolean;
  last?: boolean;

  /** @format int32 */
  number?: number;

  /** @format int32 */
  numberOfElements?: number;

  /** @format int32 */
  size?: number;
  sort?: Sort;

  /** @format int64 */
  totalElements?: number;

  /** @format int32 */
  totalPages?: number;
}

export interface RecupererListeSraParams {
  /** Code SRA */
  codeSra?: string;

  /** Code Etat du SRA <br>[_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CETASRAVEH) */
  codeEtatSraVehicule?: string;

  /** Numéro de répertoire du véhicule */
  numeroRepertoire?: string;

  /**
   * Numéro de la page à afficher (Valeur par défaut : 0).<br> Exemple : 2
   * @format int32
   */
  page?: number;

  /**
   * Nombre de résultat par page (Valeur par défaut : 10).<br> Exemple : 5
   * @format int32
   */
  taillePage?: number;
}

export interface GetSraWithCodeEtatUsingGetParams {
  /** codeEtatSRAVEH */
  codeEtatSRAVEH?: string;

  /** codeSRAVEH */
  codeSRAVEH?: string;

  /** numeroRepertoire */
  numeroRepertoire?: string;

  /**
   * page
   * @format int32
   */
  page?: number;

  /**
   * size
   * @format int32
   */
  size?: number;
}

export interface GetFamillesUsingGetParams {
  /** categorieVehicule */
  categorieVehicule: string;

  /** marquesId */
  marquesId: string;
}

export interface GetNumRepForImmatriculationUsingGetParams {
  /** immatriculation */
  immatriculation: string;
}

export interface GetMarquesUsingGetParams {
  /** categorieVehicule */
  categorieVehicule: string;
}

export interface GetNumeroRepertoiresVehiculesUsingGetParams {
  /** numeroRepertoireVehicule */
  numeroRepertoireVehicule?: string;
}

export interface GetModleVehiculesByNumeroChassisUsingGetParams {
  /** numero_chassis */
  numero_chassis: string;
}

export interface GetNumRepForImmatriculationUsingGet1Params {
  /** immatriculation */
  immatriculation: string;
}

export interface GetModleVehiculesByNumeroChassisUsingGet1Params {
  /** numero_chassis */
  numero_chassis: string;
}

export interface RecupererListeAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur un ou plusieurs nombres de portes */
  listeNombresPortes?: string[];

  /** Filtre sur un ou plusieurs codes transmission de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH) */
  listeCodesTransmission?: string[];

  /** Filtre sur un ou plusieurs libellés motorisation de véhicules <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMotorisation?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeCarrosseriesAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur un ou plusieurs nombres de portes */
  listeNombresPortes?: string[];

  /** Filtre sur un ou plusieurs codes transmission de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH) */
  listeCodesTransmission?: string[];

  /** Filtre sur un ou plusieurs libellés motorisation de véhicules <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMotorisation?: string[];
}

export interface RecupererListeEnergiesAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs nombres de portes */
  listeNombresPortes?: string[];

  /** Filtre sur un ou plusieurs codes transmission de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH) */
  listeCodesTransmission?: string[];

  /** Filtre sur un ou plusieurs libellés motorisation de véhicules <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMotorisation?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeFamillesAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur un ou plusieurs nombres de portes */
  listeNombresPortes?: string[];

  /** Filtre sur un ou plusieurs codes transmission de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH) */
  listeCodesTransmission?: string[];

  /** Filtre sur un ou plusieurs libellés motorisation de véhicules <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMotorisation?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeGroupesTarifAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur un ou plusieurs nombres de portes */
  listeNombresPortes?: string[];

  /** Filtre sur un ou plusieurs codes transmission de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH) */
  listeCodesTransmission?: string[];

  /** Filtre sur un ou plusieurs libellés motorisation de véhicules <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMotorisation?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés de dénomination commerciale<br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeDenominationsCommerciales?: string[];
}

export interface RecupererListeMarquesAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur un ou plusieurs nombres de portes */
  listeNombresPortes?: string[];

  /** Filtre sur un ou plusieurs codes transmission de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH) */
  listeCodesTransmission?: string[];

  /** Filtre sur un ou plusieurs libellés motorisation de véhicules <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMotorisation?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeMotorisationsAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur un ou plusieurs nombres de portes */
  listeNombresPortes?: string[];

  /** Filtre sur un ou plusieurs codes transmission de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH) */
  listeCodesTransmission?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeNbPortesAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur un ou plusieurs codes transmission de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=TTRSVEH) */
  listeCodesTransmission?: string[];

  /** Filtre sur un ou plusieurs libellés motorisation de véhicules <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMotorisation?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeTransmissionsAutosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur un ou plusieurs nombres de portes */
  listeNombresPortes?: string[];

  /** Filtre sur un ou plusieurs libellés motorisation de véhicules <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMotorisation?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeCampingCarsParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marques de cellule<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques cellules._ */
  listeCodesMarqueCellule?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs libellés familles de cellule <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleCellule?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés niveaux de finition <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) <br> **A NOTER :** Le caractère **','** n'étant pas supporté (son utilisation est réservée pour séparer les éléments d'une liste dans l'URL), il faut le remplacer par **'?'** dans chaque libellé niveau finition passé en paramètre d'entrée */
  listeLibellesNiveauFinition?: string[];

  /** Filtre sur un ou plusieurs libellés marques chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMarqueChassis?: string[];

  /** Filtre sur un ou plusieurs libellés familles chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleChassis?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur une ou plusieurs puissances fiscales */
  listePuissancesFiscales?: string[];
}

export interface RecupererListeCarrosseriesCampingCarsParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marques de cellule<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques cellules._ */
  listeCodesMarqueCellule?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs libellés familles de cellule <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleCellule?: string[];

  /** Filtre sur un ou plusieurs libellés niveaux de finition <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) <br> **A NOTER :** Le caractère **','** n'étant pas supporté (son utilisation est réservée pour séparer les éléments d'une liste dans l'URL), il faut le remplacer par **'?'** dans chaque libellé niveau finition passé en paramètre d'entrée */
  listeLibellesNiveauFinition?: string[];

  /** Filtre sur un ou plusieurs libellés marques chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMarqueChassis?: string[];

  /** Filtre sur un ou plusieurs libellés familles chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleChassis?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur une ou plusieurs puissances fiscales */
  listePuissancesFiscales?: string[];
}

export interface RecupererListeChassisCampingCarsParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marques de cellule<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques cellules._ */
  listeCodesMarqueCellule?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs libellés familles de cellule <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleCellule?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés niveaux de finition <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) <br> **A NOTER :** Le caractère **','** n'étant pas supporté (son utilisation est réservée pour séparer les éléments d'une liste dans l'URL), il faut le remplacer par **'?'** dans chaque libellé niveau finition passé en paramètre d'entrée */
  listeLibellesNiveauFinition?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur une ou plusieurs puissances fiscales */
  listePuissancesFiscales?: string[];
}

export interface RecupererListeEnergiesCampingCarsParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marques de cellule<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques cellules._ */
  listeCodesMarqueCellule?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs libellés familles de cellule <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleCellule?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés niveaux de finition <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) <br> **A NOTER :** Le caractère **','** n'étant pas supporté (son utilisation est réservée pour séparer les éléments d'une liste dans l'URL), il faut le remplacer par **'?'** dans chaque libellé niveau finition passé en paramètre d'entrée */
  listeLibellesNiveauFinition?: string[];

  /** Filtre sur un ou plusieurs libellés marques chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMarqueChassis?: string[];

  /** Filtre sur un ou plusieurs libellés familles chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleChassis?: string[];

  /** Filtre sur une ou plusieurs puissances fiscales */
  listePuissancesFiscales?: string[];
}

export interface RecupererListeFamillesCampingCarsParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marques de cellule<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques cellules._ */
  listeCodesMarqueCellule?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés niveaux de finition <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) <br> **A NOTER :** Le caractère **','** n'étant pas supporté (son utilisation est réservée pour séparer les éléments d'une liste dans l'URL), il faut le remplacer par **'?'** dans chaque libellé niveau finition passé en paramètre d'entrée */
  listeLibellesNiveauFinition?: string[];

  /** Filtre sur un ou plusieurs libellés marques chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMarqueChassis?: string[];

  /** Filtre sur un ou plusieurs libellés familles chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleChassis?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur une ou plusieurs puissances fiscales */
  listePuissancesFiscales?: string[];
}

export interface RecupererListeMarquesCampingCarsParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs libellés familles de cellule <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleCellule?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés niveaux de finition <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) <br> **A NOTER :** Le caractère **','** n'étant pas supporté (son utilisation est réservée pour séparer les éléments d'une liste dans l'URL), il faut le remplacer par **'?'** dans chaque libellé niveau finition passé en paramètre d'entrée */
  listeLibellesNiveauFinition?: string[];

  /** Filtre sur un ou plusieurs libellés marques chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMarqueChassis?: string[];

  /** Filtre sur un ou plusieurs libellés familles chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleChassis?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur une ou plusieurs puissances fiscales */
  listePuissancesFiscales?: string[];
}

export interface RecupererListeFinitionsCampingCarsParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marques de cellule<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques cellules._ */
  listeCodesMarqueCellule?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs libellés familles de cellule <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleCellule?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés marques chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMarqueChassis?: string[];

  /** Filtre sur un ou plusieurs libellés familles chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleChassis?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];

  /** Filtre sur une ou plusieurs puissances fiscales */
  listePuissancesFiscales?: string[];
}

export interface RecupererListePuissancesCampingCarsParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marques de cellule<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques cellules._ */
  listeCodesMarqueCellule?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs libellés familles de cellule <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleCellule?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés niveaux de finition <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) <br> **A NOTER :** Le caractère **','** n'étant pas supporté (son utilisation est réservée pour séparer les éléments d'une liste dans l'URL), il faut le remplacer par **'?'** dans chaque libellé niveau finition passé en paramètre d'entrée */
  listeLibellesNiveauFinition?: string[];

  /** Filtre sur un ou plusieurs libellés marques chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesMarqueChassis?: string[];

  /** Filtre sur un ou plusieurs libellés familles chassis <br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeLibellesFamilleChassis?: string[];

  /** Filtre sur un ou plusieurs codes énergie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CENEVEH) */
  listeCodesEnergie?: string[];
}

export interface RecupererListeCyclosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];
}

export interface RecupererListeFamillesCyclosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes genre de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CGENVEH) */
  listeCodesGenre?: string[];
}

export interface RecupererListeGroupesTarifCyclosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs libellés de dénomination commerciale<br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeDenominationsCommerciales?: string[];
}

export interface RecupererListeMarquesCyclosParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];
}

export interface RecupererListeMotosQuadParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un type de véhicule<br> _Valeurs possibles :_ <br><ul><li> **MOTO :** Véhicule de type Moto</li><li> **QUAD :** Véhicule de type Quad</li></ul> */
  typeVehicule?: "MOTO" | "QUAD";

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeCarrosseriesMotosQuadParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un type de véhicule<br> _Valeurs possibles :_ <br><ul><li> **MOTO :** Véhicule de type Moto</li><li> **QUAD :** Véhicule de type Quad</li></ul> */
  typeVehicule?: "MOTO" | "QUAD";

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];
}

export interface RecupererListeFamillesMotosQuadParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un type de véhicule<br> _Valeurs possibles :_ <br><ul><li> **MOTO :** Véhicule de type Moto</li><li> **QUAD :** Véhicule de type Quad</li></ul> */
  typeVehicule?: "MOTO" | "QUAD";

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
}

export interface RecupererListeGroupesTarifMotosQuadParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un type de véhicule<br> _Valeurs possibles :_ <br><ul><li> **MOTO :** Véhicule de type Moto</li><li> **QUAD :** Véhicule de type Quad</li></ul> */
  typeVehicule?: "MOTO" | "QUAD";

  /** Filtre sur un ou plusieurs codes marque de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des marques._ */
  listeCodesMarque?: string[];

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];

  /** Filtre sur un ou plusieurs libellés de dénomination commerciale<br> La recherche par wild card est autorisée (_caractères supportés : * et **?**_) */
  listeDenominationsCommerciales?: string[];
}

export interface RecupererListeMarquesMotosQuadParams {
  /** Filtre sur une ou plusieurs catégories de véhicule <br> _Valeurs possibles :_ <br><ul><li> **STANDARD :** Véhicule de catégorie **standard** (hors collection)</li><li> **COLLECTION :** Véhicule de catégorie **collection**</li></ul> _Valeur par défaut : [STANDARD, COLLECTION]_ */
  listeCodesCategorie?: string[];

  /** Filtre sur un type de véhicule<br> _Valeurs possibles :_ <br><ul><li> **MOTO :** Véhicule de type Moto</li><li> **QUAD :** Véhicule de type Quad</li></ul> */
  typeVehicule?: "MOTO" | "QUAD";

  /** Filtre sur une ou plusieurs années de mise en circulation du vehicule */
  listeAnneesCirculation?: number[];

  /** Filtre sur un ou plusieurs codes famille de véhicules<br>_Pour connaître la liste des valeurs possibles, consulter le endpoint de recherche des familles._ */
  listeCodesFamille?: string[];

  /** Filtre sur un ou plusieurs codes carrosserie de véhicules <br> [_Valeurs Possibles_](http://slapp819:30101/GdrConsult/detail_nomenclature.do?nomPhysique=CCARVEH) */
  listeCodesCarrosserie?: string[];
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
  public baseUrl: string = "//internet.api-recx.build-klif.cloud.maif.local:40154/referentiel/modeles_vehicules";
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
 * @title API modeles-vehicules
 * @baseUrl //internet.api-recx.build-klif.cloud.maif.local:40154/referentiel/modeles_vehicules
 *
 * Cette API permet de gérer le référentiel des véhicules (modèle générique).<br> Un véhicule peut être de type auto, moto, quad, cyclo ou camping-car.<br> L'API permet d'exposer (recherche, consultation) des données spécifiques à chaque type de véhicules (par exemple le nombre de portes pour un véhicule de type auto) ou communes à tous les types de véhicules (par exemple recherche d'un véhicule par immatriculation).
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  sra = {
    /**
     * No description
     *
     * @tags sra
     * @name RecupererListeSra
     * @summary Récupère la liste des sra (Sécurité et Réparations Automobiles)
     * @request GET:/modeles/sra
     */
    recupererListeSra: (query: RecupererListeSraParams, params: RequestParams = {}) =>
      this.http.request<SraPagination, void>({
        path: `/modeles/sra`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags sra
     * @name CreationSra
     * @summary Création d'un sra (Sécurité et Réparations Automobiles)
     * @request POST:/modeles/sra
     */
    creationSra: (body: InfoSraVehPost, params: RequestParams = {}) =>
      this.http.request<Sra, void>({
        path: `/modeles/sra`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags sra
     * @name ModificationSra
     * @summary Modification d'un sra (Sécurité et Réparations Automobiles)
     * @request PUT:/modeles/sra
     */
    modificationSra: (body: InfoSraVehPut, params: RequestParams = {}) =>
      this.http.request<Sra, void>({
        path: `/modeles/sra`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  sraVehController = {
    /**
     * No description
     *
     * @tags sra-veh-controller
     * @name GetSraWithCodeEtatUsingGet
     * @summary getSraWithCodeEtat
     * @request GET:/v1/modeles/SRA
     */
    getSraWithCodeEtatUsingGet: (query: GetSraWithCodeEtatUsingGetParams, params: RequestParams = {}) =>
      this.http.request<PageSraVehDto, any>({
        path: `/v1/modeles/SRA`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags sra-veh-controller
     * @name CreateSraVehUsingPost
     * @summary createSraVeh
     * @request POST:/v1/modeles/SRA
     */
    createSraVehUsingPost: (sraVeh: SraVehDto, params: RequestParams = {}) =>
      this.http.request<SraVehDto, any>({
        path: `/v1/modeles/SRA`,
        method: "POST",
        body: sraVeh,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags sra-veh-controller
     * @name UpdateSraVehUsingPut
     * @summary updateSraVeh
     * @request PUT:/v1/modeles/SRA/{id}
     */
    updateSraVehUsingPut: (id: number, sraVeh: SraVehDto, params: RequestParams = {}) =>
      this.http.request<SraVehDto, any>({
        path: `/v1/modeles/SRA/${id}`,
        method: "PUT",
        body: sraVeh,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags sra-veh-controller
     * @name DeleteSraVehUsingDelete
     * @summary deleteSraVeh
     * @request DELETE:/v1/modeles/SRA/{id}
     */
    deleteSraVehUsingDelete: (id: number, params: RequestParams = {}) =>
      this.http.request<SraVehDto, any>({
        path: `/v1/modeles/SRA/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  vehiculeController = {
    /**
     * No description
     *
     * @tags vehicule-controller
     * @name GetFamillesUsingGet
     * @summary GET - Consultation des familles de véhicule par catégorie et id de marque
     * @request GET:/v1/modeles/familles
     * @deprecated
     */
    getFamillesUsingGet: (query: GetFamillesUsingGetParams, params: RequestParams = {}) =>
      this.http.request<FamilleVehiculeDTO[], any>({
        path: `/v1/modeles/familles`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicule-controller
     * @name GetFamilleByIdUsingGet
     * @summary GET - Consultation des familles de véhicule par son id
     * @request GET:/v1/modeles/familles/{famillesId}
     * @deprecated
     */
    getFamilleByIdUsingGet: (famillesId: string, params: RequestParams = {}) =>
      this.http.request<FamilleVehiculeDTO, any>({
        path: `/v1/modeles/familles/${famillesId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicule-controller
     * @name GetMarquesUsingGet
     * @summary GET - Consultation des marques par catégorie de véhicule
     * @request GET:/v1/modeles/marques
     * @deprecated
     */
    getMarquesUsingGet: (query: GetMarquesUsingGetParams, params: RequestParams = {}) =>
      this.http.request<MarqueVehiculeDTO[], any>({
        path: `/v1/modeles/marques`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicule-controller
     * @name GetMarqueByIdUsingGet
     * @summary GET - Consultation d'une marque par son id
     * @request GET:/v1/modeles/marques/{marquesId}
     * @deprecated
     */
    getMarqueByIdUsingGet: (marquesId: string, params: RequestParams = {}) =>
      this.http.request<MarqueVehiculeDTO, any>({
        path: `/v1/modeles/marques/${marquesId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicule-controller
     * @name GetNumeroRepertoiresVehiculesUsingGet
     * @summary GET - Consultation modèles véhicule par liste de numéro de répertoire
     * @request GET:/v1/modeles/modeles_vehicules
     * @deprecated
     */
    getNumeroRepertoiresVehiculesUsingGet: (
      query: GetNumeroRepertoiresVehiculesUsingGetParams,
      params: RequestParams = {},
    ) =>
      this.http.request<ModelVehDTOLight[], any>({
        path: `/v1/modeles/modeles_vehicules`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicule-controller
     * @name GetNumeroRepertoireVehiculeUsingGet
     * @summary GET - Consultation modèle véhicule par numéro de répertoire
     * @request GET:/v1/modeles/{numeroRepertoireVehicule}
     * @deprecated
     */
    getNumeroRepertoireVehiculeUsingGet: (numeroRepertoireVehicule: string, params: RequestParams = {}) =>
      this.http.request<ModelVehDTOLight, any>({
        path: `/v1/modeles/${numeroRepertoireVehicule}`,
        method: "GET",
        ...params,
      }),
  };
  immatriculationController = {
    /**
     * No description
     *
     * @tags immatriculation-controller
     * @name GetNumRepForImmatriculationUsingGet
     * @summary GET - Consultation modèles véhicule à partir d'une immatriculation
     * @request GET:/v1/modeles/immatriculation
     * @deprecated
     */
    getNumRepForImmatriculationUsingGet: (
      query: GetNumRepForImmatriculationUsingGetParams,
      params: RequestParams = {},
    ) =>
      this.http.request<VehiculeAssureDTO, any>({
        path: `/v1/modeles/immatriculation`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags immatriculation-controller
     * @name GetModleVehiculesByNumeroChassisUsingGet
     * @summary GET - Consultation modèles véhicule à partir d'un numéro de chassis
     * @request GET:/v1/modeles/numeros_chassis
     * @deprecated
     */
    getModleVehiculesByNumeroChassisUsingGet: (
      query: GetModleVehiculesByNumeroChassisUsingGetParams,
      params: RequestParams = {},
    ) =>
      this.http.request<VehiculeAssureDTO, any>({
        path: `/v1/modeles/numeros_chassis`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  vehicules = {
    /**
     * No description
     *
     * @tags vehicules
     * @name GetNumRepForImmatriculationUsingGet1
     * @summary GET - Consultation modèles véhicule à partir d'une immatriculation
     * @request GET:/v1/vehicules/immatriculation
     */
    getNumRepForImmatriculationUsingGet1: (
      query: GetNumRepForImmatriculationUsingGet1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<VehiculeAssureDTO, any>({
        path: `/v1/vehicules/immatriculation`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicules
     * @name GetModleVehiculesByNumeroChassisUsingGet1
     * @summary GET - Consultation modèles véhicule à partir d'un numéro de chassis
     * @request GET:/v1/vehicules/numeros_chassis
     */
    getModleVehiculesByNumeroChassisUsingGet1: (
      query: GetModleVehiculesByNumeroChassisUsingGet1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<VehiculeAssureDTO, any>({
        path: `/v1/vehicules/numeros_chassis`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_CodeInterditNovice](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codeinterditnovice)</li></ul>
     *
     * @tags vehicules
     * @name RecupererVehiculeParNumeroRepertoire
     * @summary Récupère un modèle véhicule à partir du numéro de répertoire
     * @request GET:/vehicules/{numeroRepertoire}
     */
    recupererVehiculeParNumeroRepertoire: (numeroRepertoire: string, params: RequestParams = {}) =>
      this.http.request<VehiculeDetail, void>({
        path: `/vehicules/${numeroRepertoire}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  autos = {
    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags autos
     * @name RecupererListeAutos
     * @summary Récupère une liste de modèles auto
     * @request GET:/vehicules/autos
     */
    recupererListeAutos: (query: RecupererListeAutosParams, params: RequestParams = {}) =>
      this.http.request<VehiculeSynthese[], void>({
        path: `/vehicules/autos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_CodeSansInformation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codesansinformation)</li></ul>
     *
     * @tags autos
     * @name RecupererListeCarrosseriesAutos
     * @summary Récupère la liste des carrosseries auto
     * @request GET:/vehicules/autos/carrosseries
     */
    recupererListeCarrosseriesAutos: (query: RecupererListeCarrosseriesAutosParams, params: RequestParams = {}) =>
      this.http.request<CarrosserieVehicule[], void>({
        path: `/vehicules/autos/carrosseries`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_CodeSansInformation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codesansinformation)</li></ul>
     *
     * @tags autos
     * @name RecupererListeEnergiesAutos
     * @summary Récupère la liste des énergies auto
     * @request GET:/vehicules/autos/energies
     */
    recupererListeEnergiesAutos: (query: RecupererListeEnergiesAutosParams, params: RequestParams = {}) =>
      this.http.request<EnergieVehicule[], void>({
        path: `/vehicules/autos/energies`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags autos
     * @name RecupererListeFamillesAutos
     * @summary Récupère la liste des familles auto
     * @request GET:/vehicules/autos/familles
     */
    recupererListeFamillesAutos: (query: RecupererListeFamillesAutosParams, params: RequestParams = {}) =>
      this.http.request<FamilleVehicule[], void>({
        path: `/vehicules/autos/familles`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_NombreNonRenseigne](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_nombrenonrenseigne)</li></ul>
     *
     * @tags autos
     * @name RecupererListeGroupesTarifAutos
     * @summary Récupère la liste des groupes tarifaires auto
     * @request GET:/vehicules/autos/groupes_tarification
     */
    recupererListeGroupesTarifAutos: (query: RecupererListeGroupesTarifAutosParams, params: RequestParams = {}) =>
      this.http.request<GroupeTarificationVehicule[], void>({
        path: `/vehicules/autos/groupes_tarification`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags autos
     * @name RecupererListeMarquesAutos
     * @summary Récupère la liste des marques auto
     * @request GET:/vehicules/autos/marques
     */
    recupererListeMarquesAutos: (query: RecupererListeMarquesAutosParams, params: RequestParams = {}) =>
      this.http.request<MarqueVehicule[], void>({
        path: `/vehicules/autos/marques`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags autos
     * @name RecupererListeMotorisationsAutos
     * @summary Récupère la liste des motorisations auto
     * @request GET:/vehicules/autos/motorisations
     */
    recupererListeMotorisationsAutos: (query: RecupererListeMotorisationsAutosParams, params: RequestParams = {}) =>
      this.http.request<MotorisationVehicule[], void>({
        path: `/vehicules/autos/motorisations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_NombreNonRenseigne](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_nombrenonrenseigne)</li></ul>
     *
     * @tags autos
     * @name RecupererListeNbPortesAutos
     * @summary Récupère la liste des nombres de portes auto
     * @request GET:/vehicules/autos/nombres_portes
     */
    recupererListeNbPortesAutos: (query: RecupererListeNbPortesAutosParams, params: RequestParams = {}) =>
      this.http.request<NombrePortesVehicule[], void>({
        path: `/vehicules/autos/nombres_portes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_CodeSansInformation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codesansinformation)</li></ul>
     *
     * @tags autos
     * @name RecupererListeTransmissionsAutos
     * @summary Récupère la liste des transmissions auto
     * @request GET:/vehicules/autos/transmissions
     */
    recupererListeTransmissionsAutos: (query: RecupererListeTransmissionsAutosParams, params: RequestParams = {}) =>
      this.http.request<TransmissionVehicule[], void>({
        path: `/vehicules/autos/transmissions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  campingCars = {
    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags camping-cars
     * @name RecupererListeCampingCars
     * @summary Récupère une liste de modèles camping-car
     * @request GET:/vehicules/camping_cars
     */
    recupererListeCampingCars: (query: RecupererListeCampingCarsParams, params: RequestParams = {}) =>
      this.http.request<VehiculeSynthese[], void>({
        path: `/vehicules/camping_cars`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_CodeSansInformation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codesansinformation)</li></ul>
     *
     * @tags camping-cars
     * @name RecupererListeCarrosseriesCampingCars
     * @summary Récupère la liste des carrosseries camping-car
     * @request GET:/vehicules/camping_cars/carrosseries
     */
    recupererListeCarrosseriesCampingCars: (
      query: RecupererListeCarrosseriesCampingCarsParams,
      params: RequestParams = {},
    ) =>
      this.http.request<CarrosserieVehicule[], void>({
        path: `/vehicules/camping_cars/carrosseries`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags camping-cars
     * @name RecupererListeChassisCampingCars
     * @summary Récupère la liste des chassis camping-car
     * @request GET:/vehicules/camping_cars/chassis
     */
    recupererListeChassisCampingCars: (query: RecupererListeChassisCampingCarsParams, params: RequestParams = {}) =>
      this.http.request<ChassisVehicule[], void>({
        path: `/vehicules/camping_cars/chassis`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_CodeSansInformation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codesansinformation)</li></ul>
     *
     * @tags camping-cars
     * @name RecupererListeEnergiesCampingCars
     * @summary Récupère la liste des énergies camping-car
     * @request GET:/vehicules/camping_cars/energies
     */
    recupererListeEnergiesCampingCars: (query: RecupererListeEnergiesCampingCarsParams, params: RequestParams = {}) =>
      this.http.request<EnergieVehicule[], void>({
        path: `/vehicules/camping_cars/energies`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags camping-cars
     * @name RecupererListeFamillesCampingCars
     * @summary Récupère la liste des familles cellules camping-car
     * @request GET:/vehicules/camping_cars/familles_cellules
     */
    recupererListeFamillesCampingCars: (query: RecupererListeFamillesCampingCarsParams, params: RequestParams = {}) =>
      this.http.request<FamilleCelluleVehicule[], void>({
        path: `/vehicules/camping_cars/familles_cellules`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags camping-cars
     * @name RecupererListeMarquesCampingCars
     * @summary Récupère la liste des marques cellules camping-car
     * @request GET:/vehicules/camping_cars/marques_cellules
     */
    recupererListeMarquesCampingCars: (query: RecupererListeMarquesCampingCarsParams, params: RequestParams = {}) =>
      this.http.request<MarqueVehicule[], void>({
        path: `/vehicules/camping_cars/marques_cellules`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags camping-cars
     * @name RecupererListeFinitionsCampingCars
     * @summary Récupère la liste des niveaux de finition camping-car
     * @request GET:/vehicules/camping_cars/niveaux_finitions
     */
    recupererListeFinitionsCampingCars: (query: RecupererListeFinitionsCampingCarsParams, params: RequestParams = {}) =>
      this.http.request<NiveauFinitionVehicule[], void>({
        path: `/vehicules/camping_cars/niveaux_finitions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_NombreNonRenseigne](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_nombrenonrenseigne)</li></ul>
     *
     * @tags camping-cars
     * @name RecupererListePuissancesCampingCars
     * @summary Récupère la liste des puissances fiscales camping-car
     * @request GET:/vehicules/camping_cars/puissances_fiscales
     */
    recupererListePuissancesCampingCars: (
      query: RecupererListePuissancesCampingCarsParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PuissanceFiscaleVehicule[], void>({
        path: `/vehicules/camping_cars/puissances_fiscales`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  cyclos = {
    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags cyclos
     * @name RecupererListeCyclos
     * @summary Récupère une liste de modèles cyclo
     * @request GET:/vehicules/cyclos
     */
    recupererListeCyclos: (query: RecupererListeCyclosParams, params: RequestParams = {}) =>
      this.http.request<VehiculeSynthese[], void>({
        path: `/vehicules/cyclos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags cyclos
     * @name RecupererListeFamillesCyclos
     * @summary Récupère la liste des familles cyclo
     * @request GET:/vehicules/cyclos/familles
     */
    recupererListeFamillesCyclos: (query: RecupererListeFamillesCyclosParams, params: RequestParams = {}) =>
      this.http.request<FamilleVehicule[], void>({
        path: `/vehicules/cyclos/familles`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags cyclos
     * @name RecupererListeGroupesTarifCyclos
     * @summary Récupère la liste des groupes tarifaires cyclo
     * @request GET:/vehicules/cyclos/groupes_tarification
     */
    recupererListeGroupesTarifCyclos: (query: RecupererListeGroupesTarifCyclosParams, params: RequestParams = {}) =>
      this.http.request<GroupeTarificationVehicule[], void>({
        path: `/vehicules/cyclos/groupes_tarification`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags cyclos
     * @name RecupererListeMarquesCyclos
     * @summary Récupère la liste des marques cyclo
     * @request GET:/vehicules/cyclos/marques
     */
    recupererListeMarquesCyclos: (query: RecupererListeMarquesCyclosParams, params: RequestParams = {}) =>
      this.http.request<MarqueVehicule[], void>({
        path: `/vehicules/cyclos/marques`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  motosQuads = {
    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags motos-quads
     * @name RecupererListeMotosQuad
     * @summary Récupère une liste de modèles moto/quad
     * @request GET:/vehicules/motos_quads
     */
    recupererListeMotosQuad: (query: RecupererListeMotosQuadParams, params: RequestParams = {}) =>
      this.http.request<VehiculeSynthese[], void>({
        path: `/vehicules/motos_quads`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li><li>[RDG_CodeSansInformation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codesansinformation)</li></ul>
     *
     * @tags motos-quads
     * @name RecupererListeCarrosseriesMotosQuad
     * @summary Récupère la liste des carrosseries moto/quad
     * @request GET:/vehicules/motos_quads/carrosseries
     */
    recupererListeCarrosseriesMotosQuad: (
      query: RecupererListeCarrosseriesMotosQuadParams,
      params: RequestParams = {},
    ) =>
      this.http.request<CarrosserieVehicule[], void>({
        path: `/vehicules/motos_quads/carrosseries`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags motos-quads
     * @name RecupererListeFamillesMotosQuad
     * @summary Récupère la liste des familles moto/quad
     * @request GET:/vehicules/motos_quads/familles
     */
    recupererListeFamillesMotosQuad: (query: RecupererListeFamillesMotosQuadParams, params: RequestParams = {}) =>
      this.http.request<FamilleVehicule[], void>({
        path: `/vehicules/motos_quads/familles`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags motos-quads
     * @name RecupererListeGroupesTarifMotosQuad
     * @summary Récupère la liste des groupes tarifaires moto/quad
     * @request GET:/vehicules/motos_quads/groupes_tarification
     */
    recupererListeGroupesTarifMotosQuad: (
      query: RecupererListeGroupesTarifMotosQuadParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GroupeTarificationVehicule[], void>({
        path: `/vehicules/motos_quads/groupes_tarification`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Règles de gestion applicables : <ul><li>[RDG_LimiteOccurrences](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_limiteoccurrences)</li><li>[RDG_NumeroRepertoire](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_numerorepertoire)</li><li>[RDG_FamillesExcluesInternet](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_famillesexcluesinternet)</li><li>[RDG_AnneeCirculation](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_anneecirculation)</li><li>[RDG_CodesCategorie](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_codescategorie)</li><li>[RDG_LienDetailVehicule](http://gitlab-fabfonc.maif.local/api0/referentiel/referentiel-modeles-vehicules/wikis/regles-de-gestion#rdg_liendetailvehicule)</li></ul>
     *
     * @tags motos-quads
     * @name RecupererListeMarquesMotosQuad
     * @summary Récupère la liste des marques moto/quad
     * @request GET:/vehicules/motos_quads/marques
     */
    recupererListeMarquesMotosQuad: (query: RecupererListeMarquesMotosQuadParams, params: RequestParams = {}) =>
      this.http.request<MarqueVehicule[], void>({
        path: `/vehicules/motos_quads/marques`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
