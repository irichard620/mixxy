import { in200s, defaultApiClient } from './Helpers'
import camelcaseKeys from 'camelcase-keys'

async function fetchCampaigns() {
  try {
    const response = await defaultApiClient('campaigns').get()
    if (in200s(response.status)) {
      return camelcaseKeys(response.data)
    }
    return null
  } catch (e) {
    console.log(e)
  }
}

export const campaignService = {
  fetchCampaigns,
}
