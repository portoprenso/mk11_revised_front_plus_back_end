import { combineReducers } from 'redux'
import rosterReducer from './RosterReducer'
import productReducer from './ProductsReducer'
import authReducer from './AuthReducer'

export const rootReducer = combineReducers({
    rosterReducer,
    productReducer,
    authReducer
})

export default rootReducer