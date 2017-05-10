import { Primitive } from './index'
import { ValidationContext } from './validationContext'

/** Check that the value is anything except undefined */
export function any(value: any, ctx: ValidationContext): value is Primitive | object {
  if (typeof value === 'undefined') {
    return ctx.addError(value, 'any')
  }

  return true
}
