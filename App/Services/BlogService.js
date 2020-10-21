import { in200s, defaultApiClient } from './Helpers'
import { Blog } from '../Storage/Blog'
import camelcaseKeys from 'camelcase-keys'

async function fetchBlogs() {
  try {
    const response = await defaultApiClient('blogs').get()
    if (in200s(response.status)) {
      const blogs = []
      for (let i = 0; i < response.data.length; i++) {
        blogs.push(Blog(camelcaseKeys(response.data[i])))
      }
      return blogs
    }

    return null
  } catch (e) {
    return null
  }
}

export const blogService = {
  fetchBlogs,
}
