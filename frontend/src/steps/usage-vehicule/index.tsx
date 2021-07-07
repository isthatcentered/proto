import { makeStep, UsageVehiculeStep } from "../../contracts"
import React from "react"
import * as REMOTE from "../../kit/remote"
import { FormSubmitButton, FormTitle, Grid } from "../../kit/shared"
import * as Y from "../../kit/yup"
import { CheckableRadio2, getConnect, Input2, RadioSelect, YesNo2 } from "../../kit/forms"
import * as DS from "../../kit/date-string"
import { pipe } from "fp-ts/lib/function"
import * as Q from "./queries"
import { VehiculeSpecs } from "./vehicule-specs"




const schema = Y.struct( {
	 codeUsageVehicule:       Y.nonEmptyString(),
	 leasingOuCreditEnCours:  Y.bool(),
	 dateEffetContratDesiree: pipe( Y.dateString(), Y.minDateString( DS.today(), "Ne peut démarrer avant aujourd'hui" ) ),
} )

const UsageVehicule = makeStep<UsageVehiculeStep, typeof schema>(
	 ( props ) => {
			const connect                       = getConnect( props )
			const codesTypesUtilisationVehicule = Q.useCodesUtilisationVehicule( props.numeroRepertoire )
			const pending                       = !REMOTE.isSuccess( codesTypesUtilisationVehicule )
			
			return (
				 <form onSubmit={props.handleSubmit}>
						<FormTitle>Usage</FormTitle>
						
						<VehiculeSpecs
							 numeroRepertoire={props.numeroRepertoire}
							 anneeMiseEnCirculation={props.anneeMiseEnCirculationVehicule}
							 onModify={() => console.log( "go back" )}
						/>
						
						<div className="pt-8"/>
						
						<Input2
							 {...connect( "dateEffetContratDesiree" )}
							 className="mb-8"
							 type="date"
							 min={DS.today()}
							 label="A partir de quelle date souhaitez-vous être assuré"
							 disabled={pending}
						/>
						
						
						<YesNo2
							 {...connect( "leasingOuCreditEnCours" )}
							 className="mb-8"
							 label="Ce véhicule est-il financé à crédit (leasing, crédit auto) ?"
							 disabled={pending}
						/>
						
						
						<RadioSelect
							 {...connect( "codeUsageVehicule" )}
							 className="mb-8"
							 data={codesTypesUtilisationVehicule}
							 label="Pour quels types de déplacements ce véhicule est-il utilisé ?"
						>
							 {( data, props ) =>
									<Grid>
										 {data.map( code =>
												<CheckableRadio2
													 {...props}
													 key={code.value}
													 value={code.value}
													 children={code.label}
												/>,
										 )}
									</Grid>}
						</RadioSelect>
						
						
						<FormSubmitButton disabled={props.isSubmitting}>
							 Étape suivante
						</FormSubmitButton>
				 </form>)
	 },
	 {
			mapPropsToValues: () => ({
				 codeUsageVehicule:       undefined!,
				 leasingOuCreditEnCours:  undefined!,
				 dateEffetContratDesiree: DS.today(),
			}),
			validationSchema: schema,
			handleSubmit:     ( values, { props } ) =>
													 props.onConfirm( {
															codeUsageVehicule:       values.codeUsageVehicule,
															leasingOuCreditEnCours:  values.leasingOuCreditEnCours === "true",
															dateEffetContratDesiree: DS.toDate( values.dateEffetContratDesiree ),
													 } ),
	 },
)

export default UsageVehicule
