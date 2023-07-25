import './Navbar.scss'
import infoIcon from '../assets/info-icon.png'

import { memo } from 'react'

const Navbar = memo((props) => {
  return <div className='navbar'>
    <div className='row-between'>
      <div className='row-between'>
        <h1 className='nav-title'>Spotifish</h1>
        <span>
          <div className='tooltip'>
            <img src={infoIcon} className='info-icon' />
            <span className='tooltiptext'>
              <p>Welcome to your Spotify aquarium! The size of each fish correlates to how much you listen to that artist.</p><br />
              <p>Click on a fish to view additional info about the artist. Click on the purple clam to view your top artists and songs, including charts visualizing your data.</p>
            </span>
          </div>
        </span>
      </div>
      <div className='row-between'>
        {props.user && props.user["images"].length > 0 &&
          <img src={props.user["images"][0]["url"]} className='profile-pic'
          />}
        <p className='display-name'>{props.user && props.user["display_name"]}</p>
        <a className='log-out-btn' href='/login'>Log Out</a>
      </div>
    </div>
  </div>
})

export default Navbar