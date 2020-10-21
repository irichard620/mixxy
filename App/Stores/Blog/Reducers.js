import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { BlogTypes } from './Actions'

export const fetchBlogsLoading = (state) => ({
  ...state,
  blogsIsLoading: true,
  blogsErrorMessage: null,
})

export const fetchBlogsSuccess = (state, { blogs }) => ({
  ...state,
  blogs: blogs,
  blogsIsLoading: false,
  blogsErrorMessage: null,
})

export const fetchBlogsFailure = (state, { errorMessage }) => ({
  ...state,
  blogs: [],
  blogsIsLoading: false,
  blogsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [BlogTypes.FETCH_BLOGS_LOADING]: fetchBlogsLoading,
  [BlogTypes.FETCH_BLOGS_SUCCESS]: fetchBlogsSuccess,
  [BlogTypes.FETCH_BLOGS_FAILURE]: fetchBlogsFailure,
})
