import { CODE_TYPE_VEHICULE, IdentificationVehiculeStep } from "../../contracts"
import React from "react"
import IdentificationAuto from "./identification-auto"
import IdentificationMoto from "./identification-moto"
import IdentificationCampingCar from "./identification-camping-car"




const IdentificationVehicule: IdentificationVehiculeStep = props => {
	return (() => {
		switch ( props.codeTypeVehicule ) {
			case CODE_TYPE_VEHICULE.AUTO:
				return <IdentificationAuto {...props} />
			case CODE_TYPE_VEHICULE.MOTO:
				return <IdentificationMoto {...props} />
			case CODE_TYPE_VEHICULE.CAMPING_CAR:
				return <IdentificationCampingCar {...props} />
		}
	})()
}

export default IdentificationVehicule
