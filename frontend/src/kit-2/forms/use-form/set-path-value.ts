const setPathValue = <A, B>( path: (string | number)[], value: B, thing: A ): B => {
	if ( !path.length )
		return value
	const [ head, ...tail ] = path
	const isArray = Array.isArray( thing ) || typeof head === "number"
	const copy = isArray ?
	             ((thing as any as any[]) || []).concat() :
	             { ...thing }
	
	;(copy as any)[ head ] = tail.length ?
	                         setPathValue( tail, value, (thing as any)[ head ] ) :
	                         value
	return copy as any
}

export default setPathValue
