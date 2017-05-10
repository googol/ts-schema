import { Schema } from './index'
import { string } from './string'
import { getFnName, isObject, setFnName } from './util'

/** Check that the value is a Record from keys K to values T  */
export function record<K extends string, T>(
  keySchema: Schema<K>,
  valueSchema: Schema<T>,
  name?: string): Schema<Record<K, T>> {
  const _name = name || 'record(' + getFnName(keySchema) + ', ' + getFnName(valueSchema) + ')'

  const schema: Schema<Record<K, T>> = (value, ctx): value is Record<K, T> => {
    if (!isObject(value)) {
      return ctx.addError(value, _name)
    }

    let result = true

    // tslint:disable-next-line:forin
    for (const key in value) {
      if (keySchema !== string) {
        const isKeyValid = keySchema(key, ctx)
        if (!isKeyValid) {
          result = false
        }
      }

      const elem = value[key]
      ctx.push(key)
      const isElemValid = valueSchema(elem, ctx)
      ctx.pop()

      if (!isElemValid) {
        result = false
      }
    }

    return result
  }

  return setFnName(schema, _name)
}
