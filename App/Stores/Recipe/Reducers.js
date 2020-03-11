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

export const reducer = createReducer(INITIAL_STATE, {
  [RecipeTypes.PERSIST_RECIPE_LOADING]: persistRecipeLoading,
  [RecipeTypes.PERSIST_RECIPE_SUCCESS]: persistRecipeSuccess,
  [RecipeTypes.PERSIST_RECIPE_FAILURE]: persistRecipeFailure,
})
