import { UsageVehiculeStep } from "../contracts"
import { AsyncRadioGroup, CheckableRadio, CheckableRadioPlaceholder, DateInput, useForm, YesNo } from "../kit-2/forms"
import * as DATES from "../kit-2/dates"
import Placeholder, { Placeholders } from "../kit-2/placeholder"
import * as AR from "fp-ts/Array"
import React from "react"
import * as V from "../kit-2/validation"
import * as VEHICULES from "../queries/vehicules"
import * as REMOTE from "../kit-2/remote"

// @todo: [::MONDAY::] go through all step 1 steps
// @todo: [::MONDAY::] verify all posts done
// @todo: [::MONDAY::] verify data correct
// @todo: [::MONDAY::] implement queries


const VehiculeSpecs = ( props: { numeroRepertoire: string, anneeMiseEnCirculation: number, onGoBack: () => void } ) => {
	const [ specs ] = VEHICULES.useSpecs( { params: props, active: true } )
	// @todo: use real specs data
	return REMOTE.isSuccess( specs ) ?
	       (
		       <div className="resultat-recherche-objet">
			       {/* !--PICTOGRAMME GAUCHE -- */}
			       <div id="divRecapVehImageMarqueModele">
				       <div className="picto">
					       <img src="/maiffr/documents/images/illustrations/illus-coupe/suv-illcrop.svg"/>
				       </div>
			       </div>
			
			       {/* !--CONTENU DE LA RECHERCHE -- */}
			       <div className="content">
				       <div className="title">
					       <strong>RENAULT</strong><br className="visible-xs"/>
					       CAPTUR II 1.5 BLUEDCI 95 CH BUSINESS
				       </div>
				
				       <ul className="list-unstyled">
					       {/* !--CARROSSERIE-- */}
					       <li>Carrosserie :<strong>SUV</strong></li>
					       {/* !--TYPE-- */}
					       {/* !--ENERGIE-- */}
					       <li>Energie :<strong>Diesel</strong></li>
					       {/* !--TRANSMISSION-- */}
					       <li>Transmission :<strong>Boîte manuelle</strong></li>
					       {/* !--MOTORISATION-- */}
					       <li>Motorisation :<strong>1.5 BLUEDCI 95 CH</strong></li>
					       {/* !--CHASSIS-- */}
					       {/* !--ANNEE DE 1ERE MISE EN CIRCULATION -- */}
					       <li>Année de première mise en circulation :<strong>2020</strong></li>
				       </ul>
				
				       {/* !--BOUTON MODIFICATION DU TYPE DE RECHERCHE -- */}
				       <button className="link-highlight pull-right"
				               onClick={props.onGoBack}
				       >Modifier
				       </button>
			       </div>
		       </div>
	       ) :
	       <Placeholder
		       className="h-48"
		       state="pending"
	       />
}

const schema = V.record( {
	codeUsageVehicule:       V.string,
	leasingOuCreditEnCours:  V.boolean,
	dateEffetContratDesiree: V.sequence( V.date, V.min( DATES.today() ) ),
} )

const UsageVehicule: UsageVehiculeStep = ( props ) => {
	const [ _values, form ] = useForm( {
		defaultValue: {
			dateEffetContratDesiree: new Date(),
		},
		schema,
		onSubmit:     props.onConfirm,
	} )
	const [ codesTypesUtilisationVehicule ] = VEHICULES.useCodesTypesUtilisation( { params: props, active: true } )
	
	return (
		<form {...form.props}>
			<VehiculeSpecs
				numeroRepertoire={props.numeroRepertoire}
				anneeMiseEnCirculation={props.anneeMiseEnCirculationVehicule}
				onGoBack={() => console.log( "go back" )}
			/>
			<DateInput
				{...form.field( "dateEffetContratDesiree" )}
				min={DATES.today().toISOString()}
				className="mb-4"
				label="A partir de quelle date souhaitez-vous être assuré"
			/>
			
			<YesNo
				{...form.field( "leasingOuCreditEnCours" )}
				className="mb-4"
				label="Ce véhicule est-il financé à crédit (leasing, crédit auto) ?"
			/>
			{/* @todo: iplement using radio select */}
			<AsyncRadioGroup
				{...form.field( "codeUsageVehicule" )}
				className="mb-4"
				label="Pour quels types de déplacements ce véhicule est-il utilisé ?"
				value={form.field( "codeUsageVehicule" ).value}
				data={codesTypesUtilisationVehicule}
				placeholder={props => (
					<div className="grid gap-3">
						<Placeholders count={2}>
							{AR.map( index =>
								<CheckableRadioPlaceholder key={index} {...props}/>,
							)}
						</Placeholders>
					</div>)}
			>
				{( results, radioProps ) =>
					results.map( r =>
						(
							<CheckableRadio
								{...radioProps}
								key={r.value + r.label}
								value={r.value}
								className="mb-2"
							>
								{r.label}
							</CheckableRadio>
						),
					)
				}
			</AsyncRadioGroup>
			<button type="submit">Etape suivante</button>
		</form>)
}

export default UsageVehicule
