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
import Settings from '../components/Settings';
import { DEFAULT_OPTIONS } from '../constants/settings';
import { getThemeTextColor } from '../constants/colorThemes';



const Home = (props) => {
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  const [showInfo, setShowInfo] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [info, setInfo] = useState(null);
  const [user, setUser] = useState(null);

  const [numFish, setNumFish] = useState(DEFAULT_OPTIONS.numFish);
  const [timeRange, setTimeRange] = useState(DEFAULT_OPTIONS.timeRange);
  const [theme, setTheme] = useState(DEFAULT_OPTIONS.theme);


  const getTopAll = () => {
    getTopArtists(props.token, numFish, timeRange, setTopArtists);
    getTopTracks(props.token, timeRange, setTopTracks);
    getUser(props.token, setUser);
  }

  useEffect(getTopAll, [numFish, timeRange])

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

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  // useEffect(() => { console.log(theme) }, [theme])

  const fishes = React.useMemo(() => {
    console.log(getThemeTextColor(theme))
    return (<div className='fish-container'>
      {
        topArtists &&
        (topArtists.map((artist, index) => {
          return <Fish artist={artist} rank={index} numFish={numFish} theme={theme} clickHandler={toggleInfo}/>;
        }))
      }</div>)
  }, [topArtists, theme])

  return (
    <div className='home-page'>

          <span>
            {/* ocean assets (water + bubbles) */}
            <Background />
            {/* ocean floor assets (shells, sand, etc) */}
            <Foreground allowMenus={true} toggleSidebar={toggleSidebar} toggleSettings={toggleSettings}/>

            <div className='main-container'>
              <Navbar user={user} />
              {/* <button onClick={() => refreshToken(props.refreshToken, props.setT, props.setRT)}>Refresh</button> */}

              {fishes}

              <Info info={info} show={showInfo} tracks={topTracks} closeInfo={closeInfo} {...props} />

            </div>

            {
              showSettings && 
              <Settings toggleSettings={toggleSettings} 
              numFish={numFish} setNumFish={setNumFish}
              timeRange={timeRange} setTimeRange={setTimeRange}
              theme={theme} setTheme={setTheme}
               />
            }

            {
              showSidebar && 
              <Sidebar toggleSidebar={toggleSidebar} topArtists={topArtists} toggleInfo={toggleInfo}/>
            }
            
          </span>
    </div>
  );
}

export default Home;