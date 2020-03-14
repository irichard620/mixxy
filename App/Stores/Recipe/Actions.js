import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Save recipe
  persistRecipe: null,
  // The operation has started and is loading
  persistRecipeLoading: null,
  // recipe saved
  persistRecipeSuccess: ['recipes'],
  // An error occurred
  persistRecipeFailure: ['errorMessage'],

  // Fetch recipes
  fetchRecipes: null,
  // The operation has started and is loading
  fetchRecipesLoading: null,
  // recipe fetched
  fetchRecipesSuccess: ['recipes'],
})

export const RecipeTypes = Types
export default Creators
