import * as T from "fp-ts/Task"
import {crashOnError, iardDevisVehiculesClient, iardStringDate, nomenclatureToCode} from "../clients";
import {pipe} from "fp-ts/function";
import { Code } from "../../kit-2/helpers"

// @todo: if we end up discarding the api call for this data, this should be an enum
export const getTypesConducteurs: T.Task<Code<string>[]> =
    T.of([
        {value: "01", label: "Vous"},
        {value: "02", label: "Votre conjoint(e)"},
        {value: "03", label: "Votre concubin(e)"},
        {value: "04", label: "Un enfant à charge"},
    ])
// pipe(
// iardDevisVehiculesClient.nomenclatures.recupererValeursTypeConducteur,
// T.map(crashOnError),
// T.map(nomenclatureToCode)
// )

// @todo: This endpoint doesn't exist, what is the expected format/code ?
export const getCivilites: T.Task<Code<string>[]> =
    T.of([
        {value: "f", label: "Madame"},
        {value: "h", label: "Monsieur"},
    ])


export enum EXPERIENCES_CONDUCTEURS {
    CONDUCTEUR_OCCASIONEL_VEHICULE_MAIF = "02",
    ASSURE_AUTRE_SOCIETE = "03",
    SANS_EXPERIENCE = "04",
}

// @todo: if we end up discarding the api call for this data, this should be an enum
export const getExperiencesConducteur: T.Task<Code<string>[]> =
    T.of([
        {value: EXPERIENCES_CONDUCTEURS.CONDUCTEUR_OCCASIONEL_VEHICULE_MAIF, label: "Conducteur occasionnel d'un véhicule assuré MAIF"},
        {value: EXPERIENCES_CONDUCTEURS.ASSURE_AUTRE_SOCIETE, label: "Assuré auprès d'une autre société"},
        {value: EXPERIENCES_CONDUCTEURS.SANS_EXPERIENCE, label: "Sans Expérience"},
    ])
// pipe(
// iardDevisVehiculesClient.nomenclatures.recupererValeursExperienceConducteur,
// T.map(crashOnError),
// T.map(nomenclatureToCode)
// )

export const getAntecedentsSinistralites = (params: { dateEcheanceAncienAssureur: Date }) =>
    pipe(
        () => iardDevisVehiculesClient.acceptationRisqueVehicule.recupererDatesAntecedentsSinistralite({
            dateDEcheanceAncienAssureur: iardStringDate(params.dateEcheanceAncienAssureur)
        }),
        T.map(crashOnError),
        T.map(data => ({
            dateAnterioriteBonus050: new Date(data.dateAnterioriteBonus050),
            dateDebutCollecteSinistre: new Date(data.dateDebutCollecteSinistre),
        }))
    )()


export const getResponsabilitesSinistre =
    pipe(
        () => iardDevisVehiculesClient.nomenclatures.recupererValeursResponsabiliteSinistre(),
        T.map(crashOnError),
        T.map(nomenclatureToCode)
    )

export enum CODES_NATURES_SINISTRE {
    COLLISION = "01",
    AUTRE = "02",
}
