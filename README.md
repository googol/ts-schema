# ts-schema

Declarative JSON validation, especially for TypeScript.

[![Build Status](https://travis-ci.org/sluukkonen/ts-schema.svg?branch=master)](https://travis-ci.org/sluukkonen/ts-schema)

## Getting started

A schema (represented by the type `Schema<T>`) is a function that checks if a JSON value is of type `T`. You can use schemas to validate and cast untrusted JSON to the correct type. To get started, import some built-in schemas and functions for creating more advanced schemas.

```typescript
import {
  string,
  number,
  boolean,
  object,
  array,
  match
  // etc.
} from 'ts-schema'
```

# Creating schemas

The `where` function returns a schema that accepts values matching the predicate.

```typescript
const helloWorld: Schema<any> = where(json => json === 'Hello, world!')
```

## Strings

`string` accepts any string. `stringWhere` and `stringMatcher` allow you to create schemas that
accept strings matching a predicate or a regular expression.

```typescript
const schema:         Schema<string> = string
const nonEmptyString: Schema<string> = stringWhere(str => str.length > 0)
const numericString:  Schema<string> = stringMatches(/^[0-9]+$/)
```

## Numbers

`number` accepts any finite number while the `integer` schema accepts any finite integer. Like with strings, there are also a couple of convenience functions for creating more restricted numeric schemas.

```typescript
const schema:         Schema<number>  = number
const positiveNumber: Schema<number>  = numberWhere(n => n > 0)
const probability:    Schema<number>  = numberBetween(0, 1)

const schema:          Schema<number> = integer
const negativeInteger: Schema<number> = integerWhere(n => n < 0)
const reviewScore:     Schema<number> = integerBetween(0, 100)
```

## Booleans

`boolean` accepts any valid boolean (`true` or `false`).

```typescript
const schema: Schema<boolean> = boolean
```

## Any

`any` accepts any valid JSON value.

```typescript
const anything: Schema<any> = any
```

## Optional & Nullable values

`optional` and `nullable` take a schema and return an equivalent schema that also accepts `undefined` or `null`.

```typescript
const maybeNumber:    Schema<number | undefined> = optional(number)
const nullableString: Schema<string | null>      = nullable(string)
```

## Logical operators

`and` and `or`  combine two schemas according to the respective logical operators.

```typescript
const stringOrNumber: Schema<string | number> = or(string, number)
const nonEmptyArray:  Schema<any[] & any>     = and(array(any), where(arr => arr.length > 0))
```

## Literals

`eq` and `oneOf` allow you to create schemas the accept one or more literal values. Both use `===` for comparisons, so they only work with primitive types.

```typescript
const isTrue:   Schema<true>                 = eq(true)
const language: Schema<"english" | "french"> = oneOf(['english', 'french'])
```

## Arrays

`array` takes a schema for type `T` and returns a schema for type `T[]`.

```typescript
const stringArray:   Schema<string[]>   = array(string)
const nested:        Schema<number[][]> = array(array(number))
```

## Objects

`object`  takes an object describing the shape of an object and returns an equivalent schema.

```typescript
const user: Schema<{name: string, age: number}> = object({
  name: string,
  age:  integer
})
```

If you explicitly specify the type parameter, the compiler will check that the given shape matches the type.

```typescript
interface User {
  name: string,
  age:  integer
}

const invalid = object<User>({
  name: string,
  age: string     // Will not compile, age is supposed to be type number
})

const invalid2 = object<User>({
  name: string
  // Will not compile, age is missing.
})
```

## Records

`record` takes a schema describing the keys of an object and a schema describing the values of an object. They are useful for representing Map-like JSON objects. They map to the standard TypeScript `Record<K, T>` type.

```typescript
const stringToNumber: Schema<Record<string, number>> = record(string, number)
```

# Validating JSON against a schema

There are two main ways to perform validation. The first one, `match` takes a schema, a JSON value and two callback functions - one for the error case and one for the success case.

```typescript
const UserSchema = object<User>({ name: string, age: optional(number) })

match(UserSchema, json, (errors: ValidationError[]) => {
  res.status(400).send({status: 'error', errors})
}, (user: User) => {
  db.saveUser(user)
    .then(() => res.status(200).send({status: 'ok'}))
    .catch(error => res.status(500).send({status: 'error', error})
})
```

The second one, `validate`, simply returns a returns a boolean indicating whether or not the JSON matched the schema.
It is also a [Type Guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types), you can use it to narrow the type within a block.

```typescript
const json: any = ...

if (validate(array(string), json)) {
  // json is of type string[] inside this block.
  return json.map(s => s.toUpperCase())
} else {
  // json is of type any inside this block.
}
```

## Validation errors

Validation errors are represented by the following type.

```typescript
class ValidationError {
  value: any
  schema: string
  path?: string
}
```

For each validation error, `value` contains the actual JSON value, `schema` is a human-readable name of the schema such as `array(string)`, and in case of objects and arrays, `path` contains a path string to the offending value.

Calling `toString` on a validation error returns a human readable representation of the error, e.g. `Value "foo" at .nested.path[0] doesn't match schema "number"`.

## Naming schemas

Schemas are given names that correspond approximately to their representation in code. For example, if you create a schema
like `const stringArray = array(string)`, it will have the name `'array(string)'`. The only exception to this rule is `object`, where for for the sake of brevify, schemas created with it are called `'object'` by default.

If you want to give a custom name to a schema, most schema creating functions will accept an optional name parameter
that you can use to override the default.

```typescript
const UserSchema = object({name: string, age: number}, 'User') // Would be called 'object' otherwise
const abc = stringMatches(/abc/, 'abc')                     // Would be called 'stringMatches(/abc/)' otherwise
```


## Installation

```
npm install ts-schema
```
