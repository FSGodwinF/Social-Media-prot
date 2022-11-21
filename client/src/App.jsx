import React, {useContext} from 'react';
import './App.css';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/Messenger/Messenger';

function App() {
 
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user? <Home/>: <Register/>}/>
        <Route path="/register" element={user? <Navigate to="/" /> :<Register/>}/>
        <Route path="/login" element={user? <Navigate to="/" /> : <Login/>}/>
        <Route path="/messenger" element={!user? <Navigate to="/" /> :<Messenger/>}/>
        <Route path="/profile/:username" element={  <Profile/>}/>
      </Routes>
    </Router>
      

  );
}

export default App;
