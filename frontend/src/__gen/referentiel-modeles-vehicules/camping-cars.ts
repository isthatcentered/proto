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
  RecupererListeCampingCarsParams,
  CarrosserieVehicule,
  RecupererListeCarrosseriesCampingCarsParams,
  ChassisVehicule,
  RecupererListeChassisCampingCarsParams,
  EnergieVehicule,
  RecupererListeEnergiesCampingCarsParams,
  FamilleCelluleVehicule,
  RecupererListeFamillesCampingCarsParams,
  MarqueVehicule,
  RecupererListeMarquesCampingCarsParams,
  NiveauFinitionVehicule,
  RecupererListeFinitionsCampingCarsParams,
  PuissanceFiscaleVehicule,
  RecupererListePuissancesCampingCarsParams
} from './referentiel-modeles-vehicules.schemas'
import {
  rest
} from 'msw'


type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


export const recupererListeCampingCars = <Data = unknown>(
    params?: RecupererListeCampingCarsParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? VehiculeSynthese[] : Data>(
      `/vehicules/camping_cars`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules', 
    ...options },
    );
  }


export const getRecupererListeCampingCarsQueryKey = (params?: RecupererListeCampingCarsParams,) => [`/vehicules/camping_cars`, ...(params ? [params]: [])]

    
export const useRecupererListeCampingCars = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeCampingCarsParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeCampingCars>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeCampingCarsQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeCampingCars>, Error>(queryKey, () => recupererListeCampingCars<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeCarrosseriesCampingCars = <Data = unknown>(
    params?: RecupererListeCarrosseriesCampingCarsParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? CarrosserieVehicule[] : Data>(
      `/vehicules/camping_cars/carrosseries`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules', 
    ...options },
    );
  }


export const getRecupererListeCarrosseriesCampingCarsQueryKey = (params?: RecupererListeCarrosseriesCampingCarsParams,) => [`/vehicules/camping_cars/carrosseries`, ...(params ? [params]: [])]

    
export const useRecupererListeCarrosseriesCampingCars = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeCarrosseriesCampingCarsParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeCarrosseriesCampingCars>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeCarrosseriesCampingCarsQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeCarrosseriesCampingCars>, Error>(queryKey, () => recupererListeCarrosseriesCampingCars<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeChassisCampingCars = <Data = unknown>(
    params?: RecupererListeChassisCampingCarsParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? ChassisVehicule[] : Data>(
      `/vehicules/camping_cars/chassis`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules', 
    ...options },
    );
  }


export const getRecupererListeChassisCampingCarsQueryKey = (params?: RecupererListeChassisCampingCarsParams,) => [`/vehicules/camping_cars/chassis`, ...(params ? [params]: [])]

    
export const useRecupererListeChassisCampingCars = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeChassisCampingCarsParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeChassisCampingCars>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeChassisCampingCarsQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeChassisCampingCars>, Error>(queryKey, () => recupererListeChassisCampingCars<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeEnergiesCampingCars = <Data = unknown>(
    params?: RecupererListeEnergiesCampingCarsParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? EnergieVehicule[] : Data>(
      `/vehicules/camping_cars/energies`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules', 
    ...options },
    );
  }


export const getRecupererListeEnergiesCampingCarsQueryKey = (params?: RecupererListeEnergiesCampingCarsParams,) => [`/vehicules/camping_cars/energies`, ...(params ? [params]: [])]

    
export const useRecupererListeEnergiesCampingCars = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeEnergiesCampingCarsParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeEnergiesCampingCars>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeEnergiesCampingCarsQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeEnergiesCampingCars>, Error>(queryKey, () => recupererListeEnergiesCampingCars<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeFamillesCampingCars = <Data = unknown>(
    params?: RecupererListeFamillesCampingCarsParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? FamilleCelluleVehicule[] : Data>(
      `/vehicules/camping_cars/familles_cellules`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules', 
    ...options },
    );
  }


export const getRecupererListeFamillesCampingCarsQueryKey = (params?: RecupererListeFamillesCampingCarsParams,) => [`/vehicules/camping_cars/familles_cellules`, ...(params ? [params]: [])]

    
export const useRecupererListeFamillesCampingCars = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeFamillesCampingCarsParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeFamillesCampingCars>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeFamillesCampingCarsQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeFamillesCampingCars>, Error>(queryKey, () => recupererListeFamillesCampingCars<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeMarquesCampingCars = <Data = unknown>(
    params?: RecupererListeMarquesCampingCarsParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? MarqueVehicule[] : Data>(
      `/vehicules/camping_cars/marques_cellules`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules', 
    ...options },
    );
  }


export const getRecupererListeMarquesCampingCarsQueryKey = (params?: RecupererListeMarquesCampingCarsParams,) => [`/vehicules/camping_cars/marques_cellules`, ...(params ? [params]: [])]

    
export const useRecupererListeMarquesCampingCars = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeMarquesCampingCarsParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeMarquesCampingCars>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeMarquesCampingCarsQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeMarquesCampingCars>, Error>(queryKey, () => recupererListeMarquesCampingCars<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeFinitionsCampingCars = <Data = unknown>(
    params?: RecupererListeFinitionsCampingCarsParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? NiveauFinitionVehicule[] : Data>(
      `/vehicules/camping_cars/niveaux_finitions`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules', 
    ...options },
    );
  }


export const getRecupererListeFinitionsCampingCarsQueryKey = (params?: RecupererListeFinitionsCampingCarsParams,) => [`/vehicules/camping_cars/niveaux_finitions`, ...(params ? [params]: [])]

    
export const useRecupererListeFinitionsCampingCars = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeFinitionsCampingCarsParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeFinitionsCampingCars>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListeFinitionsCampingCarsQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeFinitionsCampingCars>, Error>(queryKey, () => recupererListeFinitionsCampingCars<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListePuissancesCampingCars = <Data = unknown>(
    params?: RecupererListePuissancesCampingCarsParams, options?: AxiosRequestConfig
 ) => {
    return axios.get<Data extends unknown ? PuissanceFiscaleVehicule[] : Data>(
      `/vehicules/camping_cars/puissances_fiscales`,
      {
        params,
  baseURL: '/api/referentiel/modeles_vehicules', 
    ...options },
    );
  }


export const getRecupererListePuissancesCampingCarsQueryKey = (params?: RecupererListePuissancesCampingCarsParams,) => [`/vehicules/camping_cars/puissances_fiscales`, ...(params ? [params]: [])]

    
export const useRecupererListePuissancesCampingCars = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListePuissancesCampingCarsParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListePuissancesCampingCars>, Error>, axios?: AxiosRequestConfig}

  ) => {
  const queryKey = getRecupererListePuissancesCampingCarsQueryKey(params);
  const {query: queryOptions, axios: axiosOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListePuissancesCampingCars>, Error>(queryKey, () => recupererListePuissancesCampingCars<Data>(params, axiosOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}



export const getCampingCarsMSW = () => [
rest.get('*/vehicules/camping_cars', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/camping_cars/carrosseries', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/camping_cars/chassis', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/camping_cars/energies', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/camping_cars/familles_cellules', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/camping_cars/marques_cellules', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/camping_cars/niveaux_finitions', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/camping_cars/puissances_fiscales', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),]
