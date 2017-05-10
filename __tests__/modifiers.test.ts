import { nullable, optional, string, validate } from '../src/index'

describe('optional', () => {
  it('checks that the value conforms to the given schema or is undefined', () => {
    const optString = optional(string)

    expect(validate(optString, 'hi')).toBe(true)
    expect(validate(optString, undefined)).toBe(true)

      ;[1, null, true, {}, []].forEach(value => {
        expect(validate(optString, value)).toBe(false)
      })
  })
})

describe('nullable', () => {
  it(' checks that the value conforms to the given schema or is null', () => {
    const nullableString = nullable(string)

    expect(validate(nullableString, 'hi')).toBe(true)
    expect(validate(nullableString, null)).toBe(true)

      ;[1, undefined, true, {}, []].forEach(value => {
        expect(validate(nullableString, value)).toBe(false)
      })
  })
})
