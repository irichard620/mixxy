import * as constants from '../Config/constants'
import { Fraction } from 'fractional'

export function Ingredient(ingredientObj) {
  const ingredient = {}

  // Assign other values
  ingredient.ingredientId = ingredientObj.ingredientId || ''
  ingredient.title = ingredientObj.title
  if (!('brand' in ingredientObj)) {
    ingredient.brand = ''
  } else {
    ingredient.brand = ingredientObj.brand
  }
  ingredient.amount = ingredientObj.amount || '0'
  ingredient.fractionalAmount = ingredientObj.fractionalAmount || ''
  ingredient.amountType = ingredientObj.amountType

  return ingredient
}

const AMOUNT_TYPE_ABBREVIATIONS = {
  [constants.AMOUNT_TYPE_OZ]: 'oz',
  [constants.AMOUNT_TYPE_TSP]: 'tsp',
  [constants.AMOUNT_TYPE_TBSP]: 'Tbs',
  [constants.AMOUNT_TYPE_CUP]: ' cup',
  [constants.AMOUNT_TYPE_DASH]: ' dash',
  [constants.AMOUNT_TYPE_DROP]: ' drop',
  [constants.AMOUNT_TYPE_PIECE]: ' pc',
  [constants.AMOUNT_TYPE_PINCH]: ' pinch',
  [constants.AMOUNT_TYPE_SLICE]: ' slice',
}

const AMOUNT_TYPE_OUNCE_MULTIPLIER = {
  [constants.AMOUNT_TYPE_OZ]: 1,
  [constants.AMOUNT_TYPE_TSP]: 0.167,
  [constants.AMOUNT_TYPE_TBSP]: 0.5,
  [constants.AMOUNT_TYPE_CUP]: 8,
  [constants.AMOUNT_TYPE_DASH]: 0,
  [constants.AMOUNT_TYPE_DROP]: 0,
  [constants.AMOUNT_TYPE_PIECE]: 0,
  [constants.AMOUNT_TYPE_PINCH]: 0,
  [constants.AMOUNT_TYPE_SLICE]: 0,
}

export function getOunceAmountFromIngredient(ingredient) {
  // First, whole number amount
  let totalOunces = 0
  if (ingredient.amount !== '') {
    totalOunces += parseInt(ingredient.amount) * AMOUNT_TYPE_OUNCE_MULTIPLIER[ingredient.amountType]
  }
  if (ingredient.fractionalAmount !== '') {
    const splits = ingredient.fractionalAmount.split('/')
    if (splits.length === 2) {
      const decimalAmount = parseInt(splits[0]) / parseInt(splits[1])
      totalOunces += decimalAmount * AMOUNT_TYPE_OUNCE_MULTIPLIER[ingredient.amountType]
    }
  }
  return totalOunces
}

export function getIngredientAmount(ingredient, drinkAmount) {
  let baseFraction = new Fraction(parseInt(ingredient.amount), 1)
  if (ingredient.fractionalAmount !== '') {
    const splits = ingredient.fractionalAmount.split('/')
    if (splits.length === 2) {
      baseFraction = baseFraction.add(new Fraction(parseInt(splits[0]), parseInt(splits[1])))
    }
  }
  if (drinkAmount) {
    baseFraction = baseFraction.multiply(new Fraction(drinkAmount, 1))
  }
  return `${baseFraction.toString()}${AMOUNT_TYPE_ABBREVIATIONS[ingredient.amountType]}`
}

export function getIngredientShortDescription(ingredient, drinkAmount) {
  // Format is amount-unit-ingredient
  // Ex: 2oz Silver Tequila
  const brandText = ingredient.brand !== '' ? ` (${ingredient.brand})` : ''
  return `${getIngredientAmount(ingredient, drinkAmount)} ${ingredient.title}${brandText}`
}
