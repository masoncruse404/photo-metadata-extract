import React, {useEffect, useState} from 'react'
import { FaCloudDownloadAlt } from 'react-icons/fa';

import { NavLink as Link, NavLink, useLocation } from "react-router-dom";
//STYLES
import "../../styles/navbar/navbar.css";
import "./navbar.css"

//API
import signOut from '../../api/HandleSignOut/HandleSignOut';

function Navbar({ toggleLoginModal, toggleRegisterModal, activeProfileId}) {
  const location = useLocation();
  const [isProfilePage, setIsProfilePage] = useState(false)

  function handleRegisterClick(e){
    e.preventDefault()
    toggleRegisterModal()
  }

  function handleLoginClick(e){
    e.preventDefault()
    toggleLoginModal()
  }

  function handleSignOutClick(e){
    e.preventDefault()
    signOut()
  }

  useEffect(() => {
    setIsProfilePage(location.pathname === '/profile' ? true : false)
  })
  return (
    <div className='navbar-con'>   
        <div className=' mx-3'>
            <div className='navbar d-flex flex-row'>
            <div className=' d-flex justify-content-between'>
                <div className='navbar-logo-con d-flex flex-row'>
                    <div>
                        <FaCloudDownloadAlt size={48}/>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <span className='p-3'>photoExtract</span>
                    </div>
                </div>
              
                    <div className='navbar-link-con flex-row justify-content-center align-items-center'>
                        <div  className='nav-link p-3'><span>Tools</span></div>
                        <div  className='nav-link p-3'><span>API</span></div>
                        <div  className='nav-link p-3'><span>Pricing</span></div>
                    </div>
                </div>
                    <div className='navbar-link2-con d-flex flex-row justify-content-center align-items-center'>
                        <div className={activeProfileId ? 'd-none' : 'd-flex'}>
                        <div onClick={e => handleRegisterClick(e)} className='nav-link p-3'><span>Sign Up</span></div>
                        <div  onClick={e => handleLoginClick(e)}  className='nav-link p-3'><span>Login</span></div>
                        </div>
                        <div className={activeProfileId ? 'navbar-link2-con d-flex flex-row justify-content-center align-items-center' : 'd-none'}>
                            <NavLink to="/" className={isProfilePage ?  'nav-link p-3' : 'd-none'}>Home</NavLink>
                            <NavLink to="/profile" className={isProfilePage ?  'd-none' : 'nav-link p-3' }>Profile</NavLink>
                            <div onClick={e => handleSignOutClick(e)} className='nav-link p-3'>Logout</div>
                        </div>
                    </div>
                
            </div>
        </div>
    </div>

  )
}

export default Navbar;