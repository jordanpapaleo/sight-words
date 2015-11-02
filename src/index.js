import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/font/css/iconic-bootstrap.css'
import './main.less'
// import './ResponsiveVoice.js'

import debug from 'debug'
import React from 'react'
import App from './components/App.js'

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

React.render(<App />, applicationNode, () => {
  log('finished mounting application')
})
