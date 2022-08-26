import React from 'react';

const Fish = (props) => {
  return (
    <div className='fish'>
      {/* render fish image */}
      <p className='fish-text'>{props.artist.name}</p>
    </div>
  )
}

export default Fish;