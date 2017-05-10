import { and, any, array, number, or, string, validate, where } from '../src/index'

describe('or', () => {
  it('checks that the value conforms to either one of the schemas', () => {
    const stringOrNumber = or(string, number)

    expect(validate(stringOrNumber, 1)).toBe(true)
    expect(validate(stringOrNumber, '1')).toBe(true)

      ;[null, undefined, true, {}, []].forEach(value => {
        expect(validate(stringOrNumber, value)).toBe(false)
      })
  })
})

describe('and', () => {
  it('checks that the value conforms to both of the schemas', () => {
    const nonEmptyStringArray = and(array(string), where(arr => arr.length > 0))

    expect(validate(nonEmptyStringArray, ['hi'])).toBe(true)
    expect(validate(nonEmptyStringArray, [])).toBe(false)
  })
})
