import uuidv4 from 'uuid/v4'
import snakeCaseKeys from 'snakecase-keys'
import { Step } from './Step'
import { getOunceAmountFromIngredient, Ingredient } from './Ingredient'

const camelcaseKeys = require('camelcase-keys')

export function snakecaseRecipe(recipe) {
  // Snake case the whole payload
  let snakeCaseRecipe = snakeCaseKeys(recipe)
  for (let i = 0; i < snakeCaseRecipe.steps.length; i++) {
    snakeCaseKeys(snakeCaseRecipe.steps[i])
    for (let j = 0; j < snakeCaseRecipe.steps[i].ingredients; j++) {
      snakeCaseKeys(snakeCaseRecipe.steps[i].ingredients[j])
    }
  }
  return snakeCaseRecipe
}

export function Recipe(recipeObj) {
  const recipe = {}
  // Get ID
  if (!('recipeId' in recipeObj) || recipeObj.recipeId === '') {
    recipe.recipeId = uuidv4()
  } else {
    recipe.recipeId = recipeObj.recipeId
  }

  // Recipe metadata
  recipe.recipeName = recipeObj.recipeName
  recipe.recipeDescription = recipeObj.recipeDescription
  recipe.recipeType = recipeObj.recipeType
  recipe.baseSpirit = recipeObj.baseSpirit
  recipe.servingGlass = recipeObj.servingGlass
  recipe.totalOunces = recipeObj.totalOunces
  recipe.missingCount = recipeObj.missingCount || 0

  // Recipe - how to make
  if (!('steps' in recipeObj)) {
    recipe.steps = []
  } else {
    let stepList = []
    for (let i = 0; i < recipeObj.steps.length; i++) {
      stepList.push(Step(camelcaseKeys(recipeObj.steps[i])))
    }
    recipe.steps = stepList
  }
  if (!('ingredients' in recipeObj)) {
    recipe.ingredients = []
  } else {
    let ingredientList = []
    for (let i = 0; i < recipeObj.ingredients.length; i++) {
      ingredientList.push(Ingredient(camelcaseKeys(recipeObj.ingredients[i])))
    }
    recipe.ingredients = ingredientList
  }

  // Recipe association data
  recipe.sponsorCardId = recipeObj.sponsorCardId || ''
  recipe.masterListId = recipeObj.masterListId || ''
  recipe.campaignId = recipeObj.campaignId || ''
  recipe.favorited = recipeObj.favorited || false
  recipe.status = recipeObj.status || 'ACTIVE'
  recipe.imageLink = recipeObj.imageLink || ''

  // Times
  if (recipeObj.deletedAt) {
    recipe.deletedAt = recipeObj.deletedAt
  }
  if (recipeObj.createdAt) {
    recipe.createdAt = recipeObj.createdAt
  }
  if (recipeObj.updatedAt) {
    recipe.updatedAt = recipeObj.updatedAt
  }

  return recipe
}

export function getTotalOuncesForRecipe(recipe) {
  // Total ounces
  let totalOunces = 0
  for (let i = 0; i < recipe.ingredients.length; i++) {
    totalOunces += getOunceAmountFromIngredient(recipe.ingredients[i])
  }
  return totalOunces
}
