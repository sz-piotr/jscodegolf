import './styles/main.css'
import './styles/normalize.css'

import React from 'react'
import { render } from 'react-dom'

import { App } from './ui/App'

import OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

render(
  <App />,
  document.getElementById('app'),
)
