/*
 * Generated by orval v5.3.2 🍺
 * Do not edit manually.
 * API modeles-vehicules
 * Cette API permet de gérer le référentiel des véhicules (modèle générique).<br> Un véhicule peut être de type auto, moto, quad, cyclo ou camping-car.<br> L'API permet d'exposer (recherche, consultation) des données spécifiques à chaque type de véhicules (par exemple le nombre de portes pour un véhicule de type auto) ou communes à tous les types de véhicules (par exemple recherche d'un véhicule par immatriculation).

 * OpenAPI spec version: 1.6.5
 */
import {
  useQuery,
  UseQueryOptions
} from 'react-query'
import type {
  VehiculeSynthese,
  RecupererListeAutosParams,
  CarrosserieVehicule,
  RecupererListeCarrosseriesAutosParams,
  EnergieVehicule,
  RecupererListeEnergiesAutosParams,
  FamilleVehicule,
  RecupererListeFamillesAutosParams,
  GroupeTarificationVehicule,
  RecupererListeGroupesTarifAutosParams,
  MarqueVehicule,
  RecupererListeMarquesAutosParams,
  MotorisationVehicule,
  RecupererListeMotorisationsAutosParams,
  NombrePortesVehicule,
  RecupererListeNbPortesAutosParams,
  TransmissionVehicule,
  RecupererListeTransmissionsAutosParams
} from './referentiel-modeles-vehicules.schemas'
import {
  rest
} from 'msw'
import { customInstance } from '../../axios/index'


type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P extends unknown
  ? Record<string, any>
  : P
  : never;

export const recupererListeAutos = <Data = unknown>(
    params?: RecupererListeAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? VehiculeSynthese[] : Data>(
      {url: `/vehicules/autos`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeAutosQueryKey = (params?: RecupererListeAutosParams,) => [`/vehicules/autos`, ...(params ? [params]: [])]

    
export const useRecupererListeAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeAutos>, Error>(queryKey, () => recupererListeAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeCarrosseriesAutos = <Data = unknown>(
    params?: RecupererListeCarrosseriesAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? CarrosserieVehicule[] : Data>(
      {url: `/vehicules/autos/carrosseries`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeCarrosseriesAutosQueryKey = (params?: RecupererListeCarrosseriesAutosParams,) => [`/vehicules/autos/carrosseries`, ...(params ? [params]: [])]

    
export const useRecupererListeCarrosseriesAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeCarrosseriesAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeCarrosseriesAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeCarrosseriesAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeCarrosseriesAutos>, Error>(queryKey, () => recupererListeCarrosseriesAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeEnergiesAutos = <Data = unknown>(
    params?: RecupererListeEnergiesAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? EnergieVehicule[] : Data>(
      {url: `/vehicules/autos/energies`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeEnergiesAutosQueryKey = (params?: RecupererListeEnergiesAutosParams,) => [`/vehicules/autos/energies`, ...(params ? [params]: [])]

    
export const useRecupererListeEnergiesAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeEnergiesAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeEnergiesAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeEnergiesAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeEnergiesAutos>, Error>(queryKey, () => recupererListeEnergiesAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeFamillesAutos = <Data = unknown>(
    params?: RecupererListeFamillesAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? FamilleVehicule[] : Data>(
      {url: `/vehicules/autos/familles`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeFamillesAutosQueryKey = (params?: RecupererListeFamillesAutosParams,) => [`/vehicules/autos/familles`, ...(params ? [params]: [])]

    
export const useRecupererListeFamillesAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeFamillesAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeFamillesAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeFamillesAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeFamillesAutos>, Error>(queryKey, () => recupererListeFamillesAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeGroupesTarifAutos = <Data = unknown>(
    params?: RecupererListeGroupesTarifAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? GroupeTarificationVehicule[] : Data>(
      {url: `/vehicules/autos/groupes_tarification`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeGroupesTarifAutosQueryKey = (params?: RecupererListeGroupesTarifAutosParams,) => [`/vehicules/autos/groupes_tarification`, ...(params ? [params]: [])]

    
export const useRecupererListeGroupesTarifAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeGroupesTarifAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeGroupesTarifAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeGroupesTarifAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeGroupesTarifAutos>, Error>(queryKey, () => recupererListeGroupesTarifAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeMarquesAutos = <Data = unknown>(
    params?: RecupererListeMarquesAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? MarqueVehicule[] : Data>(
      {url: `/vehicules/autos/marques`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeMarquesAutosQueryKey = (params?: RecupererListeMarquesAutosParams,) => [`/vehicules/autos/marques`, ...(params ? [params]: [])]

    
export const useRecupererListeMarquesAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeMarquesAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeMarquesAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeMarquesAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeMarquesAutos>, Error>(queryKey, () => recupererListeMarquesAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeMotorisationsAutos = <Data = unknown>(
    params?: RecupererListeMotorisationsAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? MotorisationVehicule[] : Data>(
      {url: `/vehicules/autos/motorisations`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeMotorisationsAutosQueryKey = (params?: RecupererListeMotorisationsAutosParams,) => [`/vehicules/autos/motorisations`, ...(params ? [params]: [])]

    
export const useRecupererListeMotorisationsAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeMotorisationsAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeMotorisationsAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeMotorisationsAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeMotorisationsAutos>, Error>(queryKey, () => recupererListeMotorisationsAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeNbPortesAutos = <Data = unknown>(
    params?: RecupererListeNbPortesAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? NombrePortesVehicule[] : Data>(
      {url: `/vehicules/autos/nombres_portes`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeNbPortesAutosQueryKey = (params?: RecupererListeNbPortesAutosParams,) => [`/vehicules/autos/nombres_portes`, ...(params ? [params]: [])]

    
export const useRecupererListeNbPortesAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeNbPortesAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeNbPortesAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeNbPortesAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeNbPortesAutos>, Error>(queryKey, () => recupererListeNbPortesAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const recupererListeTransmissionsAutos = <Data = unknown>(
    params?: RecupererListeTransmissionsAutosParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? TransmissionVehicule[] : Data>(
      {url: `/vehicules/autos/transmissions`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/referentiel/modeles_vehicules/',  ...options});
    }
  

export const getRecupererListeTransmissionsAutosQueryKey = (params?: RecupererListeTransmissionsAutosParams,) => [`/vehicules/autos/transmissions`, ...(params ? [params]: [])]

    
export const useRecupererListeTransmissionsAutos = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: RecupererListeTransmissionsAutosParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof recupererListeTransmissionsAutos>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getRecupererListeTransmissionsAutosQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof recupererListeTransmissionsAutos>, Error>(queryKey, () => recupererListeTransmissionsAutos<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}



export const getAutosMSW = () => [
rest.get('*/vehicules/autos', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/autos/carrosseries', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/autos/energies', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/autos/familles', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/autos/groupes_tarification', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/autos/marques', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/autos/motorisations', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/autos/nombres_portes', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/vehicules/autos/transmissions', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),]
