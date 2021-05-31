import { either, eq, list, number, string, struct } from "./schema"




test( `Blah`, () => {
	
	
	// watch( propEq( "", true ), ( values, setValues ) => {
	// } )
	
	const schema = struct( {
		list:   list( either( string, number ) ),
		nested: either(
			struct( { a: eq( true as const ), b: string } ),
			struct( { a: eq( false as const ) } ),
		),
	 } )
} )
