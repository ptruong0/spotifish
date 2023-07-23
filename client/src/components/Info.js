
import './Info.scss';
import { getArtistTopTracks, getSimilarArtists } from '../utils/apiCalls';
import { arrayToString, findMyTopTrackForArtist, getArtistInfoFromId, truncate } from '../utils/functions';
import upArrow from '../assets/up-arrow.png';
import downArrow from '../assets/down-arrow.png';
import closeIcon from '../assets/close-icon.png';
import newTabIcon from '../assets/new-tab-icon.png';

import React, { useState, useEffect } from 'react';

const Info = (props) => {
  /**
   * state
   */

  // info component expanded or not
  const [expanded, setExpanded] = useState(false);
  // artist's top songs
  const [mostPopularSongs, setMostPopularSongs] = useState(null);
  const [similarArtists, setSimilarArtists] = useState(null);

  /**
   * toggle state
   */

  const expandMenu = () => {
    setExpanded(!expanded);
  }

  const closeMenu = () => {
    setExpanded(false);
    props.toggle('info')
  }


  /**
   * fetch from server
   */

  // fetch artist's top songs
  const findArtistTopTracks = () => {
    if (props.info) {
      getArtistTopTracks(props.token, props.info.id, setMostPopularSongs);
      getSimilarArtists(props.token, props.info.id, setSimilarArtists);
    }
  }

  const clickSimilarArtist = (artist) => {
    const [rank, artistInfo] = getArtistInfoFromId(props.topArtists, artist.id);

    props.openInfo(rank, artistInfo)
  }

  // on load, get an artist's top tracks
  useEffect(findArtistTopTracks, [props.show, props.info])

  const topSong = props.info && findMyTopTrackForArtist(props.info.id, props.tracks)

  const truncateLen = window.innerWidth < 768 ? 25 : 30


  return (
    <div className={props.show ? 'info-all' : 'hidden'}>
      {props.show &&

        <div className={'info-container ' + (expanded ? 'expanded-info-container' : '')} >
          <div className='info-row-between'>
            <div className='row-start'>
              {/* artist rank for user */}
              {props.info.rank !== undefined && <p className='artist-rank'>#{props.info.rank + 1}</p>}
              {/* artist photo */}
              {props.info.images && props.info.images.length > 0 ?
                <img className='artist-pic' src={props.info.images[props.info.images.length - 1].url} />
                :
                <div className='artist-pic empty-pic'></div>
              }

              <div className='info-text'>
                <span className='row-between'>
                  {/* artist name */}
                  <p className='artist-name'>{props.show && props.info.name} </p>
                  {/* external link to artist spotify page */}
                  <a href={props.info.external_urls.spotify} target="_blank">
                    <img src={newTabIcon} className='new-tab-btn' />
                  </a>
                </span>

                {/* top song of artist for user */}
                {topSong !== 'N/A' && <p className='song-name'>{props.show && `Your Top Song: ${topSong}`}</p>}
              </div>
            </div>

            {/* controls to expand and close menu */}
            {
              expanded ?
                <div class='row-between menu-controls'>
                  <img src={downArrow} className='dropdown-arrow' onClick={expandMenu} />
                  <span className='gap'></span>
                  <img src={closeIcon} className='close-dropdown-btn' onClick={closeMenu} />
                </div>
                :
                <img src={upArrow} className='dropdown-arrow' onClick={expandMenu} />
            }
          </div>

          {
            expanded &&

            <div className='white-box'>
              <div className='row-grid'>

                <div className='col'>
                  {/* info about artist's genres and popularity */}
                  <h3 className='green-text green-label'>Genres</h3>
                  <p className='green-text'>{arrayToString(props.info.genres)}</p>
                  <br />

                  <h3 className='green-text green-label'>Most Popular Songs</h3>
                  <div>
                    {mostPopularSongs &&
                      mostPopularSongs.map((track, i) => {
                        return <p className='green-text'>
                          {i + 1}. {truncate(track.name, truncateLen)}
                        </p>
                      })
                    }
                  </div>
                </div>

                <div className='col'>
                  <h3 className='green-text green-label'>Popularity</h3>
                  <p className='green-text'>{props.info.popularity}/100</p>
                  <br />
                  {/* list of top 5 songs from artist */}
                  
                  <div>
                    <h3 className='green-text green-label'>Similar Artists</h3>
                    {similarArtists &&
                      similarArtists.map((artist, i) => {
                        return <p className='green-text'>
                          {i + 1}. 
                          <a onClick={() => clickSimilarArtist(artist)} className='hover-underline'>
                            {truncate(artist.name, 20)}
                          </a>
                        </p>
                      })
                    }
                  </div>
                </div>

              </div>
            </div>
          }
        </div>
      }

    </div>

  )
};

export default Info;