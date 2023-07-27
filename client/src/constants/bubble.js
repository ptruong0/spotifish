import styled, { keyframes } from 'styled-components';


export const BUBBLE_SETTINGS = {
  numBubbles: 18,
  minSize: 20,
  maxSize: 60,
  minSpeed: 12,
  maxSpeed: 22,
  minDelay: 0,
  maxDelay: 12
}

// bubble animation
export const floatUp = keyframes`
  0% { bottom: -20%; }
  100% { bottom: 120%; }
  `;

// bubble css template
export const Bubble = styled.span.attrs(props => ({
  style: {
    left: props.leftPos,
    height: props.size,
    width: props.size,
    
    animationDuration: `${props.speed}s`,
    animationDelay: `${props.delay}s`
  }
}))``;