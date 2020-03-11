import { put, call } from 'redux-saga/effects'
import RecipeActions from '../Stores/Recipe/Actions'
import { recipeService } from '../Services/RecipeService'

export function* persistRecipe() {
  yield put(RecipeActions.persistRecipeLoading())

  // Save recipe locally
  const result = yield call(recipeService.persistRecipe)
  if (result === ) {
    yield put(RecipeActions.persistRecipeSuccess(user))
  } else {
    yield put(RecipeActions.persistRecipeFailure('There was an error while fetching user informations.'))
  }
}
