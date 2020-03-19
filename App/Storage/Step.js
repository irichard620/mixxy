import { getIngredientShortDescription, Ingredient } from './Ingredient'
import * as constants from '../Config/constants'
import { Text } from 'react-native'
import React from 'react'

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

export function getIngredientsList(step) {
  let ingredientDescription = ''
  for (let i = 0; i < step.ingredients.length; i++) {
    if (i > 0) {
      ingredientDescription += ', '
    }
    if (step.title === constants.STEP_ADD_INGREDIENTS) {
      ingredientDescription += getIngredientShortDescription(step.ingredients[i])
    } else {
      ingredientDescription += step.ingredients[i].title
    }
  }
  return ingredientDescription
}

export function getStepProperties(modalType, modalText) {
  // Get properties
  if (modalType === constants.STEP_STIR) {
    return { seconds: modalText }
  } else if (modalType === constants.STEP_BLEND) {
    return { consistency: modalText }
  } else if (modalType === constants.STEP_SHAKE) {
    return { seconds: modalText }
  }
  return {}
}

export function getModalTextProperty(step) {
  const { title, properties } = step
  if (title === constants.STEP_STIR) {
    return properties.seconds
  } else if (title === constants.STEP_BLEND) {
    return properties.consistency
  } else if (title === constants.STEP_SHAKE) {
    return properties.seconds
  }
  return ''
}

const getHighlightedText = (text, styles) => (
  <Text style={styles.stepDescriptionHighlight}>{text}</Text>
)

export const getStepDescriptionWithHighlights = (step, styles) => {
  if (step.title === constants.STEP_ADD_INGREDIENTS) {
    let ingredientDescription = getIngredientsList(step)
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
        {'Stir for '}
        {getHighlightedText(step.properties.seconds, styles)}
        {' seconds.'}
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
        {'Cover and shake for '}
        {getHighlightedText(step.properties.seconds, styles)}
        {' seconds.'}
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
