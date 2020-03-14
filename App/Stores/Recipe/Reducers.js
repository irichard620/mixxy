import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { RecipeTypes } from './Actions'

export const persistRecipeLoading = (state) => ({
  ...state,
  persistRecipeIsLoading: true,
  persistRecipeErrorMessage: null,
})

export const persistRecipeSuccess = (state, { recipes }) => ({
  ...state,
  recipes: recipes,
  persistRecipeIsLoading: false,
  persistRecipeErrorMessage: null,
})

export const persistRecipeFailure = (state, { errorMessage }) => ({
  ...state,
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

export const reducer = createReducer(INITIAL_STATE, {
  [RecipeTypes.PERSIST_RECIPE_LOADING]: persistRecipeLoading,
  [RecipeTypes.PERSIST_RECIPE_SUCCESS]: persistRecipeSuccess,
  [RecipeTypes.PERSIST_RECIPE_FAILURE]: persistRecipeFailure,
  [RecipeTypes.FETCH_RECIPES_LOADING]: fetchRecipesLoading,
  [RecipeTypes.FETCH_RECIPES_SUCCESS]: fetchRecipesSuccess,
})
