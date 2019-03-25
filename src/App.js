import React, {useEffect, useContext} from 'react'
import {AppContext} from './util/state'
import getClient from './util/client'
import ChatScreen from './chat/ChatScreen'

const client = getClient()
const config = require("../config.json")

const App = () => {
  const {dispatch} = useContext(AppContext)

  useEffect(() => {

    client.on('ready', async () => {

      const channel = client.channels.get(config.channel_id)

      const resp = await channel.fetchMessages()

      const messages = Array.from(resp.values()).reverse()
     
      dispatch({type: 'ADD_MESSAGES', payload: messages})
    })

    client.on('message', incomingMessage => {
      dispatch({type: 'ADD_MESSAGES', payload: [incomingMessage]})
    })
  }, [] /* empty diff makes this effect run as componentDidMount only */ )

  const submitMessage = (message) => {
    client.channels.get(config.channel_id).send(message);
  }

  return (
    <ChatScreen 
      submitMessage={submitMessage} 
    />
  )
}

export default App
