import React, {useRef, useContext, useState} from 'react'
import './login.css'
import {Link} from "react-router-dom"
import { loginCall } from '../../ApiCalls'
import {AuthContext} from '../../context/AuthContext'
import {CircularProgress} from '@mui/material'
import {MdVisibility, MdVisibilityOff} from 'react-icons/md'

const Login = () => {
  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const [isVisible ,setVisible] = useState(false);
  
  
  
  const handleClick = (e)=>{
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value}, dispatch)
  }
  const toggleHandler = ()=>{
    setVisible(!isVisible);
  };
  


  return (
    <div className="login">
       <div className="login-wrapper">
         <div className="login-left">
           <h3 className="login-logo">FADERIA</h3> 
           <span className="login-desc">
               Connecting people around the globe
           </span>
        </div>  
         <div className="login-right">
             <form className="login-form" onSubmit={handleClick}>
                 <input 
                    placeholder="Email" 
                    type="email"
                    required  
                    className="login-input" 
                    ref={email}
                 />
                 <div className="password-group">
                 <input 
                    placeholder="Password" 
                    type={isVisible? "text": "password"} 
                    required
                    minLength="8"
                    className="login-input-password" 
                    ref={password} 
                 />
                 <span onClick={toggleHandler} className="password-show">{isVisible? <MdVisibility/> :<MdVisibilityOff/> }</span>
                 </div>
                 <button className="login-button" type="submit" disabled={isFetching}>{isFetching? <CircularProgress color="inherit" size="25px" />: "Sign in"}</button>
                 <span className="login-forgot">Forgot Password?</span>
                <Link to="/register"><button className="create-new-user">{isFetching? <CircularProgress color="inherit" size="25px" />: "Register"}</button></Link>
             </form>
         </div>
      </div> 
    </div>
  )
}

export default Login