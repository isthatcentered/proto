import React, { useState } from "react";
import ReactDOM from "react-dom";
import InitParcours from "./steps/init-parcours"
import { IdentificationConducteurStep, IdentificationVehiculeStep, InitParcoursStep, PasseAssureStep, StepOut, UsageVehiculeStep } from "./contracts"
import IdentificationVehicule from "./steps/identification-vehicule"
import UsageVehicule from "./steps/usage-vehicule"
import IdentificationConducteur from "./steps/identification-conducteur"
import { FormSubmitButton, FormTitle } from "./kit-2/shared"
import { ButtonRadioSelect, DateInput, NumberInput, YesNo } from "./kit-2/forms"
import * as V from "./kit-2/validation"
import { pick } from "./kit-2/helpers"
import * as UF2 from "./kit-2/forms/use-form-2"
import * as DRIVERS from "./queries/drivers"
import * as REMOTE from "./kit-2/remote"
import { constant } from "fp-ts/lib/function"

// @todo: Business rules validation
// @todo: go back and make all fields required
const schema = V.sequence(
	V.record( {
		dateAnterioriteBonus050:            V.date,
		coefficientBonusMalus:              V.number,
		dateSouscriptionAncienAssureur:     V.date,
		dateDEcheanceAncienAssureur:        V.date,
		conduiteAccompagnee:                V.boolean,
		conduiteAccompagneeMaif:            V.either( V.nil, V.boolean ),
		conduiteAccompagneeMaifAvant2007:   V.either( V.nil, V.boolean ),
		sinistreAvecCirconstanceAggravante: V.boolean,
		retraitPermis:                      V.boolean,
		resiliationAssureurPrecedent:       V.boolean,
		sinistres:                          V.array( V.record( { dateSurvenance: V.date, codeResponsabilite: V.string } ) ),
		// conduiteAccompagnee2:               V.either(
		// 	V.nil,
		// 	V.record( {
		// 		conduiteAccompagneeMaif:          V.boolean,
		// 		conduiteAccompagneeMaifAvant2007: V.boolean,
		// 	} ),
		// ),
	} ),
	V.given(
		values => values.conduiteAccompagnee === true,
		V.contramap( pick( [ "conduiteAccompagneeMaifAvant2007", "conduiteAccompagneeMaif" ] ), V.record( {
			conduiteAccompagneeMaifAvant2007: V.boolean,
			conduiteAccompagneeMaif:          V.boolean,
		} ) ),
	),
)

export enum CODES_NATURES_SINISTRE
{
	COLLISION = "01",
	AUTRE     = "02",
}

const codesNaturesSinistre = REMOTE.success( [ { value: CODES_NATURES_SINISTRE.AUTRE, label: "Autre" }, { value: CODES_NATURES_SINISTRE.COLLISION, label: "Collision" } ] )


const struct = {
	dateAnterioriteBonus050:            UF2.field( V.date ),
	coefficientBonusMalus:              UF2.field( V.number ),
	dateSouscriptionAncienAssureur:     UF2.field( V.date ),
	dateDEcheanceAncienAssureur:        UF2.field( V.date ),
	conduiteAccompagnee:                UF2.field( V.boolean ),
	conduiteAccompagneeMaif:            UF2.field( V.either( V.nil, V.boolean ) ),
	conduiteAccompagneeMaifAvant2007:   UF2.field( V.either( V.nil, V.boolean ) ),
	sinistreAvecCirconstanceAggravante: UF2.field( V.boolean ),
	retraitPermis:                      UF2.field( V.boolean ),
	resiliationAssureurPrecedent:       UF2.field( V.boolean ),
	isAutoDateCoefficientValid:         UF2.field( V.boolean ),
	sinistres:                          UF2.list( UF2.record( {
		dateSurvenance:     UF2.field( V.date ),
		codeNature:         UF2.field( V.string ),
		codeResponsabilite: UF2.field( V.either( V.nil, V.string ) ), // @todo: this should be an either
	} ) ),
}

const PasseAssure: PasseAssureStep = ( props ) => {
	const [ { fields, ...form } ] = UF2.useForm( {
		struct,
		onSubmit: values =>
			          props.onConfirm( {
				          ...values,
				          conduiteAccompagneeMaif:          values.conduiteAccompagneeMaif || false,
				          conduiteAccompagneeMaifAvant2007: values.conduiteAccompagneeMaifAvant2007 || false,
				          sinistres:                        [], // @todo: @note filter out non collision sinistres ? codeResponsabilite is required but we only ask when collision
			          } ),
	} )
	const [ responsabilitesSinistre ] = DRIVERS.useResponsabilitesSinistre()
	const [ autoDateAnterioriteBonus050 ] = DRIVERS.useDatesAntecedentsSinistralites(
		fields.dateDEcheanceAncienAssureur.fold( {
			onInvalid: constant( { active: false } ),
			onValid:   value => ({ params: { dateEcheanceAncienAssureur: value }, active: true }),
		} ),
	)
	const handleChangedAccompaniedDriving = ( answer: boolean ) => {
		fields.conduiteAccompagnee.set( true )
		if ( !answer ) form.set( {
			conduiteAccompagnee:              false,
			conduiteAccompagneeMaif:          undefined,
			conduiteAccompagneeMaifAvant2007: undefined,
		} )
	}
	const handleChangedAutoDateAnterioriteCoefficientValid = ( answer: boolean ) => {
		REMOTE.isSuccess( autoDateAnterioriteBonus050 ) &&
		form.set( {
			dateAnterioriteBonus050:    answer ?
			                            autoDateAnterioriteBonus050.value.dateAnterioriteBonus050 :
			                            undefined,
			isAutoDateCoefficientValid: answer,
		} )
	}
	
	const handleToggleSinistres = ( hasSinistres: boolean ) =>
		hasSinistres ?
		fields.sinistres.add() :
		fields.sinistres.clear()
	
	const showConduiteAccompaniedDrivingWithMaifQuestion = fields.conduiteAccompagnee.value === true
	const showConduiteAccompaniedDrivingBefore2007Question = showConduiteAccompaniedDrivingWithMaifQuestion && fields.conduiteAccompagneeMaif.value === true
	const showIsAutoDateCoefficinentValidQuestion = fields.coefficientBonusMalus.value === .5 && REMOTE.isSuccess( autoDateAnterioriteBonus050 )
	const showCustomDateCoefficinentQuestion = showIsAutoDateCoefficinentValidQuestion && fields.isAutoDateCoefficientValid.value === false
	
	console.log( form.value )
	console.log( fields.sinistres )
	
	return (
		<form {...form.props}>
			<FormTitle>Le passé du conducteur</FormTitle>
			<YesNo
				className="mb-8"
				label="Le conducteur a-t-il fait l’objet d’une résiliation par son dernier assureur ou a-t-il provoqué, au cours des 24 derniers mois, un ou plusieurs sinistres avec circonstances aggravantes ?"
				{...fields.sinistreAvecCirconstanceAggravante.props}
			/>
			
			
			<YesNo
				className="mb-8"
				label="Le conducteur a-t-il fait l’objet d’une suspension, d’une annulation ou d’un retrait de permis dans les 2 ans précédent la demande ?"
				{...fields.retraitPermis.props}
			/>
			
			<YesNo
				className="mb-8"
				label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) ?"
				{...fields.conduiteAccompagnee.props}
				onChange={handleChangedAccompaniedDriving}
			/>
			{showConduiteAccompaniedDrivingWithMaifQuestion && (
				<YesNo
					className="mb-8"
					label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) auprès d’une personne assurée MAIF ?"
					{...fields.conduiteAccompagneeMaif.props}
				/>)}
			
			{showConduiteAccompaniedDrivingBefore2007Question && (
				<YesNo
					className="mb-8"
					label="Cet apprentissage a-t-il débuté avant le 01/01/2007 ?"
					{...fields.conduiteAccompagneeMaifAvant2007.props}
				/>)}
			
			<DateInput
				className="mb-8"
				label="Date de la dernière échéance du contrat actuel"
				{...fields.dateDEcheanceAncienAssureur.props}
			/>
			
			<DateInput
				className="mb-8"
				label="Depuis quand le conducteur est-il assuré sans interruption chez son assureur actuel (mm/aaaa)"
				type="month"
				{...fields.dateSouscriptionAncienAssureur.props}
			/>
			
			<NumberInput
				className="mb-8"
				label="Coefficient bonus malus"
				placeholder=".5"
				step="0.1"
				min="0.5"
				{...fields.coefficientBonusMalus.props}
			/>
			
			{showIsAutoDateCoefficinentValidQuestion && REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && (
				<YesNo
					className="mb-8"
					label={`Avez-vous un coefficient de 0,5 depuis le ${autoDateAnterioriteBonus050.value.dateAnterioriteBonus050.toLocaleDateString()}`}
					{...fields.isAutoDateCoefficientValid.props}
					onChange={handleChangedAutoDateAnterioriteCoefficientValid}
				/>)}
			
			{showCustomDateCoefficinentQuestion && (
				<DateInput
					className="mb-8"
					label="Depuis quelle date avez-vous le bonus 0,50 ?"
					type="month"
					{...fields.dateAnterioriteBonus050.props}
				/>)}
			
			{REMOTE.isSuccess( autoDateAnterioriteBonus050 ) && (
				<YesNo
					className="mb-8"
					label={`Le conducteur a-t-il un ou plusieurs sinistres à déclarer depuis le ${autoDateAnterioriteBonus050.value.dateDebutCollecteSinistre.toLocaleDateString()} ?`}
					name="sinistrasADeclarer"
					value={fields.sinistres.value === undefined ?
					       undefined :
					       !fields.sinistres.empty}
					onChange={handleToggleSinistres}
				/>)}
			<ul className="">
				{fields.sinistres.elements.map( ( el, index ) =>
					(
						<li
							key={index}
							className="pl-4 border-l-2 pb-4"
						>
							<DateInput
								label="Date du sinistre"
								className="mb-8"
								{...el.fields.dateSurvenance.props}
							/>
							
							<ButtonRadioSelect
								label="Nature du sinsitre"
								className="mb-8"
								data={codesNaturesSinistre}
								{...el.fields.codeNature.props}
							/>
							{el.fields.codeNature.value === CODES_NATURES_SINISTRE.COLLISION && (
								<ButtonRadioSelect
									label="Responsabilité"
									className="mb-8"
									data={responsabilitesSinistre}
									{...el.fields.codeResponsabilite.props}
								/>)}
						</li>) )}
			</ul>
			
			{!fields.sinistres.empty && fields.sinistres.valid && <button>Ajouter un autre sinistre ?</button>}
			
			{/*// @todo: MONDAY has sinistre ? jouer acceptation: pass*/}
			
			{form.isValid && <FormSubmitButton disabled={form.isPending}>Valider</FormSubmitButton>}
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
	      // {type: "identification-vehicule", data: {codeTypeVehicule: "1234"}}
	      // { type: "usage-vehicule", data: {  } as any }
	      // { type: "identification-conducteur", data: {  }as any }
	      {
		      type: "passe-assure",
		      data: {
			            // codeTypeVehicule:          "code_type_vehicule",
			            //    numeroRepertoire:               "1234",
			            //    anneeMiseEnCirculationVehicule: 2020,
			            //    leasingOuCreditEnCours:         false,
			            //    dateEffetContratDesiree:        new Date(),
			            //    codeUsageVehicule:              "1234",
			            //    nom:                            "nom",
			            //    prenom:                         "prenom",
			            //    dateNaissance:                  new Date(),
			            //    dateObtentionPermis:            new Date(),
			            //    codeTypeConducteur:             "codeTypeConducteur",
			            //    codeTypePermis:                 "codeTypePermis",
			            //    codeExperienceConducteur:       "codeExperienceConducteur",
			            //    codeCivilite:                   "codeCivilite",
		            } as any,
	      }
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

