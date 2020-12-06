/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { UserTypes } from './Actions'

export const fetchUserLoading = (state) => ({
  ...state,
  userIsLoading: true,
  userErrorMessage: null,
})

export const fetchUserSuccess = (state, { user }) => ({
  ...state,
  user: user,
  userIsLoading: false,
  userErrorMessage: null,
})

export const fetchUserFailure = (state, { errorMessage }) => ({
  ...state,
  user: {},
  userIsLoading: false,
  userErrorMessage: errorMessage,
})

export const upgradeIAPLoading = (state) => ({
  ...state,
  upgradeIAPIsLoading: true,
  upgradeIAPErrorMessage: null,
})

export const upgradeIAPSuccess = (state, { userDetails, purchase }) => ({
  ...state,
  user: userDetails,
  purchase: purchase,
  upgradeIAPIsLoading: false,
  upgradeIAPErrorMessage: null,
})

export const restoreIAPLoading = (state) => {
  return {
    ...state,
    restoreIAPIsLoading: true,
    restoreIAPErrorMessage: null,
  }
}

export const restoreIAPSuccess = (state, { userDetails }) => ({
  ...state,
  user: userDetails,
  restoreIAPIsLoading: false,
  restoreIAPErrorMessage: null,
})

export const restoreIAPFailure = (state, { errorMessage }) => {
  return {
    ...state,
    restoreIAPIsLoading: false,
    restoreIAPErrorMessage: errorMessage,
  }
}

export const requestPurchaseIAPLoading = (state) => ({
  ...state,
  restoreIAPIsLoading: true,
  restoreIAPErrorMessage: null,
})

export const requestPurchaseIAPSuccess = (state) => ({
  ...state,
  requestPurchaseIAPIsLoading: false,
  requestPurchaseIAPErrorMessage: null,
})

export const requestPurchaseIAPFailure = (state, { errorMessage }) => ({
  ...state,
  requestPurchaseIAPIsLoading: false,
  requestPurchaseIAPErrorMessage: errorMessage,
})

export const updateVolumeUnitsLoading = (state) => ({
  ...state,
  updateVolumeUnitsLoading: true,
})

export const updateVolumeUnitsSuccess = (state, { userDetails }) => ({
  ...state,
  user: userDetails,
  updateVolumeUnitsLoading: false,
})

export const createRemoteUserLoading = (state) => ({
  ...state,
  createRemoteUserIsLoading: true,
  createRemoteUserErrorMessage: null,
})

export const createRemoteUserSuccess = (state, { user }) => ({
  ...state,
  user: { ...state.user, email: user.email, displayName: user.display_name },
  createRemoteUserIsLoading: false,
  createRemoteUserErrorMessage: null,
})

export const createRemoteUserFailure = (state, { errorMessage }) => ({
  ...state,
  createRemoteUserIsLoading: false,
  createRemoteUserErrorMessage: errorMessage,
})

export const updateAndFetchRemoteUserLoading = (state) => ({
  ...state,
  updateAndFetchRemoteUserIsLoading: true,
  updateAndFetchRemoteUserErrorMessage: null,
})

export const updateAndFetchRemoteUserSuccess = (state, { user }) => ({
  ...state,
  user: { ...state.user, email: user.email, displayName: user.display_name },
  updateAndFetchRemoteUserIsLoading: false,
  updateAndFetchRemoteUserErrorMessage: null,
})

export const updateAndFetchRemoteUserFailure = (state, { errorMessage }) => ({
  ...state,
  updateAndFetchRemoteUserIsLoading: false,
  updateAndFetchRemoteUserErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.FETCH_USER_LOADING]: fetchUserLoading,
  [UserTypes.FETCH_USER_SUCCESS]: fetchUserSuccess,
  [UserTypes.FETCH_USER_FAILURE]: fetchUserFailure,
  [UserTypes.UPGRADE_IAP_LOADING]: upgradeIAPLoading,
  [UserTypes.UPGRADE_IAP_SUCCESS]: upgradeIAPSuccess,
  [UserTypes.RESTORE_IAP_LOADING]: restoreIAPLoading,
  [UserTypes.RESTORE_IAP_SUCCESS]: restoreIAPSuccess,
  [UserTypes.RESTORE_IAP_FAILURE]: restoreIAPFailure,
  [UserTypes.REQUEST_PURCHASE_IAP_LOADING]: requestPurchaseIAPLoading,
  [UserTypes.REQUEST_PURCHASE_IAP_SUCCESS]: requestPurchaseIAPSuccess,
  [UserTypes.REQUEST_PURCHASE_IAP_FAILURE]: requestPurchaseIAPFailure,
  [UserTypes.UPDATE_VOLUME_UNITS_LOADING]: updateVolumeUnitsLoading,
  [UserTypes.UPDATE_VOLUME_UNITS_SUCCESS]: updateVolumeUnitsSuccess,
  [UserTypes.CREATE_REMOTE_USER_LOADING]: createRemoteUserLoading,
  [UserTypes.CREATE_REMOTE_USER_SUCCESS]: createRemoteUserSuccess,
  [UserTypes.CREATE_REMOTE_USER_FAILURE]: createRemoteUserFailure,
  [UserTypes.UPDATE_AND_FETCH_REMOTE_USER_LOADING]: updateAndFetchRemoteUserLoading,
  [UserTypes.UPDATE_AND_FETCH_REMOTE_USER_SUCCESS]: updateAndFetchRemoteUserSuccess,
  [UserTypes.UPDATE_AND_FETCH_REMOTE_USER_FAILURE]: updateAndFetchRemoteUserFailure,
})
