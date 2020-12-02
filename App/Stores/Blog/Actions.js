import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch blogs
  fetchBlogs: null,
  // The operation has started and is loading
  fetchBlogsLoading: null,
  // blogs were successfully fetched
  fetchBlogsSuccess: ['blogs'],
  // An error occurred
  fetchBlogsFailure: ['errorMessage'],
})

export const BlogTypes = Types
export default Creators
