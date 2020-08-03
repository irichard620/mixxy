import { defaultApiClient, in200s } from './Helpers'
import camelcaseKeys from 'camelcase-keys'

async function fetchMasterLists() {
  try {
    const response = await defaultApiClient('master-lists').get()
    if (in200s(response.status)) {
      return camelcaseKeys(response.data)
    }
    return null
  } catch (e) {
    console.log(e)
  }
}

export const masterListService = {
  fetchMasterLists,
}
