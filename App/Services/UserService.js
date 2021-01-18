import storage from 'redux-persist/lib/storage'
import * as RNIap from 'react-native-iap'
import { Config } from '../Config'
import { defaultApiClient, in200s } from './Helpers'

async function fetchUser() {
  try {
    const user = await storage.getItem('user')
    const userDetails = user ? JSON.parse(user) : {}
    // Add metric variable if needed
    let viewedTutorial = true
    if (!('viewedTutorial' in userDetails)) {
      viewedTutorial = false
      userDetails.viewedTutorial = true
    }
    if ('name' in userDetails) {
      if (!('premium' in userDetails)) {
        userDetails.premium = false
      }
      if (!('useMetric' in userDetails)) {
        userDetails.useMetric = false
      }
    } else {
      userDetails.name = 'Mixxy User'
      userDetails.premium = false
      userDetails.useMetric = false
    }
    storage.setItem('user', JSON.stringify(userDetails))
    userDetails.viewedTutorial = viewedTutorial
    return userDetails
  } catch (e) {
    return e
  }
}

async function updateVolumeUnits(params) {
  const user = await storage.getItem('user')
  const userDetails = user ? JSON.parse(user) : {}
  userDetails.useMetric = params.useMetric
  storage.setItem('user', JSON.stringify(userDetails))
  return userDetails
}

async function requestPurchaseIAP() {
  try {
    const canMakePayments = await RNIap.initConnection()
    if (!canMakePayments) {
      return "Can't connect to Itunes Store"
    }
    await RNIap.getProducts([Config.MIXXY_PRO_IOS])
    await RNIap.requestPurchase(Config.MIXXY_PRO_IOS, false)
    return null
  } catch (err) {
    return err
  }
}

async function upgradeIAP(params) {
  const user = await storage.getItem('user')
  const userDetails = user ? JSON.parse(user) : {}
  userDetails.premium = true
  storage.setItem('user', JSON.stringify(userDetails))
  return [userDetails, params.purchase]
}

async function restoreIAP() {
  try {
    const canMakePayments = await RNIap.initConnection()
    if (!canMakePayments) {
      return "Can't connect to Itunes Store"
    }
    const user = await storage.getItem('user')
    const userDetails = user ? JSON.parse(user) : {}
    const purchases = await RNIap.getAvailablePurchases([Config.MIXXY_PRO_IOS])
    let isPremium = false
    purchases.forEach((purchase) => {
      switch (purchase.productId) {
        case Config.MIXXY_PRO_IOS:
          isPremium = true
          break
        default:
          break
      }
    })
    // Update user
    userDetails.premium = isPremium
    await storage.setItem('user', JSON.stringify(userDetails))
    return [userDetails, null]
  } catch (err) {
    return [null, err]
  }
}

async function createOrUpdateRemoteUser({ email, displayName = null, firebaseToken = null }) {
  let userData = { email }
  if (displayName) userData.display_name = displayName
  let url = `users`
  try {
    const response = await defaultApiClient(url, firebaseToken).post('/', userData)
    if (in200s(response.status)) {
      return [null, response.data]
    }
    return [response.data, null]
  } catch (error) {
    const errorMessage = (error.response && error.response.data) || error.request || error.message
    return [errorMessage, null]
  }
}

async function saveEmailAndDisplayName({ email = null, displayName = null }) {
  try {
    const user = await storage.getItem('user')
    const userDetails = user ? JSON.parse(user) : {}
    if (email) {
      userDetails.email = email
    }
    if (displayName) {
      userDetails.displayName = displayName
    }
    storage.setItem('user', JSON.stringify(userDetails))
    return userDetails
  } catch (e) {
    return e
  }
}

async function updateDisplayName({ displayName = null, fullName = null, firebaseToken = null }) {
  let userData = { display_name: displayName, full_name: fullName }
  let url = `users`
  try {
    const response = await defaultApiClient(url, firebaseToken).put('/', userData)
    if (in200s(response.status)) {
      return null
    }
    return response.data
  } catch (error) {
    const errorMessage = (error.response && error.response.data) || error.request || error.message
    return errorMessage
  }
}

export const userService = {
  fetchUser,
  updateVolumeUnits,
  requestPurchaseIAP,
  upgradeIAP,
  restoreIAP,
  createOrUpdateRemoteUser,
  saveEmailAndDisplayName,
  updateDisplayName,
}
