import * as P from "./"

describe(`struct(spec)`, () => {
	test(`Any predicate failing is a fail`, () => {
		const failingPredicate = P.struct({
			a: P.Pass,
			b: P.Fail,
		})

		expect(failingPredicate({} as any)).toBe(false)
	})

	test(`All predicates passing is a pass`, () => {
		const passingPredicate = P.struct({
			a: P.Pass,
			b: P.Pass,
		})

		expect(passingPredicate({} as any)).toBe(true)
	})

	test(`Predicates have accessed to their key's value`, () => {
		const mustBeFive = P.predicate((n: number) => n === 5)
		const predicate = P.struct({
			a: mustBeFive,
		})

		expect(predicate({ a: 5 })).toBe(true)
		expect(predicate({ a: 4 })).toBe(false)
	})
})

describe(`array(predicate)`, () => {
	test(`Any item failing is a fail`, () => {
		const failingPredicate = P.array(P.Fail)
		expect(failingPredicate(["some_value"])).toBe(false)
	})

	test(`All items passing is a pass`, () => {
		const passingPredicate = P.array(P.Pass)
		expect(passingPredicate(["some_value"])).toBe(true)
	})

	test(`Predicates have accessed to their item's value`, () => {
		const mustBeFive = P.predicate((n: number) => n === 5)
		const predicate = P.array(mustBeFive)

		expect(predicate([5])).toBe(true)
		expect(predicate([4])).toBe(false)
	})
})
