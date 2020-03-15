import { is, curryN, gte } from 'ramda'

export const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
export const in200s = isWithin(200, 299)
