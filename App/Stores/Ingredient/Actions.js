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
})

export const IngredientTypes = Types
export default Creators
