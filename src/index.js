import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router} from 'react-router-dom'

import {ContextProvider} from './util/state'
import routes from './routes'

ReactDOM.render((
  <div>
    <ContextProvider>
      <Router>
        {routes}
      </Router>
    </ContextProvider>
  </div>
),
document.getElementById('root')
)
