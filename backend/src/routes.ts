import { RequestHandler, Router } from "express"
import passOnRequest from "./pass-on-request"

// @todo: move to env variable
const BASE_DAIKOKU_URL = "http://intranet.api-recx.build-klif.cloud.maif.local:40054"

// Map received request to desired api call and return result
const proxyRoute: RequestHandler = (req, res) =>
	passOnRequest(BASE_DAIKOKU_URL, req)
		.then(({ status, data }) => res.status(status).send(data))
		.catch(err => {
			console.error(err)
			// Fetch api doesn't throw on error status codes, this will only throw on network failure or something really unexpected
			res.status(500).send({ message: "Erreur inattendue", details: err })
		})

const routes = Router()

routes.use("*", proxyRoute)

export default routes
