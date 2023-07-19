import styled, { keyframes } from 'styled-components';


export const FISH_SETTINGS = {
  numFishShapes: 5,
  minSpeed: window.innerWidth / 75,
  maxSpeed: 35,
  minDelay: 0,
  maxDelay: 5
}


// horizontal movement animation
const swimRight = keyframes`
    0% { left: -300px; visibility: visible; }
    100% { left: 100%; visibility: visible; }
  `;

const swimLeft = keyframes`
    0% { left: 100%; visibility: visible; }
    100% { left: -300px; visibility: visible; }
  `;

/**
 * style templates given props
 */ 
// for fish position and movement
export const FishContainer = styled.div`
      left: ${props => props.leftPos};
      top: ${props => props.topPos};
      animation: ${props => props.speed}s ease-out ${props => props.delay}s infinite running ${props => props.flip > 0 ? swimLeft : swimRight};
    `;

// for fish appearance (color and mirroring)
export const FishImg = styled.img`
      filter: ${props => props.color};
      transform: scaleX(${props => props.flip}) translate(${props => -50 * props.flip}%, -50%);
    `;

// for fish text color
export const FishText = styled.p`
      color: ${props => props.textColor}
    `;