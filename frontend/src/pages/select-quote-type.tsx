import { BooleanString, VehiculeType } from "../types"
import useFormState from "../kit/use-form-state"
import React, { FormEvent } from "react"
import Radio, { RadioGroup } from "../kit/radio"




type SelectQuoteTypeFormModel = { vehiculeType: VehiculeType, hasAccount: BooleanString }
export const SelectQuoteType = ( props: { onFormSubmitted: ( vehiculeType: string ) => void } ) => {
	const [ values, setFieldValue ] = useFormState<SelectQuoteTypeFormModel>( { vehiculeType: VehiculeType.AUTO, hasAccount: "" as any } )
	
	const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
		e.preventDefault()
		if ( values.hasAccount === "true" ) {
			window.open( "https://www.maif.fr/services-en-ligne/devis/vam/dv_pour_bien_demarrer.action?view" )
			return
		}
		
		props.onFormSubmitted( values.vehiculeType )
	}
	
	return (
		<div>
			<h1>
				Assurance auto-moto : contrat VAM<br/>
				Devis en ligne
			</h1>
			<i>i</i> Tous les champs sont obligatoires, sauf mention contraire.
			<form onSubmit={handleSubmit}>
				<h2>Assurer un véhicule</h2>
				<fieldset>
					<legend>Pour quelle catégorie de véhicule souhaitez-vous réaliser un devis ?</legend>
					<RadioGroup
						name="vehiculeType"
						required
						value={values.vehiculeType}
						onRadioClicked={setFieldValue( "vehiculeType" )}
					>
						{groupProps =>
							<>
								<Radio
									value={VehiculeType.AUTO}
									{...groupProps}
								>
									Auto
								</Radio>
								
								<Radio
									value={VehiculeType.MOTO}
									{...groupProps}
								>
									Moto ({">"}50cm<sup>3</sup>)
								</Radio>
								
								<Radio
									value={VehiculeType.CAMPING_CAR}
									{...groupProps}
								>
									Camping-car ({"<"}3.5t)
								</Radio>
							</>}
					</RadioGroup>
					
					<p>Véhicule de collection ou tout autre catégorie de véhicule, <a href="https://maif.fr">prenez contact avec un conseiller MAIF</a>.</p>
				</fieldset>
				
				<fieldset>
					<legend>Déjà un compte ? Connectez-vous pour gagner du temps !</legend>
					<RadioGroup
						value={values.hasAccount}
						onRadioClicked={setFieldValue( "hasAccount" )}
						name="hasAccount"
					>
						{groupProps =>
							<>
								<Radio value={"true"} {...groupProps}>
									J'ai un compte maif.fr
								</Radio>
								
								<Radio value={"false"} {...groupProps}>
									Je n'ai pas (encore) de compte maif.fr
								</Radio>
							</>}
					</RadioGroup>
				</fieldset>
				
				<button type="submit">Démarrer mon devis</button>
			</form>
			<pre>{JSON.stringify( values )}</pre>
		</div>)
}
