import { ValidationError } from '../src/index'

describe('Validation errors', () => {
  it('Error messages', () => {
    expect(new ValidationError('hi', 'schemaName', '.path').toString())
      .toBe(`Value "hi" at .path doesn't match schema "schemaName"`)
    expect(new ValidationError(10, 'schemaName', '.path').toString())
      .toBe(`Value 10 at .path doesn't match schema "schemaName"`)
    expect(new ValidationError(true, 'schemaName', '.path').toString())
      .toBe(`Value true at .path doesn't match schema "schemaName"`)
    expect(new ValidationError(null, 'schemaName', '.path').toString())
      .toBe(`Value null at .path doesn't match schema "schemaName"`)
    expect(new ValidationError([10, 'hi'], 'schemaName', '.path').toString())
      .toBe(`Value [10,"hi"] at .path doesn't match schema "schemaName"`)
    expect(new ValidationError({ foo: 'bar' }, 'schemaName', '.path').toString())
      .toBe(`Value {"foo":"bar"} at .path doesn't match schema "schemaName"`)
    expect(new ValidationError(undefined, 'schemaName', '.path').toString())
      .toBe(`Value undefined at .path doesn't match schema "schemaName"`)

    // No path
    expect(new ValidationError('hi', 'schemaName').toString())
      .toBe(`Value "hi" doesn't match schema "schemaName"`)
  })

  it('Serialization', () => {
    expect(JSON.stringify(new ValidationError('hi', 'schemaName', '.path')))
      .toBe(JSON.stringify({ value: 'hi', schema: 'schemaName', path: '.path' }))
    expect(JSON.stringify(new ValidationError(10, 'schemaName', '.path')))
      .toBe(JSON.stringify({ value: 10, schema: 'schemaName', path: '.path' }))
    expect(JSON.stringify(new ValidationError(true, 'schemaName', '.path')))
      .toBe(JSON.stringify({ value: true, schema: 'schemaName', path: '.path' }))
    expect(JSON.stringify(new ValidationError(null, 'schemaName', '.path')))
      .toBe(JSON.stringify({ value: null, schema: 'schemaName', path: '.path' }))
    expect(JSON.stringify(new ValidationError([10, 'hi'], 'schemaName', '.path')))
      .toBe(JSON.stringify({ value: [10, 'hi'], schema: 'schemaName', path: '.path' }))
    expect(JSON.stringify(new ValidationError({ foo: 'bar' }, 'schemaName', '.path')))
      .toBe(JSON.stringify({ value: { foo: 'bar' }, schema: 'schemaName', path: '.path' }))
    expect(JSON.stringify(new ValidationError(undefined, 'schemaName', '.path')))
      .toBe(JSON.stringify({ schema: 'schemaName', path: '.path' }))

    // No path
    expect(JSON.stringify(new ValidationError('hi', 'schemaName')))
      .toBe(JSON.stringify({ value: 'hi', schema: 'schemaName' }))
  })
})
