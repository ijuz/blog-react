import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../Assets/logo.jpg';
import './header.css';

function Header() {
  const { userdata, ubdateData } = useContext(UserContext);

  const logOut = () => {
    ubdateData({
      type: 'logout'
    });
  };

  return (
    <div className='header-container'>
      <div className='left'>
        <div className='logo-box'>
          <img src={logo} alt='logo' />
        </div>
      </div>
      <div className='right'>
        <div className='saved-post'>
          <Link to='/myprofile'>
            <button className='btn'>My Profile</button>
          </Link>
        </div>
        <div className='create'>
          <Link to='/create-blog'>
            <button className='btn'>Create Post</button>
          </Link>
        </div>
        <div className='login-btn'>
          {userdata ? (
            <button className='btn' onClick={logOut}>LogOut</button>
          ) : (
            <Link to='/login'>
              <button className='btn'>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
