import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";
import {toast} from "react-toastify"

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);

    const [currState,setCurrState] = useState("Login")

    //State variable to store username,pswd and email
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    function handleChange(event){
      const name = event.target.name;
      const value = event.target.value;

      setData((prev) => ({...prev,[name]:value}));
    }

      const handleSubmit = async (event) => {
        event.preventDefault();

        let newUrl = url;
        if(currState==="Login"){
          newUrl += "/api/user/login"
        }
        else{
          newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);                                                          // If login or signup is succesful, fetch the token and save it in local storage
          toast.success("Logged In")
          setShowLogin(false);                                                                                        // Hide the form after succesful login                  
        }
        else{
          alert(response.data.message);
        }
      }

  return (
    <div>
      <div className="login-popup">
        <form onSubmit={handleSubmit} className="login-popup-container">

            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-inputs">
                {(currState === "Login") ? <></> : ( <input type="text" name='name' value={data.name} onChange={handleChange}  placeholder='Your Name' required />) }
                <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='Email ID' required />
                <input type="password" name='password' value={data.password} onChange={handleChange} placeholder='Password' required />
            </div>

            <button type='submit'>{(currState === "Sign Up") ? "Create New Account" : "Login"}</button>

            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I accept the Terms & Conditions & Privacy Policy</p>
            </div>
            

            {(currState === "Sign Up")
            ? <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
            : <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            }

        </form>
      </div>
    </div>
  )
}

export default LoginPopup
