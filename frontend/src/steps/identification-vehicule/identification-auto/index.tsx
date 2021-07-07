import { IdentificationVehiculeStep, makeStep } from "../../../contracts"
import * as E from "fp-ts/Either"
import React from "react"
import { FormSubmitButton, FormTitle, Grid } from "../../../kit/shared"
import {
	useCarosseries,
	useEnergies,
	useFamilles,
	useFinitions,
	useMarques,
	useMotorisations,
	useNombrePortes,
	useTransmissions,
	verifyVehiculeAccepted,
} from "./queries"
import * as Y from "../../../kit/yup"
import * as yup from "yup"
import {
	getConnect,
	Input2,
	RadioButton,
	RadioSelect,
	Select2,
} from "../../../kit/forms"
import { pipe } from "fp-ts/lib/function"

const usePageData = (values: Partial<yup.Asserts<typeof schema>>) => {
	const params = {
		codeMarque: values.codeMarque,
		anneeMiseEnCirculation: values.anneeMiseEnCirculationVehicule,
		codeFamille: values.codeFamille,
		codeEnergie: values.codeEnergie,
		codeConfigurationPortes: values.codeConfigurationPortes,
		codeTransmission: values.codeTransmission,
		codeMotorisation: values.codeMotorisation,
		codeCarrosserie: values.codeCarosserie,
	}

	return {
		marques: useMarques(),
		familles: useFamilles(params),
		energies: useEnergies(params),
		transmissions: useTransmissions(params),
		motorisations: useMotorisations(params),
		carosseries: useCarosseries(params),
		configurationsPortes: useNombrePortes(params),
		finitions: useFinitions(params),
	}
}

const schema = Y.struct({
	codeMarque: Y.nonEmptyString(),
	anneeMiseEnCirculationVehicule: pipe(
		Y.number(),
		Y.numberBetween(
			1950,
			new Date().getFullYear(),
			"L'année de mise en circulation ne peut être antérieure à 1950",
		),
	),
	codeFamille: Y.nonEmptyString(),
	codeEnergie: Y.nonEmptyString(),
	codeTransmission: Y.nonEmptyString(),
	codeMotorisation: Y.nonEmptyString(),
	codeCarosserie: Y.nonEmptyString(),
	codeConfigurationPortes: Y.nonEmptyString(),
	numeroRepertoire: Y.nonEmptyString(),
})

// @todo: Identify via registration plate
// @todo: Select item automatically if only one choice (keep visible, just check it and store value)
const IdentificationAuto = makeStep<IdentificationVehiculeStep, typeof schema>(
	props => {
		const connect = getConnect(props)
		const data = usePageData(props.values)

		return (
			<form onSubmit={props.handleSubmit}>
				<FormTitle>Votre véhicule</FormTitle>
				<Select2
					{...connect("codeMarque")}
					className="mb-8"
					label="Marque de votre véhicule :"
					data={data.marques}
				/>

				<Input2
					{...connect("anneeMiseEnCirculationVehicule")}
					className="mb-8"
					type="number"
					label="Date de 1ère mise en circulation"
					max={new Date().getFullYear()}
					disabled={!props.values.codeMarque}
					placeholder="2020"
				/>

				<Select2
					{...connect("codeFamille")}
					className="mb-8"
					label="Modèle de votre véhicule :"
					data={data.familles}
				/>

				{/* @note: Maif does essence, diesel, autre */}
				<Select2
					{...connect("codeEnergie")}
					className="mb-8"
					label="Énergie :"
					data={data.energies}
				/>

				{/* @note: Maif does Boite manuelle ? Oui/non */}
				<Select2
					{...connect("codeTransmission")}
					className="mb-8"
					label="Transmission :"
					data={data.transmissions}
				/>

				<Select2
					{...connect("codeMotorisation")}
					className="mb-8"
					label="Motorisation :"
					data={data.motorisations}
				/>

				{/* @note: Maif does Berline/autres */}
				<Select2
					{...connect("codeCarosserie")}
					className="mb-8"
					label="Type de carosserie :"
					data={data.carosseries}
				/>

				<RadioSelect
					{...connect("codeConfigurationPortes")}
					className="mb-8"
					data={data.configurationsPortes}
					label="Nombre de portes :"
				>
					{(data, props) => (
						<Grid cols={3}>
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

				<Select2
					{...connect("numeroRepertoire")}
					className="mb-8"
					label="Finition :"
					data={data.finitions}
				/>

				<FormSubmitButton disabled={props.isSubmitting}>
					Valider
				</FormSubmitButton>
			</form>
		)
	},
	{
		mapPropsToValues: () => ({
			codeMarque: undefined!,
			anneeMiseEnCirculationVehicule: undefined!,
			codeFamille: undefined!,
			codeEnergie: undefined!,
			codeTransmission: undefined!,
			codeMotorisation: undefined!,
			codeCarosserie: undefined!,
			codeConfigurationPortes: undefined!,
			numeroRepertoire: undefined!,
		}),
		validationSchema: schema,
		handleSubmit: (values, { props }) =>
			verifyVehiculeAccepted(values.numeroRepertoire).then(
				E.foldW(
					() => {
						// @todo: display vehicule refused error
					},
					() =>
						props.onConfirm({
							anneeMiseEnCirculationVehicule:
								values.anneeMiseEnCirculationVehicule,
							numeroRepertoire: values.numeroRepertoire,
						}),
				),
			),
	},
)

export default IdentificationAuto
