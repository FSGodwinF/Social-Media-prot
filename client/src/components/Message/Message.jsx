import React from 'react'
import './message.css'
import {format} from "timeago.js"

const Message = ({message, own}) => {
  return (
    <div className={own? "message own": "message"}>
        <div className="message-top">
            <img 
            src="https://netswire.usatoday.com/wp-content/uploads/sites/9/2021/11/USATSI_17134482-e1636639692417.jpg?w=1000&h=600&crop=1" 
            alt="" 
            className="message-image"
            />
            <p className="message-text">
            {message.text}
            </p>
        </div>
        <div className="message-bottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message