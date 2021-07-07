import { useRecupererValeursResponsabiliteSinistre } from "../../swagger-gen/__gen/iard-devis-vehicules-v1/nomenclatures"
import * as DS from "../../kit/date-string"
import { useMemo } from "react"
import { jouerAcceptationProspect, useRecupererDatesAntecedentsSinistralite } from "../../swagger-gen/__gen/iard-devis-vehicules-v1/acceptation-risque-véhicule"
import { pipe } from "fp-ts/function"
import * as REMOTE from "../../kit/remote"
import { useStaticValue } from "../../kit/shared"
import { InfoAcceptationProspect } from "../../swagger-gen/__gen/iard-devis-vehicules-v1/iard-devis-vehicules-v1.schemas"
import { notNil, prop } from "../../kit/helpers"
import * as EI from "fp-ts/Either"
import * as AR from "fp-ts/Array"
import { useNomenclature } from "../../swagger-gen"




export const useDatesAntecedentsSinistralite = ( dateDEcheanceAncienAssureur: DS.DateString | undefined ) => {
	 const params = useMemo(
			() => dateDEcheanceAncienAssureur && DS.isValid( dateDEcheanceAncienAssureur ) ?
						{ dateDEcheanceAncienAssureur: DS.toISO8601( dateDEcheanceAncienAssureur ) } :
						undefined,
			[ dateDEcheanceAncienAssureur ],
	 )
	 const query  = useRecupererDatesAntecedentsSinistralite( params, { query: { enabled: !!params } } )
	 
	 return useMemo(
			() => pipe(
				 query,
				 REMOTE.fromQueryState,
				 REMOTE.map( dates => ({
						dateAnterioriteBonus050:   new Date( dates.dateAnterioriteBonus050 ),
						dateDebutCollecteSinistre: new Date( dates.dateDebutCollecteSinistre ),
				 }) ),
			),
			[ query.dataUpdatedAt ],
	 )
}

export const useResponsabilitesSinistres = () =>
	 useNomenclature( useRecupererValeursResponsabiliteSinistre() )

export enum CODES_NATURES_SINISTRE
{
	 COLLISION = "COLLISION",
	 AUTRE     = "AUTRE",
}

export const useCodesNaturesSinistres = () =>
	 useStaticValue(
			[
				 { value: CODES_NATURES_SINISTRE.AUTRE, label: "Autre" },
				 { value: CODES_NATURES_SINISTRE.COLLISION, label: "Collision" },
			],
	 )

export const checkAcceptationProspect = ( infos: InfoAcceptationProspect ): Promise<EI.Either<string[], void>> => {
	 console.log( "run" )
	 return jouerAcceptationProspect( infos )
			.then( prop( "data" ) )
			.then(
				 result =>
						result.codeAcceptation === "01" ?
						EI.right( undefined ) :
						EI.left(
							 pipe(
									result.justifications || [],
									AR.map( prop( "libelleJustificationRisque" ) ),
									AR.filter( notNil ),
							 ),
						),
			)
			.then( r => {
				 console.log( r )
				 return r
			} )
}
