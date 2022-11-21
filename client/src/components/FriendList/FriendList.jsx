import React from 'react'
import './friendlist.css'

const FriendList = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
     <li className="leftbar-friend">
            <img src={PF+user.profilePicture} className="leftbar-friend-image" alt=""/>
            <span className="leftbar-friend-name">{user.username}</span>
     </li>   
    </>
  )
}

export default FriendList