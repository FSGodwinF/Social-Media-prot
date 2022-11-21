import React, {useState, useEffect} from 'react'
import './onlinechat.css'
import Axios from 'axios'

const OnlineChat = ({onlineUsers, currentId, setCurrentChat}) => {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  


  useEffect(()=>{
    const getFriends = async()=>{
      const res = await Axios.get("/users/friends/" + currentId);
      setFriends(res.data)
    };

    getFriends();
  }, [currentId])
  
  useEffect(()=>{
    setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);
  
  const handleClick = async (user) => {
    try {
      const res = await Axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="chat-online">
      {onlineFriends.map((o)=> (
        <div className="chat-online-friend" onClick={() => handleClick(o)}>
            <div className="chat-online-img-container">
                <img
                 src={o?.profilePicture
                  ? PF+o.profilePicture 
                  : PF+"default-profile.jpg" } 
                 alt="" 
                 className="chat-online-image"
                 />
                <div className="chat-online-badge"></div>

            </div>
            <span className="chat-online-username">{o?.username}</span>
        </div>
      ))}
    </div>
  )
}

export default OnlineChat