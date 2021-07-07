import { pipe } from "fp-ts/function"
import { makeStep, PasseConducteurStep } from "../../contracts"
import * as AR from "fp-ts/Array"
import * as E from "fp-ts/Either"
import * as REMOTE from "../../kit/remote"
import { FormSubmitButton, FormTitle, Grid } from "../../kit/shared"
import * as Y from "../../kit/yup"
import React from "react"
import { notNil } from "../../kit/helpers"
import * as DS from "../../kit/date-string"
import { FieldArray } from "formik"
import * as Q from "./queries"
import { CODES_NATURES_SINISTRE } from "./queries"
import * as BS from "../../kit/boolean-string"
import { caSchema } from "./shared"
import {
	getConnect,
	Input,
	Label,
	RadioButton,
	RadioSelect,
	YesNo,
} from "../../kit/forms"

const sinistreSchema = Y.struct({
	dateSurvenance: Y.dateString(),
	codeNature: Y.enumm(CODES_NATURES_SINISTRE),
	codeResponsabilite: pipe(
		Y.nonEmptyString().optional(),
		Y.when<CODES_NATURES_SINISTRE>("codeNature", (codeNature, schema) =>
			codeNature === CODES_NATURES_SINISTRE.COLLISION
				? schema.required()
				: schema,
		),
	),
})

const isSinistreCollision = (
	sinistre: Y.Asserts<typeof sinistreSchema>,
): sinistre is {
	dateSurvenance: DS.DateString
	codeResponsabilite: string
	codeNature: CODES_NATURES_SINISTRE
} =>
	sinistre.codeNature === CODES_NATURES_SINISTRE.COLLISION &&
	sinistre.codeResponsabilite !== undefined

const schema = Y.struct({
	dateAnterioriteBonus050: Y.dateString(),
	coefficientBonusMalus: Y.number(),
	dateSouscriptionAncienAssureur: Y.monthDate(),
	dateDEcheanceAncienAssureur: Y.dateString(),
	sinistreAvecCirconstanceAggravante: Y.bool(),
	retraitPermis: Y.bool(),
	isAutoDateCoefficientValid: Y.bool(),
	hasSinistres: Y.bool(),
	sinistres: Y.array(sinistreSchema),
	ca: caSchema,
})

const computeShouldShows = (values: Y.Asserts<typeof schema>) => {
	const showIsAutoDateCoefficinentValidQuestion =
		values.coefficientBonusMalus === 0.5
	return {
		showConduiteAccompaniedDrivingWithMaifQuestion:
			values.ca.conduiteAccompagnee === "true",
		showConduiteAccompaniedDrivingBefore2007Question:
			values.ca.conduiteAccompagnee === "true" &&
			values.ca.conduiteAccompagneeMaif === "true",
		showIsAutoDateCoefficinentValidQuestion:
			showIsAutoDateCoefficinentValidQuestion,
		showCustomDateCoefficinentQuestion:
			showIsAutoDateCoefficinentValidQuestion &&
			values.isAutoDateCoefficientValid === "false",
		showSinistres: values.coefficientBonusMalus === 0.5,
	}
}

const collectionHasErrors = (field: Array<any> | string | undefined): boolean =>
	!!field && Array.isArray(field) ? field.filter(notNil).length > 0 : false

const PasseAssure = makeStep<PasseConducteurStep, typeof schema>(
	props => {
		const connect = getConnect(props)
		const codesNaturesSinistre = Q.useCodesNaturesSinistres()
		const responsabilitesSinistre = Q.useResponsabilitesSinistres()
		const autoDateAnterioriteBonus050 = Q.useDatesAntecedentsSinistralite(
			props.values.dateDEcheanceAncienAssureur,
		)
		const shouldShow = computeShouldShows(props.values)

		const handleCAChanged = BS.fold({
			onTrue: () => {
				props.setValues({
					...props.values,
					ca: {
						...props.values.ca,
						conduiteAccompagnee: "true",
					},
				})

				props.setTouched(
					{
						...props.touched,
						ca: { ...props.touched.ca, conduiteAccompagnee: true },
					},
					false,
				)
			},
			onFalse: () => {
				props.setValues({
					...props.values,
					ca: {
						conduiteAccompagnee: "false",
						conduiteAccompagneeMaif: undefined!,
						conduiteAccompagneeMaifAvant2007: undefined!,
					},
				})

				props.setTouched(
					{ ...props.touched, ca: { conduiteAccompagnee: true } },
					false,
				)
			},
		})

		const handleCAMAIFChanged = BS.fold({
			onTrue: () => {
				props.setValues({
					...props.values,
					ca: {
						...props.values.ca,
						conduiteAccompagneeMaif: "true",
					},
				})

				props.setTouched(
					{
						...props.touched,
						ca: { ...props.touched.ca, conduiteAccompagneeMaif: true },
					},
					false,
				)
			},
			onFalse: () => {
				props.setValues({
					...props.values,
					ca: {
						...props.values.ca,
						conduiteAccompagneeMaif: "false",
						conduiteAccompagneeMaifAvant2007: undefined!,
					},
				})

				props.setTouched(
					{
						...props.touched,
						ca: {
							...props.touched.ca,
							conduiteAccompagneeMaif: true,
							conduiteAccompagneeMaifAvant2007: false,
						},
					},
					false,
				)
			},
		})

		const handleChangedIsAutoDateCoefficientValid = (
			value: BS.BooleanString,
		) => {
			if (!REMOTE.isSuccess(autoDateAnterioriteBonus050)) return

			props.setValues(values => ({
				...values,
				isAutoDateCoefficientValid: value,
				dateAnterioriteBonus050:
					value === "true"
						? DS.fromDate(
								autoDateAnterioriteBonus050.value.dateAnterioriteBonus050,
						  )
						: undefined!,
			}))

			props.setTouched(
				{ ...props.touched, isAutoDateCoefficientValid: true },
				false,
			)
		}

		const handleChangedHasSinistres = BS.fold({
			onTrue: () => {
				props.setValues(values => ({
					...values,
					hasSinistres: "true",
					sinistres: props.values.sinistres.length
						? props.values.sinistres
						: [{} as any],
				}))

				props.setTouched({ ...props.touched, hasSinistres: true }, false)
			},
			onFalse: () => {
				props.setValues({
					...props.values,
					hasSinistres: "false",
					sinistres: [],
				})
				props.setTouched(
					{
						...props.touched,
						hasSinistres: true, // We need to mark all existing items fields as untouched, otherwise the errors will appear if we set back to true
						sinistres: props.values.sinistres.map(_ => ({
							dateSurvenance: undefined,
							codeNature: undefined,
							codeResponsabilite: undefined,
						})),
					},
					false,
				)
			},
		})

		return (
			<form onSubmit={props.handleSubmit}>
				<FormTitle>Le passé du conducteur</FormTitle>

				<YesNo
					{...connect("sinistreAvecCirconstanceAggravante")}
					className="mb-8"
					label="Le conducteur a-t-il fait l’objet d’une résiliation par son dernier assureur ou a-t-il provoqué, au cours des 24 derniers mois, un ou plusieurs sinistres avec circonstances aggravantes ?"
				/>

				<YesNo
					{...connect("retraitPermis")}
					className="mb-8"
					label="Le conducteur a-t-il fait l’objet d’une suspension, d’une annulation ou d’un retrait de permis dans les 2 ans précédent la demande ?"
				/>

				<YesNo
					{...connect(["ca", "conduiteAccompagnee"])}
					className="mb-8"
					label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) ?"
					onChange={handleCAChanged}
				/>

				{shouldShow.showConduiteAccompaniedDrivingWithMaifQuestion && (
					<YesNo
						{...connect(["ca", "conduiteAccompagneeMaif"])}
						className="mb-8"
						label="A-t-il bénéficié de l’apprentissage anticipé de la conduite (conduite accompagnée) auprès d’une personne assurée MAIF ?"
						onChange={handleCAMAIFChanged}
					/>
				)}

				{shouldShow.showConduiteAccompaniedDrivingBefore2007Question && (
					<YesNo
						{...connect(["ca", "conduiteAccompagneeMaifAvant2007"])}
						className="mb-8"
						label="Cet apprentissage a-t-il débuté avant le 01/01/2007 ?"
					/>
				)}

				<Input
					{...connect("dateDEcheanceAncienAssureur")}
					className="mb-8"
					label="Date de la dernière échéance du contrat actuel"
					type="date"
				/>

				<Input
					{...connect("dateSouscriptionAncienAssureur")}
					className="mb-8"
					label="Depuis quand le conducteur est-il assuré sans interruption chez son assureur actuel (mm/aaaa)"
					type="month"
				/>

				<Input
					{...connect("coefficientBonusMalus")}
					className="mb-8"
					label="Coefficient bonus malus"
					placeholder=".5"
					step="0.1"
					min="0.5"
					type="number"
				/>

				{shouldShow.showIsAutoDateCoefficinentValidQuestion &&
					REMOTE.isSuccess(autoDateAnterioriteBonus050) && (
						<YesNo
							{...connect("isAutoDateCoefficientValid")}
							className="mb-8"
							label={`Avez-vous un coefficient de 0,5 depuis le ${autoDateAnterioriteBonus050.value.dateAnterioriteBonus050.toLocaleDateString()}`}
							onChange={handleChangedIsAutoDateCoefficientValid}
						/>
					)}

				{shouldShow.showCustomDateCoefficinentQuestion && (
					<Input
						{...connect("dateAnterioriteBonus050")}
						className="mb-8"
						label="Depuis quelle date avez-vous le bonus 0,50 ?"
						type="date"
					/>
				)}

				{shouldShow.showSinistres &&
					REMOTE.isSuccess(autoDateAnterioriteBonus050) && (
						<>
							<div className="pt-8" />
							<FormTitle>Sinistres</FormTitle>
							<YesNo
								{...connect("hasSinistres")}
								className="mb-8"
								label={`Le conducteur a-t-il un ou plusieurs sinistres à déclarer depuis le ${autoDateAnterioriteBonus050.value.dateDebutCollecteSinistre.toLocaleDateString()} ?`}
								onChange={handleChangedHasSinistres}
							/>

							<FieldArray {...connect("sinistres")}>
								{helpers =>
									props.values.sinistres && (
										<ul>
											{props.values.sinistres.map((el, index) => (
												<li key={index} className="flex flex-row pb-4">
													<div className="font-bold text-lg text-gray-400 pr-4">
														{index + 1}.
													</div>
													<div className="w-full pt-0.5">
														<RadioSelect
															{...connect(["sinistres", index, "codeNature"])}
															className="mb-8"
															data={REMOTE.success(codesNaturesSinistre)}
															label="Nature du sinsitre"
														>
															{(data, props) => (
																<Grid cols={2}>
																	{data.map(code => (
																		<RadioButton
																			{...props}
																			key={code.value}
																			value={code.value}
																			children={code.label}
																		/>
																	))}
																</Grid>
															)}
														</RadioSelect>

														{el.codeNature ===
															CODES_NATURES_SINISTRE.COLLISION && (
															<RadioSelect
																label="Responsabilité"
																className="mb-8"
																data={responsabilitesSinistre}
																{...connect([
																	"sinistres",
																	index,
																	"codeResponsabilite",
																])}
															>
																{(data, props) => (
																	<Grid cols={2}>
																		{data.map(code => (
																			<RadioButton
																				{...props}
																				key={code.value}
																				value={code.value}
																				children={code.label}
																			/>
																		))}
																	</Grid>
																)}
															</RadioSelect>
														)}

														<Input
															{...connect([
																"sinistres",
																index,
																"dateSurvenance",
															])}
															label="Date du sinistre"
															type="date"
															className="mb-8"
														/>

														{index > 0 && (
															<button
																className="font-medium right-0 text-gray-400 top-0 underline"
																onClick={() => helpers.remove(index)}
															>
																Supprimer
															</button>
														)}
													</div>
												</li>
											))}
											{props.values.sinistres.length > 0 &&
												!collectionHasErrors(props.errors.sinistres) && (
													<li className="flex flex-row mb-12">
														<div className="font-bold text-lg text-gray-400 pr-4">
															{props.values.sinistres.length + 1}.
														</div>
														<div className="pt-0.5">
															<Label
																label="Ajouter un sinistre ?"
																disabled={false}
															>
																<button
																	type="button"
																	onClick={() => helpers.push({})}
																	className="w-10 h-10 text-xl leading-none pb-0.5 cursor-pointer font-bold inline-flex items-center justify-center border-2 rounded-md focus:border-indigo-600 text-center border-gray-300 shadow"
																>
																	+
																</button>
															</Label>
														</div>
													</li>
												)}
										</ul>
									)
								}
							</FieldArray>
						</>
					)}

				<FormSubmitButton disabled={props.isSubmitting}>
					Valider
				</FormSubmitButton>
			</form>
		)
	},
	{
		mapPropsToValues: () => ({
			dateAnterioriteBonus050: undefined!,
			coefficientBonusMalus: undefined!,
			dateSouscriptionAncienAssureur: undefined!,
			dateDEcheanceAncienAssureur: undefined!,
			sinistreAvecCirconstanceAggravante: undefined!,
			retraitPermis: undefined!,
			isAutoDateCoefficientValid: undefined!,
			hasSinistres: undefined!,
			sinistres: [],
			ca: {
				conduiteAccompagnee: undefined!,
				conduiteAccompagneeMaif: undefined!,
				conduiteAccompagneeMaifAvant2007: undefined!,
			},
		}),
		validationSchema: schema,
		handleSubmit: (values, { props }) => {
			const sinistresCollision = pipe(
				values.sinistres,
				AR.filter(isSinistreCollision),
			)
			// @todo: change all saved dates to Datestring
			// @todo: Datestring month adds default day ?
			// @todo: cleanup
			Q.checkAcceptationProspect({
				conducteur: {
					codeExperienceConducteur: props.codeExperienceConducteur,
					codeTypeConducteur: props.codeTypeConducteur,
					dateNaissance: DS.toISO8601(props.dateNaissance),
					dateObtentionPermis: DS.toISO8601(props.dateObtentionPermis),
					nom: props.nom,
					prenom: props.prenom,
					coefficientBonusMalus: values.coefficientBonusMalus,
					dateDEcheanceAncienAssureur: DS.toISO8601(
						values.dateDEcheanceAncienAssureur,
					),
					retraitPermis: values.retraitPermis === "true",
					sinistreAvecCirconstanceAggravante:
						values.sinistreAvecCirconstanceAggravante === "true",
					sinistres: pipe(
						sinistresCollision,
						AR.map(s => ({
							...s,
							dateSurvenance: DS.toISO8601(s.dateSurvenance),
						})),
					),
				},
				vehicule: {
					numeroRepertoire: props.numeroRepertoire,
					codeUsageVehicule: props.codeUsageVehicule,
				},
				dateEffet: DS.toISO8601(props.dateEffetContratDesiree),
			}).then(
				E.foldW(
					() => {
						console.log("Failure")
						// @todo: display rejected error
						// @todo: display errors
					},
					() =>
						props.onConfirm({
							conduiteAccompagnee: values.ca.conduiteAccompagnee === "true",
							conduiteAccompagneeMaif:
								values.ca.conduiteAccompagneeMaif === "true",
							conduiteAccompagneeMaifAvant2007:
								values.ca.conduiteAccompagneeMaifAvant2007 === "true",
							coefficientBonusMalus: values.coefficientBonusMalus,
							dateAnterioriteBonus050: values.dateAnterioriteBonus050,
							dateDEcheanceAncienAssureur: values.dateDEcheanceAncienAssureur,
							dateSouscriptionAncienAssureur: DS.fromDate(
								new Date(values.dateSouscriptionAncienAssureur),
							),
							retraitPermis: values.retraitPermis === "true",
							sinistreAvecCirconstanceAggravante:
								values.sinistreAvecCirconstanceAggravante === "true",
							sinistres: sinistresCollision,
						}),
				),
			)
		},
	},
)

export default PasseAssure
