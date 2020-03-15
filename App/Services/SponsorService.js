import axios from 'axios'
import { Config } from '../Config'
import { in200s } from './Helpers'
import camelcaseKeys from 'camelcase-keys'

const sponsorCardApiClient = axios.create({
  baseURL: `${Config.API_URL}/mixxy/sponsor-cards`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchSponsorCards() {
  return sponsorCardApiClient.get().then((response) => {
    if (in200s(response.status)) {
      return camelcaseKeys(response.data)
    }

    return null
  })
}

export const sponsorService = {
  fetchSponsorCards,
}
