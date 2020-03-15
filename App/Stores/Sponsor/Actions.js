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
})

export const SponsorTypes = Types
export default Creators
