import { styled } from 'styled-components';

export const Header = styled.div`
  text-align: right;
  padding-top: 12px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SubHeader = styled.div({
  justifyContent: 'center',
  alignItems: 'center',
  gap: 24,
  display: 'inline-flex',
});

export const HeaderText = styled.label`
  color: #414141;
  font-size: 32px;
  font-family: 'Noto Sans';
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2.72px;
`;
