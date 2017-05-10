import { ValidationContext } from './validationContext'
import { ValidationError } from './validationError'

export type Schema<T> = (value: any, ctx: ValidationContext) => value is T
export type Predicate<T> = (value: T) => boolean
export type Primitive = boolean | number | string | null

export { any } from './any'
export { array } from './array'
export { boolean } from './boolean'
export { date, dateTime, time } from './formats'
export { eq } from './eq'
export { and, or } from './logical'
export { integer, integerRange, integerWhere, number, numberRange, numberWhere } from './numeric'
export { nullable, optional } from './modifiers'
export { object } from './object'
export { oneOf } from './oneOf'
export { record } from './record'
export { string, stringMatches, stringWhere } from './string'
export { where } from './where'
export { ValidationError } from './validationError'

export function match<T>(
  schema: Schema<T>,
  json: any,
  onError: (errors: ValidationError[]) => void,
  onSuccess: (value: T) => void): void {
  const ctx = new ValidationContext()
  const isValid = schema(json, ctx)

  if (isValid) {
    onSuccess(json)
  } else {
    onError(ctx.errors)
  }
}

export function validate<T>(schema: Schema<T>, json: any): json is T {
  return schema(json, new ValidationContext())
}
