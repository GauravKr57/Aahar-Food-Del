import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify";

const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);

  const deliveryFee = (getTotalCartAmount() === 0) ? 0 : 30;

  //Storing form data
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    landmark:"",
    phone:""
  })

  function handleChange(event) {                                                      // This function stores the data entered on input field in above state variable
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({...prev,[name]:value}));
  }

  // Function to redirect to the payment gateway

  const placeOrder = async (event) => {

    event.preventDefault();

    // Add all the items in orderItems array along with its quantity
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id] > 0)
      {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];                                                                                             // Add quantity entry in the 'itemInfo' object and push to orderInfo so orderInfo will be array of objects for every cart product item
        orderItems.push(itemInfo);
      }                                                         
    })
    
    // Create order data which includes form data (address) as well as food items and amount data
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+30,
    }

    //Send order data from here to backend
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);                                                                       // On suucesful payment, send the user to the session url(stripe checkout page)
    }
    else {
      alert("Error in processing payment!");
    }
  }


  // If the user is not loggedIn or Cart is empty then do not navigate him to payment page, restrict him in cart page
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      navigate('/cart');
      toast.error("Login to place order")
    }
    else if(getTotalCartAmount() === 0) {
      navigate('/cart');
      toast.error("Add items to cart to proceed")
    }
  },[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>

      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={handleChange} value={data.firstName} type="text" placeholder='First name' required />
          <input name='lastName' onChange={handleChange} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input name='email' onChange={handleChange} value={data.email} type="email" placeholder='Email address' />
        <input name='street' onChange={handleChange} value={data.street} type="text" placeholder='Street' required/>
        <div className="multi-fields">
          <input name='city' onChange={handleChange} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={handleChange} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={handleChange} value={data.zipcode} type="text" placeholder='Zip Code' required />
          <input name='landmark' onChange={handleChange} value={data.landmark} type="text" placeholder='Any Landmark' required />
        </div>
        <input name='phone' onChange={handleChange} value={data.phone} type="text" placeholder='Contact Number' required/>
      </div>

      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {deliveryFee}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p className="total-amount">Total</p>
              <p className="show-total-amount">₹ {getTotalCartAmount()+deliveryFee}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder
