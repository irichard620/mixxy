import { put, call } from 'redux-saga/effects'
import RecipeActions from '../Stores/Recipe/Actions'
import { recipeService } from '../Services/RecipeService'

export function* persistRecipe() {
  yield put(RecipeActions.persistRecipeLoading())

  // Save recipe locally
  const result = yield call(recipeService.persistRecipe)
  const errorMessage = result[1]
  if (errorMessage === '') {
    yield put(RecipeActions.persistRecipeSuccess(result[0]))
  } else {
    yield put(RecipeActions.persistRecipeFailure(errorMessage))
  }
}

export function* fetchRecipes() {
  yield put(RecipeActions.fetchRecipesLoading())

  // Save recipe locally
  const result = yield call(recipeService.fetchRecipes)
  yield put(RecipeActions.fetchRecipesSuccess(result))
}
