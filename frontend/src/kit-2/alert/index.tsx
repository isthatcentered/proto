import React, { ComponentType, PropsWithChildren } from "react"
import { CheckCircleIcon, ExclamationIcon, XCircleIcon } from "@heroicons/react/solid"




export const Alert = ( props: PropsWithChildren<{ type: "warning" | "success" | "danger", heading: string }> ) => {
	 const colors: Record<typeof props["type"], string>            = {
			warning: "yellow",
			success: "green",
			danger:  "red",
	 }
	 const icons: Record<typeof props["type"], ComponentType<any>> = {
			warning: ExclamationIcon,
			success: CheckCircleIcon,
			danger:  XCircleIcon,
	 }
	 const Icon                                                    = icons[ props.type ]
	 const color                                                   = colors[ props.type ]
	 
	 return (
			<div className={`rounded-md bg-${color}-50 p-4`}>
				 <div className="flex">
						<div className="flex-shrink-0">
							 <Icon className={`h-5 w-5 text-${color}-400`}
										 aria-hidden="true"
							 />
						</div>
						<div className="ml-3">
							 <h3 className={`text-sm font-medium text-${color}-800`}>{props.heading}</h3>
							 {props.children && <div className={`mt-2 text-sm text-${color}-700`}>
									{props.children}
					</div>}
							 
							 {/* Actions */}
							 {/*<div className="mt-4">*/}
							 {/*	<div className="-mx-2 -my-1.5 flex">*/}
							 {/*		<button*/}
							 {/*			type="button"*/}
							 {/*			className={`bg-${color}-50 px-2 py-1.5 rounded-md text-sm font-medium text-${color}-800 hover:bg-${color}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${color}-50 focus:ring-${color}-600`}*/}
							 {/*		>*/}
							 {/*			View status*/}
							 {/*		</button>*/}
							 {/*		<button*/}
							 {/*			type="button"*/}
							 {/*			className={`ml-3 bg-${color}-50 px-2 py-1.5 rounded-md text-sm font-medium text-${color}-800 hover:bg-${color}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${color}-50 focus:ring-green-600`}*/}
							 {/*		>*/}
							 {/*			Dismiss*/}
							 {/*		</button>*/}
							 {/*	</div>*/}
							 {/*</div>*/}
						</div>
				 </div>
			</div>
	 )
}
