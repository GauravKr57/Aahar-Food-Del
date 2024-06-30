import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {

    const year = new Date().getFullYear();

  return (
    <div className='footer' id='footer'>
        <div className="footer-content">

            <div className="footer-content-left">
                <img src={assets.aahar} alt="" />
                <p>Stay connected with us on Facebook, Instagram and Twitter. Explore our FAQ, Privacy Policy, and Terms of Service for more information.Download our app from the App Store or Google Play.</p>
                <div className="footer-social-icons">
                    <a href="https://www.facebook.com/profile.php?id=100023833052204" target='_blank'><img src={assets.facebook_icon} alt="" /></a>
                    <img src={assets.twitter_icon} alt="" />
                    <a href="https://www.linkedin.com/in/gaurav-kg/" target='_blank'><img src={assets.linkedin_icon} alt="" /></a>
                    <p>(Currently of Developer)</p>
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>Contact Us</h2>
                <ul>
                    <li>+91 6299703883</li>
                    <li>aaharofranchi@gmail.com</li>
                    <div className='location'><img src={assets.location} alt="" />
                        <p>Hotel Aahar, Purulia Road, Tatisilwai, Ranchi, Jharkhand (Pin:835103)</p>
                    </div>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            &copy; {year} Aahar.com : All rights reserved
        </p>
    </div>
  )
}

export default Footer
