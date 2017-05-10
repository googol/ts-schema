import { Predicate, Schema } from './index'
import { getFnName, isString } from './util'
import { ValidationContext } from './validationContext'
import { where } from './where'

/** Check that the value is a string */
export function string(value: any, ctx: ValidationContext): value is string {
  if (!isString(value)) {
    return ctx.addError(value, 'string')
  }

  return true
}

/** Check that the value is a string that matches the predicate */
export function stringWhere(predicate: Predicate<string>, name?: string): Schema<string> {
  const _name = name || 'stringWhere(' + getFnName(predicate) + ')'
  return where<any>(value => isString(value) && predicate(value), _name)
}

/** Check that the value is a string that matches the regular expression */
export function stringMatches(regexp: RegExp, name?: string): Schema<string> {
  const _name = name || 'stringMatches(' + regexp + ')'
  return stringWhere(s => regexp.test(s), _name)
}
