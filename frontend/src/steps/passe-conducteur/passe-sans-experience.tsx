import { makeStep, PasseConducteurStep } from "../../contracts"
import { FormSubmitButton, FormTitle } from "../../kit-2/shared"
import React from "react"
import { getConnect, YesNo2 } from "../../kit-2/forms-2"
import * as BS from "../../kit-2/boolean-string"
import { caSchema } from "./shared"




const PasseSansExperience = makeStep<PasseConducteurStep, typeof caSchema>(
	 ( props ) => {
			const connect                                          = getConnect( props )
			const showConduiteAccompaniedDrivingWithMaifQuestion   = props.values.conduiteAccompagnee === "true"
			const showConduiteAccompaniedDrivingBefore2007Question = props.values.conduiteAccompagnee === "true" && props.values.conduiteAccompagneeMaif === "true"
			
			const handleCAChanged = BS.fold( {
				 onTrue:  () => {
						props.setValues( {
							 ...props.values,
							 conduiteAccompagnee: "true",
						} )
						
						props.setTouched( { ...props.touched, conduiteAccompagnee: true }, false )
				 },
				 onFalse: () => {
						props.setValues( {
							 conduiteAccompagnee:              "false",
							 conduiteAccompagneeMaif:          undefined!,
							 conduiteAccompagneeMaifAvant2007: undefined!,
						} )
						
						props.setTouched( { conduiteAccompagnee: true }, false )
				 },
			} )
			
			const handleCAMAIFChanged = BS.fold( {
				 onTrue:  () => {
						props.setValues( {
							 ...props.values,
							 conduiteAccompagneeMaif: "true",
						} )
						
						props.setTouched( { ...props.touched, conduiteAccompagneeMaif: true }, false )
				 },
				 onFalse: () => {
						props.setValues( {
							 ...props.values,
							 conduiteAccompagneeMaif:          "false",
							 conduiteAccompagneeMaifAvant2007: undefined!,
						} )
						
						props.setTouched( { ...props.touched, conduiteAccompagneeMaif: true, conduiteAccompagneeMaifAvant2007: false }, false )
				 },
			} )
			
			return (
				 <form onSubmit={props.handleSubmit}>
						<FormTitle>Le passé du conducteur</FormTitle>
						
						<YesNo2
							 {...connect( "conduiteAccompagnee" )}
							 className="mb-8"
							 label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) ?"
							 onChange={handleCAChanged}
						/>
						
						{showConduiteAccompaniedDrivingWithMaifQuestion && (
							 <YesNo2
									{...connect( "conduiteAccompagneeMaif" )}
									className="mb-8"
									label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) auprès d’une personne assurée MAIF ?"
									onChange={handleCAMAIFChanged}
							 />)}
						
						{showConduiteAccompaniedDrivingBefore2007Question && (
							 <YesNo2
									{...connect( "conduiteAccompagneeMaifAvant2007" )}
									className="mb-8"
									label="Cet apprentissage a-t-il débuté avant le 01/01/2007 ?"
							 />)}
						
						<FormSubmitButton disabled={props.isSubmitting}>Valider</FormSubmitButton>
				 </form>
			)
	 },
	 {
			mapPropsToValues: () => ({
				 conduiteAccompagnee:              undefined!,
				 conduiteAccompagneeMaif:          undefined!,
				 conduiteAccompagneeMaifAvant2007: undefined!,
			}),
			validationSchema: caSchema,
			handleSubmit:     ( values, { props } ) => {
				 // @todo: live test
				 
				 // Q.checkAcceptationProspect( {
				 // 		 conducteur: {
				 // 				codeExperienceConducteur:           props.codeExperienceConducteur,
				 // 				codeTypeConducteur:                 props.codeTypeConducteur,
				 // 				dateNaissance:                      pipe( props.dateNaissance, DS.fromDate, DS.toISO8601 ),
				 // 				dateObtentionPermis:                pipe( props.dateObtentionPermis, DS.fromDate, DS.toISO8601 ),
				 // 				nom:                                props.nom,
				 // 				prenom:                             props.prenom,
				 // 				coefficientBonusMalus:              values.coefficientBonusMalus,
				 // 				dateDEcheanceAncienAssureur:        DS.toISO8601( values.dateDEcheanceAncienAssureur ),
				 // 				retraitPermis:                      values.retraitPermis === "true",
				 // 				sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante === "true",
				 // 				sinistres:                          pipe(
				 // 					 sinistresCollision,
				 // 					 AR.map( s => ({
				 // 							...s,
				 // 							dateSurvenance: DS.toISO8601( s.dateSurvenance ),
				 // 					 }) ),
				 // 				),
				 // 		 },
				 // 		 vehicule:   {
				 // 				numeroRepertoire:  props.numeroRepertoire,
				 // 				codeUsageVehicule: props.codeUsageVehicule,
				 // 		 },
				 // 		 dateEffet:  pipe( props.dateEffetContratDesiree, DS.fromDate, DS.toISO8601 ),
				 // 	} )
				 // 	.then( E.foldW(
				 // 		 () => {
				 // 				console.log( "Failure" )
				 // 				// @todo: display rejected error
				 // 				// @todo: display errors
				 // 		 },
				 // 		 () => props.onConfirm( {
				 // 				conduiteAccompagnee:                values.ca.conduiteAccompagnee === "true",
				 // 				conduiteAccompagneeMaif:            values.ca.conduiteAccompagneeMaif === "true",
				 // 				conduiteAccompagneeMaifAvant2007:   values.ca.conduiteAccompagneeMaifAvant2007 === "true",
				 // 				coefficientBonusMalus:              values.coefficientBonusMalus,
				 // 				dateAnterioriteBonus050:            DS.toDate( values.dateAnterioriteBonus050 ),
				 // 				dateDEcheanceAncienAssureur:        DS.toDate( values.dateDEcheanceAncienAssureur ),
				 // 				dateSouscriptionAncienAssureur:     DS.toDate( values.dateSouscriptionAncienAssureur ),
				 // 				retraitPermis:                      values.retraitPermis === "true",
				 // 				sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante === "true",
				 // 				sinistres:                          pipe( sinistresCollision, AR.map( s => ({ ...s, dateSurvenance: DS.toDate( s.dateSurvenance ) }) ) ),
				 // 		 } ),
				 // 		 ),
				 // 	)
				 // 	.catch( err => console.log( "err", err ) )
			},
	 },
)

export default PasseSansExperience
