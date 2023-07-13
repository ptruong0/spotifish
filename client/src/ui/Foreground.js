import kelp from '../assets/kelp.png';
import seashell from '../assets/seashell.png';
import coral from '../assets/coral.png';
import clam from '../assets/clam.png';
import './Foreground.scss';

import React from 'react';

const Foreground = (props) => {
  const wiggle = (element) => {
    element = '.' + element
    document.querySelector(element).className += ' wiggle';
    setTimeout(() => {
      document.querySelector(element).className = document.querySelector(element).className.replace('wiggle', '');
    }, 1500)
  }

  const clickClam = () => {
    if (props.toggleSidebar) {
      props.toggleSidebar();
      console.log('hhh')
    }
  }

  return (
    <div>
      <img className='kelp' src={kelp} />

      <div className='seashell-container' onMouseOver={() => wiggle('seashell-container')}>
        <img className='seashell' src={seashell} />
        {
          props.allowMenus && 
          <h2 className='seashell-text'>Settings</h2>
        }
      </div>

      <img className='coral' src={coral} />

      <div className='clam-container' onMouseOver={() => wiggle('clam-container')} onClick={clickClam}>
        <img className='clam' src={clam} />
        {
          props.allowMenus && 
          <h2 className='clam-text'>Top Artists</h2>
        }
      </div>
    </div>
  )
}

export default Foreground;