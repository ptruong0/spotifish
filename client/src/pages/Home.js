import React, { useEffect, useState, useMemo } from 'react';
import { getTopTracks, getTopArtists, getUser, getArtist, getArtistChartData } from '../utils/apiCalls';
import { toggleMenu, determineResolution } from '../utils/responsiveness';
import { extendChartStats } from '../utils/charts';
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
  const [chartData, setChartData] = useState(null); // from musicbrainz

  // toggles for menus
  const [show, setShow] = useState(DEFAULT_SHOW)

  // info component
  const [info, setInfo] = useState(null);

  // user name and pic
  const [user, setUser] = useState(null);

  // settings
  const [numFish, setNumFish] = useState(localStorage.getItem('numFish') || DEFAULT_OPTIONS.numFish);
  const [timeRange, setTimeRange] = useState(localStorage.getItem('timeRange') || DEFAULT_OPTIONS.timeRange);
  const [theme, setTheme] = useState(DEFAULT_OPTIONS.theme);

  // window size classification (mobile, tablet, desktop)
  const [resolution, setResolution] = useState(window.innerWidth < MOBILE_WIDTH ? RESOLUTIONS.mobile : (window.innerWidth < TABLET_WIDTH ? RESOLUTIONS.tablet : RESOLUTIONS.desktop));


  /**
   * Get top artists from server or cache
   */
  const fetchTopArtists = async () => {
    const cachedArtists = JSON.parse(localStorage.getItem('topArtists'));

    if (!cachedArtists || cachedArtists.length != numFish || timeRange != localStorage.getItem('timeRange')) {
      const res = await getTopArtists(props.token, numFish, timeRange);
      setTopArtists(res);
      localStorage.setItem('topArtists', JSON.stringify(res));
      console.log('setting cache for artists')
    } else {
      console.log('using cache for artists');
      setTopArtists(cachedArtists);
    }

    return Promise.resolve();
  }

  /**
   * Get top tracks from server or cache
   */
  const fetchTopTracks = async () => {
    const cachedTracks = JSON.parse(localStorage.getItem('topTracks'));

    if (!cachedTracks || timeRange != localStorage.getItem('timeRange')) {
      const res = await getTopTracks(props.token, timeRange);
      setTopTracks(res);
      localStorage.setItem('topTracks', JSON.stringify(res));
      console.log('setting cache for tracks');
    } else {
      console.log('using cache for top tracks');
      setTopTracks(cachedTracks);
    }

    return Promise.resolve();
  }

  /**
   * Get artist chart data from server or cache
   */
  const fetchArtistCharts = () => {
    const cachedArtistCharts = JSON.parse(localStorage.getItem('artistCharts'));

    if (!cachedArtistCharts || timeRange != localStorage.getItem('timeRange') || cachedArtistCharts.Popularity?.categories?.length != numFish ) {
      getArtistChartData(topArtists)
        .then(res => {
          // include spotify metadata
          extendChartStats(topArtists, res);
          console.log(res);

          setChartData(res);
          localStorage.setItem('artistCharts', JSON.stringify(res));
          console.log('setting cache for  artist charts');
        });

      localStorage.setItem('timeRange', timeRange);
    } else {
      console.log('using cache for artist charts');
      setChartData(cachedArtistCharts);
    }
  }

/**
 * Get info (name and profile pic) about the currently logged in user
 */
  const fetchUser = () => {
    getUser(props.token)
      .then(res => setUser(res));
  }

  /**
   * When a fish is clicked, open info component about that user
   * @param {number} rank Index on top artists list
   * @param {object} artistInfo Object from top artists array
   */
  const openInfo = (rank, artistInfo) => {
    // add rank to info object
    artistInfo['rank'] = rank;

    // fetch singular artist if it is not part of the top artists list
    if (artistInfo['name'] == null) {
      getArtist(props.token, artistInfo['id'], setInfo)
    } else {
      setInfo(artistInfo);
    }

    // display component
    if (!show.info) {
      toggle('info');
    }
  }

  /**
   * Show/hide the select component 
   * @param {string} component info, settings, or sidebar
   */
  const toggle = (component) => {
    toggleMenu(component, show[component], resolution, setShow)
  }

  /**
   * Update device classification when window changes size
   */
  const handleWindowSizeChange = () => {
    determineResolution(resolution, setResolution);
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

      // cache new number of fish
      localStorage.setItem('numFish', numFish);
    }
  }, [numFish]);

  useEffect(() => {
    (async () => {
      if (topArtists) {
        await Promise.all([fetchTopArtists(), fetchTopTracks()])
  
        // wait for fetches to finish before caching new time range
        localStorage.setItem('timeRange', timeRange);
      }
    })()
  }, [timeRange])

  /**
   * When artist data changes, fetch chart data or read it from the cache
   */
  useEffect(() => {
    if (topArtists) {
      fetchArtistCharts();
    }
  }, [topArtists]);


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
  }, [resolution]);


  /**
   * Generate array of fish from top artists list
   * Memoize so that they are not re-calculated on every refresh
   */
  const fishes = useMemo(() => {
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
            openInfo={openInfo}
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

            chartData={chartData}
          />
        }
      </span>
    </div>
  );
}

export default Home;