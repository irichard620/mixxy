import { put, call } from 'redux-saga/effects'
import SponsorActions from '../Stores/Sponsor/Actions'
import { sponsorService } from '../Services/SponsorService'

export function* fetchSponsorCards() {
  yield put(SponsorActions.fetchSponsorCardsLoading())

  // Fetch sponsor cards from an API
  const cards = yield call(sponsorService.fetchSponsorCards)
  if (cards) {
    yield put(SponsorActions.fetchSponsorCardsSuccess(cards))
  } else {
    yield put(
      SponsorActions.fetchSponsorCardsFailure('There was an error while fetching sponsor cards.')
    )
  }
}
