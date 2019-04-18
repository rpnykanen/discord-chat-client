import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {AppContext} from '../../util/state'
import electron from 'electron'
import qs from 'query-string'
import axios from 'axios'

import css from './LoginScreen.css'

const config = require('../../../config.json')

const BrowserWindow = electron.remote.BrowserWindow

const browserConfig = {
  width: 600, 
  height: 800, 
  show: false, 
  webPreferences: {
    nodeIntegration: false,
  },
}

let browserWindow = null

const LoginScreen = () => {

  const {state, dispatch} = useContext(AppContext)
  const [authError, setAuthError] = useState('')

  const openAuthorizationModal = () => {

    const authorizeEndpoint = `${config.AUTHORIZE_URL}?client_id=${config.CLIENT_ID}&redirect_uri=${encodeURIComponent(config.APP_URL)}&response_type=code&scope=${encodeURIComponent(config.OAUTH_SCOPES)}`
    browserWindow = new BrowserWindow(browserConfig)
    browserWindow.loadURL(authorizeEndpoint)

    browserWindow.webContents.on('will-navigate', (event, url) => {
      handleAuthorizationCallback(url)
    })
    
    browserWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleAuthorizationCallback(newUrl)
    })
    
    browserWindow.show()
  }

  const handleAuthorizationCallback = async (url) => {

    const search = url.split('?')[1]
    const resp = qs.parse(search)

    if (resp.error && resp.error_description) {
      setAuthError(resp.error_description)
    }

    if (resp.code) {
      await getAccessToken(resp.code)
    }    

    browserWindow.destroy()
  }

  const getAccessToken = async (authorizationCode) => {

    const body = {
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: config.APP_URL,
      scope: config.OAUTH_SCOPES,
    }

    try {
      
      const {data} = await axios.post(config.TOKEN_URL, qs.stringify(body), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      if (!data.access_token || !data.refresh_token) {
        throw new Error('Unknown server error')
      }

      // Set access_token and refresh_token to store
      dispatch({type: 'ADD_TOKENS', payload: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      }})

    } catch (error) {
      setAuthError(error.message) 
    }
  }

  if (state.accessToken) {

    // Redirect to app
    return <Redirect to={{
      pathname: '/app',
    }} />
  }

  return (
    <div className={css.loginScreen}>
      <div className={css.loginWrap}>
        <h3>Login with Discord</h3>
        <button onClick={openAuthorizationModal}>Login</button>
        <p>{authError}</p>
      </div>
    </div>
  )
}

export default LoginScreen
