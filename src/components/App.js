import React, { Component } from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { Container, Divider, Header, Icon, Loader }
  from 'semantic-ui-react'
import AvailabilityGrid from '../containers/AvailabilityGrid'

export default class App extends Component {
  componentDidMount(){
  	this.props.onActivate()
  }

  render() {
    return (
      <Container>
        <Header as='h2' icon inverted textAlign='center'>

          <Icon name='apple' />
            Apple Watch Availability (HK)
        </Header>

        <Divider />

        <Loader content='Loading' active={this.props.isLoading} />

        <AvailabilityGrid />

      </Container>
    )
  }
}
