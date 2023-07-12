import oceanBG from './assets/ocean-bg.png';
import light1 from './assets/light1.png';
import light2 from './assets/light2.png';
import light3 from './assets/light3.png';
import './Background.scss';

import styled, { keyframes, css } from 'styled-components';

import React from 'react';

const NUM_BUBBLES = 25;


const generateBubbles = () => {

    let container = []

    const  floatUp = keyframes`
      0% { bottom: -20%; }
      100% { bottom: 120%; }
    `;
    

    for (let i = 0; i < NUM_BUBBLES; i++) {
      const leftPos =  Math.floor(Math.random() * 100).toString() + '%';
      const size =  Math.floor((Math.random() * 50) + 20).toString() + 'px';

      const speed = Math.floor((Math.random() * 10) + 12).toString();
      const delay = Math.floor(Math.random() * 12).toString();
      
      
      const Bubble = styled.span`
        left: ${leftPos};
        height: ${size};
        width: ${size};
        animation: ${floatUp} ${speed}s ease-out ${delay}s infinite running ;
      `;
      container.push(<Bubble className='bubble'/>)
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
        {
          container
        }
      </span>
    </span>
  )
}

export default Background;