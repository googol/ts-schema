import { Primitive, Schema } from './index'
import { setFnName, stringify } from './util'

/** Check that the value is equal to the expected value (using ===) */
export function eq<T extends Primitive>(expected: T, name?: string): Schema<T> {
  const _name = name || 'eq(' + stringify(expected) + ')'

  const schema: Schema<T> = (value, ctx): value is T => {
    if (value !== expected) {
      return ctx.addError(value, _name)
    }

    return true
  }

  return setFnName(schema, _name)
}
