import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';


const MyOrders = () => {

    //need token to send to api to get order details of particular user
    const {url, token} = useContext(StoreContext);

    //fetching users order data and saving it in state variable
    const [data,setData] = useState([]);

    //fetch order details
    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);  
        // console.log(response.data.data);                                                                                 // save the users order data fetched from api
    }

    //call the function whenever this page is loaded and token is updated i.e. new user come after succesful payment (if token is available then only I will run the function)
    useEffect(() => {
        if(token) {
            fetchOrders();
        }
    },[token])


  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index) => {
            return (
            <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                    {order.items.map((item,index) => {
                        if(index < order.items.length-1) {
                            return item.name+" x "+item.quantity+" , ";
                        }
                        else {
                            return item.name+" x "+item.quantity;
                        }
                    })}
                </p>
                <p>₹ {order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button onClick={fetchOrders}>Track Order</button>
            </div>
        )})}
      </div>
    </div>
  )
}

export default MyOrders
