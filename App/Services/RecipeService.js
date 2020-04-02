import storage from 'redux-persist/lib/storage'
import * as recipeModel from '../Storage/Recipe'
import { defaultApiClient, in200s } from './Helpers'
import camelcaseKeys from 'camelcase-keys'
import { Recipe } from '../Storage/Recipe'

function persistRecipe(params) {
  const recipeToSave = params.recipeToSave
  return storage
    .getItem('recipes')
    .then((recipes) => {
      const r = recipes ? JSON.parse(recipes) : []

      let found = false
      let duplicateName = false
      for (let i = 0; i < r.length; i += 1) {
        if (r[i].recipeId === recipeToSave.recipeId) {
          r[i] = recipeToSave
          found = true
          break
        } else if (r[i].recipeName === recipeToSave.recipeName) {
          duplicateName = true
          break
        }
      }

      if (duplicateName) {
        // Handle duplicate name error
        return [[], 'A recipe with this name already exists']
      } else {
        if (!found) {
          r.push(recipeToSave)
        }
        storage.setItem('recipes', JSON.stringify(r))
        return [r, '']
      }
    })
    .catch(() => [[], 'Unexpected error'])
}

function fetchRecipes() {
  return storage.getItem('recipes').then((recipes) => {
    const result = []
    const r = recipes ? JSON.parse(recipes) : []
    for (let i = 0; i < r.length; i += 1) {
      // Create objects and add to result
      const recipe = recipeModel.Recipe(r[i])
      if (recipe.status === 'ACTIVE') {
        result.push(recipe)
      }
    }
    return result
  })
}

function fetchRemoteRecipes(params) {
  let url = 'recipes'
  if (params.sponsorCardId) {
    url += `?sponsor_card_id=${params.sponsorCardId}`
  } else if (params.campaignId) {
    url += `?campaign_id=${params.campaignId}`
  } else if (params.masterListId) {
    url += `?master_list_id=${params.masterListId}`
  }
  return defaultApiClient(url)
    .get()
    .then((response) => {
      if (in200s(response.status)) {
        const recipes = []
        for (let i = 0; i < response.data.length; i++) {
          recipes.push(Recipe(camelcaseKeys(response.data[i])))
        }
        return recipes
      }

      return null
    })
}

function deleteRecipe(params) {
  const recipeId = params.recipeId
  return storage.getItem('recipes').then((recipes) => {
    const r = recipes ? JSON.parse(recipes) : []
    for (let i = 0; i < r.length; i += 1) {
      const recipe = r[i]
      if (recipe.recipeId === recipeId) {
        r.splice(i, 1)
        break
      }
    }
    storage.setItem('recipes', JSON.stringify(r))
    return r
  })
}

function favoriteRecipe(params) {
  const recipeId = params.recipeId
  return storage.getItem('recipes').then((recipes) => {
    const r = recipes ? JSON.parse(recipes) : []
    for (let i = 0; i < r.length; i += 1) {
      if (r[i].recipeId === recipeId) {
        r[i].favorited = true
        break
      }
    }
    storage.setItem('recipes', JSON.stringify(r))
    return r
  })
}

function unfavoriteRecipe(params) {
  const recipeId = params.recipeId
  return storage.getItem('recipes').then((recipes) => {
    const r = recipes ? JSON.parse(recipes) : []
    for (let i = 0; i < r.length; i += 1) {
      if (r[i].recipeId === recipeId) {
        r[i].favorited = false
        break
      }
    }
    storage.setItem('recipes', JSON.stringify(r))
    return r
  })
}

export const recipeService = {
  persistRecipe,
  fetchRecipes,
  fetchRemoteRecipes,
  deleteRecipe,
  favoriteRecipe,
  unfavoriteRecipe,
}
