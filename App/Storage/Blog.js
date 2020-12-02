import { Recipe } from './Recipe'

const camelcaseKeys = require('camelcase-keys')

export function Blog(blogObj) {
  const blog = {}
  blog.blogId = blogObj.blogId

  // Blog metadata
  blog.title = blogObj.title
  blog.subtitle = blogObj.subtitle || ''
  blog.body = blogObj.body || ''
  blog.heroImageLink = blogObj.heroImageLink
  blog.createdAt = blogObj.createdAt
  blog.tags = blogObj.tags || []
  blog.tagColor = blogObj.tagColor
  blog.status = blogObj.status || 'ACTIVE'

  if ('author' in blogObj) {
    blog.author = camelcaseKeys(blogObj.author)
  }
  if ('sponsorCard' in blogObj) {
    blog.sponsorCard = camelcaseKeys(blogObj.sponsorCard)
  }
  // Recipes
  if (!('recipes' in blogObj)) {
    blog.recipes = []
  } else {
    let recipeList = []
    for (let i = 0; i < blogObj.recipes.length; i++) {
      recipeList.push(Recipe(camelcaseKeys(blogObj.recipes[i])))
    }
    blog.recipes = recipeList
  }

  return blog
}
