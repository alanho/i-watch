import { connect } from 'react-redux'
import App from '../components/App'
import {fetchAvailability} from '../actions'
import {ALL_PART_NUMBERS} from '../constants/PartNumbers'
import _ from 'lodash'

const mapStateToProps = (state) => ({
  isLoading: state.isLoading
})

const mapDispatchToProps = (dispatch) => ({
  onActivate: () => {
    _.each(ALL_PART_NUMBERS, (productPartNumbers, product) => {
      _.chunk(productPartNumbers, 6).forEach((partNumbers) => {
        dispatch(fetchAvailability(product, partNumbers));
      })
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
