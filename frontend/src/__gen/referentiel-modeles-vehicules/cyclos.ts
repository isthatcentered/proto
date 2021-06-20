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
  VehiculeSynthese,
  RecupererListeCyclosParams,
  FamilleVehicule,
  RecupererListeFamillesCyclosParams,
  GroupeTarificationVehicule,
  RecupererListeGroupesTarifCyclosParams,
  MarqueVehicule,
  RecupererListeMarquesCyclosParams
} from './referentiel-modeles-vehicules.schemas'
import {
  rest
} from 'msw'


type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


export const recupererListeCyclos = <Data = unknown>(
    params?: RecupererListeCyclosParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? VehiculeSynthese[] : Data>(
      `/vehicules/cyclos`,
      {
        params,
  baseURL: '/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getRecupererListeCyclosQueryKey = (params?: RecupererListeCyclosParams,) => [`/vehicules/cyclos`, ...(params ? [params]: [])]

    
export const useRecupererListeCyclos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeCyclosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeCyclos>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeCyclosQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeCyclos>, Error>(queryKey, () => recupererListeCyclos<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeFamillesCyclos = <Data = unknown>(
    params?: RecupererListeFamillesCyclosParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? FamilleVehicule[] : Data>(
      `/vehicules/cyclos/familles`,
      {
        params,
  baseURL: '/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getRecupererListeFamillesCyclosQueryKey = (params?: RecupererListeFamillesCyclosParams,) => [`/vehicules/cyclos/familles`, ...(params ? [params]: [])]

    
export const useRecupererListeFamillesCyclos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeFamillesCyclosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeFamillesCyclos>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeFamillesCyclosQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeFamillesCyclos>, Error>(queryKey, () => recupererListeFamillesCyclos<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeGroupesTarifCyclos = <Data = unknown>(
    params?: RecupererListeGroupesTarifCyclosParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? GroupeTarificationVehicule[] : Data>(
      `/vehicules/cyclos/groupes_tarification`,
      {
        params,
  baseURL: '/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getRecupererListeGroupesTarifCyclosQueryKey = (params?: RecupererListeGroupesTarifCyclosParams,) => [`/vehicules/cyclos/groupes_tarification`, ...(params ? [params]: [])]

    
export const useRecupererListeGroupesTarifCyclos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeGroupesTarifCyclosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeGroupesTarifCyclos>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeGroupesTarifCyclosQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeGroupesTarifCyclos>, Error>(queryKey, () => recupererListeGroupesTarifCyclos<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeMarquesCyclos = <Data = unknown>(
    params?: RecupererListeMarquesCyclosParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? MarqueVehicule[] : Data>(
      `/vehicules/cyclos/marques`,
      {
        params,
  baseURL: '/referentiel/modeles_vehicules/', 
    ...options },
    );
  }


export const getRecupererListeMarquesCyclosQueryKey = (params?: RecupererListeMarquesCyclosParams,) => [`/vehicules/cyclos/marques`, ...(params ? [params]: [])]

    
export const useRecupererListeMarquesCyclos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeMarquesCyclosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeMarquesCyclos>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeMarquesCyclosQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeMarquesCyclos>, Error>(queryKey, () => recupererListeMarquesCyclos<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}



export const getCyclosMSW = () => [
rest.get('*/vehicules/cyclos', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/cyclos/familles', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/cyclos/groupes_tarification', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/cyclos/marques', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),]
