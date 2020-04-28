import storage from 'redux-persist/lib/storage'
import * as RNIap from 'react-native-iap'
import { Config } from '../Config'

function fetchUser() {
  return storage
    .getItem('user')
    .then((user) => {
      const userDetails = user ? JSON.parse(user) : {}
      // Add metric variable if needed
      if ('name' in userDetails) {
        if (!('premium' in userDetails)) {
          userDetails.premium = false
        }
      } else {
        userDetails.name = 'Mixxy User'
        userDetails.premium = false
      }
      storage.setItem('user', JSON.stringify(userDetails))
      return userDetails
    })
    .catch((error) => error)
}

export function requestPurchaseIAP() {
  return RNIap.getProducts([Config.MIXXY_PRO_IOS])
    .then(() => {
      RNIap.requestPurchase(Config.MIXXY_PRO_IOS, false)
        .then(() => {
          return null
        })
        .catch((error) => {
          return error
        })
    })
    .catch((error) => {
      return error
    })
}

export function upgradeIAP(purchase) {
  return storage.getItem('user').then((user) => {
    const userDetails = user ? JSON.parse(user) : {}
    userDetails.premium = true
    storage.setItem('user', JSON.stringify(userDetails))
    return [userDetails, purchase]
  })
}

export function restoreIAP() {
  return storage.getItem('user').then((user) => {
    const userDetails = user ? JSON.parse(user) : {}
    RNIap.getAvailablePurchases([Config.MIXXY_PRO_IOS])
      .then((purchases) => {
        // Check if user has premium
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
        storage.setItem('user', JSON.stringify(userDetails))
        return [userDetails, null]
      })
      .catch((error) => {
        // Assume premium false in error
        userDetails.premium = false
        storage.setItem('user', JSON.stringify(userDetails))
        return [userDetails, error]
      })
  })
}

export const userService = {
  fetchUser,
  requestPurchaseIAP,
  upgradeIAP,
  restoreIAP,
}
