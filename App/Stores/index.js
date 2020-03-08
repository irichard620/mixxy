import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas'
import { reducer as UserReducer } from './User/Reducers'
import { reducer as IngredientReducer } from './Ingredient/Reducers'

export default () => {
  const rootReducer = combineReducers({
    example: UserReducer,
    ingredients: IngredientReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
