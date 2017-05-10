import { Predicate, Schema } from './index'
import { getFnName } from './util'
import { ValidationContext } from './validationContext'
import { where } from './where'

/** Check that the value is a number */
export function number(value: any, ctx: ValidationContext): value is number {
  if (!Number.isFinite(value)) {
    return ctx.addError(value, 'number')
  }

  return true
}

/** Check that the value is a number that matches the predicate. */
export function numberWhere(predicate: Predicate<number>, name?: string): Schema<number> {
  const _name = name || 'numberWhere(' + getFnName(predicate) + ')'
  return where<any>(value => Number.isFinite(value) && predicate(value), _name)
}

/** Check that the value is a number between the range from start to end (inclusive) */
export function numberRange(start: number, end: number, name?: string): Schema<number> {
  const _name = name || 'numberRange(' + start + ', ' + end + ')'
  return numberWhere(n => n >= start && n <= end, _name)
}

/** Check that the value is an integer */
export function integer(value: any, ctx: ValidationContext): value is number {
  if (!Number.isInteger(value)) {
    return ctx.addError(value, 'integer')
  }

  return true
}

/** Given a predicate, check that the value is an integer that matches the predicate. */
export function integerWhere(predicate: Predicate<number>, name?: string): Schema<number> {
  const _name = name || 'integerWhere(' + getFnName(predicate) + ')'
  return where<any>(value => Number.isInteger(value) && predicate(value), _name)
}

/** Check that the value is an integer between the range from start to end (inclusive) */
export function integerRange(start: number, end: number, name?: string): Schema<number> {
  const _name = name || 'integerRange(' + start + ', ' + end + ')'
  return integerWhere(n => n >= start && n <= end, _name)
}
