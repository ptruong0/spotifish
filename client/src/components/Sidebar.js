import './Sidebar.scss'
import closeIcon from '../assets/close-icon.png'
import styled from 'styled-components';

import { useState } from 'react';


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
  const [activeTabb, setActiveTab] = useState(tabLabels[0]);

  return (
    <div className='sidebar'>
      {/* close button */}
      <img src={closeIcon} className='close-sidebar-btn' onClick={props.toggleSidebar} />

      {/* title */}
      {/* <h2 className='sidebar-title'>Your Rankings</h2> */}



      <div className='tab-group'>
        {tabLabels.map(type => (
          <Tab
            key={type}
            className='sidebar-tab'
            activeTab={activeTabb === type}
            onClick={() => setActiveTab(type)}
          >
            {type}
          </Tab>
        ))}
      </div>

      {
        activeTabb === 'Top Artists' ?
          <div className='top-artist-list'>
            {/* list of artist names and ranks */}
            {
              props.topArtists &&
              (props.topArtists.map((artist, index) => {
                return <p className='sidebar-row-text'>{index + 1}.{" "}
                  <a onClick={() => props.toggleInfo(index, artist)} className='hover-underline'>
                    {artist.name}
                  </a>
                </p>
              }))
            }
            <br />
          </div>
          :
          // <div className='top-artist-list'>

          // {
          //   props.topTracks &&
          //   (props.topTracks.map((track, index) => {
          //     return <p className='sidebar-row-text'>{index + 1}.{" "}
          //     {track.name}
          //       {/* <a onClick={() => props.toggleInfo(index, artist)} className='hover-underline'>
          //         {artist.name}
          //       </a> */}
          //     </p>
          //   }))
          // }
          // </div>
          null
      }

    </div>
  );
}

export default Sidebar;
