import { combineReducers } from 'redux'
import rosterReducer from './RosterReducer'
import gameReducer from './GameReducer'
import authReducer from './AuthReducer'

export const rootReducer = combineReducers({
    rosterReducer,
    gameReducer,
    authReducer
})

export default rootReducer