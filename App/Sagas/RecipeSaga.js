import { put, call } from 'redux-saga/effects'
import RecipeActions from '../Stores/Recipe/Actions'
import { recipeService } from '../Services/RecipeService'

export function* persistRecipe(params) {
  yield put(RecipeActions.persistRecipeLoading())

  // Save recipe locally
  const result = yield call(recipeService.persistRecipe, params)
  const isExternal = result[2]
  const errorMessage = result[1]
  const recipes = result[0]
  if (errorMessage === '') {
    yield put(RecipeActions.persistRecipeSuccess(recipes, isExternal))
  } else {
    yield put(RecipeActions.persistRecipeFailure(errorMessage))
  }
}

export function* fetchRecipes() {
  yield put(RecipeActions.fetchRecipesLoading())

  // Save recipe locally
  const recipes = yield call(recipeService.fetchRecipes)
  yield put(RecipeActions.fetchRecipesSuccess(recipes))
}

export function* fetchRemoteRecipes(params) {
  yield put(RecipeActions.fetchRemoteRecipesLoading())

  // Fetch recipe from an API
  const recipes = yield call(recipeService.fetchRemoteRecipes, params)
  if (recipes) {
    yield put(RecipeActions.fetchRemoteRecipesSuccess(recipes))
  } else {
    yield put(
      RecipeActions.fetchRemoteRecipesFailure('There was an error while fetching remote recipes.')
    )
  }
}

export function* fetchBartenderRecipes(params) {
  yield put(RecipeActions.fetchBartenderRecipesLoading())

  // Fetch recipe from an API
  const bartenderRecipes = yield call(recipeService.fetchBartenderRecipes, params)
  if (bartenderRecipes) {
    yield put(RecipeActions.fetchBartenderRecipesSuccess(bartenderRecipes))
  } else {
    yield put(
      RecipeActions.fetchBartenderRecipesFailure(
        'There was an error while fetching bartender recipes.'
      )
    )
  }
}

export function* fetchSharedRecipe(params) {
  yield put(RecipeActions.fetchSharedRecipeLoading())
  // Fetch recipe from an API
  const recipe = yield call(recipeService.fetchSharedRecipe, params)
  yield put(RecipeActions.fetchSharedRecipeSuccess(recipe))
}

export function* createSharedRecipe(params) {
  yield put(RecipeActions.createSharedRecipeLoading())

  // Create recipe from an API
  const shareLink = yield call(recipeService.createSharedRecipe, params)
  if (shareLink) {
    yield put(RecipeActions.createSharedRecipeSuccess(shareLink))
  } else {
    yield put(
      RecipeActions.createSharedRecipeFailure('There was an error while creating shared recipe.')
    )
  }
}

export function* deleteRecipe(params) {
  yield put(RecipeActions.deleteRecipeLoading())

  // Save recipe locally
  const recipes = yield call(recipeService.deleteRecipe, params)
  yield put(RecipeActions.deleteRecipeSuccess(recipes))
}

export function* favoriteRecipe(params) {
  yield put(RecipeActions.persistRecipeLoading())

  // Save recipe locally
  const recipes = yield call(recipeService.favoriteRecipe, params)
  yield put(RecipeActions.persistRecipeSuccess(recipes))
}

export function* unfavoriteRecipe(params) {
  yield put(RecipeActions.persistRecipeLoading())

  // Save recipe locally
  const recipes = yield call(recipeService.unfavoriteRecipe, params)
  yield put(RecipeActions.persistRecipeSuccess(recipes))
}
