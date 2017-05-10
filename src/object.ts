import { Schema } from './index'
import { isObject } from './util'

/** Check that the value matches the given object shape */
export function object<T>(schemas: {[K in keyof T]: Schema<T[K]>}, name?: string): Schema<T> {
  const _name = name || 'object'

  return (value, ctx): value is T => {
    if (!isObject(value)) {
      return ctx.addError(value, _name)
    }

    let result = true
    ctx.push('')

    // tslint:disable-next-line:forin
    for (const key in schemas) {
      const elem = value[key]
      const schema = schemas[key]

      const isValid = schema(elem, ctx.set(key))

      if (!isValid) {
        result = false
      }
    }

    ctx.pop()
    return result
  }
}
