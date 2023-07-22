import './Sidebar.scss'
import closeIcon from '../assets/close-icon.png';
import Charts from './Charts';
import { truncate } from '../utils/functions';

import styled from 'styled-components';
import { useEffect, useState } from 'react';


const Tab = styled.button`
  opacity: 0.6;
  border: 0;
  ${({ activeTab }) =>
    activeTab &&
    `
    border-bottom: 2px solid white;
    opacity: 1;
  `}
`;

const tabLabels = ['Top Artists', 'Top Songs']


const Sidebar = (props) => {
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const getArtistInfoFromId = (artistId) => {
    if (props.topArtists) {
      console.log(props.topArtists)
      for (let i = 0; i < props.topArtists.length; i++) {
        if (props.topArtists[i].id === artistId) {
          return [i, props.topArtists[i]];
        }
      }
    }
    return [null, { id: artistId }];
  }

  const clickTrack = (track) => {
    const [rank, artistInfo] = getArtistInfoFromId(track.artists[0].id);
    props.openInfo(rank, artistInfo);
  }



  return (
    <div className='sidebar'>
      {/* close button */}
      <img src={closeIcon} className='close-sidebar-btn' onClick={() => props.toggle('sidebar')} />

      {/* title */}

      <div className='tab-group'>
        {tabLabels.map(type => (
          <Tab
            key={type}
            className='sidebar-tab'
            activeTab={activeTab === type}
            onClick={() => setActiveTab(type)}
          >
            {type}
          </Tab>
        ))}
      </div>

      <div className='tab-body'>
        {
          activeTab === 'Top Artists' ?
            <div className='top-artist-list'>
              {/* list of artist names and ranks */}
              {
                props.topArtists &&
                (props.topArtists.map((artist, index) => {
                  return <p className='sidebar-row-text' key={index}>
                    {/* artist rank */}
                    {index + 1}.{" "}
                    {/* artist name */}
                    <a onClick={() => props.openInfo(index, artist)} className='hover-underline'>
                      {artist.name}
                    </a>
                  </p>
                }))
              }
              <br />
            </div>
            :
            <div className='top-artist-list'>

              {
                props.topTracks &&
                (props.topTracks.map((track, index) => {
                  return <p className='sidebar-row-text' key={index}>
                    {/* track rank */}
                    {index + 1}.{index + 1 < 10 ? " " : ""}&nbsp;
                    {/* track name */}
                    <a onClick={() => clickTrack(track)} className='hover-underline'>
                      {truncate(track.name, 30)}
                    </a>
                  </p>
                }))
              }
            </div>
        }

        <Charts {...props} />
      </div>
    </div>
  );
}

export default Sidebar;
