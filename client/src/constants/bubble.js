import styled, { css, keyframes } from 'styled-components';


export const BUBBLE_SETTINGS = {
  numBubbles: 18,
  minSize: 20,
  maxSize: 70,
  minSpeed: 12,
  maxSpeed: 22,
  minDelay: 0,
  maxDelay: 12
}

export const floatUp = keyframes`
  0% { bottom: -20%; }
  100% { bottom: 120%; }
  `;

// export const Bubble = styled.span`
//   left: ${props => props.leftPos};
//   height: ${props => props.size};
//   width: ${props => props.size};
//   animation: ${props => props.animation};
// `;

export const Bubble = styled.span.attrs(props => ({
  style: {
    left: props.leftPos,
    height: props.size,
    width: props.size,
    
    animationDuration: `${props.speed}s`,
    animationDelay: `${props.delay}s`
  }
}))``;