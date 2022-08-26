import oceanBG from './assets/ocean-bg.png';
import light1 from './assets/light1.png';
import light2 from './assets/light2.png';
import light3 from './assets/light3.png';
import './Background.scss';

import React from 'react';

const Background = () => {
  return (
    <span>
      <img className='background' src={oceanBG} />
      <img className='background light1' src={light1} />
      <img className='background light2' src={light2} />
      <img className='background light3' src={light3} />
    </span>
  )
}

export default Background;