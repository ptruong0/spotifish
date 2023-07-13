import React, { useEffect, useState } from 'react';
import { getTopTracks, getTopArtists, getUser } from '../utils/apiCalls';
import Foreground from '../ui/Foreground';
import Background from '../ui/Background';
import Navbar from '../ui/Navbar';
import Info from '../components/Info';

import '../index.css';
import './Home.scss';
import Fish from '../components/Fish';
import Sidebar from '../components/Sidebar';


const Home = (props) => {
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [info, setInfo] = useState(null);
  const [user, setUser] = useState(null);


  const getTopAll = () => {
    getTopArtists(props.token, setTopArtists);
    getTopTracks(props.token, setTopTracks);
    getUser(props.token, setUser);
  }

  useEffect(getTopAll, [])

  useEffect(() => console.log(topArtists), [topArtists])

  const toggleInfo = (rank, artistInfo) => {
    artistInfo['rank'] = rank;

    setInfo(artistInfo);

    setShowInfo(true);

  }

  const closeInfo = () => {
    setShowInfo(false);
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  useEffect(() => { console.log(showSidebar) }, [showSidebar])

  const fishes = React.useMemo(() => {
    // getTopAll();
    return (<div className='fish-container'>
      {
        topArtists &&
        (topArtists.map((artist, index) => {
          return <Fish artist={artist} rank={index} numFish={topArtists.length} clickHandler={toggleInfo} />;
        }))
      }</div>)
  }, [topArtists])

  return (
    <div className='home-page'>

          <span>
            {/* ocean assets (water + bubbles) */}
            <Background />
            {/* ocean floor assets (shells, sand, etc) */}
            <Foreground allowMenus={true} toggleSidebar={toggleSidebar}/>

            <div className='main-container'>
              <Navbar user={user} />
              {/* <button onClick={() => refreshToken(props.refreshToken, props.setT, props.setRT)}>Refresh</button> */}

              {fishes}

              <Info info={info} show={showInfo} tracks={topTracks} closeInfo={closeInfo} {...props} />

            </div>

            {
              showSidebar && 
              <Sidebar toggleSidebar={toggleSidebar} topArtists={topArtists}/>
            }
            
          </span>
    </div>
  );
}

export default Home;