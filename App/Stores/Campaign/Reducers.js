import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { CampaignTypes } from './Actions'

export const fetchCampaignsLoading = (state) => ({
  ...state,
  campaignsIsLoading: true,
  campaignsErrorMessage: null,
})

export const fetchCampaignsSuccess = (state, { campaigns }) => ({
  ...state,
  campaigns: campaigns,
  campaignsIsLoading: false,
  campaignsErrorMessage: null,
})

export const fetchCampaignsFailure = (state, { errorMessage }) => ({
  ...state,
  campaigns: [],
  campaignsIsLoading: false,
  campaignsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [CampaignTypes.FETCH_CAMPAIGNS_LOADING]: fetchCampaignsLoading,
  [CampaignTypes.FETCH_CAMPAIGNS_SUCCESS]: fetchCampaignsSuccess,
  [CampaignTypes.FETCH_CAMPAIGNS_FAILURE]: fetchCampaignsFailure,
})
