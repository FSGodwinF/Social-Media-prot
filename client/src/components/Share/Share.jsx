import React, { useContext, useRef, useState } from 'react'
import './share.css'
import {FcMultipleCameras} from 'react-icons/fc'
import {MdCancel, MdGif, MdLabel, MdRoom} from 'react-icons/md'
import {AuthContext} from '../../context/AuthContext'
import Axios from 'axios'


const Share = () => {
  
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const shareHandler = async (e)=>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try {
                await Axios.post("/upload", data);
                
            } catch (err) {
               console.log(err) 
            }

        }
        try{
            await Axios.post("/posts", newPost)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
    return (
    <div className="share">
        <div className="share-wrapper">
            <div className="share-top">
                <img
                 src={user.profilePicture? PF+user.profilePicture : PF+"default-profile.jpg"} 
                 className="share-profile-picture"
                  alt=""
                  />
                <input
                 placeholder={"Say something "+ user.username + "..."} 
                 className="share-input"
                 ref={desc}
                 />
            </div>
            <hr className="share-hr"/>
            {file && (
               <div className="share-file-container">
                   <img src={URL.createObjectURL(file)} className="share-file" alt="" />
                   <MdCancel className="cancel-file-send" onClick={()=>setFile(null)}/>
               </div> 
            ) }
            <form className="share-bottom" onSubmit={shareHandler}>
                <div className="share-layout">
                    <label htmlFor="file" className="share-options">
                        <span className="share-option"><FcMultipleCameras/></span>
                        <input style={{display: "none"}} type="file" id="file" accept=".png, .jpg, .jpeg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="share-options">
                        <span className="share-option"><MdLabel/></span>
                    </div>
                    <div className="share-options">
                        <span className="share-option"><MdGif/></span>
                    </div>
                    <div className="share-options">
                        <span className="share-option"><MdRoom/></span>
                    </div>
                </div>
                <div className="share-layout2">
                    <div className="share-options">
                        <button className="share-option" type="submit">Share</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Share