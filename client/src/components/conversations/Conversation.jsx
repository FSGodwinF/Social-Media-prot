import React, {  useEffect, useState } from 'react'

import './conversations.css'
import Axios from "axios"

const Conversation = ({conversation, currentUser}) => {

  
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(()=>{
    const friendId  = conversation.members.find(m=>m!== currentUser._id);

    const getUser = async ()=>{
      try {
        const res = await Axios("/users?userId="+ friendId);
        setUser(res.data)
      } catch (error) {
        console.log(error)
        
      }
      
    };
    getUser();
  }, [currentUser, conversation])
  
  
  
  
  return (
    <div className="conversation">
      <img 
      src={user?.profilePicture? PF+user.profilePicture: PF+"default-profile.jpg"}
      alt="" 
      className="conversation-image" 
      />
      <span className="conversation-name">{user?.username}</span>
    </div>
  )
}

export default Conversation