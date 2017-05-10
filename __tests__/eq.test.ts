import { eq, validate } from '../src/index'

describe('eq', () => {

  it('checks that the value is equal to the expected value', () => {
    const hi = eq('hi')

    expect(validate(hi, 'hi')).toBe(true)

      ;['1', 1, null, undefined, {}, []].forEach(value => {
        expect(validate(hi, value)).toBe(false)
      })
  })

  it('uses === to check for equality', () => {
    const isEmptyArray = eq([] as any)
    expect(validate(isEmptyArray, [])).toBe(false)

    const isOne = eq(1)
    expect(validate(isOne, '1')).toBe(false)
  })

})
