import { combineReducers } from 'redux'
import partNumbers from './partNumbers'
import shops from './shops'
import isLoading from './isLoading'

const rootReducer = combineReducers({ partNumbers, shops, isLoading })

export default rootReducer
