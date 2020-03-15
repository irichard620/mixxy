import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SponsorTypes } from './Actions'

export const fetchSponsorCardsLoading = (state) => ({
  ...state,
  sponsorCardsIsLoading: true,
  sponsorCardsErrorMessage: null,
})

export const fetchSponsorCardsSuccess = (state, { sponsorCards }) => ({
  ...state,
  sponsorCards: sponsorCards,
  sponsorCardsIsLoading: false,
  sponsorCardsErrorMessage: null,
})

export const fetchSponsorCardsFailure = (state, { errorMessage }) => ({
  ...state,
  sponsorCards: [],
  sponsorCardsIsLoading: false,
  sponsorCardsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [SponsorTypes.FETCH_SPONSOR_CARDS_LOADING]: fetchSponsorCardsLoading,
  [SponsorTypes.FETCH_SPONSOR_CARDS_SUCCESS]: fetchSponsorCardsSuccess,
  [SponsorTypes.FETCH_SPONSOR_CARDS_FAILURE]: fetchSponsorCardsFailure,
})
