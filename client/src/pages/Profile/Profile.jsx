import React, { useEffect, useState } from 'react'
import './profile.css'
import Feed from '../../components/Feed/Feed'
import LeftBar from '../../components/LeftBar/LeftBar'
import Navbar from '../../components/Navbar/Navbar'
import RightSide from '../../components/RightSide/RightSide'
import Axios from 'axios'
import { useParams } from 'react-router'

const Profile = () => {
  
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username
    

    useEffect(()=>{
        const fetchUser = async ()=>{
          const res =  await Axios.get(`/users?username=${username}`);
          setUser(res.data)
          
        };
        
        fetchUser(); 
      }, [username]);
    return (
    <>
     <Navbar/>
        <div className="profile">
            <LeftBar/>
            <div className="profile-right">
                <div className="profile-right-top">
                    <div className="profile-cover">
                    <img src={user.coverPicture ? PF+user.coverPicture : PF+"default-cover.jpg"} alt="" className="cover-photo"/>
                    <img src={user.profilePicture ? PF.user.profilePicture : PF+"default-profile.jpg"} alt="" className="cover-photo-img"/>
                    </div>
                    <div className="profile-info">
                        <h4 className="profile-info-name">{user.username}</h4>
                        <span className="profile-info-desc">{user.desc}</span>
                    </div>
                </div>
                <div className="profile-right-bottom">
                    <Feed username={username}/>
                    <RightSide user={user}/>
                </div>
            </div>
        </div>   
    </>
  )
}

export default Profile