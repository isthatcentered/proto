/*
 * Generated by orval v5.3.2 🍺
 * Do not edit manually.
 * iard-devis-vehicules-v1
 * "Cette API permet de gÃ©rer le contexte iard-devis-vehicules."
 * OpenAPI spec version: 1.0.0-SNAPSHOT
 */
import axios,{
  AxiosRequestConfig
} from 'axios'
import {
  useMutation,
  UseMutationOptions
} from 'react-query'
import type {
  CalculCrmRisqueVehicule,
  InfoCalculCrmProspect
} from './iard-devis-vehicules-v1.schemas'
import {
  rest
} from 'msw'
import faker from 'faker'


type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


export const calculCrmProspect = <Data = unknown>(
    infoCalculCrmProspect: InfoCalculCrmProspect, options?: AxiosRequestConfig
 ) => {
    return axios.post<Data extends unknown ? CalculCrmRisqueVehicule : Data>(
      `/calculer_coefficient_bonus_malus`,
      infoCalculCrmProspect,options
    );
  }



    export const useCalculCrmProspect = <
      Data extends unknown = unknown,
      Error extends unknown = unknown
    >(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof calculCrmProspect>, Error, {data: InfoCalculCrmProspect}, unknown>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options || {}

      return useMutation<AsyncReturnType<typeof calculCrmProspect>, Error, {data: InfoCalculCrmProspect}>((props) => {
        const {data} = props || {};

        return  calculCrmProspect<Data>(data,axiosOptions)
      }, mutationOptions)
    }
    

export const getCalculCrmProspectMock = () => ({coefficientBonusMalusRetenu: faker.datatype.number(), coefficientBonusMalusRetenuAnneeSuivante: faker.helpers.randomize([faker.datatype.number(), undefined])})

export const getCalculCrmMSW = () => [
rest.post('*/calculer_coefficient_bonus_malus', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getCalculCrmProspectMock()),
        )
      }),]