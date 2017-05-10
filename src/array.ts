import { Schema } from './index'
import { cached, getFnName, isArray, setFnName } from './util'

const cache = new Map<Schema<any>, Schema<any>>()

/** Given a schema, check that the value is an array of that schema */
export function array<T>(schema: Schema<T>): Schema<T[]> {
  const name = 'array(' + getFnName(schema) + ')'

  const _schema: Schema<T[]> = (value, ctx): value is T[] => {
    if (!isArray(value)) {
      return ctx.addError(value, name)
    }

    let result = true
    ctx.push(0)

    for (let i = 0; i < value.length; i++) {
      const elem = value[i]
      const isValid = schema(elem, ctx.set(i))

      if (!isValid) {
        result = false
      }
    }

    ctx.pop()
    return result
  }

  return cached(schema, setFnName(_schema, name), cache)
}
