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

export const fetchSponsorCardDetailsLoading = (state) => ({
  ...state,
  sponsorCardDetailsIsLoading: true,
  sponsorCardDetailsErrorMessage: null,
})

export const fetchSponsorCardDetailsSuccess = (state, { sponsorCardDetails }) => ({
  ...state,
  sponsorCardDetails: sponsorCardDetails,
  sponsorCardDetailsIsLoading: false,
  sponsorCardDetailsErrorMessage: null,
})

export const fetchSponsorCardDetailsFailure = (state, { errorMessage }) => ({
  ...state,
  sponsorCardDetails: {},
  sponsorCardDetailsIsLoading: false,
  sponsorCardDetailsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [SponsorTypes.FETCH_SPONSOR_CARDS_LOADING]: fetchSponsorCardsLoading,
  [SponsorTypes.FETCH_SPONSOR_CARDS_SUCCESS]: fetchSponsorCardsSuccess,
  [SponsorTypes.FETCH_SPONSOR_CARDS_FAILURE]: fetchSponsorCardsFailure,
  [SponsorTypes.FETCH_SPONSOR_CARD_DETAILS_LOADING]: fetchSponsorCardDetailsLoading,
  [SponsorTypes.FETCH_SPONSOR_CARD_DETAILS_SUCCESS]: fetchSponsorCardDetailsSuccess,
  [SponsorTypes.FETCH_SPONSOR_CARD_DETAILS_FAILURE]: fetchSponsorCardDetailsFailure,
})
