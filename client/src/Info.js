
import './Info.scss';
import upArrow from './assets/up-arrow.png';
import downArrow from './assets/down-arrow.png';

import React, { useState, useEffect } from 'react';

const Info = (props) => {
  const [expanded, setExpanded] = useState(false);
  const findTopTrackOfArtist = (id) => {
    // console.log(id);
    for (let track of props.tracks) {
      // console.log(track)
      for (let artist of track.artists) {
        // console.log(artist.id, artist.name)
        if (artist.id === id) {
          return track.name;
        }
      }
    }
    return '';
  }

  const toggle = () => {
    setExpanded(!expanded);
  }

  const arrayToString = (arr) => {
    let result = '';
    for (let x of arr) {
      result += x;
      result += ', '

    }
    result = result.replace(/,\s*$/, "");  
    return result;
  }

  return (
    <div className={props.show ? 'transition' : 'hidden'}>
    {props.show && 
    (expanded ?

    <div className='info-container expanded-info-container' >
      <div className='row-between'> 
        <div className='row-start'>
          <p className='artist-rank'>#{props.show && props.info.rank + 1}</p>
          {props.info.images && props.info.images.length > 0 ? 
          <img className='artist-pic' src={props.info.images[props.info.images.length - 1].url} width='65' height='65'/>
          
          :
          <div style={{width: '65px', height: '65px', borderRadius: '50%', backgroundColor: 'white'}}></div>
          }
          <div className='info-text'>
            <p className='artist-name'>{props.show && props.info.name}</p>
            <p className='song-name'>{props.show && `Your Top Song: ${findTopTrackOfArtist(props.info.id)}`}</p>
          </div>
          
      </div>
      <img src={upArrow} onClick={toggle}/> 
      </div>
      <div className='white-box'>
        <div className='row-between'>
          <div>
          <h5 className='green-text'>Genre</h5>
          <p className='green-text'>{arrayToString(props.info.genres)}</p>
          <br />
          <h5 className='green-text'>Popularity</h5>
          <p className='green-text'>{props.info.popularity}/100</p>
          </div>
          <div>
            <h5 className='green-text'>Most Popular Songs</h5>
          </div>
        </div>
        </div>
    </div>
    
    :
<div className='info-container' >
      <div className='row-between'> 
        <div className='row-start'>
          <p className='artist-rank'>#{props.show && props.info.rank + 1}</p>
          {props.info.images && props.info.images.length > 0 ? 
          <img className='artist-pic' src={props.info.images[props.info.images.length - 1].url} width='65' height='65'/>
          
          :
          <div style={{width: '65px', height: '65px', borderRadius: '50%', backgroundColor: 'white'}}></div>
          }
          <div className='info-text'>
            <p className='artist-name'>{props.show && props.info.name}</p>
            <p className='song-name'>{props.show && `Your Top Song: ${findTopTrackOfArtist(props.info.id)}`}</p>
          </div>
          
      </div>
      <img src={downArrow} onClick={toggle}/> 
      </div>
      <div>
        

    </div>
    </div>
    )
  }
  </div>
  
  )
};

export default Info;