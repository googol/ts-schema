import { isString } from './util'
import { ValidationError } from './validationError'

export type Path = Array<string | number>

export class ValidationContext {

  path: Path
  errors: ValidationError[]
  quiet: boolean

  constructor() {
    this.path = []
    this.errors = []
    this.quiet = false
  }

  addError(value: any, schemaName: string): false {
    if (!this.quiet) {
      this.errors.push(new ValidationError(value, schemaName, stringifyPath(this.path)))
    }

    return false
  }

  push(part: string | number): this {
    this.path.push(part)
    return this
  }

  set(part: string | number): this {
    const { path } = this
    path[path.length - 1] = part
    return this
  }

  pop(): this {
    this.path.pop()
    return this
  }

}

function stringifyPath(path: Path): string | undefined {
  if (path.length === 0) {
    return
  }

  let result = ''
  for (let i = 0; i < path.length; i++) {
    const part = path[i]
    result += isString(part)
      ? '.' + part
      : '[' + part + ']'
  }
  return result
}
