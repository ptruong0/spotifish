import styled from 'styled-components';

export const Tab = styled.button`
  opacity: 0.6;
  border: 0;
  ${({ activeTab }) =>
    activeTab &&
    `
    border-bottom: 2px solid white;
    opacity: 1;
  `}
`;

export const TAB_LABELS = ['Top Artists', 'Top Songs']