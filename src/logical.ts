import { Schema } from './index'
import { getFnName, setFnName } from './util'

/** Check that the value matches either schema */
export function or<T, U>(schema1: Schema<T>, schema2: Schema<U>): Schema<T | U> {
  const name = 'or(' + getFnName(schema1) + ', ' + getFnName(schema2) + ')'

  const schema: Schema<T> = (value, ctx): value is T => {
    ctx.quiet = true
    const isValid = schema1(value, ctx) || schema2(value, ctx)
    ctx.quiet = false

    return isValid || ctx.addError(value, name)
  }

  return setFnName(schema, name)
}

/** Check that the value matches both schemas */
export function and<T, U>(schema1: Schema<T>, schema2: Schema<U>): Schema<T & U> {
  const name = 'and(' + getFnName(schema1) + ', ' + getFnName(schema2) + ')'

  const schema: Schema<T & U> = (value, ctx): value is T & U => {
    ctx.quiet = true
    const isValid = schema1(value, ctx) && schema2(value, ctx)
    ctx.quiet = false

    return isValid || ctx.addError(value, name)
  }

  return setFnName(schema, name)
}
