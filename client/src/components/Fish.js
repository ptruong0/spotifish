import fish1 from '../assets/fish1.png';
import fish2 from '../assets/fish2.png';
import fish3 from '../assets/fish3.png';
import fish4 from '../assets/fish4.png';
import fish5 from '../assets/fish5.png';

import './Fish.scss';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const NUM_FISH_SHAPES = 5;
const NUM_COLORS = 10;

const MIN_SPEED = 15;   // higher is slower
const MAX_SPEED = 35;
const MAX_DELAY = 5;


const rankToImage = {
  0: fish1,
  1: fish2,
  2: fish3,
  3: fish4,
  4: fish5
}

const modToColor = {
  // orange #F19A68
  0: 'invert(68%) sepia(9%) saturate(2475%) hue-rotate(335deg) brightness(100%) contrast(90%)', 
  // gray #9EB0B4
  1: 'invert(76%) sepia(16%) saturate(216%) hue-rotate(143deg) brightness(89%) contrast(88%)', 
  // teal #64D0B6
  2: 'invert(70%) sepia(80%) saturate(245%) hue-rotate(115deg) brightness(93%) contrast(84%)', 
  //  mauve #BA8397
  3: 'invert(73%) sepia(12%) saturate(1022%) hue-rotate(289deg) brightness(78%) contrast(81%)', 
  // dark green #76A99D
  4: 'invert(74%) sepia(7%) saturate(1313%) hue-rotate(116deg) brightness(84%) contrast(87%)', 
  // purple #9B89CD
  5: 'invert(52%) sepia(83%) saturate(223%) hue-rotate(215deg) brightness(94%) contrast(84%)', 
  // magenta #D254A7
  6: 'invert(41%) sepia(46%) saturate(782%) hue-rotate(268deg) brightness(100%) contrast(90%)', 
  // light green #B8D9A9
  7: 'invert(95%) sepia(11%) saturate(812%) hue-rotate(43deg) brightness(89%) contrast(89%)', 
  // gold #C39A2F
  8: 'invert(59%) sepia(99%) saturate(334%) hue-rotate(6deg) brightness(88%) contrast(86%)', 
  // pink #ED9D9D
  9: 'invert(62%) sepia(44%) saturate(316%) hue-rotate(314deg) brightness(103%) contrast(94%)', 
}

  // horizontal movement animation
  var swimRight = keyframes`
    0% { left: -30%; visibility: visible; }
    100% { left: 100%; visibility: visible; }
  `;

  var swimLeft = keyframes`
    0% { left: 100%; visibility: visible; }
    100% { left: -30%; visibility: visible; }
  `;

const FishContainer = styled.div`
    left: ${props => props.leftPos};
    top: ${props => props.topPos};
    animation: ${props => props.speed}s ease-out ${props => props.delay}s infinite running ${props => props.flip > 0 ? swimLeft : swimRight};
  `;

  const FishImg = styled.img`
    filter: ${props => props.color};
    transform: scaleX(${props => props.flip}) translate(${props => -50 * props.flip}%, -50%);
  `;


const Fish = (props) => {

  // randomly choose speed
  const speed = Math.floor((Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED);
  const delay = Math.floor((Math.random() * (MAX_DELAY)));

  const FISH_MOD = props.numFish / NUM_FISH_SHAPES;

  const imgSrc = rankToImage[Math.floor(props.rank / FISH_MOD)];
  const color = modToColor[props.rank % NUM_COLORS];

  // randomly choose starting point (left or right)
  const flip = Math.random() >= 0.5 ? -1 : 1;

  // randomly choose position 
  const leftPos =  Math.floor(Math.random() * 70).toString() + '%';
  const topPos =  Math.floor((Math.random() * 70) + 2).toString() + '%';

  const containerCSS = {
    left: leftPos,
    top: topPos
  }

  return (
    <div className='outer'>
    <FishContainer className='fish' style={containerCSS} leftPos={leftPos} topPos={topPos} speed={speed} delay={delay} flip={flip}>
      {/* render fish image */}
      <FishImg className='fish-img' src={imgSrc} 
        color={color} flip={flip}
        onMouseUp={() => {props.clickHandler(props.rank, props.artist)}} 
      />
      
      <p className='fish-text'>{props.artist.name}</p>
    </FishContainer>
    </div>
  )
}

export default Fish;