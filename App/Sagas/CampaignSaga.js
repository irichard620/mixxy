import { put, call } from 'redux-saga/effects'
import CampaignActions from '../Stores/Campaign/Actions'
import { campaignService } from '../Services/CampaignService'

export function* fetchCampaigns() {
  yield put(CampaignActions.fetchCampaignsLoading())

  // Fetch campaigns from an API
  const cards = yield call(campaignService.fetchCampaigns)
  if (cards) {
    yield put(CampaignActions.fetchCampaignsSuccess(cards))
  } else {
    yield put(CampaignActions.fetchCampaignsFailure('There was an error while fetching campaigns.'))
  }
}
