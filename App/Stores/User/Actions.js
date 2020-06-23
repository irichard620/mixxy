import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch user informations
  fetchUser: null,
  // The operation has started and is loading
  fetchUserLoading: null,
  // User informations were successfully fetched
  fetchUserSuccess: ['user'],
  // An error occurred
  fetchUserFailure: ['errorMessage'],
  // Upgrade IAP
  upgradeIAP: ['purchase'],
  // Loading
  upgradeIAPLoading: null,
  // Successfully upgraded
  upgradeIAPSuccess: ['userDetails', 'purchase'],
  // Restore IAP
  restoreIAP: null,
  // Loading
  restoreIAPLoading: null,
  // Successfully restored
  restoreIAPSuccess: ['userDetails'],
  // Failed to restore
  restoreIAPFailure: ['errorMessage'],
  // Purchase IAP
  requestPurchaseIAP: null,
  // Loading
  requestPurchaseIAPLoading: null,
  // Successfully purchased
  requestPurchaseIAPSuccess: null,
  // Failed to purchase
  requestPurchaseIAPFailure: ['errorMessage'],
})

export const UserTypes = Types
export default Creators
