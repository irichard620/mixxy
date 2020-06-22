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

export function* fetchSponsorCardDetails(params) {
  yield put(SponsorActions.fetchSponsorCardDetailsLoading())

  // Fetch sponsor cards from an API
  const sponsorCardDetails = yield call(sponsorService.fetchSponsorCardDetails, params)
  if (sponsorCardDetails) {
    yield put(SponsorActions.fetchSponsorCardDetailsSuccess(sponsorCardDetails))
  } else {
    yield put(
      SponsorActions.fetchSponsorCardDetailsFailure(
        'There was an error while fetching sponsor info.'
      )
    )
  }
}
