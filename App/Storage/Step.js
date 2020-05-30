import { getIngredientShortDescription } from './Ingredient'
import * as constants from '../Config/constants'
import { Text } from 'react-native'
import React from 'react'

export function Step(stepObj) {
  const step = {}

  // Assign other values
  step.title = stepObj.title || ''
  step.ingredients = stepObj.ingredients || []
  step.startLocation = stepObj.startLocation || -1
  step.endLocation = stepObj.endLocation || -1
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
    return `Stir the drink until ${step.properties.prompt}`
  } else if (step.title === constants.STEP_SHAKE) {
    return `Cover and shake the cocktail shaker until ${step.properties.prompt}`
  }

  return ''
}

export function getIngredientsList(step, drinkAmount, ingredientDict, inStep) {
  let ingredientDescription = ''
  for (let i = 0; i < step.ingredients.length; i++) {
    if (i > 0) {
      ingredientDescription += ', '
    }
    ingredientDescription += getIngredientShortDescription(
      ingredientDict[step.ingredients[i]],
      drinkAmount,
      inStep
    )
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

const getHighlightedText = (text, styles, isActive) => (
  <Text style={isActive ? styles.stepDescriptionActive : styles.stepDescriptionHighlight}>{text.toLowerCase()}</Text>
)

const getNormalText = (text, styles, isActive) => (
  <Text style={isActive ? styles.stepDescriptionActive : styles.stepDescriptionBase}>{text}</Text>
)

export const getStepTextSequeunces = (step) => {
  // Create text sequences
  const textSequences = []
  if (step.startLocation === -1) {
    textSequences.push({ title: step.title, highlighted: false })
  } else {
    textSequences.push({ title: step.title.substring(0, step.startLocation), highlighted: false })
    textSequences.push({
      title: step.title.substring(step.startLocation, step.endLocation),
      highlighted: true,
    })
    textSequences.push({
      title: step.title.substring(step.endLocation, step.title.length),
      highlighted: false,
    })
  }
  return textSequences
}

export const getStepDescriptionWithHighlights = (
  step,
  styles,
  drinkAmount,
  ingredientDict,
  isActive,
  inStep,
) => {
  // Get ingredient description
  let ingredientDescription = getIngredientsList(step, drinkAmount, ingredientDict, inStep)
  // Add to step title
  let title = step.title
  if (step.startLocation > -1) {
    title =
      step.title.substring(0, step.startLocation) +
      ingredientDescription +
      step.title.substring(step.startLocation)
  }
  const textSequences = getStepTextSequeunces({
    title: title,
    startLocation: step.startLocation,
    endLocation: step.startLocation + ingredientDescription.length,
  })

  return (
    <Text style={styles.stepDescriptionBase}>
      {textSequences.map((text) => {
        if (text.highlighted) {
          return getHighlightedText(text.title, styles, isActive)
        } else {
          return getNormalText(text.title, styles, isActive)
        }
      })}
    </Text>
  )
}
