export type FieldStatus = "pristine" | "dirty"

export type FieldProps<T> = {
	name: string,
	status: FieldStatus
	errors: string[]
	value: T | undefined,
	onChange: ( value: T | undefined ) => void
}
