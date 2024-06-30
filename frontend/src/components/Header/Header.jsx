import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>The Place Where Taste Meets Perfection!</h2>
        <p>Welcome to <span id='name'> Aahar</span>, the best dining and ordering experience in the city! Indulge in our delicious dishes crafted with passion and fresh ingredients. Enjoy exceptional delivery and catering service. Taste the excellence!</p>
        <a href='#explore-menu'>View Menu</a>
      </div>
    </div>
  )
}

export default Header
