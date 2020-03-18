import { defaultApiClient, in200s } from './Helpers'
import camelcaseKeys from 'camelcase-keys'

function fetchMasterLists() {
  return defaultApiClient('master-lists')
    .get()
    .then((response) => {
      if (in200s(response.status)) {
        return camelcaseKeys(response.data)
      }

      return null
    })
}

export const masterListService = {
  fetchMasterLists,
}
