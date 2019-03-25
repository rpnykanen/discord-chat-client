import React, {useContext} from 'react'
import {AppContext} from '../../util/state'
import isSameDay from '../../util/isSameDay'
import Message from './Message'
import css from './MessageList.css'

const MessageList = () => {

  const {state} = useContext(AppContext)

  const messages = state.messages || []

  return <ul className={css.messageList}>
    {messages.map((item, index) => {

      const {author, content: message} = item

      let dayText = ''

      if (index > 0) {
        const previousDay = new Date(messages[index-1].createdTimestamp)
        const currentDay = new Date(item.createdTimestamp)

        if (!isSameDay(previousDay, currentDay)) {
          dayText = currentDay.toLocaleDateString()
        }
      } else {
        const currentDay = new Date(item.createdTimestamp)
        dayText = currentDay.toLocaleDateString()
      }

      return <Message
        key={item.id} 
        header={dayText} 
        timestamp={item.createdTimestamp} 
        username={author.username}>
        {message}
      </Message>
    })}
  </ul>
}

export default MessageList
