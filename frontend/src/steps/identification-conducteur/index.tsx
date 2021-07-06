import { IdentificationConducteurStep, makeStep } from "../../contracts"
import { FormSubmitButton, FormTitle, Grid } from "../../kit-2/shared"
import React, { useMemo } from "react"
import * as Y from "../../kit-2/yup"
import * as REMOTE from "../../kit-2/remote"
import * as DS from "../../kit-2/date-string"
import { not, pipe } from "fp-ts/lib/function"
import { CheckableRadio2, getConnect, Input2, RadioButton, RadioSelect } from "../../kit-2/forms-2"
import * as Q from "./queries"




const MaximumDateOfBirthToHaveADrivingLicense         = pipe( DS.today(), DS.subYears( 18 ) )
const minimumDateToHaveADrivingLicenseFromDateOfBirth = ( dateNaissance: DS.DateString ) =>
	 pipe( dateNaissance, DS.addYears( 18 ) )

const schema = Y.struct( {
	 nom:                      Y.nonEmptyString(),
	 prenom:                   Y.nonEmptyString(),
	 dateNaissance:            pipe( Y.dateString(), Y.maxDateString( MaximumDateOfBirthToHaveADrivingLicense, "Le conducteur doit avoir au moins 18 ans" ) ),
	 dateObtentionPermis:      pipe( Y.dateString(), Y.maxDateString( DS.today(), "Le conducteur doit avoir obtenu son permis" ) )
																.when( "dateNaissance", ( dateNaissance: DS.DateString, schema: any ) =>
																	 DS.isValid( dateNaissance ) ?
																	 pipe( schema, Y.minDateString( minimumDateToHaveADrivingLicenseFromDateOfBirth( dateNaissance ), "Le permis ne peut-être obtenu avant 18 ans (ajustez la date de naissance si cette date est valide))" ) ) :
																	 schema ),
	 codeTypeConducteur:       Y.nonEmptyString(),
	 codeTypePermis:           Y.nonEmptyString(),
	 codeExperienceConducteur: Y.nonEmptyString(),
	 codeCivilite:             Y.nonEmptyString(),
} )

const IdentificationConducteur = makeStep<IdentificationConducteurStep, typeof schema>(
	 ( props ) => {
			const connect                   = getConnect( props )
			const typesConducteur           = Q.useTypesConducteur()
			const codesCivilite             = Q.useCodesCivilite()
			const codesExperienceConducteur = Q.useExperiencesConducteur()
			const typesPermis               = Q.useTypesPermisForVehicule( props.numeroRepertoire )
			const MinDateObtentionPermis    = useMemo( () =>
				 props.values.dateNaissance ?
				 minimumDateToHaveADrivingLicenseFromDateOfBirth( props.values.dateNaissance ) :
				 undefined, [ props.values.dateNaissance ] )
			const pageLoading               = [ typesConducteur, codesCivilite, codesExperienceConducteur, typesPermis ].some( pipe( REMOTE.isSuccess, not ) )
			
			console.log( props.values, MinDateObtentionPermis )
			
			return (
				 <form onSubmit={props.handleSubmit}>
						<FormTitle>Le conducteur</FormTitle>
						
						<RadioSelect
							 {...connect( "codeTypeConducteur" )}
							 className="mb-8"
							 data={typesConducteur}
							 label="Conducteur principal"
							 disabled={pageLoading}
						>
							 {( data, props ) =>
									<Grid cols={3}>
										 {data.map( code => <RadioButton
												{...props}
												key={code.value}
												value={code.value}
												children={code.label}
										 /> )}
									</Grid>
							 }
						</RadioSelect>
						
						
						
						<RadioSelect
							 {...connect( "codeCivilite" )}
							 className="mb-8"
							 data={codesCivilite}
							 label="Civilité"
							 disabled={pageLoading}
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
						
						
						
						<Input2
							 {...connect( "nom" )}
							 className="mb-8"
							 type="text"
							 label="Nom"
							 disabled={pageLoading}
						/>
						
						
						
						<Input2
							 {...connect( "prenom" )}
							 className="mb-8"
							 type="text"
							 label="Prénom"
							 disabled={pageLoading}
						/>
						
						
						
						<Input2
							 {...connect( "dateNaissance" )}
							 className="mb-8"
							 label="Date de naissance"
							 type="date"
							 max={MaximumDateOfBirthToHaveADrivingLicense}
							 disabled={pageLoading}
						/>
						
						
						
						<Input2
							 {...connect( "dateObtentionPermis" )}
							 className="mb-8"
							 label="Date d'obtention du permis"
							 type="date"
							 max={DS.today()}
							 min={MinDateObtentionPermis}
							 disabled={pageLoading}
						/>
						
						
						
						<RadioSelect
							 {...connect( "codeTypePermis" )}
							 className="mb-8"
							 data={typesPermis}
							 label="Permis obtenu"
							 disabled={pageLoading}
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
						
						
						
						<RadioSelect
							 {...connect( "codeExperienceConducteur" )}
							 className="mb-8"
							 data={codesExperienceConducteur}
							 label="Quel est son passé d'assuré ?"
							 disabled={pageLoading}
						>
							 {( data, props ) =>
									<Grid>
										 {data.map( code =>
												<CheckableRadio2
													 {...props}
													 key={code.value}
													 value={code.value}
													 children={code.label}
												/> )}
									</Grid>}
						</RadioSelect>
						
						<div className="pt-8"/>
						
						{props.isValid && <FormSubmitButton disabled={props.isSubmitting}>Valider</FormSubmitButton>}
				 </form>)
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
			handleSubmit:     ( values, { props } ) =>
													 props.onConfirm( {
															...values,
															dateNaissance:       DS.toDate( values.dateNaissance ),
															dateObtentionPermis: DS.toDate( values.dateObtentionPermis ),
													 } ),
	 },
)

export default IdentificationConducteur
