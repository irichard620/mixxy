import { put } from 'redux-saga/effects'
import UserActions from '../Stores/User/Actions'
import SponsorActions from '../Stores/Sponsor/Actions'
import CampaignActions from '../Stores/Campaign/Actions'
import MasterListActions from '../Stores/MasterList/Actions'
import RecipeActions from '../Stores/Recipe/Actions'
import NavigationService from '../Services/NavigationService'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  yield put(UserActions.fetchUser())
  yield put(SponsorActions.fetchSponsorCards())
  yield put(CampaignActions.fetchCampaigns())
  yield put(MasterListActions.fetchMasterLists())
  yield put(RecipeActions.fetchRecipes())

  // When those operations are finished we redirect to the main screen
  NavigationService.navigateAndReset('HomeScreen')
}
