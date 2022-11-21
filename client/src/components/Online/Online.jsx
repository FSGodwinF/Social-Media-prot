import React from 'react'
import './online.css'

const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
       <li className="rightside-friend">
            <div className="rightside-profile-container">
              <img src={PF+user.profilePicture} alt="" className="rightside-profile-img" />
              <span className="online-friends"></span>
            </div>
            <span className="online-username">{user.username}</span>
          </li> 
    </>
  )
}

export default Online