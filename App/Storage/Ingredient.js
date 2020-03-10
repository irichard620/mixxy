import * as constants from '../Config/constants'

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
  [constants.AMOUNT_TYPE_TBSP]: 'tbsp',
  [constants.AMOUNT_TYPE_PIECE]: 'pc',
}

export function getIngredientAmount(ingredient) {
  if (ingredient.fractionalAmount !== '') {
    return `${ingredient.amount} ${ingredient.fractionalAmount}${
      AMOUNT_TYPE_ABBREVIATIONS[ingredient.amountType]
    }`
  } else {
    return `${ingredient.amount}${AMOUNT_TYPE_ABBREVIATIONS[ingredient.amountType]}`
  }
}

export function getIngredientShortDescription(ingredient) {
  // Format is amount-unit-ingredient
  // Ex: 2oz Silver Tequila
  const brandText = ingredient.brand !== '' ? ` (${ingredient.brand})` : ''
  return `${getIngredientAmount(ingredient)} ${ingredient.title}${brandText}`
}
