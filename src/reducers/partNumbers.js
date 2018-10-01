import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../constants/ActionTypes'
import _ from 'lodash'
import merge from 'deepmerge'

const MODEL_REGEXP = /(?<model1>.*)\s+(?<connectivity>GPS(?:.*Cellular)?)(?:\W+)(?<size>[0-9]{2}mm)\s+(?<model2>.+)/

export default function partNumbers(state = {}, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      let nextState = {...state}
      const stores = action.data.stores
      stores.forEach((store) => {
        // store.storeNumber
        let availabilities = _.transform(store.partsAvailability, (list, availability, partNumber) => {
          var matches = MODEL_REGEXP.exec(availability.storePickupProductTitle)

          let {
            model1,
            connectivity,
            size,
            model2,
          } = matches.groups

          list.push({
            [`${model1} ${model2}`]: {
              [size] : {
                [connectivity]: {
                  partNumber,
                  availabilities : {
                    [store.storeNumber]: (
                      availability.pickupDisplay !== 'unavailable' &&
                      availability.pickupDisplay !== 'ineligible'
                    )
                  }
                }
              }
            }
          })

        }, []);

        nextState = merge.all([nextState, ...availabilities])
      })

      return nextState
    default:
      return state
  }
}
