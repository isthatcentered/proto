import cases from "jest-in-case"
import * as DATE from "."




describe( `Date`, () => {
	cases(
		"ORD<Date>",
		params => {
			expect( DATE.Ord.compare( new Date( params.a ), new Date( params.b ) ) ).toBe( params.expected )
		},
		[
			{ name: "Same day, month and year returns a === b", a: "01/24/2020", b: "01/24/2020", expected: 0 },
			{ name: "A.year > B.year returns a > b", a: "01/24/2021", b: "01/24/2020", expected: 1 },
			{ name: "A.month > B.month returns a > b", a: "02/24/2020", b: "01/24/2020", expected: 1 },
			{ name: "A.day > B.day returns a > b", a: "01/25/2020", b: "01/24/2020", expected: 1 },
			{ name: "B.year > A.year returns a < b", b: "01/24/2021", a: "01/24/2020", expected: -1 },
			{ name: "B.month > A.month returns a < b", b: "02/24/2020", a: "01/24/2020", expected: -1 },
			{ name: "B.day > A.day returns a < b", b: "01/25/2020", a: "01/24/2020", expected: -1 },
		],
	)
} )
