import { PasseConducteurStep } from "../../contracts"
import React from "react"
import PasseAssure from "./passe-assure"
import PasseSansExperience from "./passe-sans-experience"
import { Alert } from "../../kit-2/alert"




/**
 * { value: "02", label: "Conducteur occasionnel d'un véhicule assuré MAIF" },
 * { value: "03", label: "Assuré auprès d'une autre société" },
 * { value: "04", label: "Sans Expérience" },
 */
const PasseConducteur: PasseConducteurStep = ( props ) => {
	 return (() => {
			switch ( props.codeExperienceConducteur ) {
				 case "03":
						return <PasseAssure {...props}/>
				 case "04":
						return <PasseSansExperience {...props}/>
				 default:
						// @todo: generic alert/warning styles
						return (
							 <Alert type="danger"
											heading="Page not found"
							 >
									<p>Il semble que vous ayez sélectionné une expérience conducteur que nous ne prenons pas en compte.</p>
							 </Alert>)
			}
	 })()
}
export default PasseConducteur
