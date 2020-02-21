import { put } from 'redux-saga/effects'
import UserActions from 'App/Stores/User/Actions'
import NavigationService from 'App/Services/NavigationService'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(UserActions.fetchUser())

  // When those operations are finished we redirect to the main screen
  NavigationService.navigateAndReset('HomeScreen')
}
