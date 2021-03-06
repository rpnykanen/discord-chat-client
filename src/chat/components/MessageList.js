import React, {useContext} from 'react'
import {AppContext} from '../../util/state'
import isSameDay from '../../util/isSameDay'
import Message from './Message'
import css from './MessageList.css'

const MessageList = () => {

  const {state} = useContext(AppContext)

  const messages = state.messages

  return <ul className={css.messageList}>
    {messages.map((item, index) => {

      const {author, content: message, mentions} = item

      const users = mentions.users.reduce( (acc,user) => {
        const temp = {}
        temp[user.id] = user.username
        return {...acc, ...temp}
      }, {})

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
      const parsedMessage = useridToUsername(message,users)
      return <Message
        key={item.id} 
        header={dayText} 
        timestamp={item.createdTimestamp} 
        username={author.username}>
        {parsedMessage}
      </Message>
    })}
  </ul>
}

const useridToUsername = (message, users) => {
    const regex = new RegExp('<@\\d*>', 'g');
    const userids = message.match(regex);
    if( userids != null && userids.length != 0){
        userids.forEach( userid => {
            message = message.replace(userid, '@'+users[userid.substring(2, (userid.length - 1))])
            }
        )
    }
    return message
}


export default MessageList
