import './Navbar.scss';

import  { useMemo } from 'react';

const Navbar = (props) => {
  return (
    useMemo(() => {
      return <div className='navbar'>
        <div className='row-between'>
          <h1 className='nav-title'>Spotifish</h1>
          <div className='row-between'>
            {props.user && props.user["images"].length > 0 &&
              <img src={props.user["images"][0]["url"]} className='profile-pic'
              />}
            <p className='display-name'>{props.user && props.user["display_name"]}</p>
            <a className='log-out-btn' href='/login'>Log Out</a>
          </div>
        </div>
      </div>
    }, [props.user])

  )
}

export default Navbar;