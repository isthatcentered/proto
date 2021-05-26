import { UsageVehiculeStep } from "../contracts"
import { AsyncRadioGroup, CheckableRadio, CheckableRadioPlaceholder, DateInput, useForm, YesNo } from "../kit-2/forms"
import * as DATES from "../kit-2/dates"
import Placeholder, { Placeholders } from "../kit-2/placeholder"
import * as AR from "fp-ts/Array"
import React from "react"
import * as V from "../kit-2/validation"
import * as VEHICULES from "../queries/vehicules"
import * as REMOTE from "../kit-2/remote"
import { FormSubmitButton, FormTitle } from "../kit-2/shared"




const VehiculeSpecs = ( props: { numeroRepertoire: string, anneeMiseEnCirculation: number, onModify: () => void } ) => {
	const [ specs ] = VEHICULES.useSpecs( { params: props, active: true } )
	return REMOTE.isSuccess( specs ) ?
	       (
		       <div className="card rounded-md shadow border-2 border-gray-300 p-4">
			       <div className="mb-4">✅</div>
			       
			       <div className="uppercase mb-2 text-indigo-700 text-lg font-bold">
				       <span className="">{specs.value.libelleMarque}</span>&nbsp;
				       {specs.value.denominationCommercialeCourte}
			       </div>
			
			       <ul className="mb-2">
				       <li className="mb-1">
					       <span className="text-gray-600 font-medium">Carrosserie :&nbsp;</span>
					       <span className="font-bold">{specs.value.libelleCarrosserie}</span>
				       </li>
				
				       <li className="mb-1">
					       <span className="text-gray-600 font-medium">Energie :&nbsp;</span>
					       <span className="font-bold">{specs.value.libelleEnergie}</span>
				       </li>
				
				       <li className="mb-1">
					       <span className="text-gray-600 font-medium">Transmission :&nbsp;</span>
					       <span className="font-bold">{specs.value.libelleTransmission}</span>
				       </li>
				
				       <li className="mb-1">
					       <span className="text-gray-600 font-medium">Motorisation :&nbsp;</span>
					       <span className="font-bold">{specs.value.libelleMotorisation}</span>
				       </li>
				
				       <li className="mb-1">
							<span className="text-gray-600 font-medium">
								Année de première mise en circulation :&nbsp;
							</span>
					       <span className="font-bold">{props.anneeMiseEnCirculation}</span>
				       </li>
			       </ul>
			       <div className="flex">
				       <button
					       type="button"
					       onClick={props.onModify}
					       className="ml-auto font-bold text-sm text-gray-600"
				       >
					       Modifier
				       </button>
			       </div>
		       </div>
	       ) :
	       <Placeholder
		       className="h-48"
		       state="pending"
	       />
}

const schema = V.record( {
	codeUsageVehicule:       V.nonEmptyString,
	leasingOuCreditEnCours:  V.boolean,
	dateEffetContratDesiree: V.sequence( V.date, V.min( DATES.today() ) ),
} )

const UsageVehicule: UsageVehiculeStep = ( props ) => {
	const [ _values, form ] = useForm( {
		defaultValue: {
			dateEffetContratDesiree: new Date(),
		},
		schema,
		onSubmit:     props.onConfirm,
	} )
	const [ codesTypesUtilisationVehicule ] = VEHICULES.useCodesTypesUtilisation( { params: props, active: true } )
	
	return (
		<form {...form.props}>
			<FormTitle>Usage</FormTitle>
			<VehiculeSpecs
				numeroRepertoire={props.numeroRepertoire}
				anneeMiseEnCirculation={props.anneeMiseEnCirculationVehicule}
				onModify={() => console.log( "go back" )}
			/>
			<div className="pt-8" />
			<DateInput
				{...form.field( "dateEffetContratDesiree" )}
				min={DATES.today().toISOString()}
				className="mb-4"
				label="A partir de quelle date souhaitez-vous être assuré"
			/>
			
			<YesNo
				{...form.field( "leasingOuCreditEnCours" )}
				className="mb-4"
				label="Ce véhicule est-il financé à crédit (leasing, crédit auto) ?"
			/>
			{/* @todo: iplement using radio select */}
			<AsyncRadioGroup
				{...form.field( "codeUsageVehicule" )}
				className="mb-4"
				label="Pour quels types de déplacements ce véhicule est-il utilisé ?"
				value={form.field( "codeUsageVehicule" ).value}
				data={codesTypesUtilisationVehicule}
				placeholder={props => (
					<div className="grid gap-3">
						<Placeholders count={2}>
							{AR.map( index =>
								<CheckableRadioPlaceholder key={index} {...props}/>,
							)}
						</Placeholders>
					</div>)}
			>
				{( results, radioProps ) =>
					results.map( r =>
						(
							<CheckableRadio
								{...radioProps}
								key={r.value + r.label}
								value={r.value}
								className="mb-2"
							>
								{r.label}
							</CheckableRadio>
						),
					)
				}
			</AsyncRadioGroup>
			{form.isValid && (
				<FormSubmitButton disabled={form.isPending}>
					Étape suivante
				</FormSubmitButton>)}
		</form>)
}

export default UsageVehicule
