import { CODE_TYPE_VEHICULE, InitParcoursStep, Step, StepProps, StepValues } from "../contracts"
import { ClickableStyles, FormSubmitButton, FormTitle, Grid, SectionHeaderStyles } from "../kit-2/shared"
import React, { ComponentType, useMemo } from "react"
import { FormikProps, withFormik } from "formik"
import { pipe } from "fp-ts/lib/function"
import * as yup from "yup"
import * as Y from "../kit-2/yup"
import { FieldSubText, getConnect, RadioButton, RadioGroup } from "../kit-2/forms-2"
import * as AR from "fp-ts/Array"




const useStaticValue = <T extends any>( value: T ): T =>
	 useMemo( () => value, [] )


const useCodesTypeVehicule = () =>
	 useStaticValue( [
			{ value: CODE_TYPE_VEHICULE.AUTO, label: "Auto" },
			{ value: CODE_TYPE_VEHICULE.MOTO, label: "Moto (>50cm3)" },
			{ value: CODE_TYPE_VEHICULE.CAMPING_CAR, label: "Camping-car (<3,5t)" },
	 ] )


const useHasAccountChoices = () =>
	 useStaticValue( [
			{ value: "true" as const, label: "J'ai un espace personnel" },
			{ value: "false" as const, label: "Je n'ai pas (encore) d'espace" },
	 ] )


const schema = Y.struct( {
	 codeTypeVehicule:  Y.enumm( CODE_TYPE_VEHICULE ),
	 alreadyHasAccount: Y.bool(),
} );


type StepForm<T extends Step<any, any>, S extends StepValues<T>> = ComponentType<StepProps<T> & FormikProps<S>>


const _InitParcours: StepForm<InitParcoursStep, yup.Asserts<typeof schema>> = ( props ) => {
	 const connect                              = getConnect( props )
	 const codesTypeVehicules                   = useCodesTypeVehicule()
	 const hasAccountChoices                    = useHasAccountChoices()
	 const showUseYourExistingMaifAccountPrompt = props.values.alreadyHasAccount === "true"
	 const showSubmitButton                     = props.dirty && props.isValid && !showUseYourExistingMaifAccountPrompt
	 
	 return (
			<form onSubmit={props.handleSubmit}>
				 <FormTitle>Assurer un véhicule</FormTitle>
				 
				 <RadioGroup
						{...connect( "codeTypeVehicule" )}
						label="Pour quelle catégorie de véhicule souhaitez-vous réaliser un devis ?"
				 >
						<Grid cols={3}>
							 {pipe(
									codesTypeVehicules,
									AR.map( code =>
										 <RadioButton
												{...connect( "codeTypeVehicule", { value: code.value } )}
												key={code.value}
												children={code.label}
										 />,
									),
							 )}
						</Grid>
				 </RadioGroup>
				 
				 <div className="pt-4"/>
				 
				 <FieldSubText>
						Véhicule de collection ou tout autre catégorie de véhicule,&nbsp;
						<a className="underline"
							 href="https://www.maif.fr/annexes/nous-telephoner"
						>
							 prenez contact avec un conseiller maif
						</a>
						.
				 </FieldSubText>
				 
				 
				 <div className="pt-8"/>
				 
				 
				 <RadioGroup
						{...connect( "alreadyHasAccount" )}
						label="Avez-vous déjà un compte Maif.fr ?"
				 >
						<Grid cols={2}>
							 {pipe(
									hasAccountChoices,
									AR.map( code =>
										 <RadioButton
												{...connect( "alreadyHasAccount", { value: code.value } )}
												children={code.label}
												key={code.label}
										 />,
									),
							 )}
						</Grid>
				 </RadioGroup>
				 
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
						<FormSubmitButton disabled={props.isSubmitting}>
							 Démarrer mon devis
						</FormSubmitButton>)}
			</form>)
}

const InitParcours = pipe(
	 _InitParcours,
	 withFormik<StepProps<InitParcoursStep>, yup.Asserts<typeof schema>>( {
			mapPropsToValues: () => ({
				 codeTypeVehicule:  undefined!,
				 alreadyHasAccount: undefined!,
			}),
			validationSchema: schema,
			handleSubmit:     ( values, { props } ) => props.onConfirm( values ),
	 } ),
)

export default InitParcours
