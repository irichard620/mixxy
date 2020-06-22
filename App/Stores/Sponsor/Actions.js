import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch cards
  fetchSponsorCards: null,
  // The operation has started and is loading
  fetchSponsorCardsLoading: null,
  // card informations were successfully fetched
  fetchSponsorCardsSuccess: ['sponsorCards'],
  // An error occurred
  fetchSponsorCardsFailure: ['errorMessage'],
  // Fetch details
  fetchSponsorCardDetails: ['sponsorCardId'],
  // The operation has started and is loading
  fetchSponsorCardDetailsLoading: null,
  // card information was successfully fetched
  fetchSponsorCardDetailsSuccess: ['sponsorCardDetails'],
  // Error
  fetchSponsorCardDetailsFailure: ['errorMessage'],
})

export const SponsorTypes = Types
export default Creators
