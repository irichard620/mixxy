import { getIngredientShortDescription, Ingredient } from './Ingredient'
import * as constants from '../Config/constants'

const camelcaseKeys = require('camelcase-keys')

export function Step(stepObj) {
  const step = {}

  // Assign other values
  step.title = stepObj.title
  step.notes = stepObj.notes || ''
  step.properties = stepObj.properties || {}
  if (!('ingredients' in stepObj)) {
    step.ingredients = []
  } else {
    let ingredientList = []
    for (let i = 0; i < stepObj.ingredients.length; i++) {
      ingredientList.push(Ingredient(camelcaseKeys(stepObj.ingredients[i])))
    }
    step.ingredients = ingredientList
  }
  step.vessel = stepObj.vessel
  return step
}

export function getStepShortDescription(step) {
  if (step.title === constants.STEP_ADD_INGREDIENTS) {
    let ingredientDescription = 'Add '
    for (let i = 0; i < step.ingredients.length; i++) {
      if (i > 0) {
        ingredientDescription += ', '
      }
      ingredientDescription += getIngredientShortDescription(step.ingredients[i])
    }
    return ingredientDescription
  } else if (step.title === constants.STEP_REMOVE_INGREDIENTS) {
    let ingredientDescription = 'Remove '
    for (let i = 0; i < step.ingredients.length; i++) {
      if (i > 0) {
        ingredientDescription += ', '
      }
      ingredientDescription += step.ingredients[i].title
    }
    return ingredientDescription
  } else if (step.title === constants.STEP_STIR) {
    return `Stir the drink for about ${step.properties.seconds} seconds`
  } else if (step.title === constants.STEP_SHAKE) {
    return `Cover and shake the cocktail shaker for about ${step.properties.seconds} seconds`
  }

  return ''
}
