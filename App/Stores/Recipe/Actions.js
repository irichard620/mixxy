import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Save recipe
  persistRecipe: ['recipeToSave', 'isExternal', 'isPremium'],
  // The operation has started and is loading
  persistRecipeLoading: null,
  // recipe saved
  persistRecipeSuccess: ['recipes', 'isExternal'],
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

  // Fetch bartender recipes
  fetchBartenderRecipes: ['ingredientIds', 'baseSpirit'],
  // The operation has started and is loading
  fetchBartenderRecipesLoading: null,
  // recipe fetched
  fetchBartenderRecipesSuccess: ['bartenderRecipes'],
  // Failure
  fetchBartenderRecipesFailure: ['errorMessage'],

  // Fetch shared recipe
  fetchSharedRecipe: ['recipeId'],
  // Loading
  fetchSharedRecipeLoading: null,
  // recipe retrieved
  fetchSharedRecipeSuccess: ['recipe'],

  // Create shared recipe
  createSharedRecipe: ['recipe'],
  // Loading
  createSharedRecipeLoading: null,
  // Success
  createSharedRecipeSuccess: ['shareLink'],
  // Failure
  createSharedRecipeFailure: ['errorMessage'],

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

  // Sync user recipes
  syncUserRecipes: ['firebaseToken'],
  syncUserRecipesLoading: null,
  syncUserRecipesSuccess: ['recipes'],
  syncUserRecipesFailure: ['errorMessage'],
})

export const RecipeTypes = Types
export default Creators
