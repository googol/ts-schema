import { any, validate } from '../src/index'

describe('any', () => {
  it('checks that the value is any non-undefined value', () => {
    expect(validate(any, undefined)).toBe(false)

      ;['1', 1, null, true, {}, []].forEach(value => {
        expect(validate(any, value)).toBe(true)
      })
  })
})
