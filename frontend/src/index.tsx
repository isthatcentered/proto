import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import Radio, { RadioGroup } from "./components/radio"




type  BooleanString = "true" | "false"

enum VehiculeType
{
	AUTO        = "01",
	MOTO        = "02",
	CAMPING_CAR = "06"
}

type SelectQuoteTypeFormModel = { vehiculeType: VehiculeType, hasAccount: BooleanString }


const useFormState = <T extends Record<any, any>>(
	defaultValue: T,
) => {
	const [ data, setData ] = useState<T>( defaultValue )
	
	const setField = <K extends keyof typeof data>( field: K ) => (
		value: typeof data[K],
	) => setData( { ...data, [ field ]: value } )
	
	return [ data, setField ] as const
}


const SelectQuoteType = ( props: { onFormSubmitted: ( vehiculeType: string ) => void } ) => {
	const [ values, setFieldValue ] = useFormState<SelectQuoteTypeFormModel>( { vehiculeType: VehiculeType.AUTO, hasAccount: "false" } )
	
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
						value={values.vehiculeType}
						onRadioClicked={setFieldValue( "vehiculeType" )}
						name="vehiculeType"
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

const App = () => {
	const [ step, setStep ] = useState( 0 )
	
	return (
		<>
			{step === 0 && <SelectQuoteType onFormSubmitted={() => setStep( 1 )}/>}
		</>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
	,
	document.getElementById( "root" ),
);

