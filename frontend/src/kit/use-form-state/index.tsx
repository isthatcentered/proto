import { useState } from "react"




const useFormState = <T extends Record<any, any>>(
	defaultValue: T,
) => {
	const [ data, setData ] = useState<T>( defaultValue )
	
	const setField = <K extends keyof typeof data>( field: K ) => (
		value: typeof data[K],
	) => setData( { ...data, [ field ]: value } )
	
	return [ data, setField ] as const
}

export default useFormState
