import storage from 'redux-persist/lib/storage'
import * as recipeModel from '../Storage/Recipe'

function persistRecipe(recipeToSave) {
  return storage
    .getItem('recipes')
    .then((recipes) => {
      const r = recipes ? JSON.parse(recipes) : []

      let found = false
      let duplicateName = false
      for (let i = 0; i < r.length; i += 1) {
        if (r[i].recipeId === recipeToSave.recipeId) {
          r[i] = recipeToSave
          found = true
          break
        } else if (r[i].recipeName === recipeToSave.recipeName) {
          duplicateName = true
          break
        }
      }

      if (duplicateName) {
        // Handle duplicate name error
        return [[], 'A recipe with this name already exists']
      } else {
        if (!found) {
          r.push(recipeToSave)
        }
        storage.setItem('recipes', JSON.stringify(r))
        return [r, '']
      }
    })
    .catch(() => [[], 'Unexpected error'])
}

function fetchRecipes() {
  return storage.getItem('recipes').then((recipes) => {
    const result = []
    const r = recipes ? JSON.parse(recipes) : []
    for (let i = 0; i < r.length; i += 1) {
      // Create objects and add to result
      const recipe = recipeModel.Recipe(r[i])
      if (recipe.status === 'ACTIVE') {
        result.push(recipe)
      }
    }
    return result
  })
}

export const recipeService = {
  persistRecipe,
  fetchRecipes,
}
