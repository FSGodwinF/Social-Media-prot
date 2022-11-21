import React, { useContext, useEffect, useState } from 'react'
import './rightside.css'
import {FcCalendar} from 'react-icons/fc'
import { Users } from '../../data'
import Online from '../Online/Online'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import {MdAdd, MdRemove} from 'react-icons/md'
const RightSide = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [follow, setFollow] = useState(currentUser.following.includes(user?.id));

  
  useEffect(()=>{
    const fetchFriends = async ()=>{
      try {
        const friendList  = await Axios.get("/users/friends/"+user._id)
        setFriends(friendList.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchFriends();
  },[user]);

  const followHandler = async ()=>{
    try {
      if(follow){
        await Axios.put("/users/"+user._id+"/unfollow", {userId:currentUser._id});
        dispatch({type: "UNFOLLOW", payload: user._id});
      }else{
        await Axios.put("/users/"+user._id+"/follow",  {userId:currentUser._id})
        dispatch({type: "FOLLOW", payload: user._id})
      }
    } catch (error) {
      console.log(error)
    }
    setFollow(!follow)
  }
  
  const HomeRightSide = ()=>{
    
    
    return(
      <>
      <div className="birthday-container">
          <span className="birthday-icon"><FcCalendar/></span>
          <span className="birthday-text"><b>Steven Asieba</b> and <b>2 other friends</b> have a birthday today</span>
        </div>
        <img src="assets/ad.jpg" alt="" className="rightside-ad" />
        <h4 className="rightside-title">Online</h4>
        <ul className="rightside-friend-list">
          {Users.map(u=>(
            <Online key={u.id} user={u}/>
          ))}
        </ul>
      </>
    )
  };

  const ProfileRightSide  = ()=>{
    
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="follow-buttton" onClick={followHandler}>
          {follow ? "Unfollow": "Follow"}
          {follow ? <MdRemove/> : <MdAdd/>}
        </button>
      )}
      <h4 className="rightside-title">User Information</h4>
        <div className="rightside-info">
          <div className="rightside-info-item">
          <span className="rightside-info-key">City:</span>
          <span className="rightside-info-value">{user.city}</span>
          </div>
          <div className="rightside-info-item">
          <span className="rightside-info-key">From:</span>
          <span className="rightside-info-value">{user.from}</span>
          </div>
          <div className="rightside-info-item">
          <span className="rightside-info-key">Relationship:</span>
          <span className="rightside-info-value">
            {user.relationship ===1
             ? "In a relationship" 
             : user.relationship===2 
             ? "Married" 
             : "Talking stage/It's complicated"}
          </span>
          </div>
        </div>
        <h4 className="rightside-title">User Friends</h4>
        <div className="rightside-followings">
          {friends.map((friend)=>(
            <Link to={"/profile/" + friend.username} style={{textDecoration:"none"}}>
            <div className="rightside-following">
            <img 
            src={friend.profilePicture ? PF+friend.profilePicture: PF+"default-profile.jpg" } 
            alt="" 
            className="rightside-following-img" 
            />
            <span className="rightside-following-name">{friend.username}</span>
          </div>
          </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className="rightside-container">
      <div className="rightside-wrapper">
        {user? <ProfileRightSide/> : <HomeRightSide/>}
      </div>
    </div>
  )
}

export default RightSide