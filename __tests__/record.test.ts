import { eq, number, record, string, validate } from '../src/index'

describe('record', () => {
  it('checks that the value is a suitable record', () => {
    const stringToNumber = record(eq('foo'), number)

    expect(validate(stringToNumber, { foo: 1 })).toBe(true)
    expect(validate(stringToNumber, {})).toBe(true)

      ;[1, '1', null, undefined, true, [], { foo: '1' }, { bar: 1 }].forEach(value => {
        expect(validate(stringToNumber, value)).toBe(false)
      })
  })
})
