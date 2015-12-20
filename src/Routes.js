import React from 'react'
import { Router, Route } from 'react-router'
import App from 'components/App.js'
import Words from 'components/Words'

export default (
  <Route path="/" component={ App }>
    <Route path="words" component={ Words } />
  </Route>
)
