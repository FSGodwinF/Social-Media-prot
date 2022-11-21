import React from 'react'
import './leftbar.css'
import {MdRssFeed, MdChat, MdGroups, MdOndemandVideo, MdEvent} from 'react-icons/md'
import {BsQuestionSquareFill, BsFillBookmarksFill} from 'react-icons/bs'
import {CgNotes} from 'react-icons/cg'
import { Users } from '../../data'
import FriendList from '../FriendList/FriendList'
const LeftBar = () => {
  return (
    <div className="leftbar-container">
      <div className="leftbar-wrapper">
        <ul className="leftbar-items">
          <li className="list-item">
            <MdRssFeed className="list-item-icon"/>
            <span className="icon-text">Feed</span>
          </li>
          <li className="list-item">
            <MdChat className="list-item-icon"/>
            <span className="icon-text">Chat</span>
          </li>
          <li className="list-item">
            <MdGroups className="list-item-icon"/>
            <span className="icon-text">Groups</span>
          </li>
          <li className="list-item">
            <MdOndemandVideo className="list-item-icon"/>
            <span className="icon-text">Videos</span>
          </li>
          <li className="list-item">
            <MdEvent className="list-item-icon"/>
            <span className="icon-text">Events</span>
          </li>
          <li className="list-item">
            <BsQuestionSquareFill className="list-item-icon"/>
            <span className="icon-text">Questions</span>
          </li>
          <li className="list-item">
            <BsFillBookmarksFill className="list-item-icon"/>
            <span className="icon-text">Bookmarks</span>
          </li>
          <li className="list-item">
            <CgNotes className="list-item-icon"/>
            <span className="icon-text">Notes</span>
          </li>
        </ul>
        <button className="showmore-button">Show More</button>
        <hr className="leftbar-hr"/>
        <ul className="leftbar-friendlist">
         {Users.map(u=>(
           <FriendList key={u.id} user={u}/>
         ))}
        </ul>
      </div>
    </div>
  )
}

export default LeftBar