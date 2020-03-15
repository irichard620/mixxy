import axios from 'axios'
import { Config } from '../Config'
import { in200s } from './Helpers'
import camelcaseKeys from 'camelcase-keys'

const campaignApiClient = axios.create({
  baseURL: `${Config.API_URL}/mixxy/campaigns`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchCampaigns() {
  return campaignApiClient.get().then((response) => {
    if (in200s(response.status)) {
      return camelcaseKeys(response.data)
    }

    return null
  })
}

export const campaignService = {
  fetchCampaigns,
}
