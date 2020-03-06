import { put, call } from 'redux-saga/effects'
import UserActions from '../Stores/User/Actions'
import { userService } from '../Services/UserService'

export function* fetchUser() {
  yield put(UserActions.fetchUserLoading())

  // Fetch user informations from an API
  const user = yield call(userService.fetchUser)
  if (user) {
    yield put(UserActions.fetchUserSuccess(user))
  } else {
    yield put(UserActions.fetchUserFailure('There was an error while fetching user informations.'))
  }
}
