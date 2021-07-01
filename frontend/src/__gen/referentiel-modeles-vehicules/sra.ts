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
  useMutation,
  UseQueryOptions,
  UseMutationOptions
} from 'react-query'
import type {
  SraPagination,
  RecupererListeSRAParams,
  Sra,
  InfoSraVehPost,
  InfoSraVehPut
} from './referentiel-modeles-vehicules.schemas'
import {
  rest
} from 'msw'
import faker from 'faker'


type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


export const recupererListeSRA = <Data = unknown>(
    params?: RecupererListeSRAParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? SraPagination : Data>(
      `/modeles/sra`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getRecupererListeSRAQueryKey = (params?: RecupererListeSRAParams,) => [`/modeles/sra`, ...(params ? [params]: [])]

    
export const useRecupererListeSRA = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeSRAParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeSRA>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeSRAQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeSRA>, Error>(queryKey, () => recupererListeSRA<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const creationSRA = <Data = unknown>(
    infoSraVehPost: InfoSraVehPost, options?: AxiosRequestConfig
 ) => {
    return axios.post<Data extends unknown ? Sra : Data>(
      `/modeles/sra`,
      infoSraVehPost,options
    );
  }



    export const useCreationSRA = <
      Data extends unknown = unknown,
      Error extends unknown = unknown
    >(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof creationSRA>, Error, {data: InfoSraVehPost}, unknown>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options || {}

      return useMutation<AsyncReturnType<typeof creationSRA>, Error, {data: InfoSraVehPost}>((props) => {
        const {data} = props || {};

        return  creationSRA<Data>(data,axiosOptions)
      }, mutationOptions)
    }
    export const modificationSRA = <Data = unknown>(
    infoSraVehPut: InfoSraVehPut, options?: AxiosRequestConfig
 ) => {
    return axios.put<Data extends unknown ? Sra : Data>(
      `/modeles/sra`,
      infoSraVehPut,options
    );
  }



    export const useModificationSRA = <
      Data extends unknown = unknown,
      Error extends unknown = unknown
    >(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof modificationSRA>, Error, {data: InfoSraVehPut}, unknown>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options || {}

      return useMutation<AsyncReturnType<typeof modificationSRA>, Error, {data: InfoSraVehPut}>((props) => {
        const {data} = props || {};

        return  modificationSRA<Data>(data,axiosOptions)
      }, mutationOptions)
    }
    

export const getRecupererListeSRAMock = () => ({infoPagination: {page: faker.datatype.number(), totalPages: faker.datatype.number(), nombreElements: faker.datatype.number(), totalElements: faker.datatype.number(), premierePage: faker.datatype.boolean(), dernierePage: faker.datatype.boolean(), taillePage: faker.datatype.number(), triPagination: [...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({direction: faker.helpers.randomize([faker.random.word(), undefined]), property: faker.helpers.randomize([faker.random.word(), undefined]), ignoreCase: faker.helpers.randomize([faker.datatype.boolean(), undefined]), nullHandling: faker.helpers.randomize([faker.random.word(), undefined]), descending: faker.helpers.randomize([faker.datatype.boolean(), undefined]), ascending: faker.helpers.randomize([faker.datatype.boolean(), undefined])}))}, sraDemandes: [...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeEtatSraVehicule: faker.random.word(), libelleEtatSraVehicule: faker.random.word(), codeSra: faker.random.word(), numeroRepertoire: faker.helpers.randomize([faker.random.word(), undefined]), dateMiseAJour: faker.random.word()}))})

export const getCreationSRAMock = () => ({codeEtatSraVehicule: faker.random.word(), libelleEtatSraVehicule: faker.random.word(), codeSra: faker.random.word(), numeroRepertoire: faker.helpers.randomize([faker.random.word(), undefined]), dateMiseAJour: faker.random.word()})

export const getModificationSRAMock = () => ({codeEtatSraVehicule: faker.random.word(), libelleEtatSraVehicule: faker.random.word(), codeSra: faker.random.word(), numeroRepertoire: faker.helpers.randomize([faker.random.word(), undefined]), dateMiseAJour: faker.random.word()})

export const getSraMSW = () => [
rest.get('*/modeles/sra', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getRecupererListeSRAMock()),
        )
      }),rest.post('*/modeles/sra', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getCreationSRAMock()),
        )
      }),rest.put('*/modeles/sra', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getModificationSRAMock()),
        )
      }),]
