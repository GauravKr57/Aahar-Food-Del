import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {toast} from "react-toastify";

const Verify = () => {

    // Find the value of parameters of /verify route using useSearhParams
    const [searchParams,setSearchParams] = useSearchParams();

    const success = searchParams.get("success");                          // success is true or false is sytored in success varaible
    const orderId = searchParams.get("orderId");
    
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
      const response = await axios.post(url+"/api/order/verify",{success,orderId});
      if(response.data.success) {
        navigate("/myorders");
        toast.success("Your food is being processed")
      }
      else {
        navigate("/");
        toast.error("Order failed")
      }
    }

    useEffect(() => {
      verifyPayment();
    },[])

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
