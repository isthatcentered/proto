import * as V from "../kit-2/validation"
import * as DATES from "../kit-2/dates"
import { IdentificationConducteurStep } from "../contracts"
import * as DRIVERS from "../queries/drivers"
import * as VEHICULES from "../queries/vehicules"
import { AsyncRadioGroup, ButtonRadioSelect, CheckableRadio, CheckableRadioPlaceholder, DateInput, TextInput, useForm } from "../kit-2/forms"
import { FormSubmitButton, FormTitle } from "../kit-2/shared"
import { Placeholders } from "../kit-2/placeholder"
import * as AR from "fp-ts/Array"
import React from "react"




const minimumDateForDrivingLicenseFromToday = () => {
	const date = DATES.today()
	date.setFullYear( date.getFullYear() - 18 )
	return date
}

const schema = V.record( {
	nom:                      V.nonEmptyString,
	prenom:                   V.nonEmptyString,
	dateNaissance:            V.date, // @todo: > 18
	dateObtentionPermis:      V.sequence( V.date, V.lte( minimumDateForDrivingLicenseFromToday() ) ), // @todo: must be after birth && > 18 years ago
	codeTypeConducteur:       V.nonEmptyString,
	codeTypePermis:           V.nonEmptyString,
	codeExperienceConducteur: V.nonEmptyString,
	codeCivilite:             V.nonEmptyString,
} )

const IdentificationConducteur: IdentificationConducteurStep = ( props ) => {
	const [ typesConducteur ] = DRIVERS.useTypesConducteur()
	const [ codesCivilite ] = DRIVERS.useCodesCivilite()
	const [ codesExperienceConducteur ] = DRIVERS.useExperiencesConducteur()
	const [ typesPermis ] = VEHICULES.useTypesPermis( { active: true, params: props } )
	
	const [ _values, form ] = useForm( {
		defaultValue: {},
		schema,
		onSubmit:     props.onConfirm,
	} )
	return (
		<form {...form.props}>
			<FormTitle>Le conducteur</FormTitle>
			<ButtonRadioSelect
				className="mb-8"
				data={typesConducteur}
				label="Conducteur principal"
				{...form.field( "codeTypeConducteur" )}
			/>
			
			<ButtonRadioSelect
				className="mb-8"
				data={codesCivilite}
				label="Civilité"
				cols={2}
				{...form.field( "codeCivilite" )}
			/>
			
			<TextInput
				className="mb-8"
				label="Nom"
				{...form.field( "nom" )}
			/>
			
			<TextInput
				className="mb-8"
				label="Prénom"
				{...form.field( "prenom" )}
			/>
			
			<DateInput
				className="mb-8"
				label="Date de naissance"
				{...form.field( "dateNaissance" )}
			/>
			
			<DateInput
				className="mb-8"
				label="Date d'obtention du permis"
				{...form.field( "dateObtentionPermis" )}
			/>
			
			<ButtonRadioSelect
				className="mb-8"
				data={typesPermis}
				label="Permis obtenu"
				cols={2}
				{...form.field( "codeTypePermis" )}
			/>
			
			<AsyncRadioGroup
				{...form.field( "codeExperienceConducteur" )}
				className="mb-8"
				label="Quel est son passé d'assuré ?"
				value={form.field( "codeExperienceConducteur" ).value}
				data={codesExperienceConducteur}
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
			
			{form.isValid && <FormSubmitButton disabled={form.isPending}>Valider</FormSubmitButton>}
		</form>)
}

export default IdentificationConducteur
