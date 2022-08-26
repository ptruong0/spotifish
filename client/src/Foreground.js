import kelp from './assets/kelp.png';
import seashell from './assets/seashell.png';
import coral from './assets/coral.png';
import clam from './assets/clam.png';
import './Foreground.scss';

import React from 'react';

const Foreground = () => {
  return (
    <div>
      <img className='kelp' src={kelp} />
      <img className='seashell' src={seashell} />
      <img className='coral' src={coral} />
      <img className='clam' src={clam} />
    </div>
  )
}

export default Foreground;