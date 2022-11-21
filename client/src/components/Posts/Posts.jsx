import React, {useState, useEffect, useContext} from 'react'
import './posts.css'
import {FiMoreHorizontal} from 'react-icons/fi'
import {FcLike, FcRefresh} from 'react-icons/fc'
import { Users } from '../../data'
import Axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const Posts = ({post}) => {


  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext);

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes]);
  
  
  useEffect(()=>{
    const fetchUser = async ()=>{
      const res =  await Axios.get(`/users?userId=${post.userId}`);
      setUser(res.data)
      
    };
    
    fetchUser(); 
  }, [post.userId]);


  const likeHandler = ()=>{

      try{
        Axios.put("/posts/" + post._id+ "/like", {userId:currentUser._id} )
      }catch(err){
        console.log(err)
      }
      setLike(isLiked ? like-1 : like + 1)
      setIsLiked(!isLiked)
  }

  return (
    <div className="post">
        <div className="post-wrapper">
            <div className="post-top">
              <div className="post-top-left">
                    {/* Users.filter(u=>u.id===post.userId)[0] */}
                  <Link to ={`profile/${user.username}`}>
                  <img 
                    src={user.profilePicture? PF+user.profilePicture : PF+"default-profile.jpg"} 
                    className="post-profile-photo" 
                    alt=""/>
                  </Link>
                  
                  <span className="post-username">{user.username}</span>
                  <span className="post-date">{format(post.createdAt)}</span>
              </div>
              <div className="post-top-right">
                  <FiMoreHorizontal/>
              </div>  
            </div>
            <div className="post-center">
                <span className="post-text">{post?.desc}</span>
                <img src={PF+post.img} alt="" className="post-image"/>
            </div>
            <div className="post-bottom">
                <div className="post-bottom-left">
                <span className="retweet-icon"><FcRefresh/></span>
                <span className="like-icon"><FcLike onClick={likeHandler}/></span>
                <span className="like-counter">{like} likes</span>
                </div>
                <div className="post-bottom-right">
                    <span className="post-comment-text">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Posts