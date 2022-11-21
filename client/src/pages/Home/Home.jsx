import React from 'react'
import Feed from '../../components/Feed/Feed'
import LeftBar from '../../components/LeftBar/LeftBar'
import Navbar from '../../components/Navbar/Navbar'
import RightSide from '../../components/RightSide/RightSide'
import './home.css'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="home-container">
        <LeftBar/>
        <Feed/>
        <RightSide/>
        </div>
    </div>
  )
}

export default Home