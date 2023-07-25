import './Sidebar.scss'
import closeIcon from '../assets/close-icon.png'
import Charts from './Charts'
import { truncate, getArtistInfoFromId } from '../utils/functions'
import { Tab, TAB_LABELS } from '../constants/tabs'

import { useState } from 'react'


const Sidebar = (props) => {
  const [activeTab, setActiveTab] = useState(TAB_LABELS[0])

  const clickTrack = (track) => {
    const [rank, artistInfo] = getArtistInfoFromId(props.topArtists, track.artists[0].id)
    props.openInfo(rank, artistInfo)
  }

  return (
    <div className='sidebar'>
      {/* close button */}
      <img src={closeIcon} className='close-sidebar-btn' onClick={() => props.toggle('sidebar')} />

      {/* title */}

      <div className='tab-group'>
        {TAB_LABELS.map(type => (
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
          <span>  
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
            <Charts tab='artists' {...props} />

            </span>
            :
            <span>
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
            <Charts tab='tracks' {...props} />
            </span>     
        }
      </div>
    </div>
  );
}

export default Sidebar;
