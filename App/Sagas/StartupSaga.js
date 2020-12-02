import { put, call } from 'redux-saga/effects'
import UserActions from '../Stores/User/Actions'
import SponsorActions from '../Stores/Sponsor/Actions'
import CampaignActions from '../Stores/Campaign/Actions'
import MasterListActions from '../Stores/MasterList/Actions'
import BlogActions from '../Stores/Blog/Actions'
import RecipeActions from '../Stores/Recipe/Actions'
import NavigationService from '../Services/NavigationService'
import { userService as UserService } from '../Services/UserService'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  yield put(SponsorActions.fetchSponsorCards())
  yield put(CampaignActions.fetchCampaigns())
  yield put(MasterListActions.fetchMasterLists())
  yield put(BlogActions.fetchBlogs())
  yield put(RecipeActions.fetchRecipes())

  // Get user and decide whether to trigger tutorial
  const user = yield call(UserService.fetchUser)
  if (typeof user === 'object' && user !== null) {
    yield put(UserActions.fetchUserSuccess(user))
    if (!user.viewedTutorial) {
      NavigationService.navigateAndReset('IntroScreen')
      return
    }
  }

  // When those operations are finished we redirect to the main screen
  NavigationService.navigateAndReset('HomeScreen')
}
