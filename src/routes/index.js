import React from 'react'
import {Switch, Route} from 'react-router-dom'

import App from '../App'
import LoginScreen from '../oauth/screens/LoginScreen'

const routes = [
  <Route key={0} path="/" exact render={(props) => <LoginScreen {...props}/>} />,
  <Route key={1} path="/app" exact render={(props) => <App {...props}/>} />,
]

export default <Switch>{routes}</Switch>
