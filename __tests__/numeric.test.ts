import { integer, integerRange, integerWhere, number, numberRange, numberWhere, validate } from '../src/index'

describe('number', () => {
  it('checks that the value is a number', () => {
    expect(validate(number, 0)).toBe(true)

      ;['1', null, undefined, true, {}, [], NaN].forEach(value => {
        expect(validate(number, value)).toBe(false)
      })
  })
})

describe('numberWhere', () => {
  it('checks a number against a predicate', () => {
    const isZero = (n: number) => n === 0

    expect(validate(numberWhere(isZero), 0)).toBe(true)
    expect(validate(numberWhere(isZero), 50)).toBe(false)
  })

  it('will not call the predicate if the value is not a number', () => {
    const willThrow = (n: number) => { throw new Error('Should not happen!') }

    expect(validate(numberWhere(willThrow), '5')).toBe(false)
  })

})

describe('numberRange', () => {
  it('checks that the value is an number between start and end (inclusive)', () => {
    const zeroToHundred = numberRange(0, 100)

    expect(validate(zeroToHundred, -1)).toBe(false)
    expect(validate(zeroToHundred, -0.001)).toBe(false)
    expect(validate(zeroToHundred, 0)).toBe(true)
    expect(validate(zeroToHundred, 0.001)).toBe(true)
    expect(validate(zeroToHundred, 99)).toBe(true)
    expect(validate(zeroToHundred, 99.999)).toBe(true)
    expect(validate(zeroToHundred, 100)).toBe(true)
    expect(validate(zeroToHundred, 100.001)).toBe(false)
    expect(validate(zeroToHundred, 101)).toBe(false)
  })
})

describe('integer', () => {
  it('checks that the value is an integer', () => {
    expect(validate(integer, 0)).toBe(true)
    expect(validate(integer, 5.5)).toBe(false)
  })
})

describe('integerWhere', () => {
  it('will not call the predicate if the value is not an integer', () => {
    const willThrow = (n: number) => { throw new Error('Should not happen!') }

    expect(validate(integerWhere(willThrow), 5.5)).toBe(false)
  })
})

describe('integerRange', () => {
  it('checks that the value is an integer between start and end (inclusive)', () => {
    const zeroToHundred = integerRange(0, 100)

    expect(validate(zeroToHundred, -1)).toBe(false)
    expect(validate(zeroToHundred, -0.001)).toBe(false)
    expect(validate(zeroToHundred, 0)).toBe(true)
    expect(validate(zeroToHundred, 0.001)).toBe(false)
    expect(validate(zeroToHundred, 99)).toBe(true)
    expect(validate(zeroToHundred, 99.999)).toBe(false)
    expect(validate(zeroToHundred, 100)).toBe(true)
    expect(validate(zeroToHundred, 100.001)).toBe(false)
    expect(validate(zeroToHundred, 101)).toBe(false)
  })
})
