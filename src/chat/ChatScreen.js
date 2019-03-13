import React, {useState, useEffect} from 'react'
import Discord from 'discord.js'

import MessageList from './components/MessageList'

import css from './ChatScreen.css'

const ChatScreen = ({submitMessage, ...props}) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter')
      return

    setInputValue('')
    submitMessage(inputValue)
  }

  return (
    <div>
        <h1>Chat</h1>
        <div>
            <h2>Messages</h2>

            <div>
              <MessageList {...props}/>
            </div>

            <input
              className={css.messageInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
        </div>
    </div>
  )
}

export default ChatScreen
