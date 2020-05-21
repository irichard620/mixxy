import {
  getIngredientShortDescription,
  getOunceAmountFromIngredient,
  Ingredient,
} from './Ingredient'
import * as constants from '../Config/constants'
import { Text } from 'react-native'
import React from 'react'

const camelcaseKeys = require('camelcase-keys')

export function Step(stepObj) {
  const step = {}

  // Assign other values
  step.title = stepObj.title
  if (!('ingredients' in stepObj)) {
    step.ingredients = []
  } else {
    let ingredientList = []
    for (let i = 0; i < stepObj.ingredients.length; i++) {
      ingredientList.push(Ingredient(camelcaseKeys(stepObj.ingredients[i])))
    }
    step.ingredients = ingredientList
  }
  return step
}

export function getStepTotalOunces(step) {
  if (step.title === constants.STEP_ADD_INGREDIENTS) {
    let totalOunces = 0
    for (let i = 0; i < step.ingredients.length; i++) {
      totalOunces += getOunceAmountFromIngredient(step.ingredients[i])
    }
    return totalOunces
  }
  return 0
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
    return `Stir the drink until ${step.properties.prompt}`
  } else if (step.title === constants.STEP_SHAKE) {
    return `Cover and shake the cocktail shaker until ${step.properties.prompt}`
  }

  return ''
}

export function getIngredientsList(step, drinkAmount) {
  let ingredientDescription = ''
  for (let i = 0; i < step.ingredients.length; i++) {
    if (i > 0) {
      ingredientDescription += ', '
    }
    if (step.title === constants.STEP_ADD_INGREDIENTS) {
      ingredientDescription += getIngredientShortDescription(step.ingredients[i], drinkAmount)
    } else {
      ingredientDescription += step.ingredients[i].title
    }
  }
  return ingredientDescription
}

export function getStepProperties(modalType, modalText) {
  // Get properties
  if (modalType === constants.STEP_STIR) {
    return { prompt: modalText }
  } else if (modalType === constants.STEP_BLEND) {
    return { consistency: modalText }
  } else if (modalType === constants.STEP_SHAKE) {
    return { prompt: modalText }
  }
  return {}
}

export function getModalTextProperty(step) {
  const { title, properties } = step
  if (title === constants.STEP_STIR) {
    return properties.prompt
  } else if (title === constants.STEP_BLEND) {
    return properties.consistency
  } else if (title === constants.STEP_SHAKE) {
    return properties.prompt
  }
  return ''
}

const getHighlightedText = (text, styles) => (
  <Text style={styles.stepDescriptionHighlight}>{text.toLowerCase()}</Text>
)

export const getStepDescriptionWithHighlights = (step, styles, drinkAmount) => {
  if (step.title === constants.STEP_ADD_INGREDIENTS) {
    let ingredientDescription = getIngredientsList(step, drinkAmount)
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Add '}
        {getHighlightedText(ingredientDescription, styles)}
        {' to a '}
        {getHighlightedText(step.vessel, styles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_REMOVE_INGREDIENTS) {
    let ingredientDescription = getIngredientsList(step)
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Discard '}
        {getHighlightedText(ingredientDescription, styles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_MUDDLE) {
    let ingredientDescription = getIngredientsList(step)
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Muddle '}
        {getHighlightedText(ingredientDescription, styles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_STRAIN) {
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Pour through a strainer into '}
        {getHighlightedText(step.vessel, styles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_STIR) {
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Stir until '}
        {getHighlightedText(step.properties.prompt, styles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_BLEND) {
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Blend together until a '}
        {getHighlightedText(step.properties.consistency, styles)}
        {' consistency.'}
      </Text>
    )
  } else if (step.title === constants.STEP_SHAKE) {
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Cover and shake until '}
        {getHighlightedText(step.properties.prompt, styles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_GARNISH) {
    let ingredientDescription = getIngredientsList(step)
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Garnish the serving glass with '}
        {getHighlightedText(ingredientDescription, styles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_RIM_GLASS) {
    let ingredientDescription = getIngredientsList(step)
    return (
      <Text style={styles.stepDescriptionBase}>
        {'Add '}
        {getHighlightedText(ingredientDescription, styles)}
        {' to a shallow dish. Moisten the rim of the glass and rotate it in the '}
        {getHighlightedText(ingredientDescription, styles)}
        {' to garnish the rim.'}
      </Text>
    )
  }
  return <Text style={styles.stepDescriptionBase}>{getStepShortDescription(step)}</Text>
}
