import { styled } from 'styled-components';

export const ButtonLayout = styled.button`
  background-color: #c2272f;
  height: 50px;
  padding: 12px 24px;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #c2272f;
  &:hover {
    opacity: 0.85;
  }

  &:active {
    transform: scale(0.9);
  }
`;
