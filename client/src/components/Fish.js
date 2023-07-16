import fish1 from '../assets/fish1.png';
import fish2 from '../assets/fish2.png';
import fish3 from '../assets/fish3.png';
import fish4 from '../assets/fish4.png';
import fish5 from '../assets/fish5.png';

import './Fish.scss';

import React from 'react';
import { modToColor, getNumThemeColors, getThemeTextColor } from '../constants/colorThemes';
import { FISH_SETTINGS, FishContainer, FishImg, FishText } from '../constants/fish'


const fishImages = [fish1, fish2, fish3, fish4, fish5]

const Fish = (props) => {

  // randomly choose speed
  const speed = Math.floor((Math.random() * (FISH_SETTINGS.maxSpeed - FISH_SETTINGS.minSpeed)) + FISH_SETTINGS.minSpeed);
  const delay = Math.floor((Math.random() * (FISH_SETTINGS.maxDelay - FISH_SETTINGS.minDelay)) + FISH_SETTINGS.minDelay);

  // randomly choose starting point (left or right)
  const flip = Math.random() >= 0.5 ? -1 : 1;

  // randomly choose position 
  const leftPos = Math.floor(Math.random() * 70).toString() + '%';
  const topPos = Math.floor((Math.random() * 70) + 2).toString() + '%';


  const FISH_MOD = props.numFish / FISH_SETTINGS.numFishShapes;

  // determine fish shape based off of rank mod
  const imgSrc = fishImages[Math.floor(props.rank / FISH_MOD)];

  // determine fish color based off of rank mod
  const numColors = getNumThemeColors(props.theme);
  const color = modToColor(props.rank % numColors, props.theme);
  const textColor = getThemeTextColor(props.theme);


  return (
    <div className='outer'>
      <FishContainer className='fish' leftPos={leftPos} topPos={topPos} speed={speed} delay={delay} flip={flip} 
      onMouseUp={() => { props.clickHandler(props.rank, props.artist) }}>

        {/* render fish image */}
        <FishImg className='fish-img' src={imgSrc}
          color={color} flip={flip}
        />

        {/* <p className='fish-text'>{props.artist.name}</p> */}
        <FishText className='fish-text' textColor={textColor}>{props.artist.name}</FishText>
      </FishContainer>
    </div>
  )
}

export default Fish;