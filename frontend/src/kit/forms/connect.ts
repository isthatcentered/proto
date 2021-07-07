// Formik only works with string | numbers, nothing fancier. Hence this constraint
import { FormikProps } from "formik"

export type Connectable = string | number

export type FieldConnection<T extends Connectable> = {
	value: T | undefined
	name: string
}

type ConnectOverrides<T> = {
	value?: T
}

type ConnectReturn<T> = T extends Connectable ? FieldConnection<T> : never

interface ConnectFn<T> {
	<K extends keyof T, K2 extends keyof T[K], K3 extends keyof T[K][K2]>(
		path: [K, K2, K3],
		overrides?: ConnectOverrides<T[K][K2][K3]>,
	): ConnectReturn<T[K][K2][K3]>

	<K extends keyof T, K2 extends keyof T[K]>(
		path: [K, K2],
		overrides?: ConnectOverrides<T[K][K2]>,
	): ConnectReturn<T[K][K2]>

	<K extends keyof T>(
		path: K,
		overrides?: ConnectOverrides<T[K]>,
	): ConnectReturn<T[K]>
}

const makeFieldName = (path: (string | number)[]): string => {
	const dottedPath = path
		.map(segement =>
			typeof segement === "number" ? `[${segement}]` : segement,
		)
		.join(".") // a.[0].b

	return dottedPath.replace(".[", "[").replace("].", "]") // // a[0]b
}

export const getConnect =
	<T extends Record<string, any>>(form: FormikProps<T>): ConnectFn<T> =>
	(
		path: string | number | (string | number)[],
		props: ConnectOverrides<any> = {},
	): any => {
		return {
			name: makeFieldName([path].flat()),
			value: props.value || form.values[path as any],
		}
	}
