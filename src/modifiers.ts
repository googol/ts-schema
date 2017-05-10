import { Schema } from './index'
import { cached, getFnName, setFnName } from './util'

const optionalCache = new Map<Schema<any>, Schema<any>>()
const nullableCache = new Map<Schema<any>, Schema<any>>()

/** Check that the value matches the scheme or is undefined. */
export function optional<T>(schema: Schema<T>): Schema<T | undefined> {
  const name = 'optional(' + getFnName(schema) + ')'

  const _schema: Schema<T | undefined> = (value, ctx): value is T | undefined => {
    if (typeof value === 'undefined') {
      return true
    }

    ctx.quiet = true
    const isValid = schema(value, ctx)
    ctx.quiet = false

    return isValid || ctx.addError(value, name)
  }

  return cached(schema, setFnName(_schema, name), optionalCache)
}

/** Check that the value matches the scheme or is null. */
export function nullable<T>(schema: Schema<T>): Schema<T | null> {
  const name = 'nullable(' + getFnName(schema) + ')'

  const _schema: Schema<T | null> = (value, ctx): value is T | null => {
    if (value === null) {
      return true
    }

    ctx.quiet = true
    const isValid = schema(value, ctx)
    ctx.quiet = false

    return isValid || ctx.addError(value, name)
  }

  return cached(schema, setFnName(_schema, name), nullableCache)
}
