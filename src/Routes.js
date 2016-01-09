import React from 'react'
import { Router, Route } from 'react-router'
import App from 'components/App.js'
import Words from 'components/Words'
import Settings from 'components/Settings'

export default (
  <Route path="/" component={ App }>
    <Route path="words" component={ Words } />
    <Route path="settings" component={ Settings } />
  </Route>
)
