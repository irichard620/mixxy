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

export function* updateVolumeUnits(params) {
  yield put(UserActions.updateVolumeUnitsLoading())
  const userDetails = yield call(userService.updateVolumeUnits, params)
  yield put(UserActions.updateVolumeUnitsSuccess(userDetails))
}

export function* upgradeIAP(params) {
  yield put(UserActions.upgradeIAPLoading())
  const results = yield call(userService.upgradeIAP, params)
  yield put(UserActions.upgradeIAPSuccess(results[0], results[1]))
}

export function* restoreIAP() {
  yield put(UserActions.restoreIAPLoading())
  const results = yield call(userService.restoreIAP)
  if (!results[1]) {
    yield put(UserActions.restoreIAPSuccess(results[0]))
  } else {
    yield put(UserActions.restoreIAPFailure(results[1]))
  }
}

export function* requestPurchaseIAP() {
  yield put(UserActions.requestPurchaseIAPLoading())
  const error = yield call(userService.requestPurchaseIAP)
  if (!error) {
    yield put(UserActions.requestPurchaseIAPSuccess())
  } else {
    yield put(UserActions.requestPurchaseIAPFailure(error))
  }
}

export function* createRemoteUser(params) {
  yield put(UserActions.createRemoteUserLoading())
  const [error, user] = yield call(userService.createOrUpdateRemoteUser, params)
  if (!error) {
    yield put(UserActions.createRemoteUserSuccess(user))
  } else {
    yield put(UserActions.createRemoteUserFailure(error))
  }
}

export function* updateAndFetchRemoteUser(params) {
  yield put(UserActions.updateAndFetchRemoteUserLoading())
  const [error, user] = yield call(userService.createOrUpdateRemoteUser, params)
  if (!error) {
    yield call(userService.saveEmailAndDisplayName, {
      email: user.email,
      displayName: user.display_name,
    })
    yield put(UserActions.updateAndFetchRemoteUserSuccess(user))
  } else {
    yield put(UserActions.updateAndFetchRemoteUserFailure(error))
  }
}
