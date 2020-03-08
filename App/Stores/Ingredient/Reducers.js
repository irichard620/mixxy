import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { IngredientTypes } from './Actions'

export const fetchIngredientsLoading = (state) => ({
  ...state,
  ingredientsIsLoading: true,
  ingredientsErrorMessage: null,
})

export const fetchIngredientsSuccess = (state, { ingredients }) => ({
  ...state,
  ingredients: ingredients,
  ingredientsIsLoading: false,
  ingredientsErrorMessage: null,
})

export const fetchIngredientsFailure = (state, { errorMessage }) => ({
  ...state,
  ingredients: [],
  ingredientsIsLoading: false,
  ingredientsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [IngredientTypes.FETCH_INGREDIENTS_LOADING]: fetchIngredientsLoading,
  [IngredientTypes.FETCH_INGREDIENTS_SUCCESS]: fetchIngredientsSuccess,
  [IngredientTypes.FETCH_INGREDIENTS_FAILURE]: fetchIngredientsFailure,
})
