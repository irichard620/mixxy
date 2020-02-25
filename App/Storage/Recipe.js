import uuidv4 from 'uuid/v4';
import { Step } from './Step'

const camelcaseKeys = require('camelcase-keys');

export function Recipe(recipeObj) {
  const recipe = {};
  // Get ID
  if (!('recipeId' in recipeObj) || recipeObj.recipeId === '') {
    recipe.recipeId = uuidv4();
  } else {
    recipe.recipeId = recipeObj.recipeId;
  }

  // Recipe metadata
  recipe.recipeName = recipeObj.recipeName;
  recipe.recipeDescription = recipeObj.recipeDescription;
  recipe.recipeType = recipeObj.recipeType;
  recipe.baseSpirit = recipeObj.baseSpirit;
  recipe.servingGlass = recipeObj.servingGlass;
  recipe.totalOunces = recipeObj.totalOunces;

  // Recipe - how to make
  if (!('steps' in recipeObj)) {
    recipe.steps = [];
  } else {
    let stepList = [];
    for (let i = 0; i < recipeObj.steps.length; i++) {
      stepList.push(Step(camelcaseKeys(recipeObj.steps[i])));
    }
    recipe.steps = stepList;
  }

  // Recipe association data
  recipe.sponsorId = recipeObj.sponsorId || '';
  recipe.favorited = recipeObj.favorited || false;
  recipe.default = recipeObj.default || false;
  recipe.status = recipeObj.status || 'ACTIVE';

  return recipe;
}
