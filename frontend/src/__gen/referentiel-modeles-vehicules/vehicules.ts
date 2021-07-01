/*
 * Generated by orval v5.3.2 🍺
 * Do not edit manually.
 * API modeles-vehicules
 * Cette API permet de gérer le référentiel des véhicules (modèle générique).<br> Un véhicule peut être de type auto, moto, quad, cyclo ou camping-car.<br> L'API permet d'exposer (recherche, consultation) des données spécifiques à chaque type de véhicules (par exemple le nombre de portes pour un véhicule de type auto) ou communes à tous les types de véhicules (par exemple recherche d'un véhicule par immatriculation).

 * OpenAPI spec version: 1.6.5
 */
import axios,{
  AxiosRequestConfig
} from 'axios'
import {
  useQuery,
  UseQueryOptions
} from 'react-query'
import type {
  VehiculeAssureDTO,
  GetNumRepForImmatriculationUsingGET1Params,
  GetModleVehiculesByNumeroChassisUsingGET1Params,
  VehiculeDetail
} from './referentiel-modeles-vehicules.schemas'
import {
  rest
} from 'msw'
import faker from 'faker'


type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


export const getNumRepForImmatriculationUsingGET1 = <Data = unknown>(
    params?: GetNumRepForImmatriculationUsingGET1Params, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? VehiculeAssureDTO : Data>(
      `/v1/vehicules/immatriculation`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getGetNumRepForImmatriculationUsingGET1QueryKey = (params?: GetNumRepForImmatriculationUsingGET1Params,) => [`/v1/vehicules/immatriculation`, ...(params ? [params]: [])]

    
export const useGetNumRepForImmatriculationUsingGET1 = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: GetNumRepForImmatriculationUsingGET1Params, options?: { query?:UseQueryOptions<AsyncReturnType<typeof getNumRepForImmatriculationUsingGET1>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getGetNumRepForImmatriculationUsingGET1QueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof getNumRepForImmatriculationUsingGET1>, Error>(queryKey, () => getNumRepForImmatriculationUsingGET1<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const getModleVehiculesByNumeroChassisUsingGET1 = <Data = unknown>(
    params?: GetModleVehiculesByNumeroChassisUsingGET1Params, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? VehiculeAssureDTO : Data>(
      `/v1/vehicules/numeros_chassis`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getGetModleVehiculesByNumeroChassisUsingGET1QueryKey = (params?: GetModleVehiculesByNumeroChassisUsingGET1Params,) => [`/v1/vehicules/numeros_chassis`, ...(params ? [params]: [])]

    
export const useGetModleVehiculesByNumeroChassisUsingGET1 = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: GetModleVehiculesByNumeroChassisUsingGET1Params, options?: { query?:UseQueryOptions<AsyncReturnType<typeof getModleVehiculesByNumeroChassisUsingGET1>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getGetModleVehiculesByNumeroChassisUsingGET1QueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof getModleVehiculesByNumeroChassisUsingGET1>, Error>(queryKey, () => getModleVehiculesByNumeroChassisUsingGET1<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererVehiculeParNumeroRepertoire = <Data = unknown>(
    numeroRepertoire: string, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? VehiculeDetail : Data>(
      `/vehicules/${numeroRepertoire}`,options
    );
  }


export const getRecupererVehiculeParNumeroRepertoireQueryKey = (numeroRepertoire: string,) => [`/vehicules/${numeroRepertoire}`]

    
export const useRecupererVehiculeParNumeroRepertoire = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 numeroRepertoire: string, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererVehiculeParNumeroRepertoire>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererVehiculeParNumeroRepertoireQueryKey(numeroRepertoire);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererVehiculeParNumeroRepertoire>, Error>(queryKey, () => recupererVehiculeParNumeroRepertoire<Data>(numeroRepertoire, axiosOptions), {enabled: !!(numeroRepertoire), ...queryOptions} )

  return {
    queryKey,
    ...query
  }
}



export const getGetNumRepForImmatriculationUsingGET1Mock = () => ({avertissements: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({code: faker.helpers.randomize([faker.random.word(), undefined]), message: faker.helpers.randomize([faker.random.word(), undefined])})), undefined]), dateMEC: faker.helpers.randomize([faker.random.word(), undefined]), immatriculation: faker.helpers.randomize([faker.random.word(), undefined]), modelesVeh: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({anneeDateDebutFabrication: faker.helpers.randomize([faker.datatype.number(), undefined]), anneeDateFinFabrication: faker.helpers.randomize([faker.datatype.number(), undefined]), champRechercheVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeCarrosserieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeCategorieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeDegreAutonomie: faker.helpers.randomize([faker.random.word(), undefined]), codeEnergieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeGenreVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeGestionVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeGroupeTarification: faker.helpers.randomize([faker.random.word(), undefined]), codeInterditNovice: faker.helpers.randomize([faker.datatype.number(), undefined]), codeNiveauFinitionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeSegmentVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeVocationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), dateDebutFabrication: faker.helpers.randomize([faker.random.word(), undefined]), dateFinFabrication: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeCourte: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeLongue: faker.helpers.randomize([faker.random.word(), undefined]), libelleEnergieVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleFamilleVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenerationModeleVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenreVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGestionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleInterditNovice: faker.helpers.randomize([faker.random.word(), undefined]), libelleLongCarrosserieVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleLongTransmissionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleMarque: faker.helpers.randomize([faker.random.word(), undefined]), libelleMotorisationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleNiveauFinitionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleObservationLong: faker.helpers.randomize([faker.random.word(), undefined]), libelleSegmentVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleVocationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), nombrePorte: faker.helpers.randomize([faker.datatype.number(), undefined]), numeroRepertoireVehicule: faker.helpers.randomize([faker.random.word(), undefined]), puissanceFiscale: faker.helpers.randomize([faker.datatype.number(), undefined]), puissanceVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), sraVehicules: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeEtat: faker.helpers.randomize([faker.random.word(), undefined]), codeSRAVehicule: faker.helpers.randomize([faker.random.word(), undefined]), numeroIdentifiantSRAVEH: faker.helpers.randomize([faker.datatype.number(), undefined]), numeroRepertoireVehicule: faker.helpers.randomize([faker.random.word(), undefined])})), undefined]), typeTransmissionVehicule: faker.helpers.randomize([faker.datatype.number(), undefined])})), undefined])})

export const getGetModleVehiculesByNumeroChassisUsingGET1Mock = () => ({avertissements: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({code: faker.helpers.randomize([faker.random.word(), undefined]), message: faker.helpers.randomize([faker.random.word(), undefined])})), undefined]), dateMEC: faker.helpers.randomize([faker.random.word(), undefined]), immatriculation: faker.helpers.randomize([faker.random.word(), undefined]), modelesVeh: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({anneeDateDebutFabrication: faker.helpers.randomize([faker.datatype.number(), undefined]), anneeDateFinFabrication: faker.helpers.randomize([faker.datatype.number(), undefined]), champRechercheVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeCarrosserieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeCategorieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeDegreAutonomie: faker.helpers.randomize([faker.random.word(), undefined]), codeEnergieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeGenreVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeGestionVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeGroupeTarification: faker.helpers.randomize([faker.random.word(), undefined]), codeInterditNovice: faker.helpers.randomize([faker.datatype.number(), undefined]), codeNiveauFinitionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeSegmentVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeVocationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), dateDebutFabrication: faker.helpers.randomize([faker.random.word(), undefined]), dateFinFabrication: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeCourte: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeLongue: faker.helpers.randomize([faker.random.word(), undefined]), libelleEnergieVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleFamilleVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenerationModeleVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenreVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGestionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleInterditNovice: faker.helpers.randomize([faker.random.word(), undefined]), libelleLongCarrosserieVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleLongTransmissionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleMarque: faker.helpers.randomize([faker.random.word(), undefined]), libelleMotorisationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleNiveauFinitionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleObservationLong: faker.helpers.randomize([faker.random.word(), undefined]), libelleSegmentVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleVocationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), nombrePorte: faker.helpers.randomize([faker.datatype.number(), undefined]), numeroRepertoireVehicule: faker.helpers.randomize([faker.random.word(), undefined]), puissanceFiscale: faker.helpers.randomize([faker.datatype.number(), undefined]), puissanceVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), sraVehicules: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeEtat: faker.helpers.randomize([faker.random.word(), undefined]), codeSRAVehicule: faker.helpers.randomize([faker.random.word(), undefined]), numeroIdentifiantSRAVEH: faker.helpers.randomize([faker.datatype.number(), undefined]), numeroRepertoireVehicule: faker.helpers.randomize([faker.random.word(), undefined])})), undefined]), typeTransmissionVehicule: faker.helpers.randomize([faker.datatype.number(), undefined])})), undefined])})

export const getRecupererVehiculeParNumeroRepertoireMock = () => ({numeroRepertoire: faker.random.word(), codeMarque: faker.random.word(), libelleMarque: faker.random.word(), codeCategorie: faker.random.word(), codeCategorieOrigine: faker.helpers.randomize([faker.random.word(), undefined]), libelleCategorieOrigine: faker.helpers.randomize([faker.random.word(), undefined]), codeFamille: faker.random.word(), libelleFamille: faker.random.word(), nombrePortes: faker.helpers.randomize([faker.random.word(), undefined]), typeMotorisation: faker.random.word(), libelleMotorisation: faker.helpers.randomize([faker.random.word(), undefined]), codeEnergie: faker.helpers.randomize([faker.random.word(), undefined]), libelleEnergie: faker.helpers.randomize([faker.random.word(), undefined]), codeTransmission: faker.helpers.randomize([faker.random.word(), undefined]), libelleTransmission: faker.helpers.randomize([faker.random.word(), undefined]), puissanceFiscale: faker.helpers.randomize([faker.random.word(), undefined]), cylindre: faker.helpers.randomize([faker.random.word(), undefined]), codeCarrosserie: faker.helpers.randomize([faker.random.word(), undefined]), libelleCarrosserie: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeCourte: faker.random.word(), denominationCommercialeLongue: faker.random.word(), codeAssujettissementClause: faker.random.word(), libelleAssujettissementClause: faker.random.word(), codeNiveauFinition: faker.random.word(), libelleNiveauFinition: faker.random.word(), libelleFamilleCellule: faker.helpers.randomize([faker.random.word(), undefined]), libelleMarqueChassis: faker.helpers.randomize([faker.random.word(), undefined]), libelleFamilleChassis: faker.random.word(), libelleTypeMineTasse: faker.random.word(), codeSituationModele: faker.random.word(), libelleSituationModele: faker.random.word(), dateDebutFabrication: faker.helpers.randomize([faker.random.word(), undefined]), dateFinFabrication: faker.helpers.randomize([faker.random.word(), undefined]), codeDegreAutonomie: faker.random.word(), libelleObservationLong: faker.random.word(), champRecherche: faker.random.word(), codeGenre: faker.random.word(), libelleGenre: faker.random.word(), codeGestion: faker.helpers.randomize([faker.random.word(), undefined]), libelleGestion: faker.helpers.randomize([faker.random.word(), undefined]), codeInterditNovice: faker.helpers.randomize([faker.random.word(), undefined]), libelleInterditNovice: faker.helpers.randomize([faker.random.word(), undefined]), codeSegment: faker.helpers.randomize([faker.random.word(), undefined]), libelleSegment: faker.helpers.randomize([faker.random.word(), undefined]), codeVocation: faker.helpers.randomize([faker.random.word(), undefined]), libelleVocation: faker.helpers.randomize([faker.random.word(), undefined]), codeGroupeTarification: faker.random.word(), poidsAVide: faker.helpers.randomize([faker.datatype.number(), undefined]), puissance: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenerationModele: faker.helpers.randomize([faker.random.word(), undefined])})

export const getVehiculesMSW = () => [
rest.get('*/v1/vehicules/immatriculation', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetNumRepForImmatriculationUsingGET1Mock()),
        )
      }),rest.get('*/v1/vehicules/numeros_chassis', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetModleVehiculesByNumeroChassisUsingGET1Mock()),
        )
      }),rest.get('*/vehicules/:numeroRepertoire', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getRecupererVehiculeParNumeroRepertoireMock()),
        )
      }),]
