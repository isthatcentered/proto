import * as V from "../../kit-2/validation"
import * as CA from "./ca"
import caSchema from "./ca"
import { PasseConducteurStep } from "../../contracts"
import { useForm, YesNo } from "../../kit-2/forms"
import { FormSubmitButton, FormTitle } from "../../kit-2/shared"
import React from "react"
import { MergeUnions, Props } from "../../kit-2/helpers"




const schema = caSchema

const handleSubmitPasseAssure = ( _props: Props<PasseConducteurStep> ) => ( _values: V.ValidatedType<typeof schema> ) => {
	
	// return DRIVERS.jouerAcceptationProspect( {
	// 		conducteur: {
	// 			codeExperienceConducteur:           props.codeExperienceConducteur,
	// 			codeTypeConducteur:                 props.codeTypeConducteur,
	// 			dateNaissance:                      props.dateNaissance,
	// 			dateObtentionPermis:                props.dateObtentionPermis,
	// 			nom:                                props.nom,
	// 			prenom:                             props.prenom,
	// 			coefficientBonusMalus:              values.coefficientBonusMalus,
	// 			dateDEcheanceAncienAssureur:        values.dateDEcheanceAncienAssureur,
	// 			retraitPermis:                      values.retraitPermis,
	// 			sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante,
	// 			sinistres:                          sinistresCollision,
	// 		},
	// 		vehicule:   {
	// 			numeroRepertoire:  props.numeroRepertoire,
	// 			codeUsageVehicule: props.codeUsageVehicule,
	// 		},
	// 		dateEffet:  props.dateEffetContratDesiree,
	// 	} )
	// 	.then( E.foldW(
	// 		() => {
	// 			// @todo: display rejected error
	// 			// @todo: display errors
	// 		},
	// 		() => props.onConfirm( {
	// 			conduiteAccompagneeMaif:          false,
	// 			conduiteAccompagneeMaifAvant2007: false,
	// 			...values.ca,
	// 			coefficientBonusMalus:              values.coefficientBonusMalus,
	// 			dateAnterioriteBonus050:            values.dateAnterioriteBonus050,
	// 			dateDEcheanceAncienAssureur:        values.dateDEcheanceAncienAssureur,
	// 			dateSouscriptionAncienAssureur:     values.dateSouscriptionAncienAssureur,
	// 			retraitPermis:                      values.retraitPermis,
	// 			sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante,
	// 			sinistres:                          sinistresCollision,
	// 		} ),
	// 		),
	// 	)
	// @todo: what is required and what can be ommitted for ca ?
}


const PasseSansExperience: PasseConducteurStep = ( props ) => {
	const [ values, form ] = useForm( {
		schema,
		onSubmit: handleSubmitPasseAssure( props ),
	} )
	
	const handleChangedCA = ( k: keyof MergeUnions<CA.CA> ) => ( value: boolean ) => {
		const ca = { ...form.values, [ k ]: value } as Partial<CA.CA>
		if ( ca.conduiteAccompagnee === false )
			return form.set( CA.NoCA )
		
		if ( ca.conduiteAccompagnee === true && ca.conduiteAccompagneeMaif === false )
			return form.set( CA.CANotMaif )
		
		form.set( ca as CA.CA )
	}
	
	const showConduiteAccompaniedDrivingWithMaifQuestion = values.conduiteAccompagnee === true
	const showConduiteAccompaniedDrivingBefore2007Question = values.conduiteAccompagnee === true && values.conduiteAccompagneeMaif === true
	
	return (
		<form {...form.props}>
			<FormTitle>Le passé du conducteur</FormTitle>
			
			<YesNo
				className="mb-8"
				label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) ?"
				{...form.connect( [ "conduiteAccompagnee" ], { onChange: handleChangedCA( "conduiteAccompagnee" ) } )}
			/>
			
			{showConduiteAccompaniedDrivingWithMaifQuestion && (
				<YesNo
					className="mb-8"
					label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) auprès d’une personne assurée MAIF ?"
					{...form.connect( [ "conduiteAccompagneeMaif" ], { onChange: handleChangedCA( "conduiteAccompagneeMaif" ) } )}
				/>)}
			
			{showConduiteAccompaniedDrivingBefore2007Question && (
				<YesNo
					className="mb-8"
					label="Cet apprentissage a-t-il débuté avant le 01/01/2007 ?"
					{...form.connect( [ "conduiteAccompagneeMaifAvant2007" ], { onChange: handleChangedCA( "conduiteAccompagneeMaifAvant2007" ) } )}
				/>)}
			
			{form.isValid && <FormSubmitButton disabled={form.isPending}>Valider</FormSubmitButton>}
		</form>
	)
}

export default PasseSansExperience
