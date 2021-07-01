/*
 * Generated by orval v5.3.2 🍺
 * Do not edit manually.
 * iard-devis-vehicules-v1
 * "Cette API permet de gÃ©rer le contexte iard-devis-vehicules."
 * OpenAPI spec version: 1.0.0-SNAPSHOT
 */
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions
} from 'react-query'
import type {
  SolutionsEligiblesPresentation,
  SolutionsEligiblesGetParams,
  CreationRisqueVehiculeConducteurAAssurerSynthese,
  RisqueVehiculeConducteurAAssurer
} from './iard-devis-vehicules-v1.schemas'
import {
  rest
} from 'msw'
import faker from 'faker'
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

export const solutionsEligiblesGet = <Data = unknown>(
    params?: SolutionsEligiblesGetParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? SolutionsEligiblesPresentation : Data>(
      {url: `/solutions_eligibles`, method: 'get',
        params,
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/iard/devis_vehicules/v1/',  ...options});
    }
  

export const getSolutionsEligiblesGetQueryKey = (params?: SolutionsEligiblesGetParams,) => [`/solutions_eligibles`, ...(params ? [params]: [])]

    
export const useSolutionsEligiblesGet = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
 params?: SolutionsEligiblesGetParams, options?: { query?:UseQueryOptions<AsyncReturnType<typeof solutionsEligiblesGet>, Error>, request?: SecondParameter<typeof customInstance>}

  ) => {
  const queryKey = getSolutionsEligiblesGetQueryKey(params);
  const {query: queryOptions, request: requestOptions} = options || {}

  const query = useQuery<AsyncReturnType<typeof solutionsEligiblesGet>, Error>(queryKey, () => solutionsEligiblesGet<Data>(params, requestOptions), queryOptions )

  return {
    queryKey,
    ...query
  }
}

export const creerRisqueAAssurerSocPotentiel = <Data = unknown>(
    risqueVehiculeConducteurAAssurer: RisqueVehiculeConducteurAAssurer,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<Data extends unknown ? CreationRisqueVehiculeConducteurAAssurerSynthese : Data>(
      {url: `/vehicule_conducteur_a_assurer`, method: 'post',
      data: risqueVehiculeConducteurAAssurer
    },
       // eslint-disable-next-line
// @ts-ignore
 { baseURL: '/api/iard/devis_vehicules/v1/',  ...options});
    }
  


    export const useCreerRisqueAAssurerSocPotentiel = <
      Data extends unknown = unknown,
      Error extends unknown = unknown
    >(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof creerRisqueAAssurerSocPotentiel>, Error, {data: RisqueVehiculeConducteurAAssurer}, unknown>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options || {}

      return useMutation<AsyncReturnType<typeof creerRisqueAAssurerSocPotentiel>, Error, {data: RisqueVehiculeConducteurAAssurer}>((props) => {
        const {data} = props || {};

        return  creerRisqueAAssurerSocPotentiel<Data>(data,requestOptions)
      }, mutationOptions)
    }
    

export const getSolutionsEligiblesGetMock = () => ({solutionsEligibles: [...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({formuleReference: {codeFormule: faker.random.word(), libelleFormule: faker.random.word(), codeNiveauGarantie: faker.random.word(), libelleNiveauGarantie: faker.random.word(), codeNiveauFranchise: faker.random.word(), libelleNiveauFranchise: faker.random.word(), montantFranchiseDommage: faker.helpers.randomize([faker.datatype.number(), undefined]), options: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeOption: faker.random.word(), libelleOption: faker.random.word(), montantPlafondOption: faker.helpers.randomize([faker.datatype.number(), undefined])})), undefined])}, codeProduit: faker.random.word(), libelleProduit: faker.random.word()})), presentationSolutions: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeFormule: faker.random.word(), libelleFormule: faker.random.word(), franchisesEligibles: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeNiveauFranchise: faker.random.word(), libelleNiveauFranchise: faker.random.word(), montantFranchiseDommage: faker.datatype.number()})), undefined]), options: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeOption: faker.random.word(), libelleOption: faker.random.word(), montantPlafondOption: faker.helpers.randomize([faker.datatype.number(), undefined]), optionsIncluses: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeOption: faker.random.word(), libelleOption: faker.random.word(), montantPlafondOption: faker.helpers.randomize([faker.datatype.number(), undefined])})), undefined]), optionsExclues: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeOption: faker.random.word(), libelleOption: faker.random.word(), montantPlafondOption: faker.helpers.randomize([faker.datatype.number(), undefined])})), undefined])})), undefined])})), undefined])})

export const getCreerRisqueAAssurerSocPotentielMock = () => ({AcceptationDefinitive: faker.helpers.randomize([{codeAcceptation: faker.random.word(), libelleAcceptation: faker.random.word(), justifications: faker.helpers.randomize([[...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({codeJustificationRisque: faker.helpers.randomize([faker.random.word(), undefined]), libelleJustificationRisque: faker.helpers.randomize([faker.random.word(), undefined])})), undefined])}, undefined]), idRisqueVehiculeConducteurAAssurer: faker.datatype.number()})

export const getRisqueÀAssurerMSW = () => [
rest.get('*/solutions_eligibles', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getSolutionsEligiblesGetMock()),
        )
      }),rest.post('*/vehicule_conducteur_a_assurer', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getCreerRisqueAAssurerSocPotentielMock()),
        )
      }),]
