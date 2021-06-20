const fs = require( "fs" )

// https://orval.dev/reference/configuration/overview
const frontendGenPath = "./frontend/src/__gen"

// Cleanup previous gen
fs.rmdirSync( frontendGenPath, { recursive: true } )


module.exports = {
	"referentiel-modeles-vehicules": {
		input: {
			target: "./swagger-specs-local/referentiel-modeles-vehicules.json",
			validation: false,
		},
		output: {
			target: frontendGenPath + "/referentiel-modeles-vehicules/referentiel-modeles-vehicules.ts",
			client: "react-query",
			mode: "tags",
			mock: true,
			override: {
				requestOptions: {  baseURL: "/api/referentiel/modeles_vehicules" },
			}
		},
	},
}
