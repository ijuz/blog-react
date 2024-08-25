
import Posts from './components/screens/Posts'
import Blog from './components/screens/Blog'
import Signup from './components/screens/Signup'
import Register from './components/screens/Register'
import Header from './components/screens/Header'
import Private from './components/screens/Private'
import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Create from './components/screens/Create'
import Mypost from './components/screens/Mypost'
import Edit from './components/screens/Edit'
import SavePost from './components/screens/SavePost'
import UserProfile from './components/screens/Myprofile'
import './App.css'

export const UserContext = React.createContext()


function App() {
const [userdata,setUserData]=useState({})
const ubdateData = (action)=>{
  switch(action.type){
      case "logout":
          setUserData(null);
          localStorage.clear();
          break;
      case 'LOGIN':
        setUserData(action.payload)
        break;
      default:
         break;
  }
  
  
}
useEffect(()=>{
  setUserData(JSON.parse(localStorage.getItem('user_data')))
},[])
  return (
    <div className='main-section'>
      <UserContext.Provider value={{userdata,ubdateData}}>
      
      <Router>
      <Header/>
        <Routes>
          
          <Route element={<Posts/>} path='/'/>
          <Route element={<Private Element={<Blog/>}/>} path='/posts/:id/'/>
          <Route element={<Signup/>} path='/login' exact/>
          <Route element={<Register/>}path='/register' exact/>
          <Route element={<Create/>}path='/create-blog' exact/>
          <Route element={<Private Element={<Mypost/>}/>} path='/mypost'/>
          <Route element={<Edit/>}path='/edit/:id/' exact/>
          <Route element={<Private Element={<SavePost/>}/>}path='/saved-posts'/>
          <Route element={<Private Element={<UserProfile/>}/>}path='/myprofile'/>




      


        

        </Routes>
      </Router>
      </UserContext.Provider>
     
    </div>
  )
}

export default App