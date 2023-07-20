import React, { useEffect, useState, useRef } from 'react';
import { getTopTracks, getTopArtists, getUser, getArtist, getAllArtistMetadata } from '../utils/apiCalls';
import { toggleMenu } from '../utils/functions';
import Foreground from '../ui/Foreground';
import Background from '../ui/Background';
import Navbar from '../ui/Navbar';
import Info from '../components/Info';

import '../index.css';
import './Home.scss';
import Fish from '../components/Fish';
import Sidebar from '../components/Sidebar';
import Settings from '../components/Settings';
import { DEFAULT_OPTIONS, DEFAULT_SHOW, MOBILE_WIDTH, RESOLUTIONS, TABLET_WIDTH } from '../constants/settings';



const Home = (props) => {
  // main data
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [artistMetadata, setArtistMetadata] = useState(null); // from musicbrainz

  // toggles for menus
  const [show, setShow] = useState(DEFAULT_SHOW)

  // info component
  const [info, setInfo] = useState(null);

  // user name and pic
  const [user, setUser] = useState(null);

  // settings
  const [numFish, setNumFish] = useState(DEFAULT_OPTIONS.numFish);
  const [timeRange, setTimeRange] = useState(DEFAULT_OPTIONS.timeRange);
  const [theme, setTheme] = useState(DEFAULT_OPTIONS.theme);

  // window size classification (mobile, tablet, desktop)
  const [resolution, setResolution] = useState(window.innerWidth < MOBILE_WIDTH ? RESOLUTIONS.mobile : (window.innerWidth < TABLET_WIDTH ? RESOLUTIONS.tablet : RESOLUTIONS.desktop));


  /**
   * 
   */
  const fetchTopArtists = () => {
    getTopArtists(props.token, numFish, timeRange)
      .then(res => {
        setTopArtists(res)
      });
  }

  const fetchTopTracks = () => {
    getTopTracks(props.token, timeRange)
      .then(res => setTopTracks(res));
  }

  const fetchUser = () => {
    getUser(props.token)
      .then(res => setUser(res));
  }

  const openInfo = (rank, artistInfo) => {
    artistInfo['rank'] = rank;

    if (artistInfo['name'] == null) {
      getArtist(props.token, artistInfo['id'], setInfo)
    } else {
      setInfo(artistInfo);
    }

    if (!show.info) {
      toggle('info');
    }
  }

  const toggle = (component) => {
    toggleMenu(component, show[component], resolution, setShow)
  }

  /**
   * Update device classification when window changes size
   */
  const handleWindowSizeChange = () => {
    if (window.innerWidth < MOBILE_WIDTH) {
      if (resolution !== RESOLUTIONS.mobile) {
        setResolution(RESOLUTIONS.mobile);
      }
    } else if (window.innerWidth < TABLET_WIDTH) {
      if (resolution !== RESOLUTIONS.tablet) {
        setResolution(RESOLUTIONS.tablet);
      }
    } else {
      if (resolution !== RESOLUTIONS.desktop) {
        setResolution(RESOLUTIONS.desktop);
      }
    }
  }

  const fetchMetadata = async () => {
    await getAllArtistMetadata(topArtists)
      .then(res => {
        console.log(res);
        setArtistMetadata({
          'artists': res,
          'time_range': timeRange
        });
      });
  }

  /**
   * On initial page load, retrieve user data and their top items
   */
  useEffect(() => {
    fetchTopArtists();
    fetchTopTracks();
    fetchUser();

    // set listener for window size changes
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  /**
   * If settings change, re-fetch top artists/tracks
   */
  useEffect(() => {
    if (topArtists) {
      fetchTopArtists();
    }
  }, [numFish]);
  useEffect(() => {
    if (topArtists) {
      fetchTopArtists();
      fetchTopTracks();
    }
  }, [timeRange])

  /**
   * When resolution shrinks to mobile, hide all opened components
   */
  useEffect(() => {
    if (resolution === RESOLUTIONS.mobile) {
      setShow({
        info: false,
        sidebar: false,
        settings: false
      });
    }
  }, [resolution])

  /**
   * When artist data changes, fetch metadata or read it from the cache
   */
  useEffect(() => {
    if (topArtists) {
      const cachedMetadata = JSON.parse(localStorage.getItem('metadata'));
      console.log(cachedMetadata ? cachedMetadata.artists.length : null);
      console.log(numFish)
      if (!cachedMetadata || cachedMetadata.time_range != timeRange || cachedMetadata.artists.length != numFish) {
        fetchMetadata();
      } else {
        console.log('using cache for metadata');
        setArtistMetadata(cachedMetadata);
      }
    }
  }, [topArtists]);


  useEffect(() => { 
    if (artistMetadata) {
      const metadataStr = JSON.stringify(artistMetadata);
      if (metadataStr.length != localStorage.getItem('metadata').length) {
        localStorage.setItem('metadata', metadataStr);
        console.log('setting new cache')
      }
      
    } else {
      const cachedMetadata = JSON.parse(localStorage.getItem('metadata'));
      setArtistMetadata(cachedMetadata);
    }
    
  }, [artistMetadata])

  const fishes = React.useMemo(() => {
    return (<div className='fish-container'>
      {
        topArtists &&
        (topArtists.map((artist, index) => {
          return <Fish
            artist={artist}
            rank={index}
            numFish={numFish}
            theme={theme}
            clickHandler={openInfo}
            key={index}
          />;
        }))
      }</div>)
  }, [topArtists, theme])

  return (
    <div className='home-page'>

      <span>
        {/* ocean assets (water + bubbles) */}
        <Background />
        {/* ocean floor assets (shells, sand, etc) */}
        <Foreground allowMenus={true} toggle={toggle} />

        <div className='main-container'>
          <Navbar user={user} />

          {fishes}

          <Info
            info={info}
            show={show.info}
            setInfo={setInfo}
            tracks={topTracks}
            toggle={toggle}
            {...props}
          />

        </div>

        {
          show.settings &&
          <Settings
            toggle={toggle}
            numFish={numFish} setNumFish={setNumFish}
            timeRange={timeRange} setTimeRange={setTimeRange}
            theme={theme} setTheme={setTheme}
          />
        }

        {
          show.sidebar &&
          <Sidebar
            toggle={toggle}
            topArtists={topArtists}
            topTracks={topTracks}
            openInfo={openInfo}
          />
        }

      </span>
    </div>
  );
}

export default Home;