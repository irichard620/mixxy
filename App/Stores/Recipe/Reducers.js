import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { RecipeTypes } from './Actions'

export const persistRecipeLoading = (state) => ({
  ...state,
  recipeIsExternal: false,
  persistRecipeIsLoading: true,
  persistRecipeErrorMessage: null,
})

export const persistRecipeSuccess = (state, { recipes, isExternal }) => ({
  ...state,
  recipes: recipes,
  recipeIsExternal: isExternal,
  persistRecipeIsLoading: false,
  persistRecipeErrorMessage: null,
})

export const persistRecipeFailure = (state, { errorMessage }) => ({
  ...state,
  recipeIsExternal: false,
  persistRecipeIsLoading: false,
  persistRecipeErrorMessage: errorMessage,
})

export const fetchRecipesLoading = (state) => ({
  ...state,
  fetchRecipesIsLoading: true,
})

export const fetchRecipesSuccess = (state, { recipes }) => ({
  ...state,
  recipes: recipes,
  fetchRecipesIsLoading: false,
})

export const fetchRemoteRecipesLoading = (state) => ({
  ...state,
  remoteRecipes: [],
  fetchRemoteRecipesIsLoading: true,
  fetchRemoteRecipesErrorMessage: null,
})

export const fetchRemoteRecipesSuccess = (state, { recipes }) => ({
  ...state,
  remoteRecipes: recipes,
  fetchRemoteRecipesIsLoading: false,
  fetchRemoteRecipesErrorMessage: null,
})

export const fetchRemoteRecipesFailure = (state, { errorMessage }) => ({
  ...state,
  fetchRemoteRecipesIsLoading: false,
  fetchRemoteRecipesErrorMessage: errorMessage,
})

export const fetchBartenderRecipesLoading = (state) => ({
  ...state,
  bartenderRecipes: [],
  fetchBartenderRecipesIsLoading: true,
  fetchBartenderRecipesErrorMessage: null,
})

export const fetchBartenderRecipesSuccess = (state, { bartenderRecipes }) => {
  return {
    ...state,
    bartenderRecipes: bartenderRecipes,
    fetchBartenderRecipesIsLoading: false,
    fetchBartenderRecipesErrorMessage: null,
  }
}

export const fetchBartenderRecipesFailure = (state, { errorMessage }) => ({
  ...state,
  fetchBartenderRecipesIsLoading: false,
  fetchBartenderRecipesErrorMessage: errorMessage,
})

export const deleteRecipeLoading = (state) => ({
  ...state,
  deleteRecipeIsLoading: true,
})

export const deleteRecipeSuccess = (state, { recipes }) => ({
  ...state,
  recipes: recipes,
  deleteRecipeIsLoading: false,
})

export const fetchSharedRecipeLoading = (state) => ({
  ...state,
  fetchSharedRecipeIsLoading: true,
})

export const fetchSharedRecipeSuccess = (state, { recipe }) => ({
  ...state,
  fetchSharedRecipeIsLoading: false,
  sharedRecipe: recipe,
})

export const createSharedRecipeLoading = (state) => ({
  ...state,
  shareLink: null,
  createSharedRecipeIsLoading: true,
  createSharedRecipeErrorMessage: null,
})

export const createSharedRecipeSuccess = (state, { shareLink }) => ({
  ...state,
  shareLink: shareLink,
  createSharedRecipeIsLoading: false,
  createSharedRecipeErrorMessage: null,
})

export const createSharedRecipeFailure = (state, { errorMessage }) => ({
  ...state,
  createSharedRecipeIsLoading: false,
  createSharedRecipeErrorMessage: errorMessage,
})

export const syncUserRecipesLoading = (state) => ({
  ...state,
  syncUserRecipesIsLoading: true,
  syncUserRecipesErrorMessage: null,
})

export const syncUserRecipesSuccess = (state, { recipes }) => ({
  ...state,
  recipes: recipes,
  syncUserRecipesIsLoading: false,
  syncUserRecipesErrorMessage: null,
})

export const syncUserRecipesFailure = (state, { errorMessage }) => ({
  ...state,
  syncUserRecipesIsLoading: false,
  syncUserRecipesErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [RecipeTypes.PERSIST_RECIPE_LOADING]: persistRecipeLoading,
  [RecipeTypes.PERSIST_RECIPE_SUCCESS]: persistRecipeSuccess,
  [RecipeTypes.PERSIST_RECIPE_FAILURE]: persistRecipeFailure,
  [RecipeTypes.FETCH_RECIPES_LOADING]: fetchRecipesLoading,
  [RecipeTypes.FETCH_RECIPES_SUCCESS]: fetchRecipesSuccess,
  [RecipeTypes.FETCH_REMOTE_RECIPES_LOADING]: fetchRemoteRecipesLoading,
  [RecipeTypes.FETCH_REMOTE_RECIPES_SUCCESS]: fetchRemoteRecipesSuccess,
  [RecipeTypes.FETCH_REMOTE_RECIPES_FAILURE]: fetchRemoteRecipesFailure,
  [RecipeTypes.FETCH_BARTENDER_RECIPES_LOADING]: fetchBartenderRecipesLoading,
  [RecipeTypes.FETCH_BARTENDER_RECIPES_SUCCESS]: fetchBartenderRecipesSuccess,
  [RecipeTypes.FETCH_BARTENDER_RECIPES_FAILURE]: fetchBartenderRecipesFailure,
  [RecipeTypes.DELETE_RECIPE_LOADING]: deleteRecipeLoading,
  [RecipeTypes.DELETE_RECIPE_SUCCESS]: deleteRecipeSuccess,
  [RecipeTypes.FETCH_SHARED_RECIPE_LOADING]: fetchSharedRecipeLoading,
  [RecipeTypes.FETCH_SHARED_RECIPE_SUCCESS]: fetchSharedRecipeSuccess,
  [RecipeTypes.CREATE_SHARED_RECIPE_LOADING]: createSharedRecipeLoading,
  [RecipeTypes.CREATE_SHARED_RECIPE_SUCCESS]: createSharedRecipeSuccess,
  [RecipeTypes.CREATE_SHARED_RECIPE_FAILURE]: createSharedRecipeFailure,
  [RecipeTypes.SYNC_USER_RECIPES_LOADING]: syncUserRecipesLoading,
  [RecipeTypes.SYNC_USER_RECIPES_SUCCESS]: syncUserRecipesSuccess,
  [RecipeTypes.SYNC_USER_RECIPES_FAILURE]: syncUserRecipesFailure,
})
