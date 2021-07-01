export type JsonPrimitive = string | number | boolean | null | JsonPrimitive[]

const renderValue = ( value: string | number | boolean | null ) => value ?? "null"

const renderParam = ( key: string, value: JsonPrimitive ): string =>
	Array.isArray( value ) ?
	renderParam( key, value.join( "," ) ) : // key=value1,value2,...
	`${key}=${renderValue( value )}` // key=value


/**
 * The Axio's default encoding for query params doesn't work with our api
 * Ex:
 * { blah: [1, 2] } -> "blah[]=1&blah[]=2"
 *
 * we need "blah=1,2"
 */
const encode = ( query: Record<string, JsonPrimitive> ): string =>
	Object.keys( query ).map( key => renderParam( key, query[ key ] ) ).join( "&" )

export default encode
