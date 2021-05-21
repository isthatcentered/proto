import { Api as ReferentielModelesVehiculesApi, HttpResponse } from "../swagger/__generated__/referentiel-modeles-vehicules"
import HttpClient from "../swagger/http-client"
import { Api as IardDevisVehiculesApi, Nomenclature } from "../swagger/__generated__/iard-devis-vehicules"
import { pipe } from "fp-ts/function"
import * as A from "fp-ts/Array"
import { Code, prop } from "../kit-2/helpers"




export const referentienModelesVehiculesClient = new ReferentielModelesVehiculesApi(
	new HttpClient( {
		baseUrl: "/api/referentiel/modeles_vehicules", // @todo: remove constructor option to match only proxy & require api path/name
	} ),
)

export const iardDevisVehiculesClient = new IardDevisVehiculesApi(
	new HttpClient<any>( {
		baseUrl: "/api/iard/devis_vehicules/v1",
	} ) as any,
)

export const crashOnError = <TResolve>(
	res: HttpResponse<TResolve, void>,
): TResolve => {
	if ( res.ok ) return res.data
	throw res.error // Everything is configure to work, if something goes wrong we can't do anything but crash/say "something went wrong
}

export const nomenclatureToCode = (
	nomenclature: Nomenclature,
): Code<string>[] =>
	pipe(
		nomenclature,
		prop( "detailNomenclature" ),
		A.map( i => ({ value: i.code, label: i.libelle }) ),
	)

export const iardStringDate = ( date: Date ): string => new Date( date ).toISOString().slice( 0, 10 )
