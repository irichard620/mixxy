import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch campaigns
  fetchMasterLists: null,
  // The operation has started and is loading
  fetchMasterListsLoading: null,
  // lists were successfully fetched
  fetchMasterListsSuccess: ['masterLists'],
  // An error occurred
  fetchMasterListsFailure: ['errorMessage'],
})

export const MasterListTypes = Types
export default Creators
