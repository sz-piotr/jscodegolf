import './styles/main.css'
import './styles/normalize.css'

import React from 'react'
import { render } from 'react-dom'

import { App } from './ui/App'
import MyWorker from 'worker-loader!./worker'

render(
  <App />,
  document.getElementById('app'),
)


const worker = new MyWorker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => { console.log(1, event) };

worker.addEventListener("message", (event) => { console.log(2, event) });
