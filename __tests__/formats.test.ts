import { date, dateTime, time, validate } from '../src/index'

describe('date', () => {
  it('checks that the value is a valid ISO 8601 date', () => {
    expect(validate(date, '2017-05-09')).toBe(true)

      ;['2017-05-09 ', ' 2017-05-09'].forEach(value => {
        expect(validate(date, value)).toBe(false)
      })
  })
})

describe('dateTime', () => {
  it('checks that the value is a valid ISO 8601 datetime', () => {
    expect(validate(dateTime, '2017-05-09T18:17:53+00:00')).toBe(true)
    expect(validate(dateTime, '2017-05-09T18:17:53Z')).toBe(true)

      ;['2017-05-09T18:17:53+00:00 ', ' 2017-05-09T18:17:53Z', '2017-05-35T18:17:53Z'].forEach(value => {
        expect(validate(dateTime, value)).toBe(false)
      })

  })
})

describe('time', () => {
  it('checks that the value is a valid ISO 8601 time', () => {
    expect(validate(time, '18:17:53')).toBe(true)
    expect(validate(time, '18:17:53+00:00')).toBe(true)

      ;['18:17:53 ', ' 18:17:53', '18:17:65'].forEach(value => {
        expect(validate(time, value)).toBe(false)
      })

  })
})
