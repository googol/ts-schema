import { oneOf, validate } from '../src/index'

describe('oneOf', () => {
  it('checks that the value is equal to one of the given alternatives', () => {
    const fooOrBar = oneOf(['foo', 'bar'])

    expect(validate(fooOrBar, 'foo')).toBe(true)
    expect(validate(fooOrBar, 'bar')).toBe(true)

      ;[1, '1', null, undefined, true, [], {}].forEach(value => {
        expect(validate(fooOrBar, value)).toBe(false)
      })
  })
})
