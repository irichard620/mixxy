import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas'
import { reducer as UserReducer } from './User/Reducers'
import { reducer as IngredientReducer } from './Ingredient/Reducers'
import { reducer as RecipeReducer } from './Recipe/Reducers'
import { reducer as SponsorReducer } from './Sponsor/Reducers'
import { reducer as CampaignReducer } from './Campaign/Reducers'
import { reducer as MasterListReducer } from './MasterList/Reducers'
import { reducer as BlogReducer } from './Blog/Reducers'

export default () => {
  const rootReducer = combineReducers({
    user: UserReducer,
    ingredients: IngredientReducer,
    recipes: RecipeReducer,
    sponsors: SponsorReducer,
    campaigns: CampaignReducer,
    masterLists: MasterListReducer,
    blogs: BlogReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
