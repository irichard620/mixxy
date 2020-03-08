import axios from 'axios'
import { is, curryN, gte } from 'ramda'
import { Config } from '../Config'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

const ingredientApiClient = axios.create({
  baseURL: `${Config.API_URL}/mixxy/ingredients`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchIngredients() {
  return ingredientApiClient.get().then((response) => {
    if (in200s(response.status)) {
      return response.data
    }

    return null
  })
}

export const ingredientService = {
  fetchIngredients,
}
