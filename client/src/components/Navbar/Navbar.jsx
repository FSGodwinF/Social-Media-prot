import React, {useContext} from 'react'
import './navbar.css'
import {FiSearch} from 'react-icons/fi'
import {BsPersonFill, BsChatSquareTextFill} from 'react-icons/bs'
import {IoIosNotifications} from 'react-icons/io'
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
const Navbar = () => {
  
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" style={{textDecoration:"none"}}><span className="logo">FADERIA</span></Link>
        </div>
        <div className="navbar-center">
          <div className="search-bar">
            <FiSearch className="search-icon"/>
            <input placeholder="Friends, Posts, videos..." className="search-input" />
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-links">
            <span className="navbar-link">HomePage</span>
            <span className="navbar-link">Timeline</span>
          </div>
          <div className="navbar-icons">
            <div className="navbar-icon-item">
              <BsPersonFill/>
              <span className="navbar-icon-item-badge">1</span>
            </div>
            <div className="navbar-icon-item">
              <BsChatSquareTextFill/>
              <span className="navbar-icon-item-badge">60</span>
            </div>
            <div className="navbar-icon-item">
              <IoIosNotifications/>
              <span className="navbar-icon-item-badge">4</span>
            </div>
          </div>
          <Link to ={`/profile/${user.username}`}>
          <img 
          src={user.profilePicture? PF+user.profilePicture: PF+"default-profile.jpg" } 
          alt="" 
          className="profile-photo"
          />
          </Link>
        </div>
    </div>
  )
}

export default Navbar