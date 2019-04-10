import React from 'react'
import ReactDOM from 'react-dom'
import {ContextProvider} from './util/state'
import App from './App'

ReactDOM.render((
  <div>
    <ContextProvider>
      <App/>
    </ContextProvider>
  </div>
),
document.getElementById('root')
)
