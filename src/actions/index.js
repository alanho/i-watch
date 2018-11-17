import * as types from '../constants/ActionTypes'
import fetch from 'cross-fetch'

export const fetchBegin = () => ({ type: types.FETCH_BEGIN })
export const fetchSuccess = (product, data) => ({ type: types.FETCH_SUCCESS, product, data })
export const fetchFailure = (err) => ({ type: types.FETCH_FAILURE, err })

export function fetchAvailability (product, partNumbers) {
  return dispatch => {
    dispatch(fetchBegin())
    const params = partNumbers
      .map((partNumber, idx) => (`parts.${idx}=${encodeURIComponent(partNumber)}`))
      .join('&')

    return fetch(
      `https://cors-anywhere.herokuapp.com/https://www.apple.com/hk/shop/retail/pickup-message?location=Central&${params}&pl=true`
    )
      .then(response => response.json())
      .then(json => json.body)
      .then(json => dispatch(fetchSuccess(product, json)))
  }
}

// export function fetchAvailabilityIfNeeded (partNumber) {
//   return (dispatch, getState) => {
//     return dispatch(fetchAvailability(partNumber))
//   }
// }
