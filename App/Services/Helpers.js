import { is, curryN, gte } from 'ramda'
import axios from 'axios'
import { Config } from '../Config'

export const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
export const in200s = isWithin(200, 299)

export const defaultApiClient = (object, token = null) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.authorization = token
  }
  return axios.create({
    baseURL: `${Config.API_URL}/mixxy/${object}`,
    headers,
    timeout: 3000,
  })
}
