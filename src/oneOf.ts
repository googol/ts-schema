import { Primitive, Schema } from './index'
import { setFnName, stringify } from './util'

/** Check that the value is equal to one of the expected values (using ===) */
export function oneOf<T extends Primitive>(values: T[], name?: string): Schema<T> {
  const _name = name || 'oneOf(' + values.map(stringify).join(', ') + ')'
  const valuesSet = new Set(values)

  const schema: Schema<T> = (value, ctx): value is T => {
    if (!valuesSet.has(value)) {
      return ctx.addError(value, _name)
    }

    return true
  }

  return setFnName(schema, _name)
}
