import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios";
import {toast} from "react-toastify";

const List = ({url}) => {

  // Store all the data from database in a state variable
  const [list,setList] = useState([]);

  // fetching the list from backend throgh api call

  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success) {
      setList(response.data.data);                                                                          // If data is succesfully loaded in state variable then add response data in the state variable of list
    }
    else {
      toast.error("Error in fetching")
    }
  }
  
  useEffect(()=>{
    fetchList();                                                                                             // We have to run the fetchList function whenever the webpage is loaded to get fresh list of food items from database therefore we have used useEffect with empty dependency array
  },[])


  // function to remove food from database when clicked on cross

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId});                                //it will post on our backend server of /remove route , we will again refresh the list after deletion
    await fetchList();
    if(response.data.success) {
      toast.success(response.data.message);
    }
    else{
      toast.error("Error")
    }
  }



  return (
    <div className='list add flex-col'>
      <p>List of Food Items</p>
      <div className="list-table">

        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        
        {list.map((item,index) => {
          return (
            <div key={index} className="list-table-format">
                <img src={ `${url}/images/`+item.image } alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹ {item.price}</p> 
                <p 
                  onClick={() => removeFood(item._id)}                                                                                            // in database unique _id is generated for every entry
                  id='remove' 
                  className='cursor'>X</p>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default List
