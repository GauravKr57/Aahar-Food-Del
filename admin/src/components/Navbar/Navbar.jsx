import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.aahaarLogo2} alt="" />
        <h2 className='title-admin'>Admin Only</h2>
        <img className='profile' src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default Navbar
