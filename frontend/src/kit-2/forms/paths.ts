import { AnyRecord } from "../helpers"




export function getPath<T extends AnyRecord, K extends keyof T, K2 extends keyof T[K], K3 extends keyof T[K][K2]>( path: [ key: K, key2: K2, key3: K3 ], thing: T ): T[K][K2][K3]
export function getPath<T extends AnyRecord, K extends keyof T, K2 extends keyof T[K]>( path: [ key: K, key2: K2 ], thing: T ): T[K][K2]
export function getPath<T extends AnyRecord, K extends keyof T>( key: K, thing: T ): T[K]
export function getPath( path: string | string[], thing: AnyRecord )
{
	const _path = [ path ].flat()
	return _path.reduce( ( value, key ) => value[ key ], thing )
}


export function setPath<T extends AnyRecord | any[], K extends keyof T, K2 extends keyof T[K], K3 extends keyof T[K][K2]>( path: [ key: K, key2: K2, key3: K3 ], value: T[K][K2][K3], thing: T ): T
export function setPath<T extends AnyRecord | any[], K extends keyof T, K2 extends keyof T[K]>( path: [ key: K, key2: K2 ], value: T[K][K2], thing: T ): T
export function setPath<T extends AnyRecord | any[], K extends keyof T>( key: K, value: T[K], thing: T ): ( value: T[K] ) => T
export function setPath( path: string | string[], value: any, thing: AnyRecord )
{
	const isArray = ( value: any, key: string | number ): value is any[] | undefined => Array.isArray( value ) || typeof key === "number"
	const _path: (string | number)[] = [ path ].flat()
	const pathHead: string | number = _path[ 0 ]
	const pathTail = _path.slice( 1 )
	const newValue = pathTail.length ?
	                 setPath( pathTail as [ any, any ], value, thing[ pathHead ] ) :
	                 value
	
	if ( isArray( thing, pathHead ) ) {
		const copy = (thing || []).concat()
		copy[ <number>pathHead ] = newValue
		return copy
	}
	
	return {
		...thing,
		[ pathHead ]: newValue,
	}
}
