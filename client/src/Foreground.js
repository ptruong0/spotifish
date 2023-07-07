import kelp from './assets/kelp.png';
import seashell from './assets/seashell.png';
import coral from './assets/coral.png';
import clam from './assets/clam.png';
import './Foreground.scss';

import React from 'react';

const Foreground = () => {
  const wiggle = (element) => {
    element = '.' + element
    document.querySelector(element).className += ' wiggle';
    setTimeout(() => {
      document.querySelector(element).className = document.querySelector(element).className.replace('wiggle', '');
    }, 1500)
  }

  return (
    <div>
      <img className='kelp' src={kelp} />
      <img className='seashell' src={seashell} onMouseOver={() => wiggle('seashell')} onClick={()=> wiggle('seashell')}/>
      <img className='coral' src={coral} />
      <img className='clam' src={clam} onMouseOver={() => wiggle('clam')} onClick={()=> wiggle('clam')}/>
    </div>
  )
}

export default Foreground;