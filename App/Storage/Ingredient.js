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
  [constants.AMOUNT_TYPE_OZ]: ' oz',
  [constants.AMOUNT_TYPE_TSP]: ' tsp',
  [constants.AMOUNT_TYPE_TBSP]: ' Tbs',
  [constants.AMOUNT_TYPE_CUP]: ' cup',
  [constants.AMOUNT_TYPE_DASH]: ' dash',
  [constants.AMOUNT_TYPE_DROP]: ' drop',
  [constants.AMOUNT_TYPE_PIECE]: ' pc',
  [constants.AMOUNT_TYPE_PINCH]: ' pinch',
  [constants.AMOUNT_TYPE_SLICE]: ' slice',
  [constants.AMOUNT_TYPE_SPRIG]: ' sprig',
  [constants.AMOUNT_TYPE_GRIND]: ' grind',
  [constants.AMOUNT_TYPE_LEAF]: ' leaf',
}

const AMOUNT_TYPE_ABBREVIATIONS_PLURAL = {
  [constants.AMOUNT_TYPE_OZ]: ' oz',
  [constants.AMOUNT_TYPE_TSP]: ' tsp',
  [constants.AMOUNT_TYPE_TBSP]: ' Tbs',
  [constants.AMOUNT_TYPE_CUP]: ' cups',
  [constants.AMOUNT_TYPE_DASH]: ' dashes',
  [constants.AMOUNT_TYPE_DROP]: ' drops',
  [constants.AMOUNT_TYPE_PIECE]: ' pcs',
  [constants.AMOUNT_TYPE_PINCH]: ' pinches',
  [constants.AMOUNT_TYPE_SLICE]: ' slices',
  [constants.AMOUNT_TYPE_SPRIG]: ' sprigs',
  [constants.AMOUNT_TYPE_GRIND]: ' grinds',
  [constants.AMOUNT_TYPE_LEAF]: ' leafs',
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
  [constants.AMOUNT_TYPE_SPRIG]: 0,
  [constants.AMOUNT_TYPE_GRIND]: 0,
  [constants.AMOUNT_TYPE_LEAF]: 0,
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
  let isPlural = false
  let wholeNumberAmount = parseInt(ingredient.amount)
  if (wholeNumberAmount > 1) isPlural = true
  let baseFraction = new Fraction(wholeNumberAmount, 1)
  if (ingredient.fractionalAmount !== '') {
    const splits = ingredient.fractionalAmount.split('/')
    if (splits.length === 2) {
      baseFraction = baseFraction.add(new Fraction(parseInt(splits[0]), parseInt(splits[1])))
      if (wholeNumberAmount === 1) isPlural = true
    }
  }
  if (drinkAmount) {
    baseFraction = baseFraction.multiply(new Fraction(drinkAmount, 1))
  }
  if (isPlural) {
    return `${baseFraction.toString()}${AMOUNT_TYPE_ABBREVIATIONS_PLURAL[ingredient.amountType]}`
  } else {
    return `${baseFraction.toString()}${AMOUNT_TYPE_ABBREVIATIONS[ingredient.amountType]}`
  }
}

export function getIngredientShortDescription(ingredient, drinkAmount) {
  // Format is amount-unit-ingredient
  // Ex: 2oz Silver Tequila
  const brandText = ingredient.brand !== '' ? ` (${ingredient.brand})` : ''
  return `${getIngredientAmount(ingredient, drinkAmount)} ${ingredient.title}${brandText}`
}
