import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../constants/ActionTypes'

export default function isLoading (state = false, action) {
  switch (action.type) {
    case FETCH_BEGIN:
      return false
    default:
      return state
  }
}
