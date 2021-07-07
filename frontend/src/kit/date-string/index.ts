import * as O from "fp-ts/Option"
import { flow } from "fp-ts/function"

// A date string with no notion of hours & seconds
// Format: 2021-05-13 | 2021-05
export type DateString = string & { readonly DateString: unique symbol }

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const fromDate = (date: Date): DateString =>
	date.toISOString().slice(0, 10) as DateString // "2021-07-06T15:41:18.935Z" -> "2021-07-06"

export const fromString = (date: string): O.Option<DateString> => {
	const isValid = (isFullDate(date) || isMonthDate(date)) && isValidDate(date)
	return isValid ? O.some(date as DateString) : O.none
}

// -------------------------------------------------------------------------------------
// Destructors
// -------------------------------------------------------------------------------------
export const toDate = (date: DateString): Date => new Date(date)

export const pretty = (date: DateString): string =>
	toDate(date).toLocaleDateString()

export const toISO8601 = (date: DateString) =>
	toDate(date).toISOString().slice(0, 10) // for now we follow the same format but this might change. This acts as a safety net

// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------
export const before = (a: DateString) => (b: DateString) =>
	toDate(b) < toDate(a)

export const after = (a: DateString) => (b: DateString) => before(b)(a)

export const same = (a: DateString) => (b: DateString) => b === a

export const min = (a: DateString) => (b: DateString) =>
	same(a)(b) || after(a)(b)

export const max = (a: DateString) => (b: DateString) =>
	same(a)(b) || before(a)(b)

export const isValid = (date: string): date is DateString =>
	O.isSome(fromString(date))

// -------------------------------------------------------------------------------------
// Combinators
// -------------------------------------------------------------------------------------
export const subYears = (years: number) => (date: DateString) => {
	const d = toDate(date)
	d.setFullYear(d.getFullYear() - years)
	return fromDate(d)
}

export const addYears = (years: number) => flow(subYears(-years))

// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
export const today = (): DateString => fromDate(new Date())

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------
const isMonthDate = (date: string): boolean => /^\d{4}-\d{2}$/.test(date)
const isFullDate = (date: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(date)

const isValidDate = (string: string): boolean => {
	try {
		return !!new Date(string).toISOString()
	} catch (e) {
		return false
	}
}
