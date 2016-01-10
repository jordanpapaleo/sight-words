import React, { Component, PropTypes } from 'react'
import Nav from 'components/Nav'

export default class Home extends Component {
  static get displayName () {
    return 'App'
  }

  static get propTypes () {
    return {}
  }

  static get defaultProps () {
    return {}
  }

  render () {
    return (
      <div>
        <h1>Home</h1>
        <Nav />
        <div>{ this.props.children }</div>
      </div>
    )
  }
}
