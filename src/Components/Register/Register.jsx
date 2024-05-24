import React, { useState } from 'react';
import './Register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../Firebase/Firebase';
import { setDoc,doc } from 'firebase/firestore';
import { toast } from "react-toastify";

const Register = () => {

  const [fname,setFname] = useState("")
  const [lname,setLname] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleRegister = async (e) =>{
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth,email,password);
      const user =auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          email:user.email,
          firstname:fname,
          lastName:lname,
          password:password,
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!",{
        position:"top-center",
      })
    } catch (error) {
      console.log(error.message);
      toast.error(error.message,{
        position:"bottom-center",
      })
    }
  }

  return (
    <div className='register-main-div'>
        <form onSubmit={handleRegister} className='register-form'>
            <h1>Sign Up</h1>

            <div className="name-section">
              <label>First Name</label>
              <input type='text'
               placeholder='First name'
               onChange={(e)=>setFname(e.target.value)}
               required />
            </div>

            <div className="lname-section">
              <label>Last Name</label>
              <input type='text'
               placeholder='Last Name'
               onChange={(e)=>setLname(e.target.value)} />
            </div>

            <div className="email-section">
              <label>Email Address</label>
              <input type='email'
               placeholder='Mail id'
               onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className="password-section">
              <label>Password</label>
              <input type='password'
               placeholder='password'
               onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <div className='button-div-section'>
            <button type='submit'>Signup</button>
            </div>

            <div className="message-div-section">
              <p>Already Registered? <a href="/Login">Login</a></p>
            </div>

        </form>
    </div>
  )
}

export default Register