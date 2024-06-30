import React, { useState,useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';


const FoodItem = ({id,name,price,description,image}) => {

  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);    // fetched from createContext api under components/createContext 13900

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={url+"/images/"+image} alt="item" className="food-item-img" />
            {
              (!cartItems[id])
              ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} />
              :<div className='food-item-counter'>
                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
                <p>{cartItems[id]}</p>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
              </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price"> ₹ {price} </p>
        </div>
    </div>
  )
}

export default FoodItem
