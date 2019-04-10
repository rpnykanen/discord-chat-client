import React, {useState} from 'react'

import MessageList from './components/MessageList'

import css from './ChatScreen.css'

const ChatScreen = ({submitMessage}) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter')
      return

    submitMessage(inputValue)
    setInputValue('')
  }

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <h2>Messages</h2>

        <div>
          <MessageList />
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
