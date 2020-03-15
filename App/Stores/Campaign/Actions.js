import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch campaigns
  fetchCampaigns: null,
  // The operation has started and is loading
  fetchCampaignsLoading: null,
  // campaigns were successfully fetched
  fetchCampaignsSuccess: ['campaigns'],
  // An error occurred
  fetchCampaignsFailure: ['errorMessage'],
})

export const CampaignTypes = Types
export default Creators
