import { put, call } from 'redux-saga/effects'
import IngredientActions from '../Stores/Ingredient/Actions'
import { ingredientService } from '../Services/IngredientService'

export function* fetchIngredients() {
  yield put(IngredientActions.fetchIngredientsLoading())

  // Fetch user informations from an API
  const ingredients = yield call(ingredientService.fetchIngredients)
  if (ingredients) {
    yield put(IngredientActions.fetchIngredientsSuccess(ingredients))
  } else {
    yield put(
      IngredientActions.fetchIngredientsFailure(
        'There was an error while fetching ingredient informations.'
      )
    )
  }
}
