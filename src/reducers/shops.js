import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from '../constants/ActionTypes'

// const initialState = {
//   'R428': {
//     storeName: 'ifc mall'
//   },
//   'R499': {
//     storeName: 'Canton Road'
//   },
//   'R409': {
//     storeName: 'Causeway Bay'
//   }
// }

export default function shops (state = {}, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const data = action.data
      const shops = data.stores.reduce(
        (obj, store) => {
          let {storeName} = store;
          obj[store.storeNumber] = {storeName}
          return obj;
        },
        {}
      )
      return {...state, ...shops}
    default:
      return state
  }
}
