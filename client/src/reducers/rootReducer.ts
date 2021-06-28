import { combineReducers } from 'redux'
import rosterReducer from './RosterReducer'
import productReducer from './ProductsReducer'

export const rootReducer = combineReducers({
    rosterReducer,
    productReducer
})

export default rootReducer