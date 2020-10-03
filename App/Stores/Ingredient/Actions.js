import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch ingredients
  fetchIngredients: null,
  // The operation has started and is loading
  fetchIngredientsLoading: null,
  // ingredient informations were successfully fetched
  fetchIngredientsSuccess: ['ingredients'],
  // An error occurred
  fetchIngredientsFailure: ['errorMessage'],
  // Bar cart add ingredients
  barCartSetIngredients: ['ingredients'],
  // loading
  barCartSetIngredientsLoading: null,
  // Success
  barCartSetIngredientsSuccess: ['barCartIngredients'],
  // An error occurred
  barCartSetIngredientsFailure: ['errorMessage'],
  // Bar cart get ingredients
  barCartFetchIngredients: null,
  // loading
  barCartFetchIngredientsLoading: null,
  // Success
  barCartFetchIngredientsSuccess: ['barCartIngredients'],
  // An error occurred
  barCartFetchIngredientsFailure: ['errorMessage'],
})

export const IngredientTypes = Types
export default Creators
