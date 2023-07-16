import oceanBG from '../assets/ocean-bg.png';
import bgMid from '../assets/bg-mid.png';
import bgBottom from '../assets/bg-bottom.png';
import light1 from '../assets/light1.png';
import light2 from '../assets/light2.png';
import light3 from '../assets/light3.png';
import './Background.scss';

import { BUBBLE_SETTINGS, Bubble, floatUp } from '../constants/bubble';
import { css } from 'styled-components';



const generateBubbles = () => {
    let container = []
    
    for (let i = 0; i < BUBBLE_SETTINGS.numBubbles; i++) {
      // randomly generate nubble's x-coordinate, diameter, speed, and animation delay
      const leftPos =  Math.floor(Math.random() * 100).toString() + '%';
      const size =  Math.floor((Math.random() * (BUBBLE_SETTINGS.maxSize - BUBBLE_SETTINGS.minSize)) + BUBBLE_SETTINGS.minSize).toString() + 'px';

      const speed = Math.floor((Math.random() * (BUBBLE_SETTINGS.maxSpeed - BUBBLE_SETTINGS.minSpeed)) + BUBBLE_SETTINGS.minSpeed).toString();
      const delay = Math.floor((Math.random() * (BUBBLE_SETTINGS.maxDelay - BUBBLE_SETTINGS.minDelay)) + BUBBLE_SETTINGS.minDelay).toString();

      const animation = css`${floatUp} ${speed}s ease-out ${delay}s infinite running`

      container.push(
        <Bubble className='bubble' leftPos={leftPos} size={size} speed={speed} delay={delay} animation={animation}/>
      );
    }

    return container;
}


const Background = () => {
  const bubbleContainer = generateBubbles();

  return (
    <span>
      {/* ocean graphics */}
      <img className='background' src={oceanBG} />
      <img className='bg-mid' src={bgMid}/>
      <img className='bg-bottom' src={bgBottom}/>

      {/* sun ray graphics */}
      <img className='background light1' src={light1} />
      <img className='background light2' src={light2} />
      <img className='background light3' src={light3} />

      {/* bubbles */}
      <span id='bubble-container'>
        {bubbleContainer}
      </span>
    </span>
  )
}

export default Background;