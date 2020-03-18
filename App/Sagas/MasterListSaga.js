import { put, call } from 'redux-saga/effects'
import MasterListActions from '../Stores/MasterList/Actions'
import { masterListService } from '../Services/MasterListService'

export function* fetchMasterLists() {
  yield put(MasterListActions.fetchMasterListsLoading())

  // Fetch lists from an API
  const lists = yield call(masterListService.fetchMasterLists)
  if (lists) {
    yield put(MasterListActions.fetchMasterListsSuccess(lists))
  } else {
    yield put(MasterListActions.fetchMasterListsFailure('There was an error while fetching lists.'))
  }
}
