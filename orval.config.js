const fs = require( "fs" )
const { join } = require( "path" )
const iardDevisVehiculesSpec = require( "./swagger-specs-local/iard-devis-vehicules-v1.json" )
const referentielsModelesVehiculesSpec = require( "./swagger-specs-local/referentiel-modeles-vehicules.json" )

const GEN_PATH = "./frontend/src/__gen"
const SPECS_PATH = "./swagger-specs-local"
const SPECS = [
	{
		fileName: "referentiel-modeles-vehicules",
		baseUrl: referentielsModelesVehiculesSpec.basePath,
	},
	{
		fileName: "iard-devis-vehicules-v1",
		baseUrl: iardDevisVehiculesSpec.basePath,
	},
]

// Cleanup previous gen
fs.rmdirSync( GEN_PATH, { recursive: true } )


// https://orval.dev/reference/configuration/overview
module.exports = SPECS.reduce( ( acc, { fileName, baseUrl } ) => ({
	...acc,
	[ fileName ]: {
		input: {
			target: join( SPECS_PATH, fileName + ".json" ),
			validation: false,
		},
		output: {
			target: join( GEN_PATH, fileName, fileName + ".ts" ),
			client: "react-query",
			mode: "tags",
			mock: true,
			override: {
				requestOptions: { baseURL: "/api" + baseUrl },
			},
		},
	},
}), {} )

