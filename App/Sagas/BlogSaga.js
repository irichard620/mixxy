import { put, call } from 'redux-saga/effects'
import BlogActions from '../Stores/Blog/Actions'
import { blogService } from '../Services/BlogService'

export function* fetchBlogs() {
  yield put(BlogActions.fetchBlogsLoading())

  // Fetch blogs from an API
  const blogs = yield call(blogService.fetchBlogs)
  if (blogs) {
    yield put(BlogActions.fetchBlogsSuccess(blogs))
  } else {
    yield put(BlogActions.fetchBlogsFailure('There was an error while fetching blogs.'))
  }
}
