import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class Home extends Component {
  static get displayName() {
    return 'App'
  }

  static get propTypes() {
    return {}
  }

  static get defaultProps() {
    return {}
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <ul>
          <li><Link to="/words">Words</Link></li>
          <li><Link to="/test">Test</Link></li>
        </ul>
        <div>{ this.props.children }</div>
      </div>
    )
  }
}
