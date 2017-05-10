import { ValidationContext } from './validationContext'

/** Check that the value is a boolean */
export function boolean(value: any, ctx: ValidationContext): value is boolean {
  if (typeof value !== 'boolean') {
    return ctx.addError(value, 'boolean')
  }

  return true
}
