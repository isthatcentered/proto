import HttpClient from "."
import cases from "jest-in-case"

describe(`HttpClient`, () => {
	cases(
		"toQueryString({...})",
		async params => {
			const fetchSpy = jest
				.fn()
				.mockResolvedValue(
					new Response(JSON.stringify({ someKey: "someValue" })),
				)
			const client = new HttpClient({ baseUrl: "", customFetch: fetchSpy })

			await client.request({
				query: params.query,
				path: "",
			})

			expect(fetchSpy).toHaveBeenCalledWith(
				"?" + params.expected,
				expect.anything(),
			)
		},
		{
			"Each key value of the query object is mapped": {
				query: {
					key_1: "key_1_value",
					key_2: "key_2_value",
				},
				expected: "key_1=key_1_value&key_2=key_2_value",
			},
			"Numbers are ok": {
				query: {
					some_key_with_a_number_value: 5,
				},
				expected: "some_key_with_a_number_value=5",
			},
			"Array values arre appended as multiple key value": {
				query: {
					key_1: ["item_1", "item_2"],
				},
				expected: "key_1=item_1&key_1=item_2",
			},
		},
	)
})
