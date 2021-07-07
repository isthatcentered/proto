import cases from "jest-in-case"
import { identity, pipe } from "fp-ts/lib/function"
import * as D from "io-ts/Decoder"
import * as E from "fp-ts/Either"
import report from "./report"
import { Failure } from "./index"

describe(`Reporter`, () => {
	cases(
		"Reporter",
		params => {
			const result = pipe(
				params.decoder.decode(params.value),
				E.foldW(report, identity),
			)

			expect(result).toEqual(params.expected)
		},
		[
			{
				name: "Undefined root returns empty path",
				decoder: D.boolean as D.Decoder<any, any>,
				value: undefined,
				expected: [
					{ path: [], message: expect.stringContaining("") },
				] as Failure[],
			},
			{
				name: "Nested record error returns full path",
				decoder: D.struct({ a: D.struct({ b: D.boolean, c: D.boolean }) }),
				value: { a: {} },
				expected: [
					{ path: ["a", "b"], message: expect.stringContaining("") },
					{ path: ["a", "c"], message: expect.stringContaining("") },
				] as Failure[],
			},
			{
				name: "Nested array error returns full path",
				decoder: D.array(D.struct({ a: D.boolean })),
				value: [{ a: undefined }],
				expected: [
					{ path: [0, "a"], message: expect.stringContaining("") },
				] as Failure[],
			},
			{
				name: "Union returnsall decoders errors",
				decoder: D.union(D.string, D.boolean),
				value: undefined,
				expected: [
					{ path: [], message: expect.stringContaining("") },
					{ path: [], message: expect.stringContaining("") },
				] as Failure[],
			}, // @todo: message override
			// @todo: undefined value, required kind (but that won't solve the translation pb)
		],
	)
})
