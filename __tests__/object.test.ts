import { number, object, string, validate } from '../src/index'

describe('object', () => {
  it('checks that the value is an object with the correct shape', () => {
    const user = object({ age: number, name: string })

    expect(validate(user, {age: 50, name: 'George'})).toBe(true)
    expect(validate(user, {age: null, name: 'Jane'})).toBe(false)
    expect(validate(user, {name: 'Steve'})).toBe(false)
  })
})
