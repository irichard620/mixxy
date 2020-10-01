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

export const barCartSetIngredientsLoading = (state) => ({
  ...state,
  barCartSetIngredientsIsLoading: true,
  barCartSetIngredientsErrorMessage: null,
})

export const barCartSetIngredientsSuccess = (state, { barCartIngredients }) => ({
  ...state,
  barCartIngredients: barCartIngredients,
  barCartSetIngredientsIsLoading: false,
  barCartSetIngredientsErrorMessage: null,
})

export const barCartSetIngredientsFailure = (state, { errorMessage }) => ({
  ...state,
  barCartIngredients: [],
  barCartSetIngredientsIsLoading: false,
  barCartSetIngredientsErrorMessage: errorMessage,
})

export const barCartFetchIngredientsLoading = (state) => ({
  ...state,
  barCartFetchIngredientsIsLoading: true,
  barCartFetchIngredientsErrorMessage: null,
})

export const barCartFetchIngredientsSuccess = (state, { barCartIngredients }) => ({
  ...state,
  barCartIngredients: barCartIngredients,
  barCartFetchIngredientsIsLoading: false,
  barCartFetchIngredientsErrorMessage: null,
})

export const barCartFetchIngredientsFailure = (state, { errorMessage }) => ({
  ...state,
  barCartIngredients: [],
  barCartFetchIngredientsIsLoading: false,
  barCartFetchIngredientsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [IngredientTypes.FETCH_INGREDIENTS_LOADING]: fetchIngredientsLoading,
  [IngredientTypes.FETCH_INGREDIENTS_SUCCESS]: fetchIngredientsSuccess,
  [IngredientTypes.FETCH_INGREDIENTS_FAILURE]: fetchIngredientsFailure,
  [IngredientTypes.BAR_CART_SET_INGREDIENTS_LOADING]: barCartSetIngredientsLoading,
  [IngredientTypes.BAR_CART_SET_INGREDIENTS_SUCCESS]: barCartSetIngredientsSuccess,
  [IngredientTypes.BAR_CART_SET_INGREDIENTS_FAILURE]: barCartSetIngredientsFailure,
  [IngredientTypes.BAR_CART_FETCH_INGREDIENTS_LOADING]: barCartFetchIngredientsLoading,
  [IngredientTypes.BAR_CART_FETCH_INGREDIENTS_SUCCESS]: barCartFetchIngredientsSuccess,
  [IngredientTypes.BAR_CART_FETCH_INGREDIENTS_FAILURE]: barCartFetchIngredientsFailure,
})
