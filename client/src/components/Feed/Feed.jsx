import React, {useContext, useEffect, useState} from 'react'
import Posts from '../Posts/Posts'
import Share from '../Share/Share'
import './feed.css'
import Axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const Feed = ({username}) => {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = username
      ? await Axios.get("/posts/profile/" + username)
      : await Axios.get("posts/timeline/" + user._id);
      setPosts(res.data.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      })
      
      );
      
    };
    
    fetchPosts(); 
  }, [username, user._id]);
  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        {(!username || username === user.username) && <Share/>}
        {posts.map((p)=>(
          <Posts key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}

export default Feed