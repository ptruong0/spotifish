// import fish1 from './assets/fish1.png';
// import fish2 from './assets/fish2.png';
// import fish3 from './assets/fish3.png';
// import fish4 from './assets/fish4.png';
// import fish5 from './assets/fish5.png';

// import './Fish.scss';

// import React from 'react';
// import styled, { keyframes, css } from 'styled-components';

// import { useState } from 'react'
// import Info from './Info'

// const rankToImage = {
//   0: fish1,
//   1: fish2,
//   2: fish3,
//   3: fish4,
//   4: fish5
// }

// const modToColor = {
//   0: '#9B89CD',
//   1: '#D3A9A4',
//   2: '#76A99D',
//   3: '#8D5179',
//   4: '#0F97AA',
//   5: '#F19A68',
//   6: '#9EB0B4',
//   7: '#FFFFFF',
//   8: '#FFFFFF',
//   9: '#FFFFFF',
// }

// const Fish = (props) => {
//   const [showInfo, setShowInfo] = useState(false);
//   const [info, setInfo] = useState(null);
//   // shouldComponentUpdate(nextProps) {
//   //     if (nextProps.value !== this.props.value) {
//   //       return true
//   //     } else {
//   //       return false
//   //     }
//   //   }
//   // }
//   // const visibleTodos = useMemo(
//   //   () => filterTodos(todos, tab),
//   //   [todos, tab]
//   // );

//   const toggleInfo = (rank, artistInfo) => {
//     artistInfo['rank'] = rank;
//     if (info && info.rank == rank) {
//       setShowInfo(false);
//     } else {
//       setShowInfo(true);
//     }
    
//     setInfo(artistInfo);
//   }

//   const speed = Math.floor((Math.random() * 20) + 15);

//   const MOD_AMOUNT = props.numFish / 5;

//   const imgSrc = rankToImage[Math.floor(props.rank / MOD_AMOUNT)];

//   const color = modToColor[props.rank % MOD_AMOUNT];
//   const flip = Math.random() >= 0.5 ? -1 : 1;

//   const leftPos =  Math.floor(Math.random() * 70).toString() + '%';
//   const topPos =  Math.floor((Math.random() * 70) + 2).toString() + '%';

//   var swimRight = keyframes`
//     0% { left: -20%; }
//     100% { left: 100%; }
//   `;

//   var swimLeft = keyframes`
//     0% { left: 100%; }
//     100% { left: -20%; }
//   `;

//   const containerCSS = {
//     left: leftPos,
//     top: topPos
//   }

//   const imgCSS = {
//     filter: `opacity(0.5) drop-shadow(0 0 0 ${color}) saturate(1000%)`,
//     transform: `scaleX(${flip}) translate(${-50 * flip}%, -50%)`,
//     animation: css`${speed} ease-in 0s infinite running ${flip ? swimLeft : swimRight}`
//   }

//   const FishContainer = styled.div`
//     left: ${leftPos};
//     top: ${topPos};
//     animation: ${speed}s ease-out 0s infinite running ${flip > 0 ? swimLeft : swimRight};
//   `;

//   const FishImg = styled.img`
//     filter: opacity(0.5) drop-shadow(0 0 0 ${color}) drop-shadow(0 0 0 ${color}) saturate(1000%);
//     transform: scaleX(${flip}) translate(${-50 * flip}%, -50%);
//   `;

//   return (
//     <div className='outer'>
//     <FishContainer className='fish' style={containerCSS}>
//       {/* render fish image */}
//       {/* <FishImg className='fish-img' src={imgSrc} onClick={() => {props.clickHandler(props.rank, props.artist)}} /> */}
//       <FishImg className='fish-img' src={imgSrc} onClick={() => {toggleInfo(props.rank, props.artist)}} />
      
//       <p className='fish-text'>{props.artist.name}</p>
//     </FishContainer>
//     <Info info={info} show={showInfo} tracks={props.topTracks} {...props} />
//     </div>
//   )
// }

// export default Fish;


import fish1 from './assets/fish1.png';
import fish2 from './assets/fish2.png';
import fish3 from './assets/fish3.png';
import fish4 from './assets/fish4.png';
import fish5 from './assets/fish5.png';

import './Fish.scss';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useState } from 'react'
import Info from './Info'

const rankToImage = {
  0: fish1,
  1: fish2,
  2: fish3,
  3: fish4,
  4: fish5
}

const modToColor = {
  0: '#9B89CD',
  1: '#D3A9A4',
  2: '#76A99D',
  3: '#8D5179',
  4: '#0F97AA',
  5: '#F19A68',
  6: '#9EB0B4',
  7: '#FFFFFF',
  8: '#FFFFFF',
  9: '#FFFFFF',
}

const Fish = (props) => {
  // shouldComponentUpdate(nextProps) {
  //     if (nextProps.value !== this.props.value) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }
  // const visibleTodos = useMemo(
  //   () => filterTodos(todos, tab),
  //   [todos, tab]
  // );

  const speed = Math.floor((Math.random() * 20) + 15);

  const MOD_AMOUNT = props.numFish / 5;

  const imgSrc = rankToImage[Math.floor(props.rank / MOD_AMOUNT)];

  const color = modToColor[props.rank % MOD_AMOUNT];
  const flip = Math.random() >= 0.5 ? -1 : 1;

  const leftPos =  Math.floor(Math.random() * 70).toString() + '%';
  const topPos =  Math.floor((Math.random() * 70) + 2).toString() + '%';

  var swimRight = keyframes`
    0% { left: -20%; }
    100% { left: 100%; }
  `;

  var swimLeft = keyframes`
    0% { left: 100%; }
    100% { left: -20%; }
  `;

  const containerCSS = {
    left: leftPos,
    top: topPos
  }

  const imgCSS = {
    filter: `opacity(0.5) drop-shadow(0 0 0 ${color}) saturate(1000%)`,
    transform: `scaleX(${flip}) translate(${-50 * flip}%, -50%)`,
    animation: css`${speed} ease-in 0s infinite running ${flip ? swimLeft : swimRight}`
  }

  const FishContainer = styled.div`
    left: ${leftPos};
    top: ${topPos};
    animation: ${speed}s ease-out 0s infinite running ${flip > 0 ? swimLeft : swimRight};
  `;

  const FishImg = styled.img`
    filter: opacity(0.5) drop-shadow(0 0 0 ${color}) drop-shadow(0 0 0 ${color}) saturate(1000%);
    transform: scaleX(${flip}) translate(${-50 * flip}%, -50%);
  `;

  return (
    <div className='outer'>
    <FishContainer className='fish' style={containerCSS}>
      {/* render fish image */}
      <FishImg className='fish-img' src={imgSrc} onClick={() => {props.clickHandler(props.rank, props.artist)}} />
      {/* <FishImg className='fish-img' src={imgSrc} onClick={() => {toggleInfo(props.rank, props.artist)}} /> */}
      
      <p className='fish-text'>{props.artist.name}</p>
    </FishContainer>
    </div>
  )
}

export default Fish;