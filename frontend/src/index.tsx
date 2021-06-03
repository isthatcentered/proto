import React, { useState } from "react";
import ReactDOM from "react-dom";
import InitParcours from "./steps/init-parcours"
import { IdentificationConducteurStep, IdentificationVehiculeStep, InitParcoursStep, PasseAssureStep, StepOut, UsageVehiculeStep } from "./contracts"
import IdentificationVehicule from "./steps/identification-vehicule"
import UsageVehicule from "./steps/usage-vehicule"
import IdentificationConducteur from "./steps/identification-conducteur"
import { FormSubmitButton, FormTitle } from "./kit-2/shared"
import { ButtonRadioSelect, DateInput, Label, MonthInput, NumberInput, useForm, YesNo } from "./kit-2/forms"
import * as V from "./kit-2/validation"
import * as DRIVERS from "./queries/drivers"
import * as REMOTE from "./kit-2/remote"
import { constant } from "fp-ts/lib/function"
import * as BOOL from "fp-ts/boolean"
import * as STR from "fp-ts/string"
import { flow, pipe } from "fp-ts/function"
import { prop } from "./kit-2/helpers"
import * as AR from "fp-ts/Array"
import * as E from "fp-ts/Either"

// @todo: Business rules validation
// @todo: go back and make all fields required
// @todo: field dirty, show errors
// @todo: ca: false | {maif, maif2007}
// @todo: navigator.ca !== false && (div props(navigator.ca.maif2007)) <- deal with unions ??? but how ?



export enum CODES_NATURES_SINISTRE
{
	COLLISION = "01",
	AUTRE     = "02",
}

const sinistreCollisionSchema = V.record( {
	dateSurvenance:     V.date,
	codeNature:         V.eq( CODES_NATURES_SINISTRE.COLLISION, STR.Eq ),
	codeResponsabilite: V.string,
} )

const sinistreAutreSchema = V.record( {
	dateSurvenance: V.date,
	codeNature:     V.eq( CODES_NATURES_SINISTRE.AUTRE, STR.Eq ),
} )

const isSinistreCollision = ( sinistre: V.ValidatedType<typeof sinistreCollisionSchema | typeof sinistreAutreSchema> ): sinistre is V.ValidatedType<typeof sinistreCollisionSchema> => {
	return sinistre.codeNature === CODES_NATURES_SINISTRE.COLLISION && !!sinistre.codeResponsabilite
}

const codesNaturesSinistre = [ { value: CODES_NATURES_SINISTRE.AUTRE, label: "Autre" }, { value: CODES_NATURES_SINISTRE.COLLISION, label: "Collision" } ]


const schema = V.sequence(
	V.record( {
		dateAnterioriteBonus050:            V.date,
		coefficientBonusMalus:              V.number,
		dateSouscriptionAncienAssureur:     V.date,
		dateDEcheanceAncienAssureur:        V.date,
		sinistreAvecCirconstanceAggravante: V.boolean,
		retraitPermis:                      V.boolean,
		resiliationAssureurPrecedent:       V.boolean,
		isAutoDateCoefficientValid:         V.boolean,
		hasSinistres:                       V.boolean,
		sinistres:                          V.either(
			V.nil,
			V.array( V.either( sinistreAutreSchema, sinistreCollisionSchema ) ),
		),
		ca:                                 V.either(
			V.record( {
				conduiteAccompagnee: V.eq( false, BOOL.Eq ),
			} ),
			V.record( {
				conduiteAccompagnee:              V.eq( true, BOOL.Eq ),
				conduiteAccompagneeMaif:          V.boolean,
				conduiteAccompagneeMaifAvant2007: V.either( V.nil, V.boolean ),
			} ),
		),
	} ),
)


const is = <A extends any>( a: A ) => ( b: A | undefined ) => a === b

const PasseAssure: PasseAssureStep = ( props ) => {
	const [ values, form2 ] = useForm( {
		defaultValue: {
			// sinistres: [ {} as any ], coefficientBonusMalus: .5, dateAnterioriteBonus050: new Date(), dateSouscriptionAncienAssureur: new Date(), dateDEcheanceAncienAssureur: new Date()
		},
		schema,
		onSubmit:     values => {
			const sinistresCollision = pipe(
				values.sinistres || [],
				AR.filter( isSinistreCollision ),
			)
			const conduiteAccompagnee =
				      values.ca.conduiteAccompagnee === true ?
				      {
					      ...values.ca,
					      conduiteAccompagneeMaifAvant2007: values.ca.conduiteAccompagneeMaifAvant2007 || false,
				      } :
				      {
					      conduiteAccompagnee:              false,
					      conduiteAccompagneeMaif:          false,
					      conduiteAccompagneeMaifAvant2007: false,
				      }
			
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
						resiliationAssureurPrecedent:       values.resiliationAssureurPrecedent,
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
						...conduiteAccompagnee,
						coefficientBonusMalus:              values.coefficientBonusMalus,
						dateAnterioriteBonus050:            values.dateAnterioriteBonus050,
						dateDEcheanceAncienAssureur:        values.dateDEcheanceAncienAssureur,
						dateSouscriptionAncienAssureur:     values.dateSouscriptionAncienAssureur,
						resiliationAssureurPrecedent:       values.resiliationAssureurPrecedent,
						retraitPermis:                      values.retraitPermis,
						sinistreAvecCirconstanceAggravante: values.sinistreAvecCirconstanceAggravante,
						sinistres:                          sinistresCollision,
					} ),
					),
				)
		},
	} )
	const sinistresCollection = form2.collection( form2.fields.field( "sinistres" ) )
	
	const [ responsabilitesSinistre ] = DRIVERS.useResponsabilitesSinistre()
	const [ autoDateAnterioriteBonus050 ] = DRIVERS.useDatesAntecedentsSinistralites(
		form2.fields.field( "dateDEcheanceAncienAssureur" ).validated( {
			onInvalid: constant( { active: false } ),
			onValid:   value => ({ params: { dateEcheanceAncienAssureur: value }, active: true }),
		} ),
	)
	
	form2.invariants( [
		[
			flow( prop( "isAutoDateCoefficientValid" ), is( true ) ),
			values => ({
				...values,
				dateAnterioriteBonus050: REMOTE.isSuccess( autoDateAnterioriteBonus050 ) ?
				                         autoDateAnterioriteBonus050.value.dateAnterioriteBonus050 :
				                         undefined,
			}),
		],
		[
			flow( prop( "hasSinistres" ), is( false ) ),
			values => ({
				...values,
				sinistres: [],
			}),
		],
		[
			values => values.hasSinistres === true && (values.sinistres || []).length === 0,
			values => ({
				...values,
				sinistres: [ { dateSurvenance: undefined, codeNature: undefined, codeResponsabilite: undefined } ],
			}),
		],
		[
			values => values.ca?.conduiteAccompagnee === false,
			values => ({
				...values,
				ca: { conduiteAccompagnee: false, conduiteAccompagneeMaif: undefined, conduiteAccompagneeMaifAvant2007: undefined },
			}),
		],
		[
			values => values.ca?.conduiteAccompagneeMaif === false,
			values => ({
				...values,
				ca: { ...values.ca!, conduiteAccompagneeMaifAvant2007: undefined },
			}),
		],
	] )
	
	const showConduiteAccompaniedDrivingWithMaifQuestion = values.ca?.conduiteAccompagnee === true
	const showConduiteAccompaniedDrivingBefore2007Question = values.ca?.conduiteAccompagnee === true && values.ca.conduiteAccompagneeMaif === true
	const showIsAutoDateCoefficinentValidQuestion = values.coefficientBonusMalus === .5 && REMOTE.isSuccess( autoDateAnterioriteBonus050 )
	const showCustomDateCoefficinentQuestion = showIsAutoDateCoefficinentValidQuestion && values.isAutoDateCoefficientValid === false
	const showSinistres = REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && values.coefficientBonusMalus === .5
	
	return (
		<form {...form2.props}>
			<FormTitle>Le passé du conducteur</FormTitle>
			<YesNo
				className="mb-8"
				label="Le conducteur a-t-il fait l’objet d’une résiliation par son dernier assureur ou a-t-il provoqué, au cours des 24 derniers mois, un ou plusieurs sinistres avec circonstances aggravantes ?"
				{...form2.fields.field( "sinistreAvecCirconstanceAggravante" ).props}
			/>
			
			
			<YesNo
				className="mb-8"
				label="Le conducteur a-t-il fait l’objet d’une suspension, d’une annulation ou d’un retrait de permis dans les 2 ans précédent la demande ?"
				{...form2.fields.field( "retraitPermis" ).props}
			/>
			
			<YesNo
				className="mb-8"
				label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) ?"
				{...form2.fields.field( "ca" ).force( "conduiteAccompagnee" ).props}
			/>
			{showConduiteAccompaniedDrivingWithMaifQuestion && (
				<YesNo
					className="mb-8"
					label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) auprès d’une personne assurée MAIF ?"
					{...form2.fields.field( "ca" ).force( "conduiteAccompagneeMaif" ).props}
				/>)}
			
			{showConduiteAccompaniedDrivingBefore2007Question && (
				<YesNo
					className="mb-8"
					label="Cet apprentissage a-t-il débuté avant le 01/01/2007 ?"
					{...form2.fields.field( "ca" ).force( "conduiteAccompagneeMaifAvant2007" ).props}
				/>)}
			
			<DateInput
				className="mb-8"
				label="Date de la dernière échéance du contrat actuel"
				{...form2.fields.field( "dateDEcheanceAncienAssureur" ).props}
			/>
			
			<MonthInput
				className="mb-8"
				label="Depuis quand le conducteur est-il assuré sans interruption chez son assureur actuel (mm/aaaa)"
				{...form2.fields.field( "dateSouscriptionAncienAssureur" ).props}
			/>
			
			<NumberInput
				className="mb-8"
				label="Coefficient bonus malus"
				placeholder=".5"
				step="0.1"
				min="0.5"
				{...form2.fields.field( "coefficientBonusMalus" ).props}
			/>
			
			{showIsAutoDateCoefficinentValidQuestion && REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && (
				<YesNo
					className="mb-8"
					label={`Avez-vous un coefficient de 0,5 depuis le ${autoDateAnterioriteBonus050.value.dateAnterioriteBonus050.toLocaleDateString()}`}
					{...form2.fields.field( "isAutoDateCoefficientValid" ).props}
				/>)}
			
			{showCustomDateCoefficinentQuestion && (
				<DateInput
					className="mb-8"
					label="Depuis quelle date avez-vous le bonus 0,50 ?"
					{...form2.fields.field( "dateAnterioriteBonus050" ).props}
				/>)}
			
			{showSinistres && (
				<>
					<div className="pt-8"/>
					<FormTitle>Sinistres</FormTitle>
					{
						REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && (
							<YesNo
								className="mb-8"
								label={`Le conducteur a-t-il un ou plusieurs sinistres à déclarer depuis le ${autoDateAnterioriteBonus050.value.dateDebutCollecteSinistre.toLocaleDateString()} ?`}
								{...form2.fields.field( "hasSinistres" ).props}
							/>)
					}
					{values.sinistres && (
						<ul className="">
							{values.sinistres.map( ( el, index ) => (
								<li
									key={index}
									className="flex flex-row pb-4"
								>
									<div className="font-bold text-lg text-gray-400 pr-4">{index + 1}.</div>
									<div className="w-full pt-0.5">
										<DateInput
											label="Date du sinistre"
											className="mb-8"
											{...form2.connect( [ "sinistres", index, "dateSurvenance" ] )}
										/>
										
										<ButtonRadioSelect
											label="Nature du sinsitre"
											className="mb-8"
											data={REMOTE.success( codesNaturesSinistre )}
											{...form2.connect( [ "sinistres", index, "codeNature" ] )}
										/>
										{el.codeNature === CODES_NATURES_SINISTRE.COLLISION && (
											<ButtonRadioSelect
												label="Responsabilité"
												className="mb-8"
												data={responsabilitesSinistre}
												{...form2.connect( [ "sinistres", index, "codeResponsabilite" ] )}
											/>)}
										
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
							{form2.fields.field( "sinistres" ).isValid && (
								<li className="flex flex-row mb-12">
									<div className="font-bold text-lg text-gray-400 pr-4">{values.sinistres.length + 1}.</div>
									<div className="pt-0.5">
										<Label label="Ajouter un sinistre ?">
											<button
												onClick={() => sinistresCollection.push( {} )}
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
			
			{form2.isValid && <FormSubmitButton disabled={form2.isPending}>Valider</FormSubmitButton>}
		</form>
	)
}

// Each step data is the accumulated data of all the previous steps
type IdentificationVehiculeData = StepOut<InitParcoursStep>
type UsageVehiculeData = IdentificationVehiculeData & StepOut<IdentificationVehiculeStep>
type IdentificationConducteurData = UsageVehiculeData & StepOut<UsageVehiculeStep>
type PasseAssureData = IdentificationConducteurData & StepOut<IdentificationConducteurStep>

type Step =
	| { type: "init-parcours" }
	| { type: "identification-vehicule", data: IdentificationVehiculeData }
	| { type: "usage-vehicule", data: UsageVehiculeData }
	| { type: "identification-conducteur", data: IdentificationConducteurData }
	| { type: "passe-assure", data: PasseAssureData }

const stepOverride: Step | undefined =
	      // undefined
	      // { type: "init-parcours" }
	      // {type: "identification-vehicule", data: {codeTypeVehicule: "1234"}}
	      // { type: "usage-vehicule", data: {  } as any }
	      // { type: "identification-conducteur", data: {  }as any }
	      { type: "passe-assure", data: {} as any }

const initialState: Step = stepOverride || { type: "init-parcours" }

// @todo: allow going back to previous step
const App = () => {
	const [ step, setNextStep ] = useState<Step>( initialState )
	// console.log( step )
	
	return (
		<div
			className="container mx-auto px-4 py-16 mb-12"
			style={{ maxWidth: 500 }}
		>
			{(() => {
				switch ( step.type ) {
					case "init-parcours":
						return <InitParcours onConfirm={values => setNextStep( { type: "identification-vehicule", data: values } )}/>
					case "identification-vehicule":
						// @todo: go to autos/bikes/campers according to given "typeVehicule"
						return <IdentificationVehicule
							{...step.data}
							onConfirm={values => setNextStep( { type: "usage-vehicule", data: { ...step.data, ...values } } )}
						/>
					case "usage-vehicule":
						return <UsageVehicule
							anneeMiseEnCirculationVehicule={step.data.anneeMiseEnCirculationVehicule}
							numeroRepertoire={step.data.numeroRepertoire}
							onConfirm={values => setNextStep( { type: "identification-conducteur", data: { ...step.data, ...values } } )}
						/>
					case "identification-conducteur":
						return <IdentificationConducteur
							numeroRepertoire={step.data.numeroRepertoire}
							onConfirm={
								values => setNextStep( { type: "passe-assure", data: { ...step.data, ...values } } )
							}
						/>
					case "passe-assure":
						return <PasseAssure {...step.data} onConfirm={values => console.log( "confirmed", values )}/>
				}
			})()}
			
			{/*<UsageVehicule*/}
			{/*	numeroRepertoire={"1234"}*/}
			{/*	onConfirm={console.log}*/}
			{/*/>*/}
		</div>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
	,
	document.getElementById( "root" ),
);

