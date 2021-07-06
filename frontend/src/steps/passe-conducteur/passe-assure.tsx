import * as V from "../../kit-2/validation"
import { constant, pipe } from "fp-ts/function"
import sinistreSchema, { CODES_NATURES_SINISTRE, codesNaturesSinistre, isSinistreCollision } from "./sinistres"
import * as CA from "./ca"
import caSchema from "./ca"
import { makeStep, PasseConducteurStep } from "../../contracts"
import { ButtonRadioSelect, DateInput, Label, MonthInput, NumberInput, useForm, YesNo } from "../../kit-2/forms"
import * as AR from "fp-ts/Array"
import * as DRIVERS from "../../queries/drivers"
import * as E from "fp-ts/Either"
import * as REMOTE from "../../kit-2/remote"
import { FormSubmitButton, FormTitle } from "../../kit-2/shared"
import * as Y from "../../kit-2/yup"
import React from "react"
import { DeepKinda, MergeUnions, Props } from "../../kit-2/helpers"






const schema = V.struct( {
	 dateAnterioriteBonus050:            V.date,
	 coefficientBonusMalus:              V.number,
	 dateSouscriptionAncienAssureur:     V.date,
	 dateDEcheanceAncienAssureur:        V.date,
	 sinistreAvecCirconstanceAggravante: V.boolean,
	 retraitPermis:                      V.boolean,
	 isAutoDateCoefficientValid:         V.boolean,
	 hasSinistres:                       V.boolean,
	 sinistres:                          V.array( sinistreSchema ),
	 ca:                                 caSchema,
} )

const schema2 = Y.struct({})


const handleSubmitPasseAssure = ( props: Props<PasseConducteurStep> ) => ( values: V.ValidatedType<typeof schema> ) => {
	 const sinistresCollision = pipe(
			values.sinistres || [],
			AR.filter( isSinistreCollision ),
	 )
	 
	 return DRIVERS.jouerAcceptationProspect( {
				 conducteur: {
						codeExperienceConducteur:           props.codeExperienceConducteur,
						codeTypeConducteur:                 props.codeTypeConducteur,
						dateNaissance:                      props.dateNaissance,
						dateObtentionPermis:                props.dateObtentionPermis,
						nom:                                props.nom,
						prenom:                             props.prenom,
						coefficientBonusMalus:              values.coefficientBonusMalus,
						dateDEcheanceAncienAssureur:        values.dateDEcheanceAncienAssureur,
						retraitPermis:                      values.retraitPermis,
						sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante,
						sinistres:                          sinistresCollision,
				 },
				 vehicule:   {
						numeroRepertoire:  props.numeroRepertoire,
						codeUsageVehicule: props.codeUsageVehicule,
				 },
				 dateEffet:  props.dateEffetContratDesiree,
			} )
			.then( E.foldW(
				 () => {
						// @todo: display rejected error
						// @todo: display errors
				 },
				 () => props.onConfirm( {
						conduiteAccompagneeMaif:          false,
						conduiteAccompagneeMaifAvant2007: false,
						...values.ca,
						coefficientBonusMalus:              values.coefficientBonusMalus,
						dateAnterioriteBonus050:            values.dateAnterioriteBonus050,
						dateDEcheanceAncienAssureur:        values.dateDEcheanceAncienAssureur,
						dateSouscriptionAncienAssureur:     values.dateSouscriptionAncienAssureur,
						retraitPermis:                      values.retraitPermis,
						sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante,
						sinistres:                          sinistresCollision,
				 } ),
				 ),
			)
}

const handleChangedCA = ( deps: { value: Partial<CA.CA>, set: ( value: CA.CA ) => void } ) => ( k: keyof MergeUnions<CA.CA> ) => ( value: boolean ) => {
	 const ca = { ...deps.value, [ k ]: value } as Partial<CA.CA>
	 if ( ca.conduiteAccompagnee === false )
			return deps.set( CA.NoCA )
	 
	 if ( ca.conduiteAccompagnee === true && ca.conduiteAccompagneeMaif === false )
			return deps.set( CA.CANotMaif )
	 
	 deps.set( ca as CA.CA )
}

const computeShouldShows = ( values: NonNullable<DeepKinda<V.ValidatedType<typeof schema>>> ) => {
	 const showIsAutoDateCoefficinentValidQuestion = values.coefficientBonusMalus === .5
	 return ({
			showConduiteAccompaniedDrivingWithMaifQuestion:   values.ca?.conduiteAccompagnee === true,
			showConduiteAccompaniedDrivingBefore2007Question: values.ca?.conduiteAccompagnee === true && values.ca.conduiteAccompagneeMaif === true,
			showIsAutoDateCoefficinentValidQuestion:          showIsAutoDateCoefficinentValidQuestion,
			showCustomDateCoefficinentQuestion:               showIsAutoDateCoefficinentValidQuestion && values.isAutoDateCoefficientValid === false,
			showSinistres:                                    values.coefficientBonusMalus === .5,
	 })
}


const PasseAssure = makeStep<PasseConducteurStep, any>(
	 ( props ) => {
			const [ values, form ]                = useForm( {
				 schema,
				 onSubmit: handleSubmitPasseAssure( props ),
			} )
			const [ responsabilitesSinistre ]     = DRIVERS.useResponsabilitesSinistre()
			const [ autoDateAnterioriteBonus050 ] = DRIVERS.useDatesAntecedentsSinistralites(
				 form.fields.field( "dateDEcheanceAncienAssureur" ).validated( {
						onInvalid: constant( { active: false } ),
						onValid:   value => ({ params: { dateEcheanceAncienAssureur: value }, active: true }),
				 } ),
			)
			const handleCAChange                  = handleChangedCA( {
				 set:   value => form.set( [ "ca" ], value ),
				 value: form.values.ca || {},
			} )
			const sinistresCollection             = form.collection( [ "sinistres" ] )
			
			const shouldShow = computeShouldShows( form.values )
			
			return (
				 <form {...form.props}>
						<FormTitle>Le passé du conducteur</FormTitle>
						
						<YesNo
							 className="mb-8"
							 label="Le conducteur a-t-il fait l’objet d’une résiliation par son dernier assureur ou a-t-il provoqué, au cours des 24 derniers mois, un ou plusieurs sinistres avec circonstances aggravantes ?"
							 {...form.connect( [ "sinistreAvecCirconstanceAggravante" ] )}
						/>
						
						
						<YesNo
							 className="mb-8"
							 label="Le conducteur a-t-il fait l’objet d’une suspension, d’une annulation ou d’un retrait de permis dans les 2 ans précédent la demande ?"
							 {...form.connect( [ "retraitPermis" ] )}
						/>
						
						<YesNo
							 className="mb-8"
							 label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) ?"
							 {...form.connect( [ "ca", "conduiteAccompagnee" ], { onChange: handleCAChange( "conduiteAccompagnee" ) } )}
						/>
						
						{shouldShow.showConduiteAccompaniedDrivingWithMaifQuestion && (
							 <YesNo
									className="mb-8"
									label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) auprès d’une personne assurée MAIF ?"
									{...form.connect( [ "ca", "conduiteAccompagneeMaif" ], { onChange: handleCAChange( "conduiteAccompagneeMaif" ) } )}
							 />)}
						
						{shouldShow.showConduiteAccompaniedDrivingBefore2007Question && (
							 <YesNo
									className="mb-8"
									label="Cet apprentissage a-t-il débuté avant le 01/01/2007 ?"
									{...form.connect( [ "ca", "conduiteAccompagneeMaifAvant2007" ], { onChange: handleCAChange( "conduiteAccompagneeMaifAvant2007" ) } )}
							 />)}
						
						<DateInput
							 className="mb-8"
							 label="Date de la dernière échéance du contrat actuel"
							 {...form.connect( [ "dateDEcheanceAncienAssureur" ] )}
						/>
						
						<MonthInput
							 className="mb-8"
							 label="Depuis quand le conducteur est-il assuré sans interruption chez son assureur actuel (mm/aaaa)"
							 {...form.connect( [ "dateSouscriptionAncienAssureur" ] )}
						/>
						
						<NumberInput
							 className="mb-8"
							 label="Coefficient bonus malus"
							 placeholder=".5"
							 step="0.1"
							 min="0.5"
							 {...form.connect( [ "coefficientBonusMalus" ] )}
						/>
						
						{shouldShow.showIsAutoDateCoefficinentValidQuestion && REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && (
							 <YesNo
									className="mb-8"
									label={`Avez-vous un coefficient de 0,5 depuis le ${autoDateAnterioriteBonus050.value.dateAnterioriteBonus050.toLocaleDateString()}`}
									{...form.connect( [ "isAutoDateCoefficientValid" ], {
										 onChange: isValid =>
																	form.set( {
																		 ...form.values,
																		 isAutoDateCoefficientValid: isValid,
																		 dateAnterioriteBonus050:    isValid ?
																																 autoDateAnterioriteBonus050.value.dateAnterioriteBonus050 :
																																 undefined!,
																	} ),
									} )}
							 />)}
						
						{shouldShow.showCustomDateCoefficinentQuestion && (
							 <DateInput
									className="mb-8"
									label="Depuis quelle date avez-vous le bonus 0,50 ?"
									{...form.connect( [ "dateAnterioriteBonus050" ] )}
							 />)}
						
						{shouldShow.showSinistres && REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && (
							 <>
									<div className="pt-8"/>
									<FormTitle>Sinistres</FormTitle>
									<YesNo
										 className="mb-8"
										 label={`Le conducteur a-t-il un ou plusieurs sinistres à déclarer depuis le ${autoDateAnterioriteBonus050.value.dateDebutCollecteSinistre.toLocaleDateString()} ?`}
										 {...form.connect( [ "hasSinistres" ], {
												onChange: hasSinistres =>
																		 form.set( {
																				...form.values,
																				hasSinistres,
																				sinistres: hasSinistres ?
																									 [ {} as any ] :
																									 [],
																		 } ),
										 } )}
									/>
									{values.sinistres && (
										 <ul className="">
												{values.sinistres.map( ( el, index ) => (
													 <li
															key={index}
															className="flex flex-row pb-4"
													 >
															<div className="font-bold text-lg text-gray-400 pr-4">{index + 1}.</div>
															<div className="w-full pt-0.5">
																 <ButtonRadioSelect
																		label="Nature du sinsitre"
																		className="mb-8"
																		data={REMOTE.success( codesNaturesSinistre )}
																		{...form.connect( [ "sinistres", index, "codeNature" ], {
																			 onChange: codeNature =>
																										sinistresCollection.set(
																											 index,
																											 {
																													codeNature,
																													dateSurvenance:     el.dateSurvenance!,
																													codeResponsabilite: undefined!,
																											 },
																										),
																		} )}
																 />
																 
																 {el.codeNature === CODES_NATURES_SINISTRE.COLLISION && (
																		<ButtonRadioSelect
																			 label="Responsabilité"
																			 className="mb-8"
																			 data={responsabilitesSinistre}
																			 {...form.connect( [ "sinistres", index, "codeResponsabilite" ] )}
																		/>)}
																 
																 <DateInput
																		label="Date du sinistre"
																		className="mb-8"
																		{...form.connect( [ "sinistres", index, "dateSurvenance" ] )}
																 />
																 
																 {index > 0 && (
																		<button
																			 className="font-medium right-0 text-gray-400 top-0 underline"
																			 onClick={() => sinistresCollection.remove( index )}
																		>
																			 Supprimer
																		</button>)}
															</div>
													 </li>
												) )}
												{!sinistresCollection.isEmpty && sinistresCollection.isValid && (
													 <li className="flex flex-row mb-12">
															<div className="font-bold text-lg text-gray-400 pr-4">{values.sinistres.length + 1}.</div>
															<div className="pt-0.5">
																 <Label label="Ajouter un sinistre ?">
																		<button
																			 onClick={() => sinistresCollection.push( { codeNature: undefined!, dateSurvenance: undefined! } )}
																			 className="w-10 h-10 text-xl leading-none pb-0.5 cursor-pointer font-bold inline-flex items-center justify-center border-2 rounded-md focus:border-indigo-600 text-center border-gray-300 shadow"
																		>
																			 +
																		</button>
																 </Label>
															</div>
													 </li>)}
										 </ul>
									)}
							 </>)}
						
						{form.isValid && <FormSubmitButton disabled={form.isPending}>Valider</FormSubmitButton>}
				 </form>
			)
	 },
	 {
			mapPropsToValues: () => ({
				 nom:                      undefined!,
				 prenom:                   undefined!,
				 dateNaissance:            undefined!,
				 dateObtentionPermis:      undefined!,
				 codeTypeConducteur:       undefined!,
				 codeTypePermis:           undefined!,
				 codeExperienceConducteur: undefined!,
				 codeCivilite:             undefined!,
			}),
			validationSchema: schema,
			handleSubmit:     ( values, { props } ) => {
				 return handleSubmitPasseAssure( props )( values )
			},
	 },
)

export default PasseAssure
