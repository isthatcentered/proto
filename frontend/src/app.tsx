import React, { useState } from "react"
import InitParcours from "./steps/init-parcours"
import IdentificationVehicule from "./steps/identification-vehicule"
import UsageVehicule from "./steps/usage-vehicule"
import IdentificationConducteur from "./steps/identification-conducteur"
import PasseConducteur from "./steps/passe-conducteur"
import { IdentificationConducteurStep, IdentificationVehiculeStep, InitParcoursStep, StepValues, UsageVehiculeStep } from "./contracts"



// Each step data is the accumulated data of all the previous steps
type IdentificationVehiculeData = StepValues<InitParcoursStep>
type UsageVehiculeData = IdentificationVehiculeData & StepValues<IdentificationVehiculeStep>
type IdentificationConducteurData = UsageVehiculeData & StepValues<UsageVehiculeStep>
type PasseAssureData = IdentificationConducteurData & StepValues<IdentificationConducteurStep>
type Step =
	 | { type: "init-parcours" }
	 | { type: "identification-vehicule", data: IdentificationVehiculeData }
	 | { type: "usage-vehicule", data: UsageVehiculeData }
	 | { type: "identification-conducteur", data: IdentificationConducteurData }
	 | { type: "passe-assure", data: PasseAssureData }
const stepOverride: Step | undefined =
				 // undefined
// { type: "init-parcours" }
// { type: "identification-vehicule", data: { codeTypeVehicule: CODE_TYPE_VEHICULE.AUTO } }
				 { type: "usage-vehicule", data: { numeroRepertoire: "1234" } as any }
// { type: "identification-conducteur", data: {  }as any }
// { type: "passe-assure", data: { codeExperienceConducteur: "04" } as any }

const initialState: Step = stepOverride || { type: "init-parcours" }

// @todo: allow going back to previous step
const App = () => {
	 const [ step, setNextStep ] = useState<Step>( initialState )
	 
	 return (
			<div
				 className="container mx-auto px-4 py-16 mb-12"
				 style={{ maxWidth: 500 }}
			>
				 {(() => {
						switch ( step.type ) {
							 case "init-parcours":
									return <InitParcours onConfirm={values => setNextStep( { type: "identification-vehicule", data: values } )}/>
							 case "identification-vehicule":
									// @todo: go to autos/bikes/campers according to given "typeVehicule"
									return <IdentificationVehicule
										 {...step.data}
										 onConfirm={values => setNextStep( { type: "usage-vehicule", data: { ...step.data, ...values } } )}
									/>
							 case "usage-vehicule":
									return <UsageVehicule
										 anneeMiseEnCirculationVehicule={step.data.anneeMiseEnCirculationVehicule}
										 numeroRepertoire={step.data.numeroRepertoire}
										 onConfirm={values => setNextStep( { type: "identification-conducteur", data: { ...step.data, ...values } } )}
									/>
							 case "identification-conducteur":
									return <IdentificationConducteur
										 numeroRepertoire={step.data.numeroRepertoire}
										 onConfirm={
												values => setNextStep( { type: "passe-assure", data: { ...step.data, ...values } } )
										 }
									/>
							 case "passe-assure":
									return <PasseConducteur {...step.data} onConfirm={values => console.log( "confirmed", values )}/>
						}
				 })()}
			</div>
	 )
}

export default App
