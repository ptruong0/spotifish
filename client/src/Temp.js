import { getTopTracks, getTopArtists, refreshToken } from './apiCalls';
import React, { useEffect, useMemo, useState } from 'react';
import Fish from './Fish'

const Temp = (props) => {
  const [topArtists, setTopArtists] = useState(null);
  // const [topTracks, setTopTracks] = useState(null);


  const getTopAll = () => {
    getTopArtists(props.token, setTopArtists);
    console.log('hello')
    getTopTracks(props.token, props.setTopTracks);
  }

  useEffect(getTopAll, [])

  return (
    <div className='fish-container'>
        {
          topArtists &&
          (topArtists.map((artist, index) => {
            return <Fish artist={artist} rank={index} numFish={topArtists.length} clickHandler={props.toggleInfo}/>;
          }))
        }</div>
  );
}

export default Temp;