import React, {useState, useEffect} from 'react'
import Discord from 'discord.js'

import ChatScreen from './chat/ChatScreen'

const config = require("../config.json");

const App = () => {
  const [messages, setMessages] = useState([])
  const [client, setClient] = useState(new Discord.Client())

  useEffect(() => {

    client.login(config.token);

    client.on('ready', async () => {

      const channel = client.channels.get(config.channel_id)

      const messages = await channel.fetchMessages()

      setMessages(Array.from(messages.values()).reverse())
    })

    client.on('message', incomingMessage => {
      console.log('--------')
      console.log(messages)
      console.log(incomingMessage)
      console.log('--------')
      setMessages([...messages, incomingMessage])
    })
  }, [])

  const submitMessage = (message) => {
    client.channels.get(config.channel_id).send(message);
  }

  return <ChatScreen 
    submitMessage={submitMessage} 
    messages={messages}
  />
}

export default App
