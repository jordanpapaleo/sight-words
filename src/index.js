import 'bootstrap/dist/css/bootstrap.min.css'
import 'assets/font/css/iconic-bootstrap.css'
import 'main.less'

import debug from 'debug'
import React from 'react'
import { Router } from 'react-router'
import { createHistory } from 'history'
import { render } from 'react-dom'
import routes from 'Routes'

const history = createHistory()
const log = debug('application:bootstrap')

if (process.env.NODE_ENV !== 'production') {
  debug.enable('application:*')
}

log('creating application node')
const applicationNode = document.createElement('div')
applicationNode.className = 'container-fluid'
applicationNode.id = 'application'

log('adding application node to body')
document.body.appendChild(applicationNode)

log('mounting application')

render(<Router history={ history } routes={ routes } />, applicationNode, () => {
  log('finished mounting application')
})
