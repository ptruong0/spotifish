import './Navbar.scss';

import React from 'react';

const Navbar = (props) => {
  return (
    <div className='navbar'>
      <div className='row-between'>
        <h1 className='nav-title'>Spotifish</h1>
        <div className='row-between'>
          {props.user && props.user["images"].length > 0 && 
          <img src={props.user["images"][0]["url"]} className='profile-pic'
          />}
          <p>{props.user && props.user["display_name"]}</p>
          <a className='log-out-btn'>Log Out</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar;