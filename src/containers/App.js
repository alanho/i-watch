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
    _.chunk(ALL_PART_NUMBERS, 6).forEach((partNumbers) => {
      dispatch(fetchAvailability(partNumbers));
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
