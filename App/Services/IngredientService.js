import axios from 'axios'
import { Config } from '../Config'
import { in200s } from './Helpers'
import camelcaseKeys from 'camelcase-keys'
import storage from 'redux-persist/lib/storage'

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
      return camelcaseKeys(response.data)
    }

    return null
  })
}

async function setBarCartIngredients(params) {
  try {
    const ingredients = params.ingredients
    await storage.setItem('ingredients', JSON.stringify(ingredients))
    return ingredients
  } catch (e) {
    return []
  }
}

async function fetchBarCartIngredients() {
  try {
    const result = await storage.getItem('ingredients')
    return result ? JSON.parse(result) : []
  } catch (e) {
    return []
  }
}

export const ingredientService = {
  fetchIngredients,
  fetchBarCartIngredients,
  setBarCartIngredients,
}
