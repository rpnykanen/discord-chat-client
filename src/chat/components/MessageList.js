import React, {useState} from 'react'
import Message from './Message'

import css from './MessageList.css'

const MessageList = ({messages}) => {

  return <ul className={css.messageList}>
    {messages.map((item, index) => {

      const {author, content: message} = item

      return <Message
        key={item.id} 
        timestamp={item.createdTimestamp} 
        username={author.username}>
        {message}
      </Message>
    })}
  </ul>
}

export default MessageList
