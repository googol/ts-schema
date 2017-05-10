import { array, nullable, number, optional, string } from '../src/index'

describe('caching', () => {
  it('caches simple wrapped schemas (array, optional, nullable)', () => {
    expect(array(string)).toEqual(array(string))
    expect(array(number)).toEqual(array(number))

    expect(nullable(string)).toEqual(nullable(string))
    expect(nullable(number)).toEqual(nullable(number))

    expect(optional(string)).toEqual(optional(string))
    expect(optional(number)).toEqual(optional(number))
  })
})
