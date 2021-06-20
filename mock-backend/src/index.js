const { createMockMiddleware } = require( "openapi-mock-express-middleware" )
const converter = require( "swagger2openapi" )
const { writeFileSync } = require( "fs" )
const path = require( "path" )
const express = require( "express" )


// The mock server only supports v3
const asV3Spec = ( { specsPath, outputPath } ) => ( fileName ) =>
	new Promise( ( res, rej ) => {
		// https://github.com/Mermade/oas-kit/blob/main/packages/swagger2openapi/README.md
		converter.convertFile(
			path.join( specsPath, fileName ),
			{ direct: true }, // Only return the transformed spec
			( err, specV3 ) => {
				if ( err )
					rej( err )
				res( specV3 )
			},
		)
	} )
		.then( spec => {
			writeFileSync( path.join( outputPath, fileName ), JSON.stringify( spec ) )
			console.log( `Wrote spec [${fileName}] as open api spec at [${outputPath}/${fileName}]` )
		} )

const createMockRoutes = ( { specsPath, app } ) => ( { root, fileName } ) =>
	app.use(
		`/api${root}`,
		// https://www.npmjs.com/package/openapi-mock-express-middleware
		createMockMiddleware( {
			spec: path.join( specsPath, fileName ),
		} ),
	)

const makeApp = ( { v2SpecsPath, v3SpecsPath, specs } ) => {
	const app = express()
	const createSpecRoutes = createMockRoutes( { specsPath: v3SpecsPath, app } )
	const genV3Spec = asV3Spec( { specsPath: v2SpecsPath, outputPath: v3SpecsPath } )
	
	const transformSpecsPromise = Promise.all(
		specs.map( spec => genV3Spec( spec.fileName ) ),
	)
	
	return transformSpecsPromise.then( () => {
		specs.forEach( createSpecRoutes )
		app.listen( 1234, () => console.log( "Server listening on port 1234" ) )
	} )
}


const V2_SPECS_PATH = path.join( __dirname, `../../swagger-specs-local` )
const V3_SPECS_PATH = path.join( __dirname, `./__gen` )
const specs = [
	{
		root: "/referentiel/modeles_vehicules",
		fileName: "referentiel-modeles-vehicules.json",
	},
	{
		root: "/iard/devis_vehicules/v1",
		fileName: "iard-devis-vehicules-v1.json",
	},
]


makeApp( { specs, v3SpecsPath: V3_SPECS_PATH, v2SpecsPath: V2_SPECS_PATH } )
