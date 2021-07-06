import { pipe } from "fp-ts/function"
import { makeStep, PasseConducteurStep } from "../../contracts"
import { Label } from "../../kit-2/forms"
import * as AR from "fp-ts/Array"
import * as E from "fp-ts/Either"
import * as REMOTE from "../../kit-2/remote"
import { FormSubmitButton, FormTitle, Grid } from "../../kit-2/shared"
import * as Y from "../../kit-2/yup"
import React, { useEffect } from "react"
import { notNil } from "../../kit-2/helpers"
import { getConnect, Input2, RadioButton, RadioSelect, YesNo2 } from "../../kit-2/forms-2"
import * as DS from "../../kit-2/date-string"
import { FieldArray } from "formik"
import * as Q from "./queries"
import { CODES_NATURES_SINISTRE } from "./queries"




const caSchema = Y.struct( {
	 conduiteAccompagnee:              Y.bool(),
	 conduiteAccompagneeMaif:          pipe(
			Y.bool().optional(),
			Y.when<Y.BooleanString>(
				 "conduiteAccompagnee",
				 ( ca, schema ) => ca === "true" ?
													 schema.required() :
													 schema,
			),
	 ),
	 conduiteAccompagneeMaifAvant2007: pipe(
			Y.bool().optional(),
			Y.when<Y.BooleanString>(
				 "conduiteAccompagneeMaif",
				 ( caMaif, schema ) => caMaif === "true" ?
															 schema.required() :
															 schema,
			),
	 ),
} )

const sinistreSchema = Y.struct( {
	 dateSurvenance:     Y.dateString(),
	 codeNature:         Y.enumm( CODES_NATURES_SINISTRE ),
	 codeResponsabilite: pipe(
			Y.nonEmptyString().optional(),
			Y.when<CODES_NATURES_SINISTRE>(
				 "codeNature",
				 ( codeNature, schema ) =>
						codeNature === CODES_NATURES_SINISTRE.COLLISION ?
						schema.required() :
						schema,
			),
	 ),
} )

const isSinistreCollision = ( sinistre: Y.Asserts<typeof sinistreSchema> ): sinistre is { dateSurvenance: DS.DateString, codeResponsabilite: string, codeNature: CODES_NATURES_SINISTRE } =>
	 sinistre.codeNature === CODES_NATURES_SINISTRE.COLLISION && sinistre.codeResponsabilite !== undefined

const schema2 = Y.struct( {
	 dateAnterioriteBonus050:            Y.dateString(),
	 coefficientBonusMalus:              Y.number(),
	 dateSouscriptionAncienAssureur:     Y.dateString(),
	 dateDEcheanceAncienAssureur:        Y.dateString(),
	 sinistreAvecCirconstanceAggravante: Y.bool(),
	 retraitPermis:                      Y.bool(),
	 isAutoDateCoefficientValid:         Y.bool(),
	 hasSinistres:                       Y.bool(),
	 sinistres:                          Y.array( sinistreSchema ),
	 ca:                                 caSchema,
} )



const computeShouldShows = ( values: Y.Asserts<typeof schema2> ) => {
	 const showIsAutoDateCoefficinentValidQuestion = values.coefficientBonusMalus === .5
	 return ({
			showConduiteAccompaniedDrivingWithMaifQuestion:   values.ca.conduiteAccompagnee === "true",
			showConduiteAccompaniedDrivingBefore2007Question: values.ca.conduiteAccompagnee === "true" && values.ca.conduiteAccompagneeMaif === "true",
			showIsAutoDateCoefficinentValidQuestion:          showIsAutoDateCoefficinentValidQuestion,
			showCustomDateCoefficinentQuestion:               showIsAutoDateCoefficinentValidQuestion && values.isAutoDateCoefficientValid === "false",
			showSinistres:                                    values.coefficientBonusMalus === .5,
	 })
}

const collectionHasErrors = ( field: Array<any> | string | undefined ): boolean =>
	 !!field && Array.isArray( field ) ?
	 field.filter( notNil ).length > 0 :
	 false

const PasseAssure = makeStep<PasseConducteurStep, typeof schema2>(
	 ( props ) => {
			const connect                     = getConnect( props )
			const codesNaturesSinistre        = Q.useCodesNaturesSinistres()
			const responsabilitesSinistre     = Q.useResponsabilitesSinistres()
			const autoDateAnterioriteBonus050 = Q.useDatesAntecedentsSinistralite( props.values.dateDEcheanceAncienAssureur )
			const shouldShow                  = computeShouldShows( props.values )
			
			useEffect(
				 () => {
						if ( props.values.ca.conduiteAccompagneeMaif !== "false" )
							 return
						
						props.setValues( values => ({
							 ...values,
							 ca: {
									...values.ca,
									conduiteAccompagneeMaifAvant2007: undefined!,
							 },
						}) )
						
						props.setTouched( {
							 ...props.touched,
							 ca: {
									conduiteAccompagneeMaifAvant2007: false,
							 },
						} )
				 },
				 [ props.values.ca.conduiteAccompagneeMaif ],
			)
			
			useEffect(
				 () => {
						if ( props.values.isAutoDateCoefficientValid !== "true" || !REMOTE.isSuccess( autoDateAnterioriteBonus050 ) )
							 return
						
						props.setValues( values => ({
							 ...values,
							 dateAnterioriteBonus050: DS.fromDate( autoDateAnterioriteBonus050.value.dateAnterioriteBonus050 ),
						}) )
				 },
				 [ props.values.isAutoDateCoefficientValid ],
			)
			
			const handleChangedHasSinistres = ( value: Y.BooleanString ) => {
				 props.setValues( values => ({
						...values,
						hasSinistres: value,
						sinistres:    value === "true" && !props.values.sinistres.length ?
													[ {} as any ] :
													[],
				 }), true )
				 
				 props.setTouched( { ...props.touched, hasSinistres: true } )
			}
			
			return (
				 <form onSubmit={props.handleSubmit}>
						<FormTitle>Le passé du conducteur</FormTitle>
						
						<YesNo2
							 {...connect( "sinistreAvecCirconstanceAggravante" )}
							 className="mb-8"
							 label="Le conducteur a-t-il fait l’objet d’une résiliation par son dernier assureur ou a-t-il provoqué, au cours des 24 derniers mois, un ou plusieurs sinistres avec circonstances aggravantes ?"
						/>
						
						
						<YesNo2
							 {...connect( "retraitPermis" )}
							 className="mb-8"
							 label="Le conducteur a-t-il fait l’objet d’une suspension, d’une annulation ou d’un retrait de permis dans les 2 ans précédent la demande ?"
						/>
						
						<YesNo2
							 {...connect( [ "ca", "conduiteAccompagnee" ] )}
							 className="mb-8"
							 label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) ?"
						/>
						
						{shouldShow.showConduiteAccompaniedDrivingWithMaifQuestion && (
							 <YesNo2
									{...connect( [ "ca", "conduiteAccompagneeMaif" ] )}
									className="mb-8"
									label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) auprès d’une personne assurée MAIF ?"
							 />)}
						
						{shouldShow.showConduiteAccompaniedDrivingBefore2007Question && (
							 <YesNo2
									{...connect( [ "ca", "conduiteAccompagneeMaifAvant2007" ] )}
									className="mb-8"
									label="Cet apprentissage a-t-il débuté avant le 01/01/2007 ?"
							 />)}
						
						<Input2
							 {...connect( "dateDEcheanceAncienAssureur" )}
							 className="mb-8"
							 label="Date de la dernière échéance du contrat actuel"
							 type="date"
						/>
						
						<Input2
							 {...connect( "dateSouscriptionAncienAssureur" )}
							 className="mb-8"
							 label="Depuis quand le conducteur est-il assuré sans interruption chez son assureur actuel (mm/aaaa)"
							 type="month"
						/>
						
						<Input2
							 {...connect( "coefficientBonusMalus" )}
							 className="mb-8"
							 label="Coefficient bonus malus"
							 placeholder=".5"
							 step="0.1"
							 min="0.5"
							 type="number"
						/>
						
						{shouldShow.showIsAutoDateCoefficinentValidQuestion && REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && (
							 <YesNo2
									className="mb-8"
									label={`Avez-vous un coefficient de 0,5 depuis le ${autoDateAnterioriteBonus050.value.dateAnterioriteBonus050.toLocaleDateString()}`}
									{...connect( "isAutoDateCoefficientValid" )}
							 />)}
						
						{shouldShow.showCustomDateCoefficinentQuestion && (
							 <Input2
									{...connect( "dateAnterioriteBonus050" )}
									className="mb-8"
									label="Depuis quelle date avez-vous le bonus 0,50 ?"
									type="date"
							 />)}
						
						{shouldShow.showSinistres && REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && (
							 <>
									<div className="pt-8"/>
									<FormTitle>Sinistres</FormTitle>
									<YesNo2
										 {...connect( "hasSinistres" )}
										 className="mb-8"
										 label={`Le conducteur a-t-il un ou plusieurs sinistres à déclarer depuis le ${autoDateAnterioriteBonus050.value.dateDebutCollecteSinistre.toLocaleDateString()} ?`}
										 onChange={handleChangedHasSinistres}
									/>
									
									<FieldArray {...connect( "sinistres" )}>
										 {helpers =>
												props.values.sinistres
												&& (
													 <ul>
															{props.values.sinistres.map( ( el, index ) => (
																 <li
																		key={index}
																		className="flex flex-row pb-4"
																 >
																		<div className="font-bold text-lg text-gray-400 pr-4">{index + 1}.</div>
																		<div className="w-full pt-0.5">
																			 <RadioSelect
																					{...connect( [ "sinistres", index, "codeNature" ] )}
																					className="mb-8"
																					data={REMOTE.success( codesNaturesSinistre )}
																					label="Nature du sinsitre"
																			 >
																					{( data, props ) =>
																						 <Grid cols={2}>
																								{data.map( code =>
																									 <RadioButton
																											{...props}
																											key={code.value}
																											value={code.value}
																											children={code.label}
																									 /> )}
																						 </Grid>}
																			 </RadioSelect>
																			 
																			 {el.codeNature === CODES_NATURES_SINISTRE.COLLISION && (
																					<RadioSelect
																						 label="Responsabilité"
																						 className="mb-8"
																						 data={responsabilitesSinistre}
																						 {...connect( [ "sinistres", index, "codeResponsabilite" ] )}
																					>
																						 {( data, props ) =>
																								<Grid cols={2}>
																									 {data.map( code =>
																											<RadioButton
																												 {...props}
																												 key={code.value}
																												 value={code.value}
																												 children={code.label}
																											/> )}
																								</Grid>}
																					</RadioSelect>
																			 )}
																			 
																			 <Input2
																					{...connect( [ "sinistres", index, "dateSurvenance" ] )}
																					label="Date du sinistre"
																					type="date"
																					className="mb-8"
																			 />
																			 
																			 {index > 0 && (
																					<button
																						 className="font-medium right-0 text-gray-400 top-0 underline"
																						 onClick={() => helpers.remove( index )}
																					>
																						 Supprimer
																					</button>)}
																		</div>
																 </li>
															) )}
															{props.values.sinistres.length > 0 && !collectionHasErrors( props.errors.sinistres ) && (
																 <li className="flex flex-row mb-12">
																		<div className="font-bold text-lg text-gray-400 pr-4">{props.values.sinistres.length + 1}.</div>
																		<div className="pt-0.5">
																			 <Label label="Ajouter un sinistre ?">
																					<button
																						 type="button"
																						 onClick={() => helpers.push( {} )}
																						 className="w-10 h-10 text-xl leading-none pb-0.5 cursor-pointer font-bold inline-flex items-center justify-center border-2 rounded-md focus:border-indigo-600 text-center border-gray-300 shadow"
																					>
																						 +
																					</button>
																			 </Label>
																		</div>
																 </li>)}
													 </ul>
												)}
									</FieldArray>
							 </>)}
						
						{props.dirty && props.isValid && <FormSubmitButton disabled={props.isSubmitting}>Valider</FormSubmitButton>}
				 </form>
			)
	 },
	 {
			mapPropsToValues: () => ({
				 dateAnterioriteBonus050:            undefined!,
				 coefficientBonusMalus:              undefined!,
				 dateSouscriptionAncienAssureur:     undefined!,
				 dateDEcheanceAncienAssureur:        undefined!,
				 sinistreAvecCirconstanceAggravante: undefined!,
				 retraitPermis:                      undefined!,
				 isAutoDateCoefficientValid:         undefined!,
				 hasSinistres:                       undefined!,
				 sinistres:                          [],
				 ca:                                 {
						conduiteAccompagnee:              undefined!,
						conduiteAccompagneeMaif:          undefined!,
						conduiteAccompagneeMaifAvant2007: undefined!,
				 },
			}),
			validationSchema: schema2,
			handleSubmit:     ( values, { props } ) => {
				 const sinistresCollision = pipe(
						values.sinistres,
						AR.filter( isSinistreCollision ),
				 )
				 
				 Q.checkAcceptationProspect( {
							 conducteur: {
									codeExperienceConducteur:           props.codeExperienceConducteur,
									codeTypeConducteur:                 props.codeTypeConducteur,
									dateNaissance:                      pipe( props.dateNaissance, DS.fromDate, DS.toISO8601 ),
									dateObtentionPermis:                pipe( props.dateObtentionPermis, DS.fromDate, DS.toISO8601 ),
									nom:                                props.nom,
									prenom:                             props.prenom,
									coefficientBonusMalus:              values.coefficientBonusMalus,
									dateDEcheanceAncienAssureur:        DS.toISO8601( values.dateDEcheanceAncienAssureur ),
									retraitPermis:                      values.retraitPermis === "true",
									sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante === "true",
									sinistres:                          pipe(
										 sinistresCollision,
										 AR.map( s => ({
												...s,
												dateSurvenance: DS.toISO8601( s.dateSurvenance ),
										 }) ),
									),
							 },
							 vehicule:   {
									numeroRepertoire:  props.numeroRepertoire,
									codeUsageVehicule: props.codeUsageVehicule,
							 },
							 dateEffet:  pipe( props.dateEffetContratDesiree, DS.fromDate, DS.toISO8601 ),
						} )
						.then( E.foldW(
							 () => {
									console.log( "Failure" )
									// @todo: display rejected error
									// @todo: display errors
							 },
							 () => props.onConfirm( {
									conduiteAccompagnee:                values.ca.conduiteAccompagnee === "true",
									conduiteAccompagneeMaif:            values.ca.conduiteAccompagneeMaif === "true",
									conduiteAccompagneeMaifAvant2007:   values.ca.conduiteAccompagneeMaifAvant2007 === "true",
									coefficientBonusMalus:              values.coefficientBonusMalus,
									dateAnterioriteBonus050:            DS.toDate( values.dateAnterioriteBonus050 ),
									dateDEcheanceAncienAssureur:        DS.toDate( values.dateDEcheanceAncienAssureur ),
									dateSouscriptionAncienAssureur:     DS.toDate( values.dateSouscriptionAncienAssureur ),
									retraitPermis:                      values.retraitPermis === "true",
									sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante === "true",
									sinistres:                          pipe( sinistresCollision, AR.map( s => ({ ...s, dateSurvenance: DS.toDate( s.dateSurvenance ) }) ) ),
							 } ),
							 ),
						)
						.catch( err => console.log( "err", err ) )
			},
	 },
)

export default PasseAssure
