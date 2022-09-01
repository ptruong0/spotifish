import React, { useEffect, useState } from 'react';
import { getTopTracks, getTopArtists, refreshToken } from './apiCalls';
import Foreground from './Foreground';
import Background from './Background';
import Navbar from './Navbar';

import './index.css';
import './Home.scss';
import Fish from './Fish';


const Home = (props) => {
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);


  const getTopAll = () => {
    getTopArtists(props.token, setTopArtists);
    getTopTracks(props.token, setTopTracks);
  }

  useEffect(getTopAll, [])

  return (
    <div className='home-page'>
      <Background />
      <Foreground />
      

      <div className='main-container'>
        <Navbar />
        {/* <button onClick={() => refreshToken(props.refreshToken, props.setT, props.setRT)}>Refresh</button> */}
        <div className='fish-container'>
        {
          topArtists &&
          (topArtists.map((artist, index) => {
            return <Fish artist={artist} rank={index} numFish={topArtists.length}/>;
          }))
        }</div>
      </div>
    </div>
  );
}

export default Home;