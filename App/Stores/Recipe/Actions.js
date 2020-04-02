import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Save recipe
  persistRecipe: ['recipeToSave'],
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

  // Fetch remote recipes
  fetchRemoteRecipes: ['sponsorCardId', 'campaignId', 'masterListId'],
  // The operation has started and is loading
  fetchRemoteRecipesLoading: null,
  // recipe fetched
  fetchRemoteRecipesSuccess: ['recipes'],
  // Failure
  fetchRemoteRecipesFailure: ['errorMessage'],

  // Delete recipe
  deleteRecipe: ['recipeId'],
  // The operation has started and is loading
  deleteRecipeLoading: null,
  // recipe deleted
  deleteRecipeSuccess: ['recipes'],

  // Favorite
  favoriteRecipe: ['recipeId'],
  // Unfavorite
  unfavoriteRecipe: ['recipeId'],
})

export const RecipeTypes = Types
export default Creators
