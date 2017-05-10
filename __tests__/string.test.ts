import { string, stringWhere, validate } from '../src/index'

describe('string', () => {
  it('checks that the value is a string', () => {
    expect(validate(string, 'a string')).toBe(true)

      ;[1, null, undefined, true, {}, []].forEach(value => {
        expect(validate(string, value)).toBe(false)
      })
  })
})

describe('stringWhere', () => {
  it('checks the string against a predicate', () => {
    const isEmpty = stringWhere(s => s.length === 0)

    expect(validate(isEmpty, '')).toBe(true)
    expect(validate(isEmpty, 'not empty')).toBe(false)
  })

  it('will not call the predicate if the value is not a string', () => {
    const willThrow = (s: string) => { throw new Error('Should not happen!') }

    expect(validate(stringWhere(willThrow), 0)).toBe(false)
  })

})
