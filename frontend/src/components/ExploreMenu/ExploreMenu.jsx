import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>Select your desired items from the menu list below. Our options include delicious appetizers, mouth-watering main courses, and delectable desserts. Customize your order to satisfy your cravings and enjoy a delightful dining experience!</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
          return (
            <div
              key={index} className="explore-menu-list-item"
              onClick={() => setCategory( prev => prev===item.menu_name ? "All" : item.menu_name)}            // If previous state is same as item.menu_name then set the state as all else set it  to current item(item.menu_name) 
             >
              <img 
                src={item.menu_image} alt="food-item"
                className={(category === item.menu_name) ? "active" : ""}
              />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
