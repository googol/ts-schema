import { stringify } from './util'

export class ValidationError {

  schema: string
  value: any
  path?: string

  constructor(value: any, schema: string, path?: string) {
    this.value = value
    this.schema = schema
    this.path = path
  }

  toString(): string {
    const { path, value, schema } = this
    return path
      ? `Value ${stringify(value)} at ${path} doesn't match schema "${schema}"`
      : `Value ${stringify(value)} doesn't match schema "${schema}"`
  }
}
