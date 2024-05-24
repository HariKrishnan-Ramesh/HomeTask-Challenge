import React , { useState} from 'react'
import './Login.css'
import { auth } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {

 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password);
      console.log("User logged in successfully");
      toast.success("User logged in successfully" , {
        position:"top-center"
      });
      window.location.href = "/Tdlist";
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position:"bottom-center"
      })
    }
  } 

  return (
    <div className='main-div-container'>
        <div className="form-container">
            <form onSubmit={handleSubmit} className='login-form'>
            <h1>Login</h1>
                <div className="email-based-input">
                    <label>Email Address</label>
                    <input type='email'
                     placeholder='Enter email'
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)} />
                </div>

                <div className="password-based-input">
                    <label>Password</label>
                    <input type='password'
                     placeholder='Password'
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <div className="button-section">
                    <button type='submit'>Login</button>
                </div>

                <div className="message-section">
                    <p>Don't have an account!!<a href='Register' >Register Here</a></p>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default Login