import { boolean, validate } from '../src/index'

describe('boolean', () => {
  it('checks that the value is a boolean', () => {
    expect(validate(boolean, true)).toBe(true)
    expect(validate(boolean, false)).toBe(true)

      ;['1', 1, null, undefined, {}, []].forEach(value => {
        expect(validate(boolean, value)).toBe(false)
      })
  })
})
