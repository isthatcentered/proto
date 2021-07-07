export type BooleanString = "true" | "false"

export const fold = <A, B>( spec: { onTrue: ( value: "true" ) => A, onFalse: ( value: "false" ) => B } ) => ( value: BooleanString ) => {
	 switch ( value ) {
			case "true":
				 return spec.onTrue( value )
			case "false":
				 return spec.onFalse( value )
	 }
}

