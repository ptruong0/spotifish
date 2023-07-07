// import React, { useEffect, useState } from 'react';
// import { getTopTracks, getTopArtists, refreshToken } from './apiCalls';
// import Foreground from './Foreground';
// import Background from './Background';
// import Navbar from './Navbar';
// import Info from './Info';

// import './index.css';
// import './Home.scss';
// import Fish from './Fish';


// const Home = (props) => {
//   const [topArtists, setTopArtists] = useState(null);
//   const [topTracks, setTopTracks] = useState(null);
//   // const [showInfo, setShowInfo] = useState(false);
//   // const [info, setInfo] = useState(null);


//   const getTopAll = () => {
//     getTopArtists(props.token, setTopArtists);
//     console.log('hello')
//     getTopTracks(props.token, setTopTracks);
//   }
  
//   let artists = React.useMemo(getTopAll, [])

//   // useEffect(getTopAll, [])

//   // const toggleInfo = (rank, artistInfo) => {
//   //   artistInfo['rank'] = rank;
//   //   if (info && info.rank == rank) {
//   //     setShowInfo(false);
//   //   } else {
//   //     setShowInfo(true);
//   //   }
    
//   //   setInfo(artistInfo);
//   // }

//   return (
//     <div className='home-page'>
//       <Background />
//       <Foreground />
      

//       <div className='main-container'>
//         <Navbar />
//         {/* <button onClick={() => refreshToken(props.refreshToken, props.setT, props.setRT)}>Refresh</button> */}
//         <div className='fish-container'>

//           {/* React.memo ?? to avoid rerender */}
//         {
//           topArtists &&
//           (topArtists.map((artist, index) => {
//             // return <Fish artist={artist} rank={index} numFish={topArtists.length} clickHandler={toggleInfo}/>;
//             return <Fish artist={artist} rank={index} numFish={topArtists.length}  topTracks={topTracks}/>;

//           }))
//         }</div>

//         {/* <Info info={info} show={showInfo} tracks={topTracks} {...props}/> */}
        
//       </div>
//     </div>
//   );
// }

// export default Home;



import React, { useEffect, useState, useRef } from 'react';
import { getTopTracks, getTopArtists, refreshToken } from './apiCalls';
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


  const getTopAll = () => {
    getTopArtists(props.token, setTopArtists);
    console.log('hello')
    getTopTracks(props.token, setTopTracks);
  }
  
  // let artists = React.useMemo(getTopAll, [])

  useEffect(getTopAll, [])

  const toggleInfo = (rank, artistInfo) => {
    artistInfo['rank'] = rank;
    if (info && info.rank == rank) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
    
    console.log(artistInfo)
    setInfo(artistInfo);
  }

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
        <Navbar />
        {/* <button onClick={() => refreshToken(props.refreshToken, props.setT, props.setRT)}>Refresh</button> */}
        
        {fishes}

        <Info info={info} show={showInfo} tracks={topTracks} {...props}/>
        
      </div>
    </div>
  );
}

export default Home;