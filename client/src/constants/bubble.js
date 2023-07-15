import styled, { keyframes } from 'styled-components';


export const BUBBLE_SETTINGS = {
  numBubbles: 30,
  minSize: 20,
  maxSize: 70,
  minSpeed: 12,
  maxSpeed: 22,
  minDelay: 0,
  maxDelay: 12
}

const floatUp = keyframes`
0% { bottom: -20%; }
100% { bottom: 120%; }
`;

export const Bubble = styled.span`
  left: ${props => props.leftPos};
  height: ${props => props.size};
  width: ${props => props.size};
  animation: ${floatUp} ${props => props.speed}s ease-out ${props => props.delay}s infinite running ;
`;