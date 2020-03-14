import { takeLatest, all } from 'redux-saga/effects'
import { UserTypes } from '../Stores/User/Actions'
import { StartupTypes } from '../Stores/Startup/Actions'
import { IngredientTypes } from '../Stores/Ingredient/Actions'
import { RecipeTypes } from '../Stores/Recipe/Actions'
import { fetchUser } from './UserSaga'
import { startup } from './StartupSaga'
import { fetchIngredients } from './IngredientSaga'
import { persistRecipe, fetchRecipes } from './RecipeSaga'

export default function* root() {
  yield all([
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(UserTypes.FETCH_USER, fetchUser),
    // Call fetchIngredients when action triggered
    takeLatest(IngredientTypes.FETCH_INGREDIENTS, fetchIngredients),
    // Save recipe
    takeLatest(RecipeTypes.PERSIST_RECIPE, persistRecipe),
    // Fetch recipes
    takeLatest(RecipeTypes.FETCH_RECIPES, fetchRecipes),
  ])
}
