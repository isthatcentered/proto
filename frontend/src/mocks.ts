import {MockedRequest, rest, RestHandler, setupWorker} from "msw"
import {
    recupererListeAutos,
    recupererListeCarrosseriesAutos,
    recupererListeEnergiesAutos,
    recupererListeFamillesAutos,
    recupererListeMarquesAutos,
    recupererListeMotorisationsAutos,
    recupererListeNbPortesAutos,
    recupererListeTransmissionsAutos
} from "./__gen/referentiel-modeles-vehicules/autos"
import {getVehiculesMSW} from "./__gen/referentiel-modeles-vehicules/vehicules"
import {getMotosQuadsMSW} from "./__gen/referentiel-modeles-vehicules/motos-quads"
import {AxiosResponse} from "axios"
import {Mask} from "msw/lib/types/setupWorker/glossary"
import {
    getRecupererValeursOrigineSocietaireMock,
    getRecupererValeursResponsabiliteSinistreMock,
    getRecupererValeursTypeConducteurMock,
    recupererValeursExperienceConducteur,
    recupererValeursTypePermis,
    recupererValeursUsage,
} from "./__gen/iard-devis-vehicules-v1/nomenclatures"
import {
    jouerAcceptationProspect,
    jouerAcceptationVehicule,
    recupererDatesAntecedentsSinistralite
} from "./__gen/iard-devis-vehicules-v1/acceptation-risque-véhicule";



/**
 * See
 * - https://orval.dev
 * - https://github.com/anymaniax/orval/blob/master/samples/react-app-with-react-query/src/mock.ts
 * - https://mswjs.io/docs/getting-started/integrate/browser
 */

const mocked = <TResolve>(method: "get" | "post" | "put", mask: Mask, respond: TResolve, _blueprint: (params: any) => Promise<AxiosResponse<TResolve>>): RestHandler<MockedRequest<TResolve>> =>
    rest[method](mask, (req, res, ctx) =>
        res(
            ctx.delay(1000),
            ctx.status(200, "Mocked status"),
            ctx.json(respond),
        ))


const mockedGet = <TResolve>(mask: Mask, respond: TResolve, _blueprint: (params: any) => Promise<AxiosResponse<TResolve>>): RestHandler<MockedRequest<TResolve>> =>
    mocked("get", mask, respond, _blueprint)

const mockedPost = <TResolve>(mask: Mask, respond: TResolve, _blueprint: (params: any) => Promise<AxiosResponse<TResolve>>): RestHandler<MockedRequest<TResolve>> =>
    mocked("post", mask, respond, _blueprint)


// ---------------------------------------------------
// REFERENTIEL VEHICULES MOCKS
// ---------------------------------------------------
const getIardReferentielVehiculesAutosMocks = () => [
    mockedGet(
        "*/vehicules/autos/marques",
        [
            {codeMarque: "683", libelleMarque: "RENAULT"},
            {codeMarque: "391", libelleMarque: "VOLKSWAGEN"},
            {codeMarque: "212", libelleMarque: "AUDI"},
            {codeMarque: "66", libelleMarque: "BMW"},
            {codeMarque: "219", libelleMarque: "PEUGEOT"},
            {codeMarque: "413", libelleMarque: "MERCEDES"},
            {codeMarque: "681", libelleMarque: "FORD"},
            {codeMarque: "1001", libelleMarque: "CITROEN"},
            {codeMarque: "920", libelleMarque: "OPEL"},
            {codeMarque: "761", libelleMarque: "VOLVO"},
            {codeMarque: "93", libelleMarque: "FIAT"},
            {codeMarque: "856", libelleMarque: "SEAT"},
            {codeMarque: "449", libelleMarque: "SKODA"},
            {codeMarque: "881", libelleMarque: "TOYOTA"},
            {codeMarque: "504", libelleMarque: "NISSAN"},
        ],
        recupererListeMarquesAutos,
    ),
    mockedGet(
        "*/vehicules/autos",
        [
            {
                "numeroRepertoire"             : "56230",
                "denominationCommerciale"      : "THALIA SYMBOL 1.5 DCI 70 CH",
                "denominationCommercialeLongue": "THALIA SYMBOL 1.5 DCI 70 CH",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/56230"
            },
            {
                "numeroRepertoire"             : "B2890",
                "denominationCommerciale"      : "TRAFIC COMBI 1.6 DCI 145 CH L2 INTENS",
                "denominationCommercialeLongue": "TRAFIC COMBI 1.6 DCI 145 CH",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B2890"
            },
            {
                "numeroRepertoire"             : "B2892",
                "denominationCommerciale"      : "TRAFIC COMBI 1.6 DCI 145 CH L1 INTENS",
                "denominationCommercialeLongue": "TRAFIC COMBI 1.6 DCI 145 CH",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B2892"
            },
            {
                "numeroRepertoire"             : "B6742",
                "denominationCommerciale"      : "MAXITY 3.0 DXI 130 CH L3 3T5",
                "denominationCommercialeLongue": "MAXITY 3.0 DXI 130 CH L3 3T5",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B6742"
            },
            {
                "numeroRepertoire"             : "B6898",
                "denominationCommerciale"      : "MASTER COMBI 2.3 DCI 130 CH",
                "denominationCommercialeLongue": "MASTER COMBI 2.3 DCI 130 CH",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B6898"
            },
            {
                "numeroRepertoire"             : "B7619",
                "denominationCommerciale"      : "ALASKAN 2.0 DCI 160 CH ZEN",
                "denominationCommercialeLongue": "ALASKAN 2.0 DCI 160 CH ZEN",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B7619"
            },
            {
                "numeroRepertoire"             : "B7618",
                "denominationCommerciale"      : "ALASKAN 2.0 DCI 160 CH LIFE",
                "denominationCommercialeLongue": "ALASKAN 2.0 DCI 160 CH LIFE",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B7618"
            },
            {
                "numeroRepertoire"             : "B7620",
                "denominationCommerciale"      : "ALASKAN 2.0 DCI 190 CH ZEN",
                "denominationCommercialeLongue": "ALASKAN 2.0 DCI 190 CH ZEN",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B7620"
            },
            {
                "numeroRepertoire"             : "B7622",
                "denominationCommerciale"      : "ALASKAN 2.0 DCI 190 CH INTENS AUTO",
                "denominationCommercialeLongue": "ALASKAN 2.0 DCI 190 CH INTENS AUTO",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B7622"
            },
            {
                "numeroRepertoire"             : "B7623",
                "denominationCommerciale"      : "ALASKAN 2.0 DCI 190 CH ZEN AUTO",
                "denominationCommercialeLongue": "ALASKAN 2.0 DCI 190 CH ZEN AUTO",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B7623"
            },
            {
                "numeroRepertoire"             : "B7621",
                "denominationCommerciale"      : "ALASKAN 2.0 DCI 190 CH INTENS",
                "denominationCommercialeLongue": "ALASKAN 2.0 DCI 190 CH INTENS",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/B7621"
            },
            {
                "numeroRepertoire"             : "D8023",
                "denominationCommerciale"      : "CAPTUR II 1.5 BLUEDCI 95 CH BUSINESS",
                "denominationCommercialeLongue": "CAPTUR II 1.5 BLUEDCI 95 CH",
                "lienDetailVehicule"           : "/referentiel/modeles_vehicules/v1/vehicules/D8023"
            },
        ],
        recupererListeAutos,
    ),
    mockedGet(
        "*/vehicules/autos/energies",
        [
            {"codeEnergie": "2", "libelleEnergie": "Diesel"}, {"codeEnergie": "1", "libelleEnergie": "Essence"},
            {"codeEnergie": "4", "libelleEnergie": "Electricité"}, {"codeEnergie": "5", "libelleEnergie": "Hybride essence"},
            {"codeEnergie": "3", "libelleEnergie": "G.P.L."}, {"codeEnergie": "7", "libelleEnergie": "E85 / Super éthanol"}
        ],
        recupererListeEnergiesAutos
    ),
    mockedGet(
        "*/vehicules/autos/familles",
        [
            {"codeFamille": "2554", "libelleFamille": "MEGANE"}, {"codeFamille": "2553", "libelleFamille": "MASTER"}, {
            "codeFamille"   : "2587",
            "libelleFamille": "TRAFIC"
        }, {"codeFamille": "2535", "libelleFamille": "CLIO"}, {"codeFamille": "100000007829", "libelleFamille": "CAPTUR"}, {
            "codeFamille"   : "2595",
            "libelleFamille": "GRAND SCENIC"
        }, {"codeFamille": "2594", "libelleFamille": "SCENIC"}, {
            "codeFamille"   : "100000022173",
            "libelleFamille": "KADJAR"
        }, {"codeFamille": "100000024053", "libelleFamille": "TALISMAN"}, {
            "codeFamille"   : "2589",
            "libelleFamille": "TWINGO"
        }, {"codeFamille": "100000006027", "libelleFamille": "ZOE"}, {
            "codeFamille"   : "2549",
            "libelleFamille": "KANGOO"
        }, {"codeFamille": "100000037265", "libelleFamille": "TRAFIC NAVETTE"}, {
            "codeFamille"   : "100000001231",
            "libelleFamille": "KOLEOS"
        }, {"codeFamille": "2539", "libelleFamille": "ESPACE"}, {"codeFamille": "100000031417", "libelleFamille": "ALASKAN"}, {
            "codeFamille"   : "2537",
            "libelleFamille": "DIVERS"
        }, {"codeFamille": "2586", "libelleFamille": "THALIA"}, {"codeFamille": "100000000887", "libelleFamille": "MAXITY"}, {
            "codeFamille"   : "2592",
            "libelleFamille": "VOLTIGEUR"
        },
            {"codeFamille": "100000021234", "libelleFamille": "FORMULE EUROPE"}
        ],
        recupererListeFamillesAutos,
    ),
    mockedGet("*/vehicules/autos/carrosseries",
              [{"codeCarrosserie": "01", "libelleCarrosserie": "Berline"}, {"codeCarrosserie": "20", "libelleCarrosserie": "Utilitaire"},
               {"codeCarrosserie": "11", "libelleCarrosserie": "SUV"}, {"codeCarrosserie": "10", "libelleCarrosserie": "Monospace compact"},
               {"codeCarrosserie": "03", "libelleCarrosserie": "Break"}, {"codeCarrosserie": "14", "libelleCarrosserie": "Minibus-combi"},
               {"codeCarrosserie": "07", "libelleCarrosserie": "Monospace"}, {"codeCarrosserie": "08", "libelleCarrosserie": "Ludospace"},
               {"codeCarrosserie": "12", "libelleCarrosserie": "Pick-up"}, {"codeCarrosserie": "04", "libelleCarrosserie": "Commerciale"}],
              recupererListeCarrosseriesAutos
    ),

    mockedGet("*/vehicules/autos/motorisations",
              [{"libelleMotorisation": "1.3 TCE 140 CH"}, {"libelleMotorisation": "1.5 BLUE DCI 115 CH"}, {"libelleMotorisation": "1.3 TCE 160 CH"},
               {"libelleMotorisation": "1.7 BLUE DCI 150 CH"}, {"libelleMotorisation": "2.0 DCI 170 CH"}, {"libelleMotorisation": "2.0 DCI 145 CH"},
               {"libelleMotorisation": "1.7 BLUE DCI 120 CH"}, {"libelleMotorisation": "1.3 TCE 115 CH"}, {"libelleMotorisation": "2.3 DCI 180 CH"},
               {"libelleMotorisation": "1.5 BLUEDCI 115 CH"}, {"libelleMotorisation": "1.0 TCE 100 CH"}, {"libelleMotorisation": "2.3 DCI 170 CH"},
               {"libelleMotorisation": "1.3 TCE 130 CH"}, {"libelleMotorisation": "2.3 DCI 135 CH"}, {"libelleMotorisation": "1.0 TCE 90 CH"},
               {"libelleMotorisation": "1.5 BLUE DCI 95 CH"}, {"libelleMotorisation": "1.0 SCE 65 CH"}, {"libelleMotorisation": "2.3 DCI 150 CH"},
               {"libelleMotorisation": "1.7 BLUEDCI 150 CH"}, {"libelleMotorisation": "Z.E R110"}, {"libelleMotorisation": "1.8 TCE 225 CH"},
               {"libelleMotorisation": "2.0 BLUE DCI 200 CH"}, {"libelleMotorisation": "0.9 TCE 95 CH"}, {"libelleMotorisation": "1.6 DCI 95 CH"},
               {"libelleMotorisation": "2.0 BLUE DCI 160 CH"}, {"libelleMotorisation": "1.0 SCE 75 CH"}, {"libelleMotorisation": "2.0 DCI 120 CH"},
               {"libelleMotorisation": "Z.E R135"}, {"libelleMotorisation": "1.3 TCE 150 CH"}, {"libelleMotorisation": "1.6 DCI 145 CH"},
               {"libelleMotorisation": "1.8 TCE 300 CH"}, {"libelleMotorisation": "2.3 DCI 165 CH"}, {"libelleMotorisation": "E-TECH 140 CH"},
               {"libelleMotorisation": "E-TECH PLUG-IN 160 CH"}, {"libelleMotorisation": "1.0 TCE GPL 100 CH"},
               {"libelleMotorisation": "0.9 TCE 90 CH"}, {"libelleMotorisation": "1.6 DCI 125 CH"}, {"libelleMotorisation": "2.0 BLUEDCI 160 CH"},
               {"libelleMotorisation": "2.0 BLUEDCI 190 CH"}, {"libelleMotorisation": "1.5 BLUE DCI 80 CH"},
               {"libelleMotorisation": "2.3 DCI 130 CH"},
               {"libelleMotorisation": "2.3 DCI 145 CH"}, {"libelleMotorisation": "1.5 BLUEDCI 85 CH"}, {"libelleMotorisation": "1.5 BLUEDCI 95 CH"},
               {"libelleMotorisation": "1.6 DCI 120 CH"}, {"libelleMotorisation": "2.0 DCI 190 CH"}, {"libelleMotorisation": "ESSENCE"},
               {"libelleMotorisation": "Z.E 60 CH"}, {"libelleMotorisation": "Z.E ELECTRIQUE 81 CH"}, {"libelleMotorisation": "1.5 DCI 90 CH"},
               {"libelleMotorisation": "1.8 TCE 280 CH"}, {"libelleMotorisation": "Z.E R90"}, {"libelleMotorisation": "0.9 TCE 75 CH"},
               {"libelleMotorisation": "1.3 TCE 155 CH"}, {"libelleMotorisation": "1.3 TCE GPL 140 CH"}, {"libelleMotorisation": "2.0 DCI 160 CH"},
               {"libelleMotorisation": "0.9 TCE E85 90 CH"}, {"libelleMotorisation": "1.0 TCE E85 100 CH"}, {"libelleMotorisation": "1.2 16V 75 CH"},
               {"libelleMotorisation": "1.2 TCE GPL 130 CH"}, {"libelleMotorisation": "1.3 TCE E85 140 CH"},
               {"libelleMotorisation": "1.3 TCE E85 150 CH"}, {"libelleMotorisation": "1.3 TCE GPL 130 CH"},
               {"libelleMotorisation": "1.5 BLUEHDI 85 CH"}, {"libelleMotorisation": "1.5 DCI 70 CH"}, {"libelleMotorisation": "1.6 105 CH"},
               {"libelleMotorisation": "1.6 SCE 115 CH"}, {"libelleMotorisation": "1.6 SCE GPL 115 CH"}, {"libelleMotorisation": "1.7 DCI 150 CH"},
               {"libelleMotorisation": "2.0 150 CH"}, {"libelleMotorisation": "2.1 65 CH"}, {"libelleMotorisation": "2.5 DXI 120 CH"},
               {"libelleMotorisation": "2.5 DXI 140 CH"}, {"libelleMotorisation": "3.0 DXI 130 CH"}, {"libelleMotorisation": "Z.E."}],
              recupererListeMotorisationsAutos
    ),

    mockedGet("*/vehicules/autos/transmissions",
              [{"codeTransmission": "1", "libelleTransmission": "Boîte manuelle"},
               {"codeTransmission": "3", "libelleTransmission": "Boîte robotisée"},
               {"codeTransmission": "2", "libelleTransmission": "Boîte automatique"},
               {"codeTransmission": "4", "libelleTransmission": "Boîte manuelle/intégrale"},
               {"codeTransmission": "6", "libelleTransmission": "Boîte robotisée/intégrale"},
               {"codeTransmission": "5", "libelleTransmission": "Boîte automatique/intégrale"}],
              recupererListeTransmissionsAutos
    ),

    mockedGet("*/vehicules/autos/nombres_portes",
              [{"nombrePortes": "5"}, {"nombrePortes": "0"}, {"nombrePortes": "4"}],
              recupererListeNbPortesAutos
    ),

    rest.get("*/vehicules/autos/groupes_tarification", (req, res, ctx) => {
        return res(
            ctx.delay(1000),
            ctx.status(200, "Mocked status"),
        )
    })

]

// ---------------------------------------------------
// DEVIS VEHICULES MOCKS
// ---------------------------------------------------
const getIardDevisVehiculesNomenclaturesMocks = () => [
    mockedGet("*/experiences_conducteur",
              {
                  "nomNomenclature"   : "codeExperienceConducteur",
                  "detailNomenclature": [{"code": " ", "libelle": "Sans information"}, {
                      "code"   : "01",
                      "libelle": "Conducteur Principal MAIF (PP)"
                  }, {"code": "02", "libelle": "Conducteur Occasionnel MAIF (PP)"}, {
                      "code"   : "03",
                      "libelle": "Passé autre société (PP et A&C)"
                  }, {"code": "04", "libelle": "Sans Expérience (PP et A&C)"}, {"code": "05", "libelle": "MAIF A&C"}, {
                      "code"   : "06",
                      "libelle": "Enfant Conducteur Déclaré"
                  }]
              },
              recupererValeursExperienceConducteur
    ),
    rest.get("*/passe_autre_assurance", (req, res, ctx) => {
        return res(
            ctx.delay(1000),
            ctx.status(200, "Mocked status"),
            ctx.json(getRecupererValeursOrigineSocietaireMock()),
        )
    }),
    rest.get("*/responsabilites_sinistre", (req, res, ctx) => {
        return res(
            ctx.delay(1000),
            ctx.status(200, "Mocked status"),
            ctx.json(getRecupererValeursResponsabiliteSinistreMock()),
        )
    }),
    rest.get("*/types_conducteur", (req, res, ctx) => {
        return res(
            ctx.delay(1000),
            ctx.status(200, "Mocked status"),
            ctx.json(getRecupererValeursTypeConducteurMock()),
        )
    }),
    mockedGet(
        "*/types_permis/vehicule/:numeroRepertoire",
        {
            "nomNomenclature"   : "codeTypePermis",
            "detailNomenclature": [
                {"code": "B", "libelle": "4 roues assujettis (B,BE)"},
            ],
        },
        recupererValeursTypePermis,
    ),
    mockedGet(
        "*/usages/vehicule/:numeroRepertoire",
        {
            "nomNomenclature"   : "codeUsage",
            "detailNomenclature": [
                {"code": "01", "libelle": "Usage privé et professionnel"},
                {"code": "02", "libelle": "Usage privé et professionnel occasionnel"},
            ],
        },
        recupererValeursUsage,
    ),
]

export const getIardDevisVehiculesAcceptationMocks = () => [
    mockedGet('*/antecedents_sinistralite/dates', <any>{}, recupererDatesAntecedentsSinistralite),
    mockedPost('*/jouer_acceptation/prospect', <any>{}, jouerAcceptationProspect),
    // mockedPost('*/jouer_acceptation/societaire/:referenceSocietaire', <any>{}, jouerAcceptationSocietaire),
    mockedPost(
        '*/jouer_acceptation/vehicule',
        {
            "codeAcceptation"   : "01",
            "libelleAcceptation": "Accepté",
            "justifications"    : []
        },
        jouerAcceptationVehicule
    )
]
const handlers = [
    ...getIardReferentielVehiculesAutosMocks(),
    ...getIardDevisVehiculesAcceptationMocks(),
    ...getIardDevisVehiculesNomenclaturesMocks(),
    ...getVehiculesMSW(),
    ...getMotosQuadsMSW(),
]

export const worker = setupWorker(...handlers)
