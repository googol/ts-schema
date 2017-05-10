import { Schema } from './index'
import { stringWhere } from './string'

// Graciously stolen from https://github.com/epoberezkin/ajv/blob/master/lib/compile/formats.js
const ISO_8601_DATE = /^\d\d\d\d-[0-1]\d-[0-3]\d$/
const ISO_8601_DATETIME = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i
const ISO_8601_TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i

/** Check that the value is a valid ISO 8601 date (e.g. 2017-05-09) */
export const date: Schema<string> = stringWhere(str => {
  return ISO_8601_DATE.test(str) && Number.isFinite(Date.parse(str))
})

/** Check that the value is a valid ISO 8601 datetime (e.g. 2017-05-09T18:17:53+00:00 or 2017-05-09T18:17:53Z) */
export const dateTime: Schema<string> = stringWhere(str => {
  return ISO_8601_DATETIME.test(str) && Number.isFinite(Date.parse(str))
})

/** Check that the value is a valid ISO 8601 time (e.g. 18:17:53 or 18:17:53+00:00) */
export const time: Schema<string> = stringWhere(str => {
  const matches = str.match(ISO_8601_TIME)

  if (!matches) {
    return false
  }

  const hours = Number(matches[1])
  const minutes = Number(matches[2])
  const seconds = Number(matches[3])

  return hours <= 23 && minutes <= 59 && seconds <= 59
})
