export const notNil = <T>( value: T ): value is NonNullable<T> =>
	value !== undefined && value !== null

export const number = ( value: unknown ): value is number => typeof value === "number"

export const string = ( value: unknown ): value is string =>
	typeof value === "string"

export const boolean = ( value: unknown ): value is boolean =>
	typeof value === "boolean"

export const date = ( value: unknown ): value is Date =>
	value instanceof Date

