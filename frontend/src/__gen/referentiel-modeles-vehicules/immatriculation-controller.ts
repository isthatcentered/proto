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
  GetNumRepForImmatriculationUsingGETParams,
  GetModleVehiculesByNumeroChassisUsingGETParams
} from './referentiel-modeles-vehicules.schemas'
import {
  rest
} from 'msw'
import faker from 'faker'


type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


export const getNumRepForImmatriculationUsingGET = <Data = unknown>(
    params?: GetNumRepForImmatriculationUsingGETParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? VehiculeAssureDTO : Data>(
      `/v1/modeles/immatriculation`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getGetNumRepForImmatriculationUsingGETQueryKey = (params?: GetNumRepForImmatriculationUsingGETParams,) => [`/v1/modeles/immatriculation`, ...(params ? [params]: [])]

    
export const useGetNumRepForImmatriculationUsingGET = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: GetNumRepForImmatriculationUsingGETParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof getNumRepForImmatriculationUsingGET>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getGetNumRepForImmatriculationUsingGETQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof getNumRepForImmatriculationUsingGET>, Error>(queryKey, () => getNumRepForImmatriculationUsingGET<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const getModleVehiculesByNumeroChassisUsingGET = <Data = unknown>(
    params?: GetModleVehiculesByNumeroChassisUsingGETParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? VehiculeAssureDTO : Data>(
      `/v1/modeles/numeros_chassis`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getGetModleVehiculesByNumeroChassisUsingGETQueryKey = (params?: GetModleVehiculesByNumeroChassisUsingGETParams,) => [`/v1/modeles/numeros_chassis`, ...(params ? [params]: [])]

    
export const useGetModleVehiculesByNumeroChassisUsingGET = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: GetModleVehiculesByNumeroChassisUsingGETParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof getModleVehiculesByNumeroChassisUsingGET>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getGetModleVehiculesByNumeroChassisUsingGETQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof getModleVehiculesByNumeroChassisUsingGET>, Error>(queryKey, () => getModleVehiculesByNumeroChassisUsingGET<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}



export const getGetNumRepForImmatriculationUsingGETMock = () => ({avertissements: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({code: faker.helpers.randomize([faker.random.word(), undefined]), message: faker.helpers.randomize([faker.random.word(), undefined])})), undefined]), dateMEC: faker.helpers.randomize([faker.random.word(), undefined]), immatriculation: faker.helpers.randomize([faker.random.word(), undefined]), modelesVeh: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({anneeDateDebutFabrication: faker.helpers.randomize([faker.datatype.number(), undefined]), anneeDateFinFabrication: faker.helpers.randomize([faker.datatype.number(), undefined]), champRechercheVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeCarrosserieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeCategorieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeDegreAutonomie: faker.helpers.randomize([faker.random.word(), undefined]), codeEnergieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeGenreVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeGestionVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeGroupeTarification: faker.helpers.randomize([faker.random.word(), undefined]), codeInterditNovice: faker.helpers.randomize([faker.datatype.number(), undefined]), codeNiveauFinitionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeSegmentVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeVocationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), dateDebutFabrication: faker.helpers.randomize([faker.random.word(), undefined]), dateFinFabrication: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeCourte: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeLongue: faker.helpers.randomize([faker.random.word(), undefined]), libelleEnergieVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleFamilleVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenerationModeleVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenreVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGestionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleInterditNovice: faker.helpers.randomize([faker.random.word(), undefined]), libelleLongCarrosserieVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleLongTransmissionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleMarque: faker.helpers.randomize([faker.random.word(), undefined]), libelleMotorisationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleNiveauFinitionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleObservationLong: faker.helpers.randomize([faker.random.word(), undefined]), libelleSegmentVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleVocationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), nombrePorte: faker.helpers.randomize([faker.datatype.number(), undefined]), numeroRepertoireVehicule: faker.helpers.randomize([faker.random.word(), undefined]), puissanceFiscale: faker.helpers.randomize([faker.datatype.number(), undefined]), puissanceVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), sraVehicules: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeEtat: faker.helpers.randomize([faker.random.word(), undefined]), codeSRAVehicule: faker.helpers.randomize([faker.random.word(), undefined]), numeroIdentifiantSRAVEH: faker.helpers.randomize([faker.datatype.number(), undefined]), numeroRepertoireVehicule: faker.helpers.randomize([faker.random.word(), undefined])})), undefined]), typeTransmissionVehicule: faker.helpers.randomize([faker.datatype.number(), undefined])})), undefined])})

export const getGetModleVehiculesByNumeroChassisUsingGETMock = () => ({avertissements: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({code: faker.helpers.randomize([faker.random.word(), undefined]), message: faker.helpers.randomize([faker.random.word(), undefined])})), undefined]), dateMEC: faker.helpers.randomize([faker.random.word(), undefined]), immatriculation: faker.helpers.randomize([faker.random.word(), undefined]), modelesVeh: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({anneeDateDebutFabrication: faker.helpers.randomize([faker.datatype.number(), undefined]), anneeDateFinFabrication: faker.helpers.randomize([faker.datatype.number(), undefined]), champRechercheVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeCarrosserieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeCategorieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeDegreAutonomie: faker.helpers.randomize([faker.random.word(), undefined]), codeEnergieVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeGenreVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeGestionVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), codeGroupeTarification: faker.helpers.randomize([faker.random.word(), undefined]), codeInterditNovice: faker.helpers.randomize([faker.datatype.number(), undefined]), codeNiveauFinitionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeSegmentVehicule: faker.helpers.randomize([faker.random.word(), undefined]), codeVocationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), dateDebutFabrication: faker.helpers.randomize([faker.random.word(), undefined]), dateFinFabrication: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeCourte: faker.helpers.randomize([faker.random.word(), undefined]), denominationCommercialeLongue: faker.helpers.randomize([faker.random.word(), undefined]), libelleEnergieVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleFamilleVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenerationModeleVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGenreVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleGestionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleInterditNovice: faker.helpers.randomize([faker.random.word(), undefined]), libelleLongCarrosserieVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleLongTransmissionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleMarque: faker.helpers.randomize([faker.random.word(), undefined]), libelleMotorisationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleNiveauFinitionVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleObservationLong: faker.helpers.randomize([faker.random.word(), undefined]), libelleSegmentVehicule: faker.helpers.randomize([faker.random.word(), undefined]), libelleVocationVehicule: faker.helpers.randomize([faker.random.word(), undefined]), nombrePorte: faker.helpers.randomize([faker.datatype.number(), undefined]), numeroRepertoireVehicule: faker.helpers.randomize([faker.random.word(), undefined]), puissanceFiscale: faker.helpers.randomize([faker.datatype.number(), undefined]), puissanceVehicule: faker.helpers.randomize([faker.datatype.number(), undefined]), sraVehicules: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeEtat: faker.helpers.randomize([faker.random.word(), undefined]), codeSRAVehicule: faker.helpers.randomize([faker.random.word(), undefined]), numeroIdentifiantSRAVEH: faker.helpers.randomize([faker.datatype.number(), undefined]), numeroRepertoireVehicule: faker.helpers.randomize([faker.random.word(), undefined])})), undefined]), typeTransmissionVehicule: faker.helpers.randomize([faker.datatype.number(), undefined])})), undefined])})

export const getImmatriculationControllerMSW = () => [
rest.get('*/v1/modeles/immatriculation', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetNumRepForImmatriculationUsingGETMock()),
        )
      }),rest.get('*/v1/modeles/numeros_chassis', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetModleVehiculesByNumeroChassisUsingGETMock()),
        )
      }),]