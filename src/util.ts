import { Schema } from './index'

export const isArray = Array.isArray
export const isObject = (value: any) => value !== null && typeof value === 'object' && !isArray(value)
export const isString = (value: any): value is string => typeof value === 'string'

// tslint:disable-next-line:ban-types
export function setFnName<T extends Function>(fn: T, name: string): T {
  return Object.defineProperty(fn, 'name', { value: name })
}

// tslint:disable-next-line:ban-types
export function getFnName(fn: Function): string {
  return fn.name || '...'
}

export function stringify(value: any): string {
  return typeof value === 'undefined'
    ? 'undefined'
    : JSON.stringify(value)
}

export function cached<T, U>(raw: Schema<T>, wrapped: Schema<U>, cache: Map<Schema<T>, Schema<U>>): Schema<U> {
  return cache.get(raw) || (cache.set(raw, wrapped) && wrapped)
}
