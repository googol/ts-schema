import { Predicate, Schema } from './index'
import { getFnName, setFnName } from './util'

/** Check that the value matches a predicate */
export function where<T>(predicate: Predicate<any>, name?: string): Schema<T> {
  const _name = name || 'where(' + getFnName(predicate) + ')'

  const schema: Schema<T> = (value, ctx): value is T => {
    if (!predicate(value)) {
      return ctx.addError(value, _name)
    }

    return true
  }

  return setFnName(schema, _name)
}
