import * as Q from "./queries"
import * as REMOTE from "../../kit/remote"
import React from "react"




export const VehiculeSpecs = ( props: { numeroRepertoire: string, anneeMiseEnCirculation: number, onModify: () => void } ) => {
	 const specs = Q.useVehiculeSpecs( props.numeroRepertoire )
	 return REMOTE.isSuccess( specs ) ?
					(
						 <div className="card rounded-md shadow border-2 border-gray-300 p-4">
								<div className="uppercase mb-2 text-indigo-700 text-lg font-bold">
									 <span className="">{specs.value.libelleMarque}</span>&nbsp;
									 {specs.value.denominationCommercialeCourte}
								</div>
				 
								<ul className="mb-2">
									 <li className="mb-1">
											<span className="text-gray-600 font-medium">Carrosserie :&nbsp;</span>
											<span className="font-bold">{specs.value.libelleCarrosserie}</span>
									 </li>
						
									 <li className="mb-1">
											<span className="text-gray-600 font-medium">Energie :&nbsp;</span>
											<span className="font-bold">{specs.value.libelleEnergie}</span>
									 </li>
						
									 <li className="mb-1">
											<span className="text-gray-600 font-medium">Transmission :&nbsp;</span>
											<span className="font-bold">{specs.value.libelleTransmission}</span>
									 </li>
						
									 <li className="mb-1">
											<span className="text-gray-600 font-medium">Motorisation :&nbsp;</span>
											<span className="font-bold">{specs.value.libelleMotorisation}</span>
									 </li>
						
									 <li className="mb-1">
							<span className="text-gray-600 font-medium">
								Année de première mise en circulation :&nbsp;
							</span>
											<span className="font-bold">{props.anneeMiseEnCirculation}</span>
									 </li>
								</ul>
								<div className="flex">
									 <button
											type="button"
											onClick={props.onModify}
											className="ml-auto font-bold text-sm text-gray-600"
									 >
											Modifier
									 </button>
								</div>
						 </div>
					) :
					<div
						 className="h-48 bg-gray-50 animate-pulse"
					/>
}
