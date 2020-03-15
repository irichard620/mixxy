import axios from 'axios'
import { Config } from '../Config'
import { in200s } from './Helpers'

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
