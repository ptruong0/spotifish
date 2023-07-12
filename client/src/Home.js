import React, { useEffect, useState } from 'react';
import { getTopTracks, getTopArtists, getUser } from './apiCalls';
import Foreground from './Foreground';
import Background from './Background';
import Navbar from './Navbar';
import Info from './Info';

import './index.css';
import './Home.scss';
import Fish from './Fish';


const Home = (props) => {
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState(null);
  const [user, setUser] = useState(null);


  const getTopAll = () => {
    getTopArtists(props.token, setTopArtists);
    getTopTracks(props.token, setTopTracks);
    getUser(props.token, setUser);
  }
  
  useEffect(getTopAll, [])

  const toggleInfo = (rank, artistInfo) => {
    artistInfo['rank'] = rank;

    setInfo(artistInfo);

    setShowInfo(true);

  }

  const closeInfo = () => {
    setShowInfo(false);
  }

  useEffect(() => {console.log(info)}, [info])

  const fishes = React.useMemo(() => {
    // getTopAll();
    return (<div className='fish-container'>
      {
        topArtists &&
        (topArtists.map((artist, index) => {
          return <Fish artist={artist} rank={index} numFish={topArtists.length} clickHandler={toggleInfo}/>;
        }))
      }</div>)
  },[topArtists])

  return (
    <div className='home-page'>
      <Background />
      <Foreground />
      

      <div className='main-container'>
        <Navbar user={user}/>
        {/* <button onClick={() => refreshToken(props.refreshToken, props.setT, props.setRT)}>Refresh</button> */}
        
        {fishes}

        <Info info={info} show={showInfo} tracks={topTracks} closeInfo={closeInfo} {...props}/>
        
      </div>
    </div>
  );
}

export default Home;