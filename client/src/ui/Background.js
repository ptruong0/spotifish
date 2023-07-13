import oceanBG from '../assets/ocean-bg.png';
import light1 from '../assets/light1.png';
import light2 from '../assets/light2.png';
import light3 from '../assets/light3.png';
import './Background.scss';

import styled, { keyframes, css } from 'styled-components';

import React from 'react';

const NUM_BUBBLES = 30;

const MIN_SIZE = 20;
const MAX_SIZE = 70;

const MIN_SPEED = 12;
const MAX_SPEED = 22; // higher is slower

const MAX_DELAY = 12;

const  floatUp = keyframes`
0% { bottom: -20%; }
100% { bottom: 120%; }
`;

const Bubble = styled.span`
  left: ${props => props.leftPos};
  height: ${props => props.size};
  width: ${props => props.size};
  animation: ${floatUp} ${props => props.speed}s ease-out ${props => props.delay}s infinite running ;
`;

const generateBubbles = () => {
    let container = []
    
    for (let i = 0; i < NUM_BUBBLES; i++) {
      // randomly generate nubble's x-coordinate, diameter, speed, and animation delay
      const leftPos =  Math.floor(Math.random() * 100).toString() + '%';
      const size =  Math.floor((Math.random() * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE).toString() + 'px';

      const speed = Math.floor((Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED).toString();
      const delay = Math.floor(Math.random() * MAX_DELAY).toString();

      container.push(
        <Bubble className='bubble' leftPos={leftPos} size={size} speed={speed} delay={delay}/>
      );
    }

    return container;
}

const Background = () => {
  const container = generateBubbles();

  return (
    <span>
      <img className='background' src={oceanBG} />
      <img className='background light1' src={light1} />
      <img className='background light2' src={light2} />
      <img className='background light3' src={light3} />
      <span id='bubble-container'>
        {container}
      </span>
    </span>
  )
}

export default Background;