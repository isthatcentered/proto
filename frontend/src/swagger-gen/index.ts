import { UseQueryOptions, UseQueryResult } from "react-query"
import { AxiosResponse } from "axios"
import { Code, prop } from "../kit/helpers"
import { useMemo } from "react"
import { pipe } from "fp-ts/function"
import * as REMOTE from "../kit/remote"
import * as AR from "fp-ts/Array"
import { Nomenclature } from "./__gen/iard-devis-vehicules-v1/iard-devis-vehicules-v1.schemas"

export type GeneratedReactQuery<TParams, TError, TResult> = (
	params?: TParams,
	config?: { query?: UseQueryOptions<any, any, any> },
) => UseQueryResult<AxiosResponse<TResult>, TError>

export const useSelectData = <P, E, A extends any[]>(
	query: GeneratedReactQuery<P, E, A>,
	asCodes: (item: A[number]) => Code<string>,
	params: P | undefined,
) => {
	const queryResult = query(params, { query: { enabled: !!params } })

	return useMemo(
		() => pipe(REMOTE.fromQueryState(queryResult), REMOTE.map(AR.map(asCodes))),
		[queryResult.dataUpdatedAt],
	)
}

export const useNomenclature = (
	nomenclature: UseQueryResult<AxiosResponse<Nomenclature>, any>,
): REMOTE.Remote<any, Code<string>[]> =>
	useMemo(
		() =>
			pipe(
				nomenclature,
				REMOTE.fromQueryState,
				REMOTE.map(prop("detailNomenclature")),
				REMOTE.map(
					AR.map(code => ({
						value: code.code,
						label: code.libelle,
					})),
				),
			),
		[nomenclature.dataUpdatedAt],
	)
