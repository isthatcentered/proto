/*
 * Generated by orval v5.3.2 🍺
 * Do not edit manually.
 * iard-devis-vehicules-v1
 * "Cette API permet de gÃ©rer le contexte iard-devis-vehicules."
 * OpenAPI spec version: 1.0.0-SNAPSHOT
 */
import {
  useMutation,
  UseMutationOptions
} from 'react-query'
import type {
  InfoEditionDevisBody
} from './iard-devis-vehicules-v1.schemas'
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

export const lancerCreationEditionDevisMail = <Data = unknown>(
    infoEditionDevisBody: InfoEditionDevisBody,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? unknown : Data>(
      {url: `/devis/editions/mail`, method: 'post',
      data: infoEditionDevisBody
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/iard/devis_vehicules/v1/',  ...options});
    }
  


    export const useLancerCreationEditionDevisMail = <
      Data extends unknown = unknown,
      Error extends unknown = unknown
    >(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof lancerCreationEditionDevisMail>, Error, {data: InfoEditionDevisBody}, unknown>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options || {}

      return useMutation<AsyncReturnType<typeof lancerCreationEditionDevisMail>, Error, {data: InfoEditionDevisBody}>((props) => {
        const {data} = props || {};

        return  lancerCreationEditionDevisMail<Data>(data,requestOptions)
      }, mutationOptions)
    }
    export const lancerCreationEditionDevisPdf = <Data = unknown>(
    infoEditionDevisBody: InfoEditionDevisBody,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? string : Data>(
      {url: `/devis/editions/pdf`, method: 'post',
      data: infoEditionDevisBody
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/iard/devis_vehicules/v1/',  ...options});
    }
  


    export const useLancerCreationEditionDevisPdf = <
      Data extends unknown = unknown,
      Error extends unknown = unknown
    >(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof lancerCreationEditionDevisPdf>, Error, {data: InfoEditionDevisBody}, unknown>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options || {}

      return useMutation<AsyncReturnType<typeof lancerCreationEditionDevisPdf>, Error, {data: InfoEditionDevisBody}>((props) => {
        const {data} = props || {};

        return  lancerCreationEditionDevisPdf<Data>(data,requestOptions)
      }, mutationOptions)
    }
    

export const getEditionsMSW = () => [
rest.post('*/devis/editions/mail', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.post('*/devis/editions/pdf', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),]
