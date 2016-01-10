import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Nav extends Component {
  static get displayName () {
    return 'Nav'
  }

  static get propTypes () {
    return {}
  }

  static get defaultProps () {
    return {}
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <ul>
          <li><Link to='/words'>Words</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
        </ul>
      </div>
    )
  }
}
