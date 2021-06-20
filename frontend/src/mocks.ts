import { MockedRequest, rest, RestHandler, setupWorker } from "msw"
import { getAutosMSW } from "./__gen/referentiel-modeles-vehicules/autos"
import { getVehiculesMSW } from "./__gen/referentiel-modeles-vehicules/vehicules"
import { getCampingCarsMSW, recupererListeMarquesCampingCars } from "./__gen/referentiel-modeles-vehicules/camping-cars"
import { getMotosQuadsMSW } from "./__gen/referentiel-modeles-vehicules/motos-quads"
import { AxiosResponse } from "axios"
import faker from "faker"
import { Mask } from "msw/lib/types/setupWorker/glossary"




const times = <T extends any>( n: number, supply: () => T ): T[] =>
	Array.from( { length: n } ).map( supply )


/**
 * See
 * - https://orval.dev
 * - https://github.com/anymaniax/orval/blob/master/samples/react-app-with-react-query/src/mock.ts
 * - https://mswjs.io/docs/getting-started/integrate/browser
 */


const mockGet = <TResolve>( mask: Mask, respond: TResolve, _blueprint: ( params: any ) => Promise<AxiosResponse<TResolve>> ): RestHandler<MockedRequest<TResolve>> =>
	rest.get( mask, ( req, res, ctx ) =>
		res(
			ctx.delay( 1000 ),
			ctx.status( 200, "Mocked status" ),
			ctx.json( respond ),
		) )



const campingCarMocks = [
	rest.get( "*/vehicules/camping_cars", ( req, res, ctx ) => {
		return res(
			ctx.delay( 1000 ),
			ctx.status( 200, "Mocked status" ),
		)
	} ),
	rest.get( "*/vehicules/camping_cars/carrosseries", ( req, res, ctx ) => {
		return res(
			ctx.delay( 1000 ),
			ctx.status( 200, "Mocked status" ),
		)
	} ),
	rest.get( "*/vehicules/camping_cars/chassis", ( req, res, ctx ) => {
		return res(
			ctx.delay( 1000 ),
			ctx.status( 200, "Mocked status" ),
		)
	} ),
	rest.get( "*/vehicules/camping_cars/energies", ( req, res, ctx ) => {
		return res(
			ctx.delay( 1000 ),
			ctx.status( 200, "Mocked status" ),
		)
	} ),
	rest.get( "*/vehicules/camping_cars/familles_cellules", ( req, res, ctx ) => {
		return res(
			ctx.delay( 1000 ),
			ctx.status( 200, "Mocked status" ),
		)
	} ),
	mockGet(
		"*/vehicules/camping_cars/marques_cellules",
		times( 8, () => ({
			codeMarque:    faker.company.companyName(),
			libelleMarque: faker.company.companyName(),
		}) ),
		recupererListeMarquesCampingCars,
	),
	rest.get( "*/vehicules/camping_cars/niveaux_finitions", ( req, res, ctx ) => {
		return res(
			ctx.delay( 1000 ),
			ctx.status( 200, "Mocked status" ),
		)
	} ),
	rest.get( "*/vehicules/camping_cars/puissances_fiscales", ( req, res, ctx ) => {
		return res(
			ctx.delay( 1000 ),
			ctx.status( 200, "Mocked status" ),
		)
	} ),
]

const handlers = [
	...getAutosMSW(),
	...getVehiculesMSW(),
	...campingCarMocks,
	...getMotosQuadsMSW(),
]

export const worker = setupWorker( ...handlers )
