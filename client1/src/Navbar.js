import './Navbar.scss';

import React from 'react';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='row-between'>
        <h1 className='nav-title'>Spotifish</h1>
        <a className='log-out-btn'>Log Out</a>
      </div>
    </div>
  )
}

export default Navbar;