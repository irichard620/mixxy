import { in200s, defaultApiClient } from './Helpers'
import camelcaseKeys from 'camelcase-keys'

function fetchCampaigns() {
  return defaultApiClient('campaigns')
    .get()
    .then((response) => {
      if (in200s(response.status)) {
        return camelcaseKeys(response.data)
      }

      return null
    })
    .catch((error) => {
      console.log(error)
    })
}

export const campaignService = {
  fetchCampaigns,
}
