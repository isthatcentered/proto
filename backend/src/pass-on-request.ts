import { Request } from "express"
import { URL } from "url"
import fetch, { RequestInit } from "node-fetch"
import config from "./config"

const makeEndpointPath = (req: Request): string =>
	req.originalUrl.replace(config.apiRoot, "") // "/api/referentiel/modeles_veh..." -> "/referentiel/modeles_veh..."

const makeUrl = (root: string, path: string): string =>
	new URL(path, root).toString()

const makeBodyForMehtod = <T extends Record<any, any>>(
	method: string,
	body: T,
): string | undefined => (method.toLowerCase() === "get" ? undefined : JSON.stringify(body))

const fetchAndParse = <T>(
	url: string,
	config: RequestInit,
): Promise<{ data: T; status: number }> =>
	fetch(url, config).then(res =>
		res.json().then(data => ({ status: res.status, data })),
	)

const passOnRequest = async (
	rootUrl: string,
	req: Request,
): Promise<{ status: number; data: any }> => {
	const { method } = req
	const url = makeUrl(rootUrl, makeEndpointPath(req))
	const body = makeBodyForMehtod(req.method, req.body)
	const headers = {
		accept: "application/json",
		"Content-Type": req.header("Content-Type") || "application/json;charset=UTF-8",
	}

	console.log("/**** PROXYING REQUEST ****/")
	console.log({ query: req.query, body: req.body, url, headers })

	return fetchAndParse(url, { method, body, headers }).catch(err => {
		console.log("!!!! PROXYING FAILURE !!!!")
		console.error(err)
		throw err // not our job to decide what to do with error
	})
}

export default passOnRequest
