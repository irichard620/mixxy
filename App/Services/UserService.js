import storage from 'redux-persist/lib/storage'
import * as RNIap from 'react-native-iap'
import { Config } from '../Config'

function fetchUser() {
  return storage
    .getItem('user')
    .then((user) => {
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
      } else {
        userDetails.name = 'Mixxy User'
        userDetails.premium = false
      }
      storage.setItem('user', JSON.stringify(userDetails))
      userDetails.premium = true
      userDetails.viewedTutorial = viewedTutorial
      return userDetails
    })
    .catch((error) => error)
}

export async function requestPurchaseIAP() {
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

export function upgradeIAP(purchase) {
  return storage.getItem('user').then((user) => {
    const userDetails = user ? JSON.parse(user) : {}
    userDetails.premium = true
    storage.setItem('user', JSON.stringify(userDetails))
    return [userDetails, purchase]
  })
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

export const userService = {
  fetchUser,
  requestPurchaseIAP,
  upgradeIAP,
  restoreIAP,
}
