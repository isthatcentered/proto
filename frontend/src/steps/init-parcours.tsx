import * as REMOTE from "../kit-2/remote"
import { Code } from "../kit-2/helpers"
import { InitParcoursStep } from "../contracts"
import { ButtonRadioSelect, useForm } from "../kit-2/forms"
import { ClickableStyles, FormSubmitButton, FormTitle, SectionHeaderStyles } from "../kit-2/shared"
import React from "react"
import * as V from "../kit-2/validation"




const useCodesTypeVehicule = () => {
	const state = REMOTE.success( [
		{ value: "01", label: "Auto" },
		{ value: "02", label: "Moto (>50cm3)" },
		{ value: "06", label: "Camping-car (<3,5t)" },
	] as Code<string>[] )
	return [ state ] as const
}

const schema = V.struct( {
	codeTypeVehicule:  V.nonEmptyString,
	alreadyHasAccount: V.boolean,
} )

const InitParcours: InitParcoursStep = ( props ) => {
	const [ values, form ] = useForm( {
		defaultValue: {},
		schema,
		onSubmit:     props.onConfirm,
	} )
	
	const [ codesTypeVehicules ] = useCodesTypeVehicule()
	
	const showUseYourExistingMaifAccountPrompt = !!values.alreadyHasAccount
	
	const showSubmitButton = form.isValid && !showUseYourExistingMaifAccountPrompt
	
	return (
		<form {...form.props}>
			<FormTitle>Assurer un véhicule</FormTitle>
			<ButtonRadioSelect
				{...form.connect( [ "codeTypeVehicule" ] )}
				data={codesTypeVehicules}
				label="Pour quelle catégorie de véhicule souhaitez-vous réaliser un devis ?"
			/>
			
			<div className="pt-4"/>
			
			<p className="text-xs text-gray-700 italic">
				Véhicule de collection ou tout autre catégorie de véhicule,&nbsp;
				<a className="underline"
				   href="https://www.maif.fr/annexes/nous-telephoner"
				>
					prenez contact avec un conseiller maif
				</a>
				.
			</p>
			
			<div className="pt-8"/>
			
			<ButtonRadioSelect
				{...form.connect( [ "alreadyHasAccount" ] )}
				cols={2}
				data={REMOTE.success( [ { value: true, label: "J'ai un espace personnel" }, { value: false, label: "Je n'ai pas (encore) d'espace" } ] )}
				label="Avez-vous déjà un compte Maif.fr ?"
			/>
			
			<div className="pt-16"/>
			
			{/* @todo: accessibility, this should be an alert */}
			{showUseYourExistingMaifAccountPrompt && (
				<div className="flex flex-col">
					<h3 className="mb-2">
						<SectionHeaderStyles>Vous avez déjà un compte Maif.fr ? Fantastique!</SectionHeaderStyles>
					</h3>
					<p className="mb-8  text-gray-700">Connectez-vous pour gagner du temps, votre devis est plus rapide et vos informations personnelles sont pré-remplies.</p>
					<a
						href="https://connect.maif.fr/connect/s/popup/identification"
						target="_blank"
						rel="noopener"
					>
						<ClickableStyles>Je me connecte</ClickableStyles>
					</a>
				</div>
			)}
			
			{showSubmitButton && (
				<FormSubmitButton disabled={form.isPending}>
					Démarrer mon devis
				</FormSubmitButton>)}
		</form>)
}

export default InitParcours
