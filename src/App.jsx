import React, { useEffect, useState } from 'react';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tdlist from './Components/Tdlist/Tdlist';
import { auth } from './Components/Firebase/Firebase';


const App = () => {
  const [user,setUser] = useState();
  
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
  })
  return (
   <Router>
    <Routes>
      <Route path='/' element={user ? <Navigate to="/Tdlist"/> : <Login />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Tdlist' element={<Tdlist />} />
    </Routes>
    <ToastContainer />
   </Router>
  )
}

export default App

