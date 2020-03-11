import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch ingredients
  persistRecipe: null,
  // The operation has started and is loading
  persistRecipeLoading: null,
  // recipe saved
  persistRecipeSuccess: ['recipes'],
  // An error occurred
  persistRecipeFailure: ['errorMessage'],
})

export const RecipeTypes = Types
export default Creators
