import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../constants/ActionTypes'
import _ from 'lodash'
import merge from 'deepmerge'
import {IPAD, APPLE_WATCH} from '../constants/PartNumbers'

const MODEL_REGEXP = {
  [APPLE_WATCH]: /(?<model1>.*)\s+(?<connectivity>GPS(?:.*Cellular)?)(?:\W+)(?<size>[0-9]{2}mm)\s+(?<model2>.+)/,
  [IPAD]: /(?<size>[0-9.]+-inch)\s+iPad Pro\s+(?<connectivity>Wi-Fi(?:\s+\+\s+Cellular)?)\s+(?<storage>[0-9]+(G|T)B) - (?<color>.*)/,
}

export default function partNumbers(state = {}, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      let nextState = {...state}
      const stores = action.data.stores
      const product = action.product;
      
      stores.forEach((store) => {
        // store.storeNumber
        let availabilities = _.transform(store.partsAvailability, (list, availability, partNumber) => {
          var matches = MODEL_REGEXP[product].exec(availability.storePickupProductTitle)

          let {
            model1,
            connectivity,
            size,
            model2,
            storage,
            color,
          } = matches.groups

          if (availability.pickupDisplay !== "available") {
            console.log(availability.pickupDisplay);
          }

          let row;
          switch (product) {
            case IPAD:
              row = {
                [`iPad Pro - ${size} - ${color}`]: {
                  [connectivity] : {
                    [storage]: {
                      partNumber,
                      availabilities : {
                        [store.storeNumber]: (
                          availability.pickupDisplay === 'available'
                        )
                      }
                    }
                  }
                }
              };
              break;
            case APPLE_WATCH:
              row = {
                [`${model1} ${model2}`]: {
                  [size] : {
                    [connectivity]: {
                      partNumber,
                      availabilities : {
                        [store.storeNumber]: (
                          availability.pickupDisplay === 'available'
                        )
                      }
                    }
                  }
                }
              };
              break;
          }

          list.push({[product]: row});
        }, []);

        nextState = merge.all([nextState, ...availabilities])
      })

      return nextState
    default:
      return state
  }
}
