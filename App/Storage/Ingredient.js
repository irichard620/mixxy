import * as constants from '../Config/constants'
import { Fraction } from 'fractional'
import uuidv4 from 'uuid/v4'

export function Ingredient(ingredientObj) {
  const ingredient = {}

  // Assign other values
  if (!('ingredientId' in ingredientObj) || ingredientObj.ingredientId === '') {
    ingredient.ingredientId = uuidv4()
  } else {
    ingredient.ingredientId = ingredientObj.ingredientId
  }
  ingredient.title = ingredientObj.title || ''
  if (!('brand' in ingredientObj)) {
    ingredient.brand = ''
  } else {
    ingredient.brand = ingredientObj.brand
  }
  ingredient.amount = ingredientObj.amount || '0'
  ingredient.fractionalAmount = ingredientObj.fractionalAmount || ''
  ingredient.amountType = ingredientObj.amountType || ''

  return ingredient
}

export function createIngredientDic(ingredients) {
  const ingredientDict = {}
  for (let i = 0; i < ingredients.length; i++) {
    ingredientDict[ingredients[i].ingredientId] = ingredients[i]
  }
  return ingredientDict
}

const AMOUNT_TYPE_ABBREVIATIONS = {
  [constants.AMOUNT_TYPE_OZ]: ' oz',
  [constants.AMOUNT_TYPE_ML]: ' ml',
  [constants.AMOUNT_TYPE_CL]: ' cl',
  [constants.AMOUNT_TYPE_TSP]: ' tsp',
  [constants.AMOUNT_TYPE_TBSP]: ' Tbs',
  [constants.AMOUNT_TYPE_CUP]: ' cup',
  [constants.AMOUNT_TYPE_DASH]: ' dash',
  [constants.AMOUNT_TYPE_DROP]: ' drop',
  [constants.AMOUNT_TYPE_PIECE]: ' pc',
  [constants.AMOUNT_TYPE_PINCH]: ' pinch',
  '': '',
}

const AMOUNT_TYPE_ABBREVIATIONS_PLURAL = {
  [constants.AMOUNT_TYPE_OZ]: ' oz',
  [constants.AMOUNT_TYPE_ML]: ' ml',
  [constants.AMOUNT_TYPE_CL]: ' cl',
  [constants.AMOUNT_TYPE_TSP]: ' tsp',
  [constants.AMOUNT_TYPE_TBSP]: ' Tbs',
  [constants.AMOUNT_TYPE_CUP]: ' cups',
  [constants.AMOUNT_TYPE_DASH]: ' dashes',
  [constants.AMOUNT_TYPE_DROP]: ' drops',
  [constants.AMOUNT_TYPE_PIECE]: ' pcs',
  [constants.AMOUNT_TYPE_PINCH]: ' pinches',
  '': '',
}

const AMOUNT_TYPE_OUNCE_MULTIPLIER = {
  [constants.AMOUNT_TYPE_OZ]: 1,
  [constants.AMOUNT_TYPE_ML]: 0.034,
  [constants.AMOUNT_TYPE_CL]: 0.34,
  [constants.AMOUNT_TYPE_TSP]: 0.167,
  [constants.AMOUNT_TYPE_TBSP]: 0.5,
  [constants.AMOUNT_TYPE_CUP]: 8,
  [constants.AMOUNT_TYPE_DASH]: 0,
  [constants.AMOUNT_TYPE_DROP]: 0,
  [constants.AMOUNT_TYPE_PIECE]: 0,
  [constants.AMOUNT_TYPE_PINCH]: 0,
  [constants.AMOUNT_TYPE_GARNISH]: 0,
  [constants.AMOUNT_TYPE_RIM]: 0,
  '': 0,
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

export function getIngredientAmount(ingredient, drinkAmount, doUnitConversion, useMetric) {
  if (
    ingredient.amountType === constants.AMOUNT_TYPE_GARNISH ||
    ingredient.amountType === constants.AMOUNT_TYPE_RIM
  ) {
    return ingredient.amountType
  }
  if (ingredient.amount === '0' && ingredient.fractionalAmount === '') {
    return ''
  }
  let wholeNumberAmount = parseInt(ingredient.amount)
  let rawDecimal = wholeNumberAmount
  let baseFraction = new Fraction(wholeNumberAmount, 1)
  if (ingredient.fractionalAmount !== '') {
    const splits = ingredient.fractionalAmount.split('/')
    if (splits.length === 2) {
      baseFraction = baseFraction.add(new Fraction(parseInt(splits[0]), parseInt(splits[1])))
      rawDecimal += parseInt(splits[0]) / parseInt(splits[1])
    }
  }
  let multiplier = null
  let convertToMetric = false
  let amountTypeToUse = ingredient.amountType
  if (doUnitConversion) {
    if (ingredient.amountType === constants.AMOUNT_TYPE_OZ && useMetric) {
      // Translate oz to cl
      amountTypeToUse = constants.AMOUNT_TYPE_ML
      multiplier = 29.57
      convertToMetric = true
    } else if (ingredient.amountType === constants.AMOUNT_TYPE_CL && !useMetric) {
      // Translate cl to oz
      amountTypeToUse = constants.AMOUNT_TYPE_OZ
      multiplier = 0.338
    } else if (ingredient.amountType === constants.AMOUNT_TYPE_ML && !useMetric) {
      // Translate ml to oz
      amountTypeToUse = constants.AMOUNT_TYPE_OZ
      multiplier = 0.0338
    }
  }
  if (multiplier !== null && !convertToMetric) {
    // Multiply raw decimal by multiplier
    const rawConvertedDecimal = rawDecimal * multiplier
    // Round to nearest eighth
    const convertedDecimalToEighth = Math.round(rawConvertedDecimal * 8) / 8
    const splitConvertedDecimalToEighth = [
      convertedDecimalToEighth > 0
        ? Math.floor(convertedDecimalToEighth)
        : Math.ceil(convertedDecimalToEighth),
      convertedDecimalToEighth % 1,
    ]
    baseFraction = new Fraction(splitConvertedDecimalToEighth[0], 1)
    const decimalFraction = getFractionFromRoundedDecimal(splitConvertedDecimalToEighth[1])
    if (decimalFraction) {
      baseFraction = baseFraction.add(decimalFraction)
    }
  }
  if (multiplier !== null && convertToMetric) {
    // Multiply raw decimal by multiplier
    const rawConvertedDecimal = rawDecimal * multiplier
    // Round to nearest multiple of 5
    const convertedDecimalToEighth = Math.round(rawConvertedDecimal / 5) * 5
    baseFraction = new Fraction(convertedDecimalToEighth, 1)
  }
  if (drinkAmount) {
    baseFraction = baseFraction.multiply(new Fraction(drinkAmount, 1))
  }
  const isPlural = baseFraction.numerator > baseFraction.denominator
  if (isPlural) {
    return `${baseFraction.toString()}${AMOUNT_TYPE_ABBREVIATIONS_PLURAL[amountTypeToUse]}`
  } else {
    return `${baseFraction.toString()}${AMOUNT_TYPE_ABBREVIATIONS[amountTypeToUse]}`
  }
}

function getFractionFromRoundedDecimal(roundedDecimal) {
  switch (roundedDecimal) {
    case 0:
      return null
    case 0.125:
      return new Fraction(1, 8)
    case 0.25:
      return new Fraction(1, 4)
    case 0.375:
      return new Fraction(3, 8)
    case 0.5:
      return new Fraction(1, 2)
    case 0.625:
      return new Fraction(5, 8)
    case 0.75:
      return new Fraction(3, 4)
    case 0.875:
      return new Fraction(7, 8)
  }
  return null
}

export function getIngredientShortDescription(ingredient, drinkAmount, inStep, useMetric) {
  // Format is amount-unit-ingredient
  // Ex: 2oz Silver Tequila
  if (
    inStep &&
    (ingredient.amountType === constants.AMOUNT_TYPE_GARNISH ||
      ingredient.amountType === constants.AMOUNT_TYPE_RIM)
  ) {
    return ingredient.title
  }
  return `${getIngredientAmount(ingredient, drinkAmount, true, useMetric)} ${ingredient.title}`
}
