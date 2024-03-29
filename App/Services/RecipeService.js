import storage from 'redux-persist/lib/storage'
import DeviceInfo from 'react-native-device-info'
import analytics from '@react-native-firebase/analytics'
import * as recipeModel from '../Storage/Recipe'
import { defaultApiClient, in200s } from './Helpers'
import camelcaseKeys from 'camelcase-keys'
import snakeCaseKeys from 'snakecase-keys'
import uuidv4 from 'uuid/v4'
import { Recipe } from '../Storage/Recipe'
import * as constants from '../Config/constants'

async function persistRecipe(params) {
  const recipeToSave = params.recipeToSave
  const isExternal = params.isExternal
  const isPremium = params.isPremium
  try {
    const recipes = await storage.getItem('recipes')
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
      return [[], 'A recipe with this name already exists', false]
    } else if (!found && !isPremium && r.length >= 5) {
      return [[], constants.MIXXY_PRO_LIBRARY_FULL, false]
    } else {
      if (!found) {
        // Assign new ID if external
        if (isExternal) {
          recipeToSave.recipeId = uuidv4()
          if (recipeToSave.sponsorCardId && recipeToSave.sponsorCardId !== '') {
            analytics().logEvent('sponsor_recipe_save', {
              sponsor_id: recipeToSave.sponsorCardId,
              recipe_name: recipeToSave.recipeName,
            })
          }
        } else {
          // Log create recipe event
          analytics().logEvent('builder_new_recipe', {})
        }
        r.push(recipeToSave)
      }
      storage.setItem('recipes', JSON.stringify(r))
      return [r, '', isExternal]
    }
  } catch (e) {
    return [[], 'Unexpected error', false]
  }
}

async function fetchRecipes() {
  try {
    const recipes = await storage.getItem('recipes')
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
  } catch (e) {
    return []
  }
}

async function fetchRemoteRecipes(params) {
  let url = 'recipes?'
  if (params.sponsorCardId) {
    url += `sponsor_card_id=${params.sponsorCardId}&`
  } else if (params.campaignId) {
    url += `campaign_id=${params.campaignId}&`
  } else if (params.masterListId) {
    url += `master_list_id=${params.masterListId}&`
  }
  const appVersion = DeviceInfo.getVersion()
  try {
    const response = await defaultApiClient(`${url}version=${appVersion}`).get()
    if (in200s(response.status)) {
      const recipes = []
      for (let i = 0; i < response.data.length; i++) {
        recipes.push(Recipe(camelcaseKeys(response.data[i])))
      }
      return recipes
    }

    return null
  } catch (e) {
    return null
  }
}

async function fetchBartenderRecipes(params) {
  let url = 'bartender/'
  try {
    const response = await defaultApiClient(url).put('recipes', {
      ingredientIds: params.ingredientIds,
      baseSpirit: params.baseSpirit,
    })
    if (in200s(response.status)) {
      const recipes = []
      for (let i = 0; i < response.data.length; i++) {
        recipes.push(Recipe(camelcaseKeys(response.data[i])))
      }
      return recipes
    }

    return null
  } catch (e) {
    return null
  }
}

async function fetchSharedRecipe(params) {
  const appVersion = DeviceInfo.getVersion()
  try {
    let url = `recipes/${params.recipeId}?version=${appVersion}`
    const response = await defaultApiClient(url).get()
    console.log(response)
    if (in200s(response.status)) {
      return Recipe(camelcaseKeys(response.data))
    }

    return null
  } catch (e) {
    return null
  }
}

async function createSharedRecipe(params) {
  const deviceToken = await DeviceInfo.getDeviceToken().catch((e) => {
    return null
  })
  if (!deviceToken) {
    return null
  }

  // Snake case the whole payload
  let recipe = snakeCaseKeys(params.recipe)
  for (let i = 0; i < recipe.steps.length; i++) {
    snakeCaseKeys(recipe.steps[i])
    for (let j = 0; j < recipe.steps[i].ingredients; j++) {
      snakeCaseKeys(recipe.steps[i].ingredients[j])
    }
  }

  let url = `recipes/`
  recipe.device_token = deviceToken
  return defaultApiClient(url)
    .put(recipe.recipe_id, recipe)
    .then((response) => {
      if (in200s(response.status)) {
        return response.data
      }

      return null
    })
    .catch((error) => {
      console.log(error.response)
    })
}

async function deleteRecipe(params) {
  const recipeId = params.recipeId
  const recipes = await storage.getItem('recipes')
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
}

async function favoriteRecipe(params) {
  const recipeId = params.recipeId
  const recipes = await storage.getItem('recipes')
  const r = recipes ? JSON.parse(recipes) : []
  for (let i = 0; i < r.length; i += 1) {
    if (r[i].recipeId === recipeId) {
      r[i].favorited = true
      break
    }
  }
  storage.setItem('recipes', JSON.stringify(r))
  return r
}

async function unfavoriteRecipe(params) {
  const recipeId = params.recipeId
  const recipes = await storage.getItem('recipes')
  const r = recipes ? JSON.parse(recipes) : []
  for (let i = 0; i < r.length; i += 1) {
    if (r[i].recipeId === recipeId) {
      r[i].favorited = false
      break
    }
  }
  storage.setItem('recipes', JSON.stringify(r))
  return r
}

export const recipeService = {
  persistRecipe,
  fetchRecipes,
  fetchRemoteRecipes,
  fetchBartenderRecipes,
  fetchSharedRecipe,
  createSharedRecipe,
  deleteRecipe,
  favoriteRecipe,
  unfavoriteRecipe,
}
