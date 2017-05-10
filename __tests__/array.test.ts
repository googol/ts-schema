import { array, number, validate } from '../src/index'

describe('array', () => {
  it('checks that the value is an array', () => {
    expect(validate(array(number), [1])).toBe(true)

      ;['1', 1, null, undefined, true, {}, ['1']].forEach(value => {
        expect(validate(array(number), value)).toBe(false)
      })
  })
})
