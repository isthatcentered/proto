import { IdentificationVehiculeStep } from "../../contracts"
import * as CC from "../../__gen/referentiel-modeles-vehicules/camping-cars"



const IdentificationCampingCar: IdentificationVehiculeStep = _props => {
	CC.useRecupererListeMarquesCampingCars()
	return <h1>not implemented</h1>
}

export default IdentificationCampingCar
