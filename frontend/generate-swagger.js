require("dotenv").config()
const {generateApi} = require("swagger-typescript-api")
const path = require("path")

// @todo: fetch from remote with spec sanitizing (otherwise iard spec crashes) (somehow the hooks from swagger ts are only triggered when it's too late)
// @todo: default to local spec if fetch crashes
const schemas = [
    {
        // url: process.env["SWAGGER_URL_REF_MODELS_VEHICULES"],
        apiName: "referentiel-modeles-vehicules",
        spec: require("./swagger-specs-local/referentiel-modeles-vehicules.json")
    },
    {
        // url: process.env["SWAGGER_URL_IARD_DEVIS_VEHiCULES"],
        apiName: "iard-devis-vehicules",
        spec: require("./swagger-specs-local/iard-devis-vehicules-v1.json")
    },
]

run(schemas)

function run(schemas) {
    const sanitizedSchemas = schemas.map(schema => ({
        ...schema,
        ...(schema.spec ? {spec: sanitizeSpec(schema.spec)} : {}),
    }))

    return Promise.all(sanitizedSchemas.map(generate))
}

function sanitizeSpec(spec) {
    return {
        ...spec,
        info: {
            ...spec.info,
            contact: undefined, // Those tend to not contain the right values and crash the generation
            license: undefined, // Those tend to not contain the right values and crash the generation
            termsOfService: undefined, // Those tend to not contain the right values and crash the generation
            version: undefined, // Those tend to not contain the right values and crash the generation
        },
    }
}

// @todo: fetch & sanitize json manually
function generate({apiName, ...schema}) {
    /**
     * Docs:
     * - https://github.com/acacode/swagger-typescript-api
     *
     * Same call via command line:
     * - npx sta -p http://.../referentiel/modeles_vehicules/v2/api-docs -o __gen -r --union-enums --clean-output --extract-request-params --module-name-first-tag --modular --single-http-client
     */
    return generateApi({
        name: "index",
        ...schema,
        output: path.resolve(
            process.cwd(),
            `./src/swagger/__generated__/${apiName}`,
        ),
        generateRouteTypes: false,
        extractRequestParams: true,
        singleHttpClient: true,
        cleanOutput: true,
        moduleNameFirstTag: true,
        generateUnionEnums: true,
        modular: false,
    })
}

