import { connect } from 'react-redux'
import AvailabilityGrid from '../components/AvailabilityGrid'

const mapStateToProps = (state, ownProps) => ({
  shops: state.shops,
  partNumbers: state.partNumbers
})

export default connect(mapStateToProps)(AvailabilityGrid)
