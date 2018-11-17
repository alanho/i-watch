import { connect } from 'react-redux'
import AvailabilityGrid from '../components/AvailabilityGrid'

const mapStateToProps = (state, ownProps) => ({
  shops: state.shops,
  products: state.partNumbers
})

export default connect(mapStateToProps)(AvailabilityGrid)
