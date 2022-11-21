import React, { useContext, useState, useEffect, useRef } from 'react'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/Message/Message'
import Navbar from '../../components/Navbar/Navbar'
import {MdSend} from 'react-icons/md'
import "./messenger.css"
import OnlineChat from '../../components/OnlineChat/OnlineChat'
import { AuthContext } from '../../context/AuthContext'
import Axios from 'axios'
import {io} from 'socket.io-client'

const Messenger = () => {
  const [conversation, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket  = useRef();
  const scrollRef = useRef();

  const {user} = useContext(AuthContext);



  useEffect(()=> {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data)=>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  useEffect(()=>{
    arrivalMessage && 
    currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev)=>[...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(()=>{
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", (users)=>{
      setOnlineUsers(user.following.filter((f)=>users.some((u)=>u.userId===f)))
    });
  }, [user]);



  useEffect(()=>{
    const getConversation = async ()=>{

      try {
        const res = await Axios.get("/conversations/"+user._id)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    getConversation();
  }, [user._id])

  useEffect(()=>{
    const getMessages = async ()=>{
      try {
        const res =  await Axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error)
      }
      
    }
    getMessages();
  }, [currentChat]);

  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    };
    const receiverId = currentChat.members.find((member)=> member!==user._id)
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage
    })
    try {
      const res = await Axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages])
  
  return (
    <>
    <Navbar/>
    <div className="messenger">
      <div className="chat-menu">
        <div className="chat-menu-wrapper">
          <input type="text" placeholder="Search for users"className="chat-menu-input"/>
          {conversation.map((c)=>(
            <div onClick={()=>setCurrentChat(c)}>
            <Conversation key={c._id} conversation={c} currentUser={user}/>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-box">
        <div className="chat-box-wrapper">
          {currentChat ? 
          <>
          <div className="chat-box-top">
          {messages.map((m)=>(
            <div ref={scrollRef}>
            <Message message={m} own={m.sender === user._id} key={m._id} />
            </div>
          ))}
          </div>
          <div className="chat-box-bottom">
            <textarea 
            placeholder="Message" 
            className="chat-input-box"
            onChange={(e)=>setNewMessage(e.target.value)}
            value={newMessage}
            ></textarea>
            <button 
            className="chat-submit"
            onClick={handleSubmit}>
              <MdSend className="submit-button"/>
            </button>
          </div></> : <span className="chat-not-started">Open a conversation to start messsaging</span>}
        </div>
      </div>
      <div className="chat-online">
        <div className="chat-online-wrapper">
          <OnlineChat 
          onlineUsers={onlineUsers} 
          currentId={user._id} 
          setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Messenger