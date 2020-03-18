import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { MasterListTypes } from './Actions'

export const fetchMasterListsLoading = (state) => ({
  ...state,
  masterListsIsLoading: true,
  masterListsErrorMessage: null,
})

export const fetchMasterListsSuccess = (state, { masterLists }) => ({
  ...state,
  masterLists: masterLists,
  masterListsIsLoading: false,
  masterListsErrorMessage: null,
})

export const fetchMasterListsFailure = (state, { errorMessage }) => ({
  ...state,
  masterLists: [],
  masterListsIsLoading: false,
  masterListsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [MasterListTypes.FETCH_MASTER_LISTS_LOADING]: fetchMasterListsLoading,
  [MasterListTypes.FETCH_MASTER_LISTS_SUCCESS]: fetchMasterListsSuccess,
  [MasterListTypes.FETCH_MASTER_LISTS_FAILURE]: fetchMasterListsFailure,
})
