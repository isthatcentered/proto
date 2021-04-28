import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SelectQuoteType } from "./pages/select-quote-type"




const getAutoMarquesResponse = [
	{
		"codeMarque":    "683",
		"libelleMarque": "RENAULT",
	},
	{
		"codeMarque":    "391",
		"libelleMarque": "VOLKSWAGEN",
	},
	{
		"codeMarque":    "212",
		"libelleMarque": "AUDI",
	},
	{
		"codeMarque":    "66",
		"libelleMarque": "BMW",
	},
	{
		"codeMarque":    "219",
		"libelleMarque": "PEUGEOT",
	},
	{
		"codeMarque":    "413",
		"libelleMarque": "MERCEDES",
	},
	{
		"codeMarque":    "681",
		"libelleMarque": "FORD",
	},
	{
		"codeMarque":    "1001",
		"libelleMarque": "CITROEN",
	},
	// Maif.fr has "autres marques"
]

// Pass year and brand id
const getAutoModeles = [
	{
		"codeFamille":    "2554",
		"libelleFamille": "MEGANE",
	},
	{
		"codeFamille":    "2553",
		"libelleFamille": "MASTER",
	},
	{
		"codeFamille":    "2535",
		"libelleFamille": "CLIO",
	},
	{
		"codeFamille":    "100000007829",
		"libelleFamille": "CAPTUR",
	},
	{
		"codeFamille":    "2587",
		"libelleFamille": "TRAFIC",
	},
	{
		"codeFamille":    "2595",
		"libelleFamille": "GRAND SCENIC",
	},
	{
		"codeFamille":    "2594",
		"libelleFamille": "SCENIC",
	},
	{
		"codeFamille":    "100000022173",
		"libelleFamille": "KADJAR",
	},
]

// VehiculeType questions as json[] ?

// Marque                    -> radio?
// Année mise circulation    -> number
// Modèle                    -> select
// Energie                   -> select
// Transmission              -> select
// Motorisation              -> select
// Type carosserie           -> select
// Nombre portes             -> select
// Finition                  -> select


const IdentifyCar = () => {
	
	return (
		<>
			[1 Id vehicule] - 2 who drives - 3 blah {"<-"} crumbs
			<h2>Sélection du véhicule à assurer</h2>
			
			
			1/8 Marque
		
		
		</>)
}


const App = () => {
	const [ step, setStep ] = useState( 0 )
	
	return (
		<>
			<p>Wizard styles</p>
			{step === 0 && <SelectQuoteType onFormSubmitted={() => setStep( 1 )}/>}
		</>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
	,
	document.getElementById( "root" ),
);

