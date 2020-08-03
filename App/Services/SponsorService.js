import axios from 'axios'
import { Config } from '../Config'
import { defaultApiClient, in200s } from './Helpers'
import camelcaseKeys from 'camelcase-keys'
import analytics from '@react-native-firebase/analytics'

const sponsorCardApiClient = axios.create({
  baseURL: `${Config.API_URL}/mixxy/sponsor-cards`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

async function fetchSponsorCards() {
  try {
    const response = await sponsorCardApiClient.get()
    if (in200s(response.status)) {
      const sponsorCards = camelcaseKeys(response.data)
      for (let i = 0; i < sponsorCards.length; i++) {
        analytics().logEvent('sponsor_impression', {
          sponsor_id: sponsorCards[i].cardId,
        })
      }
      return sponsorCards
    }

    return null
  } catch (e) {
    return null
  }
}

async function fetchSponsorCardDetails(params) {
  let url = `sponsor-cards/${params.sponsorCardId}`
  try {
    const response = await defaultApiClient(url).get()
    if (in200s(response.status)) {
      return camelcaseKeys(response.data)
    }

    return null
  } catch (e) {
    return null
  }
}

export const sponsorService = {
  fetchSponsorCards,
  fetchSponsorCardDetails,
}
