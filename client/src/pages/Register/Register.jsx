import React, {useRef, useState} from 'react'
import './register.css'
import {Link} from "react-router-dom"
import Axios from 'axios'
import {useNavigate} from 'react-router-dom';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md'
const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const [visibility, setVisibility] = useState(false);
  const passwordSecond = useRef();
  const navigate = useNavigate();

  const handleClick = async (e)=>{
    e.preventDefault();
    if(passwordSecond.current.value!==password.current.value){
      passwordSecond.current.setCustomValidity("Passwords don't match!")
    }else{
      const user =JSON.stringify({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      });
      try{
        await Axios.post("/auth/register", user, {headers:{"Content-Type" : "application/json"}});
        navigate("/login")
      }catch(err){
        console.log(err)
      }
      
    }
  }
  
 const toggleHandler = ()=>{
   setVisibility(!visibility)
 }

  return (
    <div className="register">
       <div className="register-wrapper">
         <div className="register-left">
           <h3 className="register-logo">FADERIA</h3> 
           <span className="register-desc">
               Connecting people around the globe
           </span>
        </div>  
         <div className="register-right">
             <form className="register-form" onSubmit={handleClick}>
                 <input placeholder="Username" required className="register-input" ref={username} />
                 <input placeholder="Email" type="email" required className="register-input" ref={email}/>
                <div className="password-again">                
                  <input 
                 placeholder="Password" 
                 type={visibility? "text": "password"} 
                 minLength="8" required 
                 className="register-input-password-2" 
                 ref={password} />
                 <span onClick={toggleHandler} className="password-again-show">{visibility? <MdVisibility/> :<MdVisibilityOff/> }</span>
                 </div>
                 <div className="password-again">
                 <input 
                 placeholder="Confirm password" 
                 type={visibility? "text": "password"}  
                 required 
                 className="register-input-password-2" 
                 ref={passwordSecond} />
                 <span onClick={toggleHandler} className="password-again-show">{visibility? <MdVisibility/> :<MdVisibilityOff/> }</span>
                 </div>
                 <button className="register-button" type="submit">Register</button>
                 <Link to="/login"><button className="sign-in-user">Sign in</button></Link>
             </form>
         </div>
      </div> 
    </div>
  )
}

export default Register