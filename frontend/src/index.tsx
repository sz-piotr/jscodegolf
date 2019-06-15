import './styles/main.css'
import './styles/normalize.css'

import React from 'react'
import { render } from 'react-dom'

import { App } from './ui/App'

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}

render(
  <App />,
  document.getElementById('app'),
)
