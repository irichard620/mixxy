import { takeLatest, all } from 'redux-saga/effects'
import { UserTypes } from '../Stores/User/Actions'
import { StartupTypes } from '../Stores/Startup/Actions'
import { IngredientTypes } from '../Stores/Ingredient/Actions'
import { RecipeTypes } from '../Stores/Recipe/Actions'
import { SponsorTypes } from '../Stores/Sponsor/Actions'
import { CampaignTypes } from '../Stores/Campaign/Actions'
import { MasterListTypes } from '../Stores/MasterList/Actions'
import { BlogTypes } from '../Stores/Blog/Actions'
import {
  fetchUser,
  requestPurchaseIAP,
  restoreIAP,
  upgradeIAP,
  updateVolumeUnits,
  createRemoteUser,
  updateAndFetchRemoteUser,
  updateDisplayName,
} from './UserSaga'
import { startup } from './StartupSaga'
import { fetchIngredients, fetchBarCartIngredients, setBarCartIngredients } from './IngredientSaga'
import {
  persistRecipe,
  fetchRecipes,
  fetchRemoteRecipes,
  deleteRecipe,
  favoriteRecipe,
  unfavoriteRecipe,
  fetchSharedRecipe,
  createSharedRecipe,
  fetchBartenderRecipes,
  syncUserRecipes,
} from './RecipeSaga'
import { fetchSponsorCards, fetchSponsorCardDetails } from './SponsorSaga'
import { fetchCampaigns } from './CampaignSaga'
import { fetchMasterLists } from './MasterListSaga'
import { fetchBlogs } from './BlogSaga'

export default function* root() {
  yield all([
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(UserTypes.FETCH_USER, fetchUser),
    // IAP upgrade
    takeLatest(UserTypes.UPGRADE_IAP, upgradeIAP),
    // IAP Restore
    takeLatest(UserTypes.RESTORE_IAP, restoreIAP),
    // IAP Purchase
    takeLatest(UserTypes.REQUEST_PURCHASE_IAP, requestPurchaseIAP),
    // Call fetchIngredients when action triggered
    takeLatest(IngredientTypes.FETCH_INGREDIENTS, fetchIngredients),
    // Fetch bar cart ingredients
    takeLatest(IngredientTypes.BAR_CART_FETCH_INGREDIENTS, fetchBarCartIngredients),
    // Set bar cart ingredients
    takeLatest(IngredientTypes.BAR_CART_SET_INGREDIENTS, setBarCartIngredients),
    // Save recipe
    takeLatest(RecipeTypes.PERSIST_RECIPE, persistRecipe),
    // Fetch recipes
    takeLatest(RecipeTypes.FETCH_RECIPES, fetchRecipes),
    // Fetch sponsor cards
    takeLatest(SponsorTypes.FETCH_SPONSOR_CARDS, fetchSponsorCards),
    // Fetch campaigns
    takeLatest(CampaignTypes.FETCH_CAMPAIGNS, fetchCampaigns),
    // Fetch master lists
    takeLatest(MasterListTypes.FETCH_MASTER_LISTS, fetchMasterLists),
    // Fetch remote recipes
    takeLatest(RecipeTypes.FETCH_REMOTE_RECIPES, fetchRemoteRecipes),
    // Fetch bartender recipes
    takeLatest(RecipeTypes.FETCH_BARTENDER_RECIPES, fetchBartenderRecipes),
    // Delete recipe
    takeLatest(RecipeTypes.DELETE_RECIPE, deleteRecipe),
    // Favorite
    takeLatest(RecipeTypes.FAVORITE_RECIPE, favoriteRecipe),
    // Unfavorite
    takeLatest(RecipeTypes.UNFAVORITE_RECIPE, unfavoriteRecipe),
    // Fetch shared recipe
    takeLatest(RecipeTypes.FETCH_SHARED_RECIPE, fetchSharedRecipe),
    // Create shared recipe
    takeLatest(RecipeTypes.CREATE_SHARED_RECIPE, createSharedRecipe),
    // Sync user recipes
    takeLatest(RecipeTypes.SYNC_USER_RECIPES, syncUserRecipes),
    // Fetch sponsor details
    takeLatest(SponsorTypes.FETCH_SPONSOR_CARD_DETAILS, fetchSponsorCardDetails),
    // Update volume units
    takeLatest(UserTypes.UPDATE_VOLUME_UNITS, updateVolumeUnits),
    // Fetch blogs
    takeLatest(BlogTypes.FETCH_BLOGS, fetchBlogs),
    // Create remote user
    takeLatest(UserTypes.CREATE_REMOTE_USER, createRemoteUser),
    // Update and fetch remote user
    takeLatest(UserTypes.UPDATE_AND_FETCH_REMOTE_USER, updateAndFetchRemoteUser),
    // Update display name
    takeLatest(UserTypes.UPDATE_DISPLAY_NAME, updateDisplayName),
  ])
}
