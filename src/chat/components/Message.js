import React from 'react'

import css from './Message.css'

const Message = ({timestamp, username, children: text}) => {
  
  return <li className={css.messageRow}>
    
    <span className={css.timestamp}>
      {`[${new Date(timestamp).toLocaleTimeString()}]`}
    </span>

    <span className={css.username}>
      {`<${username}>`}
    </span>

    <span className={css.message}>
      {text}
    </span>

  </li>
}

export default Message
